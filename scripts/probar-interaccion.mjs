#!/usr/bin/env node
/* ═══════════════════════════════════════════════════════════
   PRUEBAS DE COMPORTAMIENTO

   Lo que una captura NO puede ver: que el cambio de idioma funcione sin
   recargar, que el menú de celular abra y cierre, que la URL anterior
   redirija, y que la página se lea sin JavaScript.

   Uso:
     npm run interaccion            → todas las páginas migradas
     npm run interaccion contacto   → solo esa

   Requisito (una sola vez):  npx playwright install chromium
   ═══════════════════════════════════════════════════════════ */
import { abrirNavegador } from './navegador.mjs';
import http from 'node:http';
import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import { paginasAComparar } from './paginas-a-comparar.mjs';

const raizRepo = process.cwd();
/* Se pueden pasar VARIAS páginas: `npm run interaccion contacto creativo`.
   Antes solo se miraba argv[2] y las demás se ignoraban en silencio, que
   es peor que no poder filtrar. */
const filtros = process.argv.slice(2).filter((a) => !a.startsWith('-'));
const paginas = filtros.length ? paginasAComparar.filter((p) => filtros.includes(p.id)) : paginasAComparar;
const desconocidas = filtros.filter((f) => !paginasAComparar.some((p) => p.id === f));
if (desconocidas.length) {
  console.error(`No conozco: ${desconocidas.join(', ')}`);
  console.error(`Las que hay: ${paginasAComparar.map((p) => p.id).join(', ')}`);
  process.exit(1);
}
if (!paginas.length) { console.error('Nada que probar.'); process.exit(1); }
if (!fs.existsSync(path.join(raizRepo, 'dist'))) {
  console.error('No existe dist/. Corre `npm run build` antes.'); process.exit(1);
}

const base = fs.mkdtempSync(path.join(os.tmpdir(), 'interaccion-portafolio-'));
fs.cpSync(path.join(raizRepo, 'dist'), path.join(base, 'Portafolio'), { recursive: true });

const TIPOS = { '.html':'text/html;charset=utf-8','.css':'text/css;charset=utf-8','.js':'text/javascript;charset=utf-8',
  '.png':'image/png','.svg':'image/svg+xml','.webp':'image/webp','.pdf':'application/pdf' };
const servidor = http.createServer((pet, res) => {
  let archivo = path.join(base, decodeURIComponent(pet.url.split('?')[0]));
  try { if (fs.statSync(archivo).isDirectory()) archivo = path.join(archivo, 'index.html'); } catch {}
  fs.readFile(archivo, (e, d) => {
    if (e) { res.writeHead(404); res.end('404'); return; }
    res.writeHead(200, { 'content-type': TIPOS[path.extname(archivo)] || 'application/octet-stream' });
    res.end(d);
  });
});
await new Promise((r) => servidor.listen(0, '127.0.0.1', r));
const S = `http://127.0.0.1:${servidor.address().port}`;
const navegador = await abrirNavegador();

const resultados = [];
const comprobar = (nombre, condicion, detalle = '') => resultados.push({ nombre, condicion, detalle });

for (const pagina of paginas) {
  const url = S + pagina.nueva;
  console.log(`\n══ ${pagina.id} ══`);
  const marca = (n) => `[${pagina.id}] ${n}`;

  /* ── 1 · cambio de idioma en vivo ── */
  {
    const ctx = await navegador.newContext({ viewport: { width: 1440, height: 900 }, reducedMotion: 'reduce' });
    const p = await ctx.newPage();
    let cargas = 0; p.on('load', () => cargas++);
    await p.goto(url, { waitUntil: 'load' }); await p.waitForTimeout(500);

    const tituloAntes = await p.title();
    await p.click('#tb-lang'); await p.waitForTimeout(250);
    comprobar(marca('el menú de idioma se abre'), (await p.getAttribute('#tb-lang', 'aria-expanded')) === 'true');

    await p.click('.tb-opt[data-lang="en"]'); await p.waitForTimeout(400);
    /* ¿El título DEBE cambiar? No se adivina: se le pregunta a la página.
       Las de caso traen su título en data-title-es / data-title-en, así que
       se comprueba contra el valor exacto esperado en inglés. Las demás lo
       traen como clave; ahí vale pagina.tituloIgual (Inicio e Inicio solo:
       "Paula Martillo · diseño + código ✿" es su nombre y no se traduce). */
    const tituloEsperado = await p.evaluate(() => document.body.dataset.titleEn ?? null);
    if (tituloEsperado !== null) {
      comprobar(marca('el <title> queda en su versión inglesa'),
        (await p.title()) === tituloEsperado, await p.title());
    } else {
      comprobar(
        marca(pagina.tituloIgual ? 'el <title> se queda igual, como debe' : 'el <title> se traduce'),
        pagina.tituloIgual ? (await p.title()) === tituloAntes : (await p.title()) !== tituloAntes,
        await p.title(),
      );
    }
    comprobar(marca('el <html lang> cambia a en'), (await p.getAttribute('html', 'lang')) === 'en');
    comprobar(marca('la preferencia se guarda'), (await p.evaluate(() => localStorage.getItem('pau.lang'))) === 'en');
    comprobar(marca('se anuncia a lectores de pantalla'), ((await p.textContent('#tb-live')) || '').length > 0);
    comprobar(marca('NO recarga la página al cambiar idioma'), cargas === 1, cargas + ' carga(s)');

    /* no todas las páginas llevan el CV: solo se comprueba si lo hay */
    if (await p.locator('[data-resume-link]').count()) {
      const cv = await p.getAttribute('[data-resume-link]', 'href');
      comprobar(marca('el CV pasa a la versión inglesa'), cv.endsWith('eng.pdf'), cv.split('/Portafolio')[1]);
    }

    await p.reload({ waitUntil: 'load' }); await p.waitForTimeout(500);
    comprobar(marca('el idioma sobrevive la recarga'), (await p.getAttribute('html', 'lang')) === 'en');

    /* ningún identificador de traducción a la vista, en inglés */
    const ids = await p.evaluate(() => [...document.querySelectorAll('[data-i18n],[data-i18n-html]')]
      .map((e) => e.textContent.trim())
      .filter((t) => /^[a-z][A-Za-z0-9]*(\.[A-Za-z0-9]+){2,}$/.test(t) && !/\s/.test(t)));
    comprobar(marca('sin identificadores a la vista en inglés'), ids.length === 0, ids.join(', '));

    /* El texto que viene de src/content/ (títulos y descripciones de los
       trabajos) no usa claves: Astro escribe el español y deja el inglés
       en data-i18n-en. Hay que comprobar que de verdad se intercambia. */
    const datos = await p.evaluate(() => [...document.querySelectorAll('[data-i18n-es][data-i18n-en]')]
      .map((e) => ({ mostrado: e.textContent.trim(), en: e.dataset.i18nEn.trim(), es: e.dataset.i18nEs.trim() })));
    if (datos.length) {
      const bien = datos.filter((d) => d.mostrado === d.en).length;
      comprobar(marca('el contenido de los datos pasa a inglés'), bien === datos.length,
        `${bien}/${datos.length} elementos`);
      const distintos = datos.filter((d) => d.es !== d.en).length;
      comprobar(marca('los atributos bilingües solo están donde hacen falta'),
        distintos === datos.length, `${distintos}/${datos.length} tienen textos distintos`);
    }
    await ctx.close();
  }

  /* ── 2 · menú de celular ── */
  {
    const ctx = await navegador.newContext({ viewport: { width: 375, height: 812 }, reducedMotion: 'reduce', hasTouch: true });
    const p = await ctx.newPage();
    await p.goto(url, { waitUntil: 'load' }); await p.waitForTimeout(500);
    const abierto = () => p.evaluate(() => document.getElementById('nav-tabs')?.classList.contains('open'));
    comprobar(marca('el botón hamburguesa se ve en celular'), await p.isVisible('#nav-toggle'));
    comprobar(marca('el menú arranca cerrado'), (await abierto()) === false);
    await p.click('#nav-toggle'); await p.waitForTimeout(250);
    comprobar(marca('el menú abre'), (await abierto()) === true);
    await p.keyboard.press('Escape'); await p.waitForTimeout(250);
    comprobar(marca('Escape cierra el menú'), (await abierto()) === false);
    await ctx.close();
  }

  /* ── 3 · la URL anterior sigue llegando ──
     Solo si la página EXISTÍA antes. Una página nueva no tiene URL
     anterior que redirigir, así que no hay nada que comprobar. */
  if (pagina.anterior) {
    const vieja = pagina.anterior.replace('/antes', '/Portafolio');
    const ctx = await navegador.newContext({ viewport: { width: 1440, height: 900 } });
    const p = await ctx.newPage();
    const r = await p.goto(S + vieja, { waitUntil: 'load' }).catch(() => null);
    if (r && r.status() !== 404) {
      await p.waitForTimeout(800);
      comprobar(marca(`la URL anterior ${vieja.replace('/Portafolio','')} redirige`),
        p.url().includes(pagina.nueva.replace(/\/$/, '')), p.url().split('/Portafolio')[1]);
    } else {
      comprobar(marca(`falta la redirección de ${vieja.replace('/Portafolio','')}`), false,
        'crea public' + pagina.anterior.replace('/antes', '') );
    }
    await ctx.close();
  }

  /* ── 4 · las animaciones de aparición ────────────────────────
     HUECO QUE ESTO TAPA: `npm run comparar` corre con reducedMotion,
     así que nunca pasa por el camino de las animaciones. Sin esta
     prueba, un bloque que se quede invisible pasaría desapercibido.

     Se comprueban dos cosas:
       · nada queda atascado en opacidad 0 después de pasear
       · un bloque aparece UNA VEZ (la regla "quieta, pero viva":
         al terminar la transición, la sección se queda quieta) */
  {
    const ctx = await navegador.newContext({ viewport: { width: 1440, height: 900 }, reducedMotion: 'no-preference' });
    const p = await ctx.newPage();
    await p.goto(url, { waitUntil: 'load' });
    await p.waitForTimeout(700);

    const selector = '.rv, .ab-rv, .cs-rv';
    const hay = await p.locator(selector).count();
    if (hay) {
      await p.evaluate((sel) => {
        window.__reanimaciones = 0;
        document.querySelectorAll(sel).forEach((el) => {
          let antes = el.classList.contains('is-in');
          new MutationObserver(() => {
            const ahora = el.classList.contains('is-in');
            if (ahora !== antes) { if (!ahora) window.__reanimaciones++; antes = ahora; }
          }).observe(el, { attributes: true, attributeFilter: ['class'] });
        });
      }, selector);

      /* Un viaje de ida y vuelta, como quien lee la página y vuelve arriba.
         IMPORTANTE: hay que llegar al FONDO ABSOLUTO y esperar de sobra.
         Un bucle que se queda a 200px del final deja los últimos bloques
         sin cruzar la línea de disparo y la prueba acusa en falso (me
         pasó: decía que 3 bloques quedaban invisibles y no era cierto). */
      await p.evaluate(async () => {
        const h = document.documentElement.scrollHeight;
        for (let y = 0; y < h; y += 220) { window.scrollTo(0, y); await new Promise((r) => setTimeout(r, 55)); }
        window.scrollTo(0, document.documentElement.scrollHeight);
      });
      await p.waitForTimeout(1800);   /* incluye la red de seguridad de 1500ms */
      await p.evaluate(async () => {
        for (let y = document.documentElement.scrollHeight; y > 0; y -= 220) {
          window.scrollTo(0, y); await new Promise((r) => setTimeout(r, 55));
        }
        window.scrollTo(0, 0);
      });
      await p.waitForTimeout(900);

      const r = await p.evaluate((sel) => ({
        total: document.querySelectorAll(sel).length,
        invisibles: [...document.querySelectorAll(sel)].filter((e) => Number(getComputedStyle(e).opacity) < 0.9).length,
        reanimaciones: window.__reanimaciones,
      }), selector);

      comprobar(marca('ningún bloque se queda invisible tras scrollear'),
        r.invisibles === 0, `${r.total - r.invisibles}/${r.total} visibles`);
      comprobar(marca('los bloques aparecen una vez y se quedan quietos'),
        r.reanimaciones === 0, `${r.reanimaciones} re-animaciones en ${r.total} bloques`);
    }
    await ctx.close();
  }

  /* ── 4b · lo propio de Sobre mí ──────────────────────────────
     La ruta de la sección 01 es la única animación del sitio que cuenta
     una historia: las paradas se encadenan y el camino se dibuja. Y las
     pistas llevan un enlace DENTRO de un texto traducido, que es el
     estreno de {pagina:...} (src/i18n/enlaces.ts): si eso se rompiera,
     el enlace saldría literal y nadie lo notaría mirando la página. */
  if (pagina.id === 'sobre-mi') {
    const ctx = await navegador.newContext({ viewport: { width: 1440, height: 900 }, reducedMotion: 'no-preference' });
    const p = await ctx.newPage();
    await p.goto(url, { waitUntil: 'load' });
    await p.waitForTimeout(600);

    comprobar(marca('la ruta tiene las 5 paradas'), (await p.locator('.route .stop').count()) === 5);
    comprobar(marca('cada parada sabe su turno'),
      (await p.evaluate(() => [...document.querySelectorAll('.route .stop')]
        .every((s, i) => s.style.getPropertyValue('--stop-i') === String(i)))) === true);

    await p.locator('.route').scrollIntoViewIfNeeded();
    await p.waitForTimeout(900);
    comprobar(marca('la ruta se pone a caminar al llegar'),
      (await p.evaluate(() => document.querySelector('.route')?.classList.contains('is-walking'))) === true);

    const enlaceDePista = () => p.evaluate(() => document.querySelector('.clue a')?.getAttribute('href'));
    comprobar(marca('el enlace dentro de una pista apunta a /Portafolio/'),
      (await enlaceDePista()) === '/Portafolio/proyectos', await enlaceDePista());

    await p.click('#tb-lang'); await p.waitForTimeout(200);
    await p.click('.tb-opt[data-lang="en"]'); await p.waitForTimeout(400);
    comprobar(marca('y sigue bien después de cambiar a inglés'),
      (await enlaceDePista()) === '/Portafolio/proyectos', await enlaceDePista());
    comprobar(marca('sin huecos {pagina:...} a la vista'),
      !((await p.textContent('main')) || '').includes('{pagina:'));
    await ctx.close();
  }

  /* ── 4c · pau.exe ────────────────────────────────────────────
     Es la pieza con más conducta del sitio y la comparación de pixeles
     no la ve: `comparar` corre con reducedMotion, y con eso pau.exe no
     escribe, no parpadea y no se duerme. Esto sí.

     Incluye el parpadeo, que se mide durante 10 s de verdad. Es el
     bloque más lento de la suite y está a propósito: es la diferencia
     entre "la carita se mueve" y "la carita tiene un ritmo". */
  if (pagina.id === 'inicio') {
    const ctx = await navegador.newContext({ viewport: { width: 1440, height: 900 }, reducedMotion: 'no-preference' });
    const p = await ctx.newPage();
    const renglon = () => p.evaluate(() => document.querySelector('.cap-type')?.textContent?.trim() ?? '');
    const cara = () => p.evaluate(() => document.querySelector('.mon')?.getAttribute('data-face') ?? '');
    const pantalla = () => p.evaluate(() => document.querySelector('.mon')?.getAttribute('data-scr') ?? '');

    await p.goto(url, { waitUntil: 'load' });

    /* el saludo ya está escrito en el HTML: se lee antes de que corra nada */
    comprobar(marca('el saludo viene en el HTML, no lo pone JavaScript'),
      (await renglon()).includes('bienvenid@'), await renglon());

    await p.waitForTimeout(2600);   /* 1050 de entrada + lo que tarda en escribirse */
    comprobar(marca('pau.exe termina de escribir su saludo'),
      (await renglon()).includes('bienvenid@'), await renglon());

    /* clic en la compu: va contando sus estados, uno distinto cada vez */
    await p.click('.mon');
    await p.waitForTimeout(700);
    const primerEstado = await renglon();
    comprobar(marca('al hacerle clic dice algo y sonríe'),
      primerEstado.length > 0 && (await cara()) === 'happy', `"${primerEstado}" · cara ${await cara()}`);
    await p.waitForTimeout(2800);
    await p.click('.mon');
    await p.waitForTimeout(700);
    comprobar(marca('el segundo clic dice OTRO estado'),
      (await renglon()) !== primerEstado, `"${primerEstado}" → "${await renglon()}"`);

    /* los tres controles: cada uno con SU gesto */
    const gestos = [['duck', 0], ['grow', 1], ['shake', 2]];
    for (const [clase, i] of gestos) {
      await p.evaluate(() => document.querySelector('.hero-card')?.classList.remove('duck', 'grow', 'shake'));
      await p.locator('.hero-card .win-ctrls i').nth(i).click();
      await p.waitForTimeout(120);
      const puesta = await p.evaluate((c) => document.querySelector('.hero-card')?.classList.contains(c), clase);
      comprobar(marca(`el control ${['_', '▢', '✕'][i]} hace su gesto (${clase})`), puesta === true);
      await p.waitForTimeout(500);
    }

    /* los botones tiñen la pantalla y la compu opina */
    for (const [clase, color, esperada] of [['mail', 'mail', 'happy'], ['gh', 'gh', 'oh'], ['in', 'in', 'wink']]) {
      await p.hover('.social.' + clase);
      await p.waitForTimeout(300);
      comprobar(marca(`el botón ${clase} tiñe la pantalla`), (await pantalla()) === color, await pantalla());
      comprobar(marca(`y la compu pone su cara (${esperada})`), (await cara()) === esperada, await cara());
    }
    await p.mouse.move(10, 10);
    await p.waitForTimeout(600);
    comprobar(marca('al quitar el mouse la pantalla vuelve a su color'), (await pantalla()) === '');

    /* el título */
    await p.hover('.hero-card .win-title');
    await p.waitForTimeout(200);
    comprobar(marca('el título cambia a pausita.exe'),
      (await p.textContent('.hero-card .win-title'))?.trim() === 'pausita.exe');
    await p.mouse.move(10, 10);
    await p.waitForTimeout(200);
    comprobar(marca('y vuelve a pau.exe'),
      (await p.textContent('.hero-card .win-title'))?.trim() === 'pau.exe');

    /* los ojos siguen al cursor, en pasos de 1 px de la grilla */
    const mirada = () => p.evaluate(() => document.querySelector('.mon .e-open')?.style.transform ?? '');
    const caja = await p.locator('.mon').boundingBox();
    const centroX = caja.x + caja.width / 2;
    const centroY = caja.y + caja.height / 2;
    /* ±150 px del centro: pasa la zona muerta (16% del ancho) sin llegar
       al límite de "cursor lejos" (2.8 anchos) ni salirse de la ventana,
       que es lo que hacía fallar esta prueba en falso. */
    await p.mouse.move(Math.min(centroX + 150, 1430), centroY);
    await p.waitForTimeout(260);
    const aLaDerecha = await mirada();
    await p.mouse.move(Math.max(centroX - 150, 10), centroY);
    await p.waitForTimeout(260);
    const aLaIzquierda = await mirada();
    comprobar(marca('los ojos miran a la derecha'), aLaDerecha === 'translate(1px, 0px)', aLaDerecha || '(sin mover)');
    comprobar(marca('y a la izquierda'), aLaIzquierda === 'translate(-1px, 0px)', aLaIzquierda || '(sin mover)');

    /* la palabra que cambia */
    const palabra = () => p.evaluate(() => document.querySelector('.rot-w.is-on')?.textContent?.trim() ?? '');
    const antesDeCambiar = await palabra();
    await p.waitForTimeout(4200);
    comprobar(marca('la palabra de "y también…" cambia sola'),
      (await palabra()) !== antesDeCambiar, `${antesDeCambiar} → ${await palabra()}`);

    /* la pista de scroll */
    await p.evaluate(() => window.scrollTo(0, 400));
    await p.waitForTimeout(250);
    comprobar(marca('la pista de scroll se va al bajar'),
      (await p.evaluate(() => document.querySelector('.scroll-hint')?.classList.contains('is-gone'))) === true);
    await p.evaluate(() => window.scrollTo(0, 0));
    await p.waitForTimeout(250);
    comprobar(marca('y vuelve al llegar arriba'),
      (await p.evaluate(() => document.querySelector('.scroll-hint')?.classList.contains('is-gone'))) === false);

    /* el konami */
    for (const tecla of ['ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown',
      'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight', 'b', 'a']) {
      await p.keyboard.press(tecla);
    }
    await p.waitForTimeout(900);
    comprobar(marca('↑↑↓↓←→←→BA desbloquea el logro'),
      (await renglon()).includes('achievement'), await renglon());

    /* el parpadeo: cada 4 s, sin pararse. Se cuentan los parpadeos en
       10 s sin tocarla: tienen que salir 2 o 3, y ninguno se duerme */
    await p.mouse.move(5, 5);
    await p.waitForTimeout(1500);   /* que se acaben las caras de los gestos de arriba */
    const parpadeos = await p.evaluate(() => new Promise((ok) => {
      const mon = document.querySelector('.mon');
      let n = 0;
      const obs = new MutationObserver(() => { if (mon?.getAttribute('data-face') === 'blink') n++; });
      if (mon) obs.observe(mon, { attributes: true, attributeFilter: ['data-face'] });
      setTimeout(() => { obs.disconnect(); ok(n); }, 10000);
    }));
    comprobar(marca('parpadea cada 4 s y no se duerme'),
      parpadeos >= 2 && parpadeos <= 3 && !(await p.evaluate(() => document.querySelector('.mon')?.classList.contains('is-asleep'))),
      `${parpadeos} parpadeos en 10 s`);
    await ctx.close();
  }

  /* ── 4d · el secreto del pie, solo en Inicio ── */
  {
    const ctx = await navegador.newContext({ viewport: { width: 1440, height: 900 } });
    const p = await ctx.newPage();
    await p.goto(url, { waitUntil: 'load' });
    const conSecreto = await p.locator('.foot .egg-coffee').count();
    comprobar(marca('el <3 del pie guarda el secreto solo en Inicio'),
      pagina.id === 'inicio' ? conSecreto === 1 : conSecreto === 0,
      conSecreto ? 'lo tiene' : 'no lo tiene');
    await ctx.close();
  }

  /* ── 4e · lo propio de las páginas de caso ───────────────────
     Dos cosas que importan aquí:

     1. EL RIEL. Marca en qué sección estás y se pinta del color de esa
        sección. Sin JavaScript sigue siendo una lista de anclas.

     2. QUE SE LEA SIN JAVASCRIPT. Es el cambio más grande de toda la
        migración: el HTML anterior salía VACÍO (150 elementos con
        data-i18n sin una palabra dentro) y lo llenaba el script. La
        prueba genérica de "se lee sin JavaScript" pide 150 caracteres;
        para un caso de estudio eso es poquísimo, así que aquí se exige
        texto de verdad y que estén los títulos de las secciones. */
  /* ── 4e bis · LA BARRA DEL CASO (el layout nuevo) ───────────────
     Las páginas que ya tienen la barra (.caso-barra) se prueban aquí;
     las que siguen con el riel viejo (Phoenix, hasta la etapa 6), en el
     bloque de abajo. Lo que se comprueba es lo que el encargo pide:
     que la parada activa cambie al bajar, que el sub-índice se abra en
     la sección que toca, que el diagnóstico no mueva la captura y que
     el desplegable de móvil abra y cierre. */
  const conBarra = pagina.id.startsWith('caso-') && await (async () => {
    const ctx = await navegador.newContext({ viewport: { width: 1440, height: 900 } });
    const p = await ctx.newPage();
    await p.goto(url, { waitUntil: 'load' });
    const hay = (await p.locator('.caso-barra').count()) > 0;
    await ctx.close();
    return hay;
  })();

  if (conBarra) {
    const ctx = await navegador.newContext({ viewport: { width: 1440, height: 900 } });
    const p = await ctx.newPage();
    await p.goto(url, { waitUntil: 'load' });
    await p.addStyleTag({ content: 'html{scroll-behavior:auto !important}' });
    await p.waitForTimeout(600);
    const irA = async (selector) => {
      await p.evaluate((s) => document.querySelector(s)?.scrollIntoView({ block: 'start' }), selector);
      await p.waitForTimeout(450);
    };
    const estado = () => p.evaluate(() => [...document.querySelectorAll('.caso-paradas > .caso-parada')]
      .map((li) => (li.classList.contains('es-aqui') ? 'aqui' : li.classList.contains('es-leida') ? 'leida' : '-')));

    /* el título se escribe letra a letra SIN cambiar de alto, y acaba
       entero, sin cursor y con su nombre para lectores de pantalla.
       Se mide en una página recién abierta: la de arriba ya terminó. */
    {
      const q = await ctx.newPage();
      await q.goto(url, { waitUntil: 'domcontentloaded' });
      await q.waitForTimeout(700);
      const durante = await q.evaluate(() => ({ alto: document.querySelector('[data-escribir]')?.offsetHeight ?? 0, cursor: !!document.querySelector('.caso-cursor') }));
      await q.waitForTimeout(2600);
      const despues = await q.evaluate(() => {
        const h = document.querySelector('[data-escribir]');
        return { alto: h?.offsetHeight ?? 0, cursor: !!document.querySelector('.caso-cursor'), texto: h?.innerText.trim(), nombre: h?.getAttribute('aria-label') };
      });
      comprobar(marca('el título se escribe sin mover la página'),
        durante.cursor && durante.alto === despues.alto && !despues.cursor && despues.texto === despues.nombre,
        `alto ${durante.alto} → ${despues.alto} px · «${despues.texto}»`);
      await q.close();
    }

    /* el saludo de la mascota: sale al abrir, en su bocadillo, y se
       cierra con su botón (solo, se va a los 7 s; no se espera aquí) */
    {
      const q = await ctx.newPage();
      await q.goto(url, { waitUntil: 'load' });
      await q.waitForTimeout(700);
      const visible = await q.evaluate(() => { const b = document.querySelector('.caso-saludo'); return !!b && !b.hidden && getComputedStyle(b).opacity === '1'; });
      await q.click('.caso-saludo-cerrar'); await q.waitForTimeout(400);
      const cerrado = await q.evaluate(() => document.querySelector('.caso-saludo')?.hidden === true);
      comprobar(marca('la mascota saluda al abrir y el bocadillo se cierra'), visible && cerrado, `visible: ${visible} · cerrado: ${cerrado}`);
      await q.close();
    }

    const paradas = await p.locator('.caso-paradas > .caso-parada').count();
    const secciones = await p.locator('.caso-seccion').count();
    comprobar(marca('la barra tiene una parada por sección, más la portada'),
      paradas === secciones + 1, `${paradas} paradas · ${secciones} secciones`);
    comprobar(marca('arranca marcando la portada'), (await estado())[0] === 'aqui');

    /* Lo que se recorre sale del PROPIO índice de la página, no de
       números escritos aquí: así vale para cualquier caso, tenga las
       secciones que tenga. */
    const destinos = await p.evaluate(() => [...document.querySelectorAll('.caso-paradas > .caso-parada')].map((li) => ({
      id: li.querySelector(':scope > a')?.getAttribute('href') ?? '',
      subs: [...li.querySelectorAll('.caso-subparada a')].map((a) => a.getAttribute('href')),
    })));

    /* bajar a la cuarta parada: está aquí y las tres anteriores, leídas */
    await irA(destinos[3].id);
    const en3 = await estado();
    comprobar(marca('la parada activa cambia al bajar, y las anteriores quedan leídas'),
      en3[3] === 'aqui' && en3.slice(0, 3).every((e) => e === 'leida') && en3.slice(4).every((e) => e === '-'),
      en3.join(' '));

    /* los vídeos, como GIFs: el que está a la vista va en marcha y en
       bucle; los que no se ven, en pausa. Solo si el caso tiene vídeos. */
    if (await p.locator('.caso-figura video').count()) {
      await p.evaluate(() => document.querySelector('.caso-figura video')?.scrollIntoView({ block: 'center' }));
      await p.waitForTimeout(900);
      const videos = await p.evaluate(() => [...document.querySelectorAll('.caso-figura video')].map((v) => {
        const caja = v.getBoundingClientRect();
        return { visto: caja.top < innerHeight && caja.bottom > 0, enMarcha: !v.paused, bucle: v.loop };
      }));
      const bienPuestos = videos.every((v) => v.bucle && (v.visto ? v.enMarcha : !v.enMarcha));
      comprobar(marca('los vídeos se reproducen solos al llegar a ellos, y en bucle'),
        videos.some((v) => v.enMarcha) && bienPuestos,
        `${videos.filter((v) => v.enMarcha).length} en marcha de ${videos.length} · ${videos.filter((v) => v.visto).length} a la vista`);
    }

    /* el sub-índice: abierto solo en la parada que lo tiene y está aquí.
       Se baja a su SEGUNDO sub-bloque, y después a la parada siguiente. */
    const conSub = destinos.findIndex((d) => d.subs.length >= 2);
    comprobar(marca('el caso tiene sub-índice'), conSub >= 0, conSub >= 0 ? `en la parada ${conSub}` : 'ninguna parada lo tiene');
    if (conSub >= 0) {
      await irA(destinos[conSub].subs[1]);
      const sub = await p.evaluate((cual) => {
        const parada = document.querySelectorAll('.caso-paradas > .caso-parada')[cual];
        const lista = parada?.querySelector('.caso-subindice');
        const marcada = [...(parada?.querySelectorAll('.caso-subparada') ?? [])].findIndex((s) => s.classList.contains('es-aqui'));
        return { visible: lista ? getComputedStyle(lista).display !== 'none' : false, marcada };
      }, conSub);
      comprobar(marca('el sub-índice se abre en la sección que toca'),
        sub.visible && sub.marcada === 1, `visible: ${sub.visible} · sub-bloque marcado: ${sub.marcada + 1}`);
      await irA(destinos[conSub + 1].id);
      comprobar(marca('y se cierra al salir de ella'),
        (await p.evaluate((cual) => {
          const lista = document.querySelectorAll('.caso-paradas > .caso-parada')[cual]?.querySelector('.caso-subindice');
          return lista ? getComputedStyle(lista).display === 'none' : false;
        }, conSub)) === true);
    }

    /* los bloques fijos: al pasar de la penúltima llamada a la última
       cambia la activa (y su captura) pero la columna NO se mueve. Se
       mide desde el borde de abajo del nav: cuando el nav se aparta, la
       columna sube con él a propósito (nav-al-leer.ts), y eso no es que
       se mueva la captura. */
    const fijos = await p.evaluate(async () => {
      const salida = [];
      /* uno detrás de otro y no a la vez: cada uno mueve el scroll */
      for (const bloque of document.querySelectorAll('.caso-diagnostico')) {
        const img = bloque.querySelector('img');
        const llamadas = [...bloque.querySelectorAll('.caso-llamada')];
        /* 900 ms: más que la aparición del bloque (520 ms + hasta 0,3 s de
           retardo). Con 350 la primera medida caía a mitad de ella. */
        const espera = () => new Promise((r) => setTimeout(r, 900));
        const llevar = (l, altura) => window.scrollBy(0, l.getBoundingClientRect().top - innerHeight * altura);
        /* las dos últimas llamadas, haya las que haya: la penúltima al
           10 % (la captura ya está fija) y la última al 20 % */
        const a = llamadas.length - 2, b = llamadas.length - 1;
        llevar(llamadas[a], 0.1); await espera();
        const arriba1 = Math.round(img.getBoundingClientRect().top - Math.max(0, document.querySelector('.barra-superior').getBoundingClientRect().bottom));
        const activa1 = llamadas.findIndex((l) => l.classList.contains('es-activa'));
        llevar(llamadas[b], 0.2); await espera();
        const arriba2 = Math.round(img.getBoundingClientRect().top - Math.max(0, document.querySelector('.barra-superior').getBoundingClientRect().bottom));
        const activa2 = llamadas.findIndex((l) => l.classList.contains('es-activa'));
        /* lo que se enciende con la llamada: la marca (02) o la pantalla (06) */
        const encendida = [...bloque.querySelectorAll('.caso-marca, .caso-pantalla')].findIndex((m) => m.classList.contains('es-activa'));
        salida.push({ vivo: bloque.classList.contains('esta-vivo'), arriba1, arriba2, activa1, activa2, encendida, a, b });
      }
      return salida;
    });
    /* ±1 px: el redondeo de la posición fija */
    const bien = (f) => f.vivo && Math.abs(f.arriba1 - f.arriba2) <= 1 && f.activa1 === f.a && f.activa2 === f.b && f.encendida === f.b;
    comprobar(marca('los bloques fijos no mueven la captura mientras cambian las llamadas'),
      fijos.length >= 1 && fijos.every(bien),
      fijos.map((f) => `y=${f.arriba1}→${f.arriba2} · llamada ${f.activa1 + 1}→${f.activa2 + 1} · encendida ${f.encendida + 1}`).join(' | ') || 'no hay bloques fijos');

    /* el nav: no se aparta mientras se lee la portada; pasada ella, se
       esconde al bajar y vuelve al subir. La barra del caso sube con él
       (no deja el hueco de 54 px). */
    {
      const q = await ctx.newPage();
      await q.goto(url, { waitUntil: 'load' });
      await q.addStyleTag({ content: 'html{scroll-behavior:auto !important}' });
      await q.waitForTimeout(400);
      const medir = () => q.evaluate(() => ({
        nav: Math.round(document.querySelector('.barra-superior').getBoundingClientRect().bottom),
        indice: Math.round(document.querySelector('.caso-indice').getBoundingClientRect().top),
        /* donde el índice tiene que quedar con el nav a la vista: --nav-h */
        altoNav: parseInt(getComputedStyle(document.documentElement).getPropertyValue('--nav-h'), 10),
      }));
      await q.mouse.wheel(0, 300); await q.waitForTimeout(700);
      const enPortada = await medir();
      await q.evaluate(() => document.querySelector('.caso-seccion')?.scrollIntoView({ block: 'start' }));
      await q.mouse.wheel(0, 400); await q.waitForTimeout(700);
      const bajando = await medir();
      await q.mouse.wheel(0, -300); await q.waitForTimeout(700);
      const subiendo = await medir();
      comprobar(marca('el nav se queda en la portada'), enPortada.nav > 0, `bajando por la portada: nav ${enPortada.nav}`);
      comprobar(marca('pasada la portada, el nav se esconde al bajar y vuelve al subir'),
        bajando.nav <= 0 && bajando.indice === 0 && subiendo.nav > 0 && subiendo.indice === subiendo.altoNav,
        `bajando: nav ${bajando.nav} · índice ${bajando.indice} | subiendo: nav ${subiendo.nav} · índice ${subiendo.indice}`);
      await q.close();
    }

    await p.evaluate(() => window.scrollTo(0, document.documentElement.scrollHeight));
    await p.waitForTimeout(500);
    const alFondo = await estado();
    comprobar(marca('al llegar al fondo, la barra marca la última parada'),
      alFondo[alFondo.length - 1] === 'aqui', `parada ${alFondo.indexOf('aqui') + 1} de ${alFondo.length}`);
    comprobar(marca('y la marca para lectores de pantalla'),
      (await p.evaluate(() => Boolean(document.querySelector('.caso-parada.es-aqui > a[aria-current="true"]')))) === true);
    comprobar(marca('la barra toma el color de la sección'),
      (await p.evaluate(() => document.querySelector('.caso-barra')?.style.getPropertyValue('--cs').trim().length > 0)) === true,
      await p.evaluate(() => document.querySelector('.caso-barra')?.style.getPropertyValue('--cs') ?? '(sin color)'));
    await ctx.close();

    /* en móvil: la franja y su desplegable */
    const ctxMovil = await navegador.newContext({ viewport: { width: 390, height: 844 } });
    const m = await ctxMovil.newPage();
    await m.goto(url, { waitUntil: 'load' });
    await m.waitForTimeout(500);
    const cuerpoVisible = () => m.evaluate(() => getComputedStyle(document.querySelector('.caso-indice-cuerpo')).display !== 'none');
    const franjaVisible = await m.evaluate(() => getComputedStyle(document.querySelector('.caso-franja')).display !== 'none');
    const cerradaAlEmpezar = !(await cuerpoVisible());
    await m.click('.caso-franja-boton');
    const abierta = (await cuerpoVisible()) && (await m.getAttribute('.caso-franja-boton', 'aria-expanded')) === 'true';
    await m.keyboard.press('Escape');
    const cerradaConEscape = !(await cuerpoVisible()) && (await m.getAttribute('.caso-franja-boton', 'aria-expanded')) === 'false';
    const lado = await m.evaluate(() => {
      const b = document.querySelector('.caso-franja-boton').getBoundingClientRect();
      return `${Math.round(b.width)}×${Math.round(b.height)}`;
    });
    comprobar(marca('en móvil, el desplegable de la barra abre y cierra'),
      franjaVisible && cerradaAlEmpezar && abierta && cerradaConEscape,
      `franja: ${franjaVisible} · cerrada: ${cerradaAlEmpezar} · abre: ${abierta} · Escape cierra: ${cerradaConEscape}`);
    comprobar(marca('su botón mide al menos 44×44'), lado === '44×44', lado);
    await ctxMovil.close();
  }

  if (pagina.id.startsWith('caso-') && !conBarra) {
    const ctx = await navegador.newContext({ viewport: { width: 1440, height: 900 } });
    const p = await ctx.newPage();
    await p.goto(url, { waitUntil: 'load' });
    await p.waitForTimeout(600);

    /* Cuántas paradas tiene depende del caso: Phoenix 6, Schaman 8, uno
       nuevo puede tener 3. Lo que importa es que haya una por sección
       más la portada, no un número fijo. */
    const paradas = await p.locator('.cs-rail-item').count();
    const secciones = await p.locator('.cs-sec').count();
    comprobar(marca('el riel tiene una parada por sección, más la portada'),
      paradas === secciones + 1, `${paradas} paradas · ${secciones} secciones`);
    comprobar(marca('arranca marcando la portada'),
      (await p.evaluate(() => document.querySelector('.cs-rail-item')?.classList.contains('is-here'))) === true);

    /* Bajar al FONDO del documento. El riel tiene una regla para eso: al
       final gana siempre la última parada, porque si la sección final es
       corta nunca llegaría a cruzar la línea de lectura. Comprobarlo así
       no depende de cuántas secciones tenga el caso ni de lo alta que sea
       la página (un caso de 2 secciones apenas se puede desplazar). */
    await p.evaluate(() => window.scrollTo(0, document.documentElement.scrollHeight));
    await p.waitForTimeout(700);
    const marcada = await p.evaluate(() => {
      const paradas = [...document.querySelectorAll('.cs-rail-item')];
      return paradas.findIndex((li) => li.classList.contains('is-here'));
    });
    comprobar(marca('al llegar al fondo, el riel marca la última parada'),
      marcada === paradas - 1, `parada ${marcada + 1} de ${paradas}`);
    comprobar(marca('y la marca para lectores de pantalla'),
      (await p.evaluate(() => Boolean(document.querySelector('.cs-rail-item.is-here a[aria-current]')))) === true);
    /* el color lo lleva el <nav class="cs-rail">, que es el padre de la
       lista; no la rejilla. Lo puse mal la primera vez. */
    comprobar(marca('el riel toma el color de la sección'),
      (await p.evaluate(() =>
        document.querySelector('.cs-rail')?.style.getPropertyValue('--cs').trim().length > 0)) === true,
      await p.evaluate(() => document.querySelector('.cs-rail')?.style.getPropertyValue('--cs') ?? '(sin color)'));
    await ctx.close();
  }

  if (pagina.id.startsWith('caso-')) {
    const ctx = await navegador.newContext({ viewport: { width: 1440, height: 900 }, javaScriptEnabled: false });
    const p = await ctx.newPage();
    await p.goto(url, { waitUntil: 'load' });
    /* El umbral se calcula sobre el propio caso, no es un número fijo:
       así vale igual para uno de 7 secciones y para uno de 2. Lo que se
       comprueba es que el HTML viene LLENO, no vacío como antes. */
    const texto = ((await p.textContent('main')) || '').trim();
    /* .cs-h en el layout viejo, .caso-h2 en el de la barra */
    const titulos = await p.locator('.cs-h, .caso-h2').allTextContents();
    const minimo = Math.max(300, titulos.length * 150);
    comprobar(marca('el caso COMPLETO se lee sin JavaScript'),
      texto.length > minimo, `${texto.length} caracteres (mínimo ${minimo})`);
    const conTexto = titulos.filter((t) => t.trim().length > 3).length;
    comprobar(marca('todos los títulos de sección tienen texto sin JavaScript'),
      conTexto === titulos.length && titulos.length >= 1, `${conTexto}/${titulos.length}`);
    const vacios = await p.evaluate(() =>
      [...document.querySelectorAll('[data-i18n-es], p.cs-text, p.caso-texto, figcaption')]
        .filter((e) => !(e.textContent || '').trim()).length);
    comprobar(marca('ningún texto queda vacío sin JavaScript'), vacios === 0, vacios + ' vacíos');
    await ctx.close();
  }

  /* ── 5 · sin JavaScript ── */
  {
    const ctx = await navegador.newContext({ viewport: { width: 1440, height: 900 }, javaScriptEnabled: false });
    const p = await ctx.newPage();
    await p.goto(url, { waitUntil: 'load' });
    const texto = (await p.textContent('main')) || '';
    comprobar(marca('se lee sin JavaScript'), texto.trim().length > 150, texto.trim().length + ' caracteres de texto');
    await ctx.close();
  }
}

await navegador.close();
servidor.close();
fs.rmSync(base, { recursive: true, force: true });

console.log();
for (const r of resultados) {
  console.log((r.condicion ? '  ✓ ' : '  ✗ ') + r.nombre.padEnd(52) + (r.detalle ? '· ' + r.detalle : ''));
}
const fallan = resultados.filter((r) => !r.condicion);
console.log('\n' + (fallan.length ? `⛔ ${fallan.length} de ${resultados.length} pruebas FALLAN` : `✓ las ${resultados.length} pruebas pasan`));
process.exit(fallan.length ? 1 : 0);
