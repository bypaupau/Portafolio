/* ═══════════════════════════════════════════════════════════
   ¿CUÁNTO PESAN LAS IMÁGENES DE CADA PÁGINA?

     npm run peso

   Lee las páginas construidas, busca cada imagen que piden y suma. Y
   compara contra lo que pesaban los originales, para que el ahorro sea un
   número y no una sensación.

   Además avisa de cuatro cosas que se rompen solas con el tiempo:

   · una imagen que se pide y no existe en dist/ → saldría rota en vivo
   · un PNG o JPG pesado que quedó en public/ → debería estar en originales/
   · un archivo generado que ya nadie usa → sobra en el repositorio
   · una versión más ancha que su propio original → alguien la agrandó

   Corre dentro de `npm run revisar`, así que no hay que acordarse.
   ═══════════════════════════════════════════════════════════ */
import fs from 'node:fs';
import path from 'node:path';

const raiz = process.cwd();
const DIST = path.join(raiz, 'dist');
const PUBLICO = path.join(raiz, 'public');
const MANIFIESTO = path.join(raiz, 'src/content/imagenes.json');
const LIMITE_PNG = 150 * 1024;   /* por encima de esto, un PNG en public/ es sospechoso */

if (!fs.existsSync(DIST)) {
  console.error('\n⛔ No hay dist/. Corre primero:  npm run build\n');
  process.exit(1);
}

const kb = (n) => `${Math.round(n / 1024)} KB`;
const mb = (n) => `${(n / 1048576).toFixed(1)} MB`;
const manifiesto = fs.existsSync(MANIFIESTO) ? JSON.parse(fs.readFileSync(MANIFIESTO, 'utf8')) : {};

/* ── de cada archivo generado, de qué original salió ─────────────── */
const vieneDe = new Map();
for (const [base, e] of Object.entries(manifiesto)) {
  for (const v of Object.values(e.anchos)) vieneDe.set(v.ruta, { base, original: e.original, anchoOriginal: e.anchoOriginal, ancho: v.ancho });
  if (e.grande) vieneDe.set(e.grande.ruta, { base, original: e.original, anchoOriginal: e.anchoOriginal, ancho: e.grande.ancho });
}

const paginas = fs.readdirSync(DIST, { recursive: true }).map(String).filter((f) => f.endsWith('index.html'));
const usados = new Set();
const problemas = [];
let totalHoy = 0, totalAntes = 0;

console.log('\n══ peso de las imágenes, página por página ══\n');
console.log(`  ${'página'.padEnd(30)}${'hoy'.padStart(10)}${'antes'.padStart(10)}   ahorro`);

for (const rel of paginas) {
  const html = fs.readFileSync(path.join(DIST, rel), 'utf8');
  const rutas = [...new Set([...html.matchAll(/\/[\w-]*\/?(images\/[\w./-]+?\.(?:webp|png|jpe?g|svg))/g)].map((m) => m[1]))];
  let hoy = 0, antes = 0;

  for (const r of rutas) {
    usados.add(r);
    const archivo = path.join(DIST, r);
    if (!fs.existsSync(archivo)) { problemas.push(`se pide ${r} en /${rel.replace('/index.html', '')} y no existe en dist/`); continue; }
    hoy += fs.statSync(archivo).size;

    /* lo que habría pesado con el original */
    const origen = vieneDe.get(r);
    const rutaOriginal = origen && path.join(raiz, 'originales', origen.original);
    antes += (rutaOriginal && fs.existsSync(rutaOriginal)) ? fs.statSync(rutaOriginal).size : fs.statSync(archivo).size;
  }

  totalHoy += hoy; totalAntes += antes;
  const nombre = '/' + rel.replace('/index.html', '').replace('index.html', '');
  const ahorro = antes > hoy ? `${(antes / hoy).toFixed(1)}× más liviano` : '—';
  console.log(`  ${nombre.padEnd(30)}${kb(hoy).padStart(10)}${kb(antes).padStart(10)}   ${ahorro}`);
}

console.log(`  ${''.padEnd(30)}${'─'.repeat(20)}`);
console.log(`  ${'todas juntas'.padEnd(30)}${mb(totalHoy).padStart(10)}${mb(totalAntes).padStart(10)}   ${totalHoy ? `${(totalAntes / totalHoy).toFixed(1)}×` : ''}`);
console.log('  (sumado por página: una imagen que sale en dos páginas se cuenta dos veces)');

/* ── los cuatro avisos ───────────────────────────────────────────── */
const recorrer = (dir) => fs.existsSync(dir)
  ? fs.readdirSync(dir, { recursive: true }).map(String).filter((f) => fs.statSync(path.join(dir, f)).isFile())
  : [];

for (const f of recorrer(path.join(PUBLICO, 'images'))) {
  const completa = path.join(PUBLICO, 'images', f);
  const tam = fs.statSync(completa).size;
  if (/\.(png|jpe?g)$/i.test(f) && tam > LIMITE_PNG) {
    problemas.push(`images/${f} pesa ${kb(tam)} y sigue en public/. Si es un original, va en originales/ y se genera su .webp con npm run imagenes`);
  }
  const rel = `images/${f}`;
  if (/\.webp$/i.test(f) && !usados.has(rel) && !vieneDe.has(rel)) {
    problemas.push(`${rel} no lo usa ninguna página y no lo genera npm run imagenes: probablemente sobra`);
  }
}

for (const [ruta, o] of vieneDe) {
  if (o.ancho > o.anchoOriginal) problemas.push(`${ruta} mide ${o.ancho}px y su original solo ${o.anchoOriginal}px: se agrandó`);
}

if (!problemas.length) {
  console.log('\n✓ Ninguna imagen rota, ningún original publicado, nada agrandado, nada que sobre.\n');
  process.exit(0);
}
console.log(`\n⚠ ${problemas.length} cosa(s) que revisar:`);
for (const p of problemas) console.log(`    · ${p}`);
console.log('');
process.exit(1);
