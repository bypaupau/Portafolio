#!/usr/bin/env node
/* ═══════════════════════════════════════════════════════════
   VALIDADOR DE TRADUCCIONES

   Corre ANTES de compilar (`npm run build`) y detiene la publicación si:

     1. una clave usada no existe en español o en inglés
     2. los dos diccionarios no tienen las mismas claves
     3. una clave está definida dos veces en el mismo objeto
        (en JavaScript la última gana EN SILENCIO: así se perdieron
         25 textos escritos en el caso de Schaman)

   Valida las DOS versiones del sitio mientras conviven:
     · src/        el sitio nuevo en Astro
     · index.html, pages/, js/   el sitio publicado hoy

   Uso:  npm run validar       (o  node scripts/validar-traducciones.mjs)
   ═══════════════════════════════════════════════════════════ */
import fs from 'node:fs';
import path from 'node:path';
import vm from 'node:vm';

const raiz = process.cwd();
const existe = (p) => fs.existsSync(path.join(raiz, p));
const leer = (p) => fs.readFileSync(path.join(raiz, p), 'utf8');

const problemas = [];
const avisos = [];
const nota = (lista, archivo, mensaje) => lista.push({ archivo, mensaje });

/* ── recorre un archivo y devuelve las claves de cada objeto literal,
      saltando cadenas y comentarios. Sirve para .ts y para .js ── */
function clavesPorObjeto(fuente) {
  const objetos = [];          // [{ claves: Map<clave, linea[]> }]
  const pila = [];
  const linea = (p) => fuente.slice(0, p).split('\n').length;
  let i = 0, esperaClave = false;

  const finDelValor = (desde) => {
    let prof = 0, j = desde;
    while (j < fuente.length) {
      const c = fuente[j];
      if (c === '"' || c === "'" || c === '`') {
        const q = c; j++;
        while (j < fuente.length && fuente[j] !== q) { if (fuente[j] === '\\') j++; j++; }
      } else if (c === '{' || c === '[') prof++;
      else if (c === '}' || c === ']') { if (prof === 0) break; prof--; }
      else if (c === ',' && prof === 0) break;
      j++;
    }
    return j;
  };

  while (i < fuente.length) {
    const c = fuente[i];
    if (c === '/' && fuente[i + 1] === '/') { const n = fuente.indexOf('\n', i); if (n < 0) break; i = n; continue; }
    if (c === '/' && fuente[i + 1] === '*') { i = fuente.indexOf('*/', i) + 2; continue; }
    if (c === '{') { const o = { claves: new Map() }; pila.push(o); objetos.push(o); esperaClave = true; i++; continue; }
    if (c === '}') { pila.pop(); esperaClave = false; i++; continue; }
    if (c === ',') { esperaClave = true; i++; continue; }
    if (/\s/.test(c)) { i++; continue; }

    let clave = null, tras = i;
    if (esperaClave && pila.length && (c === '"' || c === "'")) {
      const q = c; let j = i + 1; clave = '';
      while (j < fuente.length && fuente[j] !== q) { if (fuente[j] === '\\') j++; clave += fuente[j]; j++; }
      tras = j + 1;
    } else if (esperaClave && pila.length && /[A-Za-z_$]/.test(c)) {
      let j = i; clave = '';
      while (j < fuente.length && /[A-Za-z0-9_$]/.test(fuente[j])) { clave += fuente[j]; j++; }
      tras = j;
    }

    if (clave !== null) {
      let k = tras; while (/\s/.test(fuente[k])) k++;
      if (fuente[k] === ':') {
        const objeto = pila[pila.length - 1];
        if (!objeto.claves.has(clave)) objeto.claves.set(clave, []);
        objeto.claves.get(clave).push(linea(i));
        i = finDelValor(k + 1); esperaClave = false; continue;
      }
      i = tras; esperaClave = false; continue;
    }
    if (c === '"' || c === "'" || c === '`') {
      const q = c; i++;
      while (i < fuente.length && fuente[i] !== q) { if (fuente[i] === '\\') i++; i++; }
      i++; esperaClave = false; continue;
    }
    esperaClave = false; i++;
  }
  return objetos;
}

function revisarDuplicados(archivo) {
  if (!existe(archivo)) return;
  for (const objeto of clavesPorObjeto(leer(archivo))) {
    for (const [clave, lineas] of objeto.claves) {
      if (lineas.length > 1) {
        nota(problemas, archivo,
          `'${clave}' está definida ${lineas.length} veces en el mismo objeto ` +
          `(líneas ${lineas.join(', ')}). Solo vale la última: las anteriores se pierden sin avisar.`);
      }
    }
  }
}

/* ═══════════ PARTE 1 · EL SITIO NUEVO (src/) ═══════════ */
/* Los diccionarios están divididos por página:
     src/i18n/es/global.ts, es/contacto.ts, es/casos/<slug>.ts …
   index.ts solo los mezcla, así que no se lee como diccionario. */
const CARPETAS_DE_IDIOMA = { es: 'src/i18n/es', en: 'src/i18n/en' };
const clavesDefinidas = {};
const archivoDeClave = {};   // idioma -> clave -> archivo que la define

function archivosDeDiccionario(carpeta, acumulado = []) {
  if (!existe(carpeta)) return acumulado;
  for (const entrada of fs.readdirSync(path.join(raiz, carpeta), { withFileTypes: true })) {
    const rel = `${carpeta}/${entrada.name}`;
    if (entrada.isDirectory()) archivosDeDiccionario(rel, acumulado);
    else if (entrada.name.endsWith('.ts') && entrada.name !== 'index.ts') acumulado.push(rel);
  }
  return acumulado;
}

for (const [idioma, carpeta] of Object.entries(CARPETAS_DE_IDIOMA)) {
  clavesDefinidas[idioma] = new Set();
  archivoDeClave[idioma] = new Map();
  const archivos = archivosDeDiccionario(carpeta);
  if (!archivos.length) { nota(problemas, carpeta, 'no hay ningún diccionario en esta carpeta'); continue; }

  for (const archivo of archivos) {
    revisarDuplicados(archivo);
    /* el diccionario es el objeto con MÁS claves del archivo: no vale
       "el primero", porque el primer { suele ser el de un import */
    const objetos = clavesPorObjeto(leer(archivo));
    const mayor = objetos.reduce((a, b) => (b.claves.size > (a?.claves.size ?? 0) ? b : a), null);
    if (!mayor || mayor.claves.size === 0) {
      nota(problemas, archivo, 'no se pudo leer ninguna clave (¿cambió su estructura?).');
      continue;
    }
    for (const clave of mayor.claves.keys()) {
      /* RIESGO NUEVO DE DIVIDIR LOS DICCIONARIOS: la misma clave en dos
         archivos. index.ts los mezcla con spread, así que ganaría el
         último sin avisar — el mismo fallo silencioso que costó 25
         textos en el caso de Schaman, pero repartido entre archivos. */
      if (clavesDefinidas[idioma].has(clave)) {
        nota(problemas, archivo,
          `'${clave}' ya está definida en ${archivoDeClave[idioma].get(clave)}. ` +
          `Al mezclar en index.ts una de las dos se pierde sin avisar: déjala en un solo archivo.`);
      }
      clavesDefinidas[idioma].add(clave);
      archivoDeClave[idioma].set(clave, archivo);
    }
  }
}

if (clavesDefinidas.es?.size && clavesDefinidas.en?.size) {
  for (const clave of clavesDefinidas.es) {
    if (!clavesDefinidas.en.has(clave)) {
      nota(problemas, (archivoDeClave.es.get(clave) || '').replace('/es/', '/en/'),
        `falta '${clave}' (está en ${archivoDeClave.es.get(clave)}). Tradúcela o quítala del español.`);
    }
  }
  for (const clave of clavesDefinidas.en) {
    if (!clavesDefinidas.es.has(clave)) {
      nota(problemas, archivoDeClave.en.get(clave),
        `'${clave}' solo existe en inglés. El español es la fuente de la verdad.`);
    }
  }
}

/* claves usadas en los .astro */
function archivosDeFuente(dir, acumulado = []) {
  if (!existe(dir)) return acumulado;
  for (const entrada of fs.readdirSync(path.join(raiz, dir), { withFileTypes: true })) {
    const rel = `${dir}/${entrada.name}`;
    if (entrada.isDirectory()) archivosDeFuente(rel, acumulado);
    else if (/\.(astro|ts)$/.test(entrada.name)) acumulado.push(rel);
  }
  return acumulado;
}

const usadasEnAstro = new Map();   // clave -> [archivo]
const DICCIONARIOS_RUTAS = Object.values(CARPETAS_DE_IDIOMA);

/* Espacios de nombres sacados del propio diccionario: 'navigation',
   'footer', 'language', 'taskbar', 'pages'…  Con esto, CUALQUIER cadena
   que empiece por uno de ellos se trata como una clave de traducción,
   esté donde esté: en un ternario, en un objeto de datos, en una
   variable. Dos beneficios: desaparecen los avisos falsos de "definida
   y sin usar", y una clave mal escrita ('navigation.menuClosed') pasa a
   ser un error de verdad en vez de un texto que nunca aparece. */
const espaciosDeNombres = new Set(
  [...(clavesDefinidas.es ?? [])].map((clave) => clave.split('.')[0]),
);
/* Quita comentarios de bloque y de línea. El `(?<![:/])` evita cortar
   una URL (https://…) por la mitad. */
const sinComentarios = (texto) =>
  texto.replace(/\/\*[\s\S]*?\*\//g, ' ').replace(/<!--[\s\S]*?-->/g, ' ')
       .replace(/(?<![:/])\/\/[^\n]*/g, ' ');

const pareceClave = (texto) =>
  espaciosDeNombres.has(texto.split('.')[0]) && /^[a-z][A-Za-z0-9.]*$/.test(texto);
for (const archivo of archivosDeFuente('src')) {
  /* los diccionarios se saltan: ahí las claves se DEFINEN, no se usan */
  if (DICCIONARIOS_RUTAS.some((c) => archivo.startsWith(c + '/'))) continue;
  /* Los comentarios se quitan ANTES de buscar. Una clave MENCIONADA en
     un comentario es documentación, no uso: si cuenta como uso, el
     validador la busca en los diccionarios y avisa de algo que no
     existe. Pasó con un comentario que explicaba 'pages.home.exe.' +
     sufijo en src/scripts/inicio/pau-exe/textos.ts. */
  const fuente = sinComentarios(leer(archivo));
  const apuntar = (clave) => {
    if (!usadasEnAstro.has(clave)) usadasEnAstro.set(clave, []);
    if (!usadasEnAstro.get(clave).includes(archivo)) usadasEnAstro.get(clave).push(archivo);
  };
  for (const m of fuente.matchAll(/translate\(\s*['"]([^'"]+)['"]/g)) apuntar(m[1]);
  /* textoDe() es el equivalente en los scripts del navegador */
  for (const m of fuente.matchAll(/textoDe\(\s*['"]([^'"]+)['"]/g)) apuntar(m[1]);
  /* atributos con la clave escrita literalmente. Los dinámicos
     (data-i18n={algo}) los verifica TypeScript con TranslationKey. */
  for (const m of fuente.matchAll(/\bdata-i18n(?:-html)?="([^"{}]+)"/g)) apuntar(m[1]);
  for (const m of fuente.matchAll(/\bdata-i18n-attr="([^"{}]+)"/g)) {
    for (const par of m[1].split(';')) {
      const trozos = par.split(':');
      if (trozos.length === 2) apuntar(trozos[1].trim());
    }
  }
  /* props del layout: claveTitulo="…", claveNombreVentana="…" */
  for (const m of fuente.matchAll(/\bclave[A-Za-z]*="([^"{}]+)"/g)) apuntar(m[1]);
  /* claves pasadas como DATO, no escritas en el marcado. Así se usan en
     src/lib/navegacion.ts (claveEnlace: 'navigation.home') y en el mapa
     de nombres de idioma de SelectorDeIdioma. Sin esto parecerían
     "definidas y sin usar", que es un aviso falso. */
  for (const m of fuente.matchAll(/\bclave[A-Za-z]*\s*:\s*['"]([^'"]+)['"]/g)) apuntar(m[1]);
  /* red final: cualquier cadena entrecomillada con forma de clave */
  for (const m of fuente.matchAll(/['"]([a-z][A-Za-z0-9.]*\.[A-Za-z0-9.]+)['"]/g)) {
    if (pareceClave(m[1])) apuntar(m[1]);
  }
}

for (const [clave, archivos] of usadasEnAstro) {
  for (const idioma of ['es', 'en']) {
    if (clavesDefinidas[idioma] && !clavesDefinidas[idioma].has(clave)) {
      nota(problemas, archivos.join(', '),
        `usa '${clave}', que no existe en ${idioma === 'es' ? 'español' : 'inglés'} ` +
        `(falta en src/i18n/${idioma}/).`);
    }
  }
}

/* claves definidas que nadie usa: aviso, no error */
if (clavesDefinidas.es) {
  for (const clave of clavesDefinidas.es) {
    if (!usadasEnAstro.has(clave)) {
      nota(avisos, archivoDeClave.es.get(clave) || 'src/i18n/es/',
           `'${clave}' está definida pero nada en src/ la usa todavía.`);
    }
  }
}

/* ═══════════ PARTE 2 · EL SITIO PUBLICADO HOY ═══════════
   Mientras los archivos de la raíz sigan sirviendo el sitio, también
   se validan. Esta parte desaparece sola en el corte final.        */
const PAGINAS_ANTIGUAS = [
  { html: 'index.html',                           dicts: ['js/translations.js'] },
  { html: 'pages/contacto.html',                  dicts: ['js/translations.js'] },
  { html: 'pages/creativo.html',                  dicts: ['js/translations.js'] },
  { html: 'pages/proyectos.html',                 dicts: ['js/translations.js'] },
  { html: 'pages/sobremi.html',                   dicts: ['js/translations.js'] },
  { html: 'pages/caso/grow-with-phoenix.html',    dicts: ['js/translations.js', 'js/translations-caso.js'] },
  { html: 'pages/caso/schaman-analytics-bi.html', dicts: ['js/translations.js', 'js/translations-caso-schaman.js'] },
];

for (const archivo of ['js/translations.js', 'js/translations-caso.js', 'js/translations-caso-schaman.js']) {
  revisarDuplicados(archivo);
}

/* En el navegador `window` ES el objeto global, así que `var TRANSLATIONS`
   y `window.TRANSLATIONS` son lo mismo. Hay que reproducirlo o el
   diccionario parece vacío. */
function cargarDiccionariosAntiguos(archivos) {
  const global = { console: { warn() {}, log() {} } };
  global.window = global; global.globalThis = global; global.self = global;
  vm.createContext(global);
  for (const f of archivos) {
    if (existe(f)) new vm.Script(leer(f), { filename: f }).runInContext(global);
  }
  return global.TRANSLATIONS || {};
}

/* igual que lookup() de js/i18n.js: el primer punto separa grupo y clave */
function buscarAntigua(diccionario, idioma, clave) {
  const i = clave.indexOf('.');
  if (i < 0) return undefined;
  const grupo = diccionario[idioma] && diccionario[idioma][clave.slice(0, i)];
  return grupo ? grupo[clave.slice(i + 1)] : undefined;
}

for (const pagina of PAGINAS_ANTIGUAS) {
  if (!existe(pagina.html)) continue;
  const crudo = leer(pagina.html);
  /* una clave dentro de un comentario HTML NO se renderiza: no es un defecto */
  const html = crudo.replace(/<!--[\s\S]*?-->/g, '');
  const diccionario = cargarDiccionariosAntiguos(pagina.dicts);

  const claves = new Set();
  for (const m of html.matchAll(/data-i18n(?:-html)?="([^"]+)"/g)) claves.add(m[1]);
  for (const m of html.matchAll(/data-i18n-attr="([^"]+)"/g)) {
    for (const par of m[1].split(';')) {
      const trozos = par.split(':');
      if (trozos.length === 2) claves.add(trozos[1].trim());
    }
  }
  const pagKey = (crudo.match(/data-page="([^"]+)"/) || [, 'home'])[1];
  claves.add(`meta.title.${pagKey}`);
  claves.add(`meta.desc.${pagKey}`);
  claves.add(`task.app.${pagKey}`);

  for (const clave of [...claves].sort()) {
    const enEs = buscarAntigua(diccionario, 'es', clave) !== undefined;
    const enEn = buscarAntigua(diccionario, 'en', clave) !== undefined;
    if (!enEs && !enEn) {
      nota(problemas, pagina.html,
        `'${clave}' no existe en ningún idioma → js/i18n.js imprimiría el identificador en pantalla.`);
    } else if (!enEs) {
      nota(problemas, pagina.html, `'${clave}' falta en español (se vería el texto en inglés).`);
    } else if (!enEn) {
      nota(avisos, pagina.html, `'${clave}' falta en inglés (cae al español).`);
    }
  }
}

/* ═══════════ INFORME ═══════════ */
const agrupar = (lista) => {
  const mapa = new Map();
  for (const { archivo, mensaje } of lista) {
    if (!mapa.has(archivo)) mapa.set(archivo, []);
    mapa.get(archivo).push(mensaje);
  }
  return mapa;
};

if (avisos.length) {
  console.log(`\n⚠  ${avisos.length} aviso(s) — no detienen la publicación:`);
  for (const [archivo, mensajes] of agrupar(avisos)) {
    console.log(`\n   ${archivo}`);
    for (const m of mensajes.slice(0, 12)) console.log(`     · ${m}`);
    if (mensajes.length > 12) console.log(`     · … y ${mensajes.length - 12} más`);
  }
}

if (problemas.length) {
  console.error(`\n⛔ ${problemas.length} problema(s) de traducción. No se compila.\n`);
  for (const [archivo, mensajes] of agrupar(problemas)) {
    console.error(`   ${archivo}`);
    for (const m of mensajes) console.error(`     · ${m}`);
    console.error('');
  }
  console.error('   Arregla lo anterior y vuelve a intentar. Nada se publicó.\n');
  process.exit(1);
}

const totalClaves = clavesDefinidas.es ? clavesDefinidas.es.size : 0;
console.log(`\n✓ Traducciones correctas · ${totalClaves} claves en español e inglés · ` +
            `${usadasEnAstro.size} usadas en src/ · sitio anterior revisado · 0 duplicadas\n`);
