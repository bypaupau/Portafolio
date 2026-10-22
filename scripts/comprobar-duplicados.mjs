/* ═══════════════════════════════════════════════════════════
   ¿QUÉ DEL SITIO ANTERIOR YA ESTÁ CUBIERTO POR EL NUEVO?

     npm run duplicados

   En la raíz conviven dos sitios. El anterior es el que GitHub Pages sirve
   ahora mismo, así que no se puede tocar hasta la etapa 11 (cuando el
   despliegue ya apunte a Astro). Pero sí se puede saber, hoy, exactamente
   qué se va a poder borrar ese día y qué no.

   Esta herramienta responde eso archivo por archivo, en dos grupos:

   · ARCHIVOS (imágenes, PDF, iconos): se comparan byte a byte contra la
     versión nueva. Si el mismo archivo existe en public/ o en originales/,
     el del sitio viejo es una copia y se puede borrar sin perder nada.

   · CÓDIGO (index.html, pages/, css/, js/, data/): no se puede comparar byte
     a byte porque está reescrito, no copiado. Aquí solo se dice dónde vive
     ahora lo que hacía cada uno. La prueba de que el nuevo los reproduce no
     es esta herramienta, son las 70 capturas de `npm run comparar`.

   Mientras la etapa 11 no llegue, lo normal es que esto liste duplicados:
   es a propósito, y el número dice cuánto adelgazará el repositorio.
   ═══════════════════════════════════════════════════════════ */
import fs from 'node:fs';
import path from 'node:path';
import crypto from 'node:crypto';

const raiz = process.cwd();

/* las carpetas del sitio anterior, y qué son */
const ARCHIVOS_VIEJOS = ['img', 'cv', 'trabajos-disenio', 'resources', 'favicon.png', 'favicon.svg'];
const CODIGO_VIEJO = {
  'index.html': 'src/pages/index.astro',
  'pages/': 'src/pages/ (una página por archivo) · las URLs viejas redirigen desde public/pages/',
  'css/': 'src/styles/ (global/ partido en 35 archivos, más sobre-mi/ y casos/)',
  'js/': 'src/scripts/ (por página y por función) y render en Astro',
  'data/': 'src/content/ (proyectos, casos) y src/i18n/ (textos)',
};
const DONDE_ESTA_LO_NUEVO = ['public', 'originales', 'src'];

const listar = (d) => {
  const completa = path.join(raiz, d);
  if (!fs.existsSync(completa)) return [];
  if (fs.statSync(completa).isFile()) return [d];
  return fs.readdirSync(completa, { recursive: true }).map(String)
    .filter((f) => { try { return fs.statSync(path.join(completa, f)).isFile(); } catch { return false; } })
    .map((f) => path.join(d, f));
};
const md5 = (p) => crypto.createHash('md5').update(fs.readFileSync(path.join(raiz, p))).digest('hex');
const kb = (n) => `${Math.round(n / 1024)} KB`;
const mb = (n) => `${(n / 1048576).toFixed(1)} MB`;

/* todo lo que tiene la versión nueva, por contenido */
const nuevo = new Map();
for (const d of DONDE_ESTA_LO_NUEVO) {
  for (const f of listar(d)) {
    if (path.basename(f) === '.DS_Store') continue;
    const h = md5(f);
    if (!nuevo.has(h)) nuevo.set(h, f);
  }
}

/* todo el código del sitio anterior, para saber si él mismo usa un archivo */
let codigoViejo = '';
for (const d of ['index.html', 'pages', 'css', 'js', 'data']) {
  for (const f of listar(d)) codigoViejo += fs.readFileSync(path.join(raiz, f), 'utf8');
}

const cubiertos = [];
const sinCubrir = [];
for (const d of ARCHIVOS_VIEJOS) {
  for (const f of listar(d)) {
    if (path.basename(f) === '.DS_Store') continue;
    const tam = fs.statSync(path.join(raiz, f)).size;
    const donde = nuevo.get(md5(f));
    /* si no está en el nuevo, ¿al menos lo usa el viejo? Si tampoco, es un
       archivo huérfano de siempre y no hay nada que decidir.
       Se busca la RUTA, no el nombre: buscar "icon.png" coincide dentro de
       "favicon.png" y da un falso positivo. La ruta tal cual ("img/icon.png")
       cubre también "../img/icon.png" y "/img/icon.png". */
    const loUsaElViejo = codigoViejo.includes(f.replace(/\\/g, '/'));
    (donde ? cubiertos : sinCubrir).push({ f, tam, donde, loUsaElViejo });
  }
}

console.log('\n══ archivos del sitio anterior ══\n');
console.log(`  ${cubiertos.length} ya están, byte a byte, en la versión nueva · ${mb(cubiertos.reduce((a, r) => a + r.tam, 0))}`);
console.log('  → la etapa 11 los puede borrar sin perder nada\n');

const huerfanos = sinCubrir.filter((r) => !r.loUsaElViejo);
const aDecidir = sinCubrir.filter((r) => r.loUsaElViejo);

if (huerfanos.length) {
  console.log(`  ${huerfanos.length} no están en la versión nueva y el sitio anterior TAMPOCO los usa · ${mb(huerfanos.reduce((a, r) => a + r.tam, 0))}`);
  console.log('  → huérfanos de siempre; no hay nada que decidir, se van con la etapa 11:\n');
  for (const r of huerfanos.sort((a, b) => b.tam - a.tam)) console.log(`     ${kb(r.tam).padStart(9)}  ${r.f}`);
  console.log('');
}
if (aDecidir.length) {
  console.log(`  ${aDecidir.length} los usa el sitio anterior y NO están en el nuevo · ${mb(aDecidir.reduce((a, r) => a + r.tam, 0))}`);
  console.log('  → estos sí son una decisión tuya antes de la etapa 11:\n');
  for (const r of aDecidir.sort((a, b) => b.tam - a.tam)) console.log(`     ${kb(r.tam).padStart(9)}  ${r.f}`);
  console.log('');
}
if (!sinCubrir.length) {
  console.log('  No queda ningún archivo del sitio anterior fuera de la versión nueva.');
}

console.log('\n══ código del sitio anterior ══');
console.log('  No se compara byte a byte: está reescrito, no copiado.\n');
for (const [viejo, ahora] of Object.entries(CODIGO_VIEJO)) {
  const n = listar(viejo.replace(/\/$/, '')).length;
  console.log(`     ${viejo.padEnd(14)} ${String(n).padStart(3)} archivo(s)  →  ${ahora}`);
}

const total = [...cubiertos, ...sinCubrir].reduce((a, r) => a + r.tam, 0)
  + Object.keys(CODIGO_VIEJO).reduce((a, d) => a + listar(d.replace(/\/$/, ''))
      .reduce((b, f) => b + fs.statSync(path.join(raiz, f)).size, 0), 0);
console.log(`\n══ en total ══`);
console.log(`  el sitio anterior ocupa ${mb(total)} en la raíz.`);
console.log('  Se retira en la etapa 11, después de cambiar GitHub Pages y solo con tu aprobación.');
console.log('  Hasta entonces es el sitio que está publicado: no se toca.\n');
