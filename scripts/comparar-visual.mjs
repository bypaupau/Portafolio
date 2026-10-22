#!/usr/bin/env node
/* ═══════════════════════════════════════════════════════════
   COMPARACIÓN VISUAL · versión nueva vs versión anterior

   Monta las DOS versiones en un mismo servidor temporal, hace capturas
   de página completa en cinco anchos y dos idiomas, y las compara
   PÍXEL A PÍXEL. El objetivo de cada etapa es: 0 píxeles distintos.

   El diff se calcula dentro del propio navegador con <canvas>, así que
   no hace falta ninguna librería de imágenes.

   Uso:
     npm run comparar            → todas las páginas de la lista
     npm run comparar contacto   → solo esa

   Requisito (una sola vez):
     npx playwright install chromium

   Resultado en _revision-visual/<id>/ :
     <idioma>-<ancho>-antes.png    la versión publicada hoy
     <idioma>-<ancho>-despues.png  la versión en Astro
     <idioma>-<ancho>-diff.png     en rojo, lo que cambió
     informe.json                  medidas, errores de consola, diffs
   ═══════════════════════════════════════════════════════════ */
import { abrirNavegador } from './navegador.mjs';
import http from 'node:http';
import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import { paginasAComparar, anchosAProbar, idiomasAProbar } from './paginas-a-comparar.mjs';
import { prepararFuentes, CSS_DEL_SITIO } from './fuentes-locales.mjs';

const raizRepo = process.cwd();
/* Se pueden pasar VARIAS páginas: `npm run comparar creativo sobre-mi`.
   Antes solo se leía argv[2] y las demás se ignoraban SIN avisar, así que
   parecía que habías comparado dos y habías comparado una. */
const filtros = process.argv.slice(2).filter((a) => !a.startsWith('-'));
const paginas = filtros.length
  ? paginasAComparar.filter((p) => filtros.includes(p.id))
  : paginasAComparar;
const desconocidas = filtros.filter((f) => !paginasAComparar.some((p) => p.id === f));
if (desconocidas.length) {
  console.error(`No conozco: ${desconocidas.join(', ')}`);
  console.error(`Las que hay: ${paginasAComparar.map((p) => p.id).join(', ')}`);
  process.exit(1);
}

if (!paginas.length) {
  console.error('No hay nada que comparar.');
  console.error(`Disponibles: ${paginasAComparar.map((p) => p.id).join(', ') || '(ninguna)'}`);
  process.exit(1);
}
if (!fs.existsSync(path.join(raizRepo, 'dist'))) {
  console.error('No existe dist/. Corre `npm run build` antes de comparar.');
  process.exit(1);
}

/* ── montar un árbol con las dos versiones ── */
const base = fs.mkdtempSync(path.join(os.tmpdir(), 'comparar-portafolio-'));
fs.cpSync(path.join(raizRepo, 'dist'), path.join(base, 'Portafolio'), { recursive: true });
/* una página nueva no necesita assets del sitio viejo: assets es opcional */
const assetsNecesarios = new Set(paginas.flatMap((p) => p.assets ?? []));
fs.mkdirSync(path.join(base, 'antes'), { recursive: true });
for (const a of assetsNecesarios) {
  const origen = path.join(raizRepo, a);
  if (fs.existsSync(origen)) fs.cpSync(origen, path.join(base, 'antes', a), { recursive: true });
}
if (fs.existsSync(path.join(raizRepo, 'index.html'))) {
  fs.cpSync(path.join(raizRepo, 'index.html'), path.join(base, 'antes', 'index.html'));
}

const TIPOS = {
  '.html': 'text/html;charset=utf-8', '.css': 'text/css;charset=utf-8',
  '.js': 'text/javascript;charset=utf-8', '.json': 'application/json',
  '.png': 'image/png', '.svg': 'image/svg+xml', '.webp': 'image/webp',
  '.jpg': 'image/jpeg', '.jpeg': 'image/jpeg', '.pdf': 'application/pdf',
};
const servidor = http.createServer((pet, res) => {
  let ruta = decodeURIComponent(pet.url.split('?')[0]);
  let archivo = path.join(base, ruta);
  try { if (fs.statSync(archivo).isDirectory()) archivo = path.join(archivo, 'index.html'); } catch {}
  fs.readFile(archivo, (err, datos) => {
    if (err) { res.writeHead(404); res.end('404'); return; }
    res.writeHead(200, { 'content-type': TIPOS[path.extname(archivo)] || 'application/octet-stream' });
    res.end(datos);
  });
});
await new Promise((r) => servidor.listen(0, '127.0.0.1', r));
const SERVIDOR = `http://127.0.0.1:${servidor.address().port}`;

const navegador = await abrirNavegador();

/* Las fuentes se sirven desde una caché local: si vinieran de la red,
   una petición lenta haría que una captura use el tipo real y la otra
   el de respaldo, y el diff marcaría cientos de píxeles sin motivo. */
const interceptarFuentes = await prepararFuentes(CSS_DEL_SITIO);

async function capturar(url, ancho, idioma) {
  const contexto = await navegador.newContext({
    viewport: { width: ancho, height: 900 },
    deviceScaleFactor: 1,
    reducedMotion: 'reduce',           /* sin animaciones: capturas estables */
    hasTouch: ancho < 768,
  });

  /* RELOJ CONGELADO. La taskbar muestra la hora real: si el minuto cambia
     entre la captura "antes" y la "despues", el diff marca un dígito y la
     prueba se vuelve inestable (pasó: 53 px en una caja de 7x11 px). Con
     una hora fija, las dos versiones dibujan el mismo reloj siempre. */
  await contexto.clock.setFixedTime(new Date('2026-06-15T15:30:00'));
  if (interceptarFuentes) await interceptarFuentes(contexto);

  const pagina = await contexto.newPage();
  await pagina.addInitScript(([k, v]) => { try { localStorage.setItem(k, v); } catch {} }, ['pau.lang', idioma]);

  const errores = [];
  pagina.on('console', (m) => { if (m.type() === 'error') errores.push(m.text()); });
  pagina.on('pageerror', (e) => errores.push(String(e)));
  pagina.on('requestfailed', (r) => {
    /* Una petición CANCELADA no es un fallo: la vista previa del CV es
       loading="lazy" y en pantallas angostas queda fuera de vista, así que
       se aborta al cerrar la página. Solo cuentan los fallos de verdad. */
    const motivo = r.failure()?.errorText || '';
    if (motivo.includes('ABORTED')) return;
    if (r.url().includes('fonts.g')) return;
    errores.push(`no cargó (${motivo}): ` + r.url());
  });

  await pagina.goto(url, { waitUntil: 'load' });

  /* Sin animaciones ni transiciones, pase lo que pase. Va DESPUÉS de
     goto: antes se aplicaría a about:blank y se perdería al navegar. */
  await pagina.addStyleTag({ content: `*, *::before, *::after {
    animation: none !important; transition: none !important;
    animation-duration: 0s !important; transition-duration: 0s !important;
    caret-color: transparent !important; }` }).catch(() => {});

  /* ── ESPERA ───────────────────────────────────────────────
     NO se fuerza la carga de todas las imágenes a la vez. Las
     miniaturas se sirven a tamaño completo (trackinglibros.png mide
     3248×1958 y pesa 4,4 MB), así que las diez juntas son ~100 MB de
     mapas de píxeles: a 320px, donde la página es más alta, eso tumbaba
     el navegador entero. La captura de página completa ya va bajando
     sola y las carga a su ritmo, dejando que el navegador libere las
     que ya pasaron.

     Lo que garantiza que no se capture a medio pintar es la ESTABILIDAD
     de abajo: dos capturas seguidas idénticas.

     PERO ESO NO BASTA CON IMÁGENES loading="lazy". Un lazy que todavía
     no arrancó no está "repintando": las dos capturas seguidas salen
     idénticas y las dos están mal. En las páginas de caso, con 25
     imágenes lazy, eso daba un resultado DISTINTO en cada ejecución:
     una vez salía idéntico a 1440px y la siguiente no.

     Así que antes de medir se BAJA la página entera, como haría quien
     la lee, para que los lazy arranquen; luego se espera a que todas
     las imágenes estén completas (sin decode() a la vez, que es lo que
     tumbaba el navegador); y se vuelve arriba. Es el mismo recorrido
     que hace la captura de página completa, solo que hecho antes y
     esperado de verdad. */
  await pagina.evaluate(async () => {
    const alto = document.documentElement.scrollHeight;
    const paso = Math.max(400, window.innerHeight);
    for (let y = 0; y < alto; y += paso) {
      window.scrollTo(0, y);
      await new Promise((r) => setTimeout(r, 60));
    }
    window.scrollTo(0, alto);
    await new Promise((r) => setTimeout(r, 120));
    window.scrollTo(0, 0);
  });

  /* a que no quede ninguna a medias (tope de 15 s, por si una falla) */
  await pagina
    .waitForFunction(
      () => Array.from(document.images).every((i) => i.complete),
      undefined,
      { timeout: 15000 },
    )
    .catch(() => {
      const sinCargar = 'alguna imagen no terminó de cargar';
      console.log(`      ⚠ ${sinCargar} (${url})`);
    });

  await pagina.evaluate(async () => {
    try { await document.fonts.ready; } catch {}
    await new Promise((r) => requestAnimationFrame(() => requestAnimationFrame(r)));
  });
  await pagina.waitForTimeout(250);

  const medidas = await pagina.evaluate(() => {
    const caja = (sel) => {
      const el = document.querySelector(sel);
      if (!el) return null;
      const r = el.getBoundingClientRect();
      return { x: Math.round(r.x), y: Math.round(r.y), w: Math.round(r.width), h: Math.round(r.height) };
    };
    return {
      desbordamientoHorizontal: document.documentElement.scrollWidth - document.documentElement.clientWidth,
      altoDocumento: document.documentElement.scrollHeight,
      idiomaHtml: document.documentElement.lang,
      titulo: document.title,
      descripcion: document.querySelector('meta[name="description"]')?.content ?? null,
      cajas: { nav: caja('nav'), wrap: caja('.wrap'), taskbar: caja('.taskbar'), pie: caja('.foot') },
      enlacesRotos: [...document.querySelectorAll('a[href=""], a:not([href])')].length,
      /* un identificador de traducción a la vista = defecto. Se ignoran
         los nombres de archivo del diseño retro (contacto.exe, idioma.sys). */
      identificadoresVisibles: [...document.querySelectorAll('[data-i18n],[data-i18n-html]')]
        .map((el) => el.textContent.trim())
        .filter((t) => /^[a-z][A-Za-z0-9]*(\.[A-Za-z0-9]+){2,}$/.test(t) && !/\s/.test(t)),
    };
  });

  /* ── ESPERAR A QUE LA PÁGINA SE QUEDE QUIETA ──────────────────
     Capturar una sola vez es una carrera. Al cambiar a inglés, el texto
     nuevo pide glifos que aún no estaban cargados, así que hay un
     repintado DESPUÉS de que document.fonts.ready ya resolvió. Si la
     captura cae en medio, el diff marca cientos de píxeles al azar
     (pasó: 232, 232, 189 px en corridas distintas, en sitios distintos).

     Cada versión por separado es perfectamente estable: lo comprobé
     comparándolas consigo mismas, 0 px. Lo que faltaba era esperar.

     Así que se captura hasta que DOS capturas seguidas sean idénticas
     byte a byte. Entonces la página ya no se mueve. */
  /* En páginas muy altas la captura puede fallar por memoria. Un
     reintento tras respirar suele bastar; si no, se avisa en vez de
     tumbar toda la comparación. */
  const capturar = async () => {
    try { return await pagina.screenshot({ fullPage: true }); }
    catch (error) {
      console.log(`      ⚠ captura fallida, reintentando (${String(error.message).split('\n')[0]})`);
      await pagina.waitForTimeout(1200);
      return pagina.screenshot({ fullPage: true });
    }
  };

  let png = await capturar();
  let estable = false;
  for (let intento = 0; intento < 4 && !estable; intento++) {
    await pagina.waitForTimeout(400);
    const otra = await capturar();
    estable = otra.equals(png);
    png = otra;
  }
  if (!estable) console.log(`      ⚠ la página seguía repintando: la comparación puede dar un falso positivo (${url})`);

  await contexto.close();
  return { medidas, png, errores };
}

/* El diff se hace en una pestaña NUEVA cada vez y se cierra al terminar.
   Reutilizar una sola acumula los mapas de píxeles de cada comparación;
   con páginas de 4.800px de alto son ~19 MB por caso y el navegador
   acabó cayéndose a 320px ("Target page has been closed"). */
async function compararPixeles(pngA, pngB) {
  const paginaDiff = await navegador.newPage();
  await paginaDiff.setContent('<canvas></canvas>');
  try {
    return await paginaDiff.evaluate(async ([a, b]) => {
    const cargar = (b64) => new Promise((res, rej) => {
      const im = new Image(); im.onload = () => res(im); im.onerror = rej;
      im.src = 'data:image/png;base64,' + b64;
    });
    const [ia, ib] = await Promise.all([cargar(a), cargar(b)]);
    const w = Math.min(ia.width, ib.width), h = Math.min(ia.height, ib.height);
    const datos = (im) => {
      const c = document.createElement('canvas'); c.width = w; c.height = h;
      const x = c.getContext('2d'); x.drawImage(im, 0, 0);
      return x.getImageData(0, 0, w, h).data;
    };
    const da = datos(ia), db = datos(ib);
    const salida = document.createElement('canvas'); salida.width = w; salida.height = h;
    const ctx = salida.getContext('2d'); const img = ctx.createImageData(w, h);
    let distintos = 0, minX = w, minY = h, maxX = -1, maxY = -1;
    const filas = new Map();
    for (let i = 0; i < da.length; i += 4) {
      const d = Math.abs(da[i] - db[i]) + Math.abs(da[i+1] - db[i+1]) + Math.abs(da[i+2] - db[i+2]);
      if (d > 24) {
        distintos++;
        img.data[i] = 255; img.data[i+1] = 0; img.data[i+2] = 0; img.data[i+3] = 255;
        const px = (i/4) % w, py = Math.floor((i/4)/w);
        if (px < minX) minX = px; if (px > maxX) maxX = px;
        if (py < minY) minY = py; if (py > maxY) maxY = py;
        filas.set(py, (filas.get(py) || 0) + 1);
      } else {
        const g = 230 + (da[i] + da[i+1] + da[i+2]) / 40;
        img.data[i] = g; img.data[i+1] = g; img.data[i+2] = g; img.data[i+3] = 255;
      }
    }
    ctx.putImageData(img, 0, 0);
    return {
      ancho: w, alto: h, altoAntes: ia.height, altoDespues: ib.height,
      distintos, total: w * h, porcentaje: +(100 * distintos / (w * h)).toFixed(3),
      zona: maxX < 0 ? null : { x: minX, y: minY, w: maxX - minX + 1, h: maxY - minY + 1 },
      filasPeores: [...filas.entries()].sort((x, y) => y[1] - x[1]).slice(0, 6).map(([y, n]) => ({ y, pixeles: n })),
      diff: salida.toDataURL('image/png').split(',')[1],
    };
    }, [pngA.toString('base64'), pngB.toString('base64')]);
  } finally {
    await paginaDiff.close();
  }
}

/* Una página para mirar las tres versiones lado a lado, en vez de abrir
   treinta PNG de uno en uno en el Finder. Se abre con:
     open _revision-visual/<pagina>/revisar.html                      */
function hojaDeContactos(id, informe) {
  const filas = informe.casos.map((c) => {
    const ok = c.dif.distintos === 0;
    return `<section>
      <h2>${c.idioma} · ${c.ancho}px
        <span class="${ok ? 'ok' : 'mal'}">${ok ? 'idéntico' : c.dif.distintos + ' px distintos'}</span>
      </h2>
      <div class="tres">
        <figure><figcaption>antes</figcaption><img loading="lazy" src="${c.idioma}-${c.ancho}-antes.png"></figure>
        <figure><figcaption>después</figcaption><img loading="lazy" src="${c.idioma}-${c.ancho}-despues.png"></figure>
        <figure><figcaption>diferencias${ok ? ' (ninguna)' : ' en rojo'}</figcaption><img loading="lazy" src="${c.idioma}-${c.ancho}-diff.png"></figure>
      </div>
    </section>`;
  }).join('\n');

  const distintos = informe.casos.reduce((n, c) => n + c.dif.distintos, 0);
  return `<!DOCTYPE html>
<html lang="es"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1">
<title>revisión visual · ${id}</title>
<style>
  :root{ color-scheme: light dark; --borde:#2C1A24; --rosa:#E87EA1; }
  body{ font-family:system-ui,-apple-system,sans-serif; margin:0; padding:24px; background:#FFF0F4; color:#2C1A24; }
  @media (prefers-color-scheme:dark){ body{ background:#1b1216; color:#f6e9ee; } }
  header{ max-width:1100px; margin:0 auto 28px; }
  h1{ margin:0 0 6px; font-size:1.5rem; }
  .resumen{ display:inline-block; padding:6px 12px; border:2px solid var(--borde); border-radius:4px;
            background:${distintos === 0 ? '#D7F3E0' : '#FFD9D9'}; color:#2C1A24; font-weight:600; }
  section{ max-width:1100px; margin:0 auto 32px; }
  h2{ font-size:1rem; margin:0 0 10px; display:flex; gap:10px; align-items:center; }
  .ok{ color:#2b7a4b; font-weight:600; } .mal{ color:#b32b2b; font-weight:600; }
  .tres{ display:grid; grid-template-columns:repeat(3,1fr); gap:12px; }
  @media (max-width:800px){ .tres{ grid-template-columns:1fr; } }
  figure{ margin:0; }
  figcaption{ font-size:.8rem; opacity:.75; margin-bottom:4px; }
  img{ width:100%; border:2px solid var(--borde); border-radius:3px; background:#fff; display:block; }
</style></head><body>
<header>
  <h1>Revisión visual · ${id}</h1>
  <p class="resumen">${distintos === 0
    ? 'Las dos versiones renderizan idéntico en los ' + informe.casos.length + ' casos'
    : distintos + ' píxeles distintos — mira las imágenes de diferencias'}</p>
  <p style="opacity:.75;font-size:.9rem">
    Izquierda: el sitio publicado hoy. Centro: la versión en Astro.
    Derecha: en rojo lo que cambió.<br>
    Fuentes ${informe.fuentesLocales ? 'servidas desde la caché local' : 'de respaldo (sin caché)'} ·
    ${new Date(informe.cuando).toLocaleString('es-EC')}
  </p>
</header>
${filas}
</body></html>`;
}

let totalDistintos = 0, totalErrores = 0, totalIdentificadores = 0;

for (const pagina of paginas) {
  const salida = path.join(raizRepo, '_revision-visual', pagina.id);
  fs.mkdirSync(salida, { recursive: true });
  const informe = { pagina: pagina.id, fuentesLocales: !!interceptarFuentes, cuando: new Date().toISOString(), casos: [] };

  /* ── PÁGINAS SIN VERSIÓN ANTERIOR ──────────────────────────
     Una página NUEVA (un caso que no existía en el sitio publicado) no
     tiene con qué compararse. Para esas, la referencia es la ÚLTIMA
     CAPTURA GUARDADA de ella misma, en _revision-visual/_base/<id>/:

       · primera vez  → se guarda la base y no hay nada que comparar
       · a partir de ahí → compara contra esa base y avisa si cambió

     Eso ya no responde «¿se ve igual que lo publicado?» (no hay nada
     publicado), sino «¿cambió algo sin que yo lo pidiera?», que es la
     pregunta útil a partir de la segunda vez. Si el cambio era a
     propósito, se acepta con:  npm run comparar <id> --aceptar  */
  const esNueva = !pagina.anterior;
  const carpetaBase = path.join(raizRepo, '_revision-visual', '_base', pagina.id);
  const aceptarBase = process.argv.includes('--aceptar');
  if (esNueva) fs.mkdirSync(carpetaBase, { recursive: true });

  console.log(`\n══ ${pagina.id} ══  ${esNueva
    ? `página nueva · referencia: ${aceptarBase ? 'se actualiza la base' : '_revision-visual/_base/'}`
    : `${pagina.anterior}  →  ${pagina.nueva}`}`);
  for (const idioma of idiomasAProbar) {
    for (const ancho of anchosAProbar) {
      const despues = await capturar(SERVIDOR + pagina.nueva, ancho, idioma);

      let antes;
      if (esNueva) {
        const archivoBase = path.join(carpetaBase, `${idioma}-${ancho}.png`);
        if (!fs.existsSync(archivoBase) || aceptarBase) {
          fs.writeFileSync(archivoBase, despues.png);
          totalErrores += despues.errores.length;
          totalIdentificadores += despues.medidas.identificadoresVisibles.length;
          const nota = fs.existsSync(archivoBase) && aceptarBase ? 'base actualizada' : 'base guardada';
          console.log(`   ${idioma} ${String(ancho).padStart(4)}px  alto ${String(despues.medidas.altoDocumento).padEnd(18)} ✓ ${nota}`);
          if (despues.errores.length) console.log(`      consola: ${despues.errores.slice(0, 2).join(' | ')}`);
          continue;
        }
        antes = { png: fs.readFileSync(archivoBase), errores: [], medidas: despues.medidas };
      } else {
        antes = await capturar(SERVIDOR + pagina.anterior, ancho, idioma);
      }
      const dif = await compararPixeles(antes.png, despues.png);

      fs.writeFileSync(path.join(salida, `${idioma}-${ancho}-antes.png`), antes.png);
      fs.writeFileSync(path.join(salida, `${idioma}-${ancho}-despues.png`), despues.png);
      fs.writeFileSync(path.join(salida, `${idioma}-${ancho}-diff.png`), Buffer.from(dif.diff, 'base64'));
      delete dif.diff;

      totalDistintos += dif.distintos;
      totalErrores += antes.errores.length + despues.errores.length;
      totalIdentificadores += despues.medidas.identificadoresVisibles.length;

      const alturas = dif.altoAntes === dif.altoDespues ? `alto ${dif.altoAntes}` :
        `⚠ ALTO DISTINTO ${dif.altoAntes} → ${dif.altoDespues}`;
      const veredicto = dif.distintos === 0 ? (esNueva ? '✓ sin cambios' : '✓ idéntico')
        : `✗ ${dif.distintos} px (${dif.porcentaje}%) en y=${dif.zona.y}..${dif.zona.y + dif.zona.h}`;
      console.log(`   ${idioma} ${String(ancho).padStart(4)}px  ${alturas.padEnd(24)} ${veredicto}`);
      if (despues.errores.length) console.log(`      consola: ${despues.errores.slice(0, 2).join(' | ')}`);
      if (despues.medidas.identificadoresVisibles.length) {
        console.log(`      ⛔ identificador a la vista: ${despues.medidas.identificadoresVisibles.join(', ')}`);
      }
      if (despues.medidas.desbordamientoHorizontal > 0) {
        console.log(`      ⚠ desbordamiento horizontal de ${despues.medidas.desbordamientoHorizontal}px`);
      }
      informe.casos.push({ idioma, ancho, antes: antes.medidas, despues: despues.medidas,
        erroresAntes: antes.errores, erroresDespues: despues.errores, dif });
    }
  }
  fs.writeFileSync(path.join(salida, 'informe.json'), JSON.stringify(informe, null, 1));
  fs.writeFileSync(path.join(salida, 'revisar.html'), hojaDeContactos(pagina.id, informe));
  console.log(`   para mirarlas:  open _revision-visual/${pagina.id}/revisar.html`);
}

await navegador.close();
servidor.close();
fs.rmSync(base, { recursive: true, force: true });

console.log('\n' + '─'.repeat(60));
if (totalDistintos === 0 && totalErrores === 0 && totalIdentificadores === 0) {
  console.log('✓ Las versiones renderizan IDÉNTICO. Sin errores de consola.');
} else {
  console.log(`Resultado: ${totalDistintos} píxeles distintos · ${totalErrores} errores de consola · ${totalIdentificadores} identificadores a la vista`);
  console.log('Revisa los *-diff.png: lo rojo es lo que cambió.');
}
process.exit(totalDistintos === 0 && totalErrores === 0 && totalIdentificadores === 0 ? 0 : 1);
