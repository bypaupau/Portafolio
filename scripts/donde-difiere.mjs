/* ═══════════════════════════════════════════════════════════
   ¿DÓNDE difieren las dos versiones?

   `npm run comparar` dice CUÁNTO cambió y en qué franja de la página.
   Esto dice QUÉ ELEMENTO cambió: captura elemento por elemento en las
   dos versiones y compara cada captura.

     npm run donde caso-phoenix
     SEL='.cs-rail, .cs-sec' npm run donde caso-phoenix

   Si un elemento sale distinto pero ninguno de sus hijos, lo que cambió
   es el elemento en sí (su fondo, su separación, su propio texto).
   ═══════════════════════════════════════════════════════════ */
import http from 'node:http';
import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import { paginasAComparar } from './paginas-a-comparar.mjs';
import { abrirNavegador } from './navegador.mjs';
import { prepararFuentes, CSS_DEL_SITIO } from './fuentes-locales.mjs';

const raizRepo = process.cwd();
const pedida = process.argv[2];
const pagina = paginasAComparar.find((p) => p.id === pedida);
if (!pagina) {
  console.error(`Dime qué página: ${paginasAComparar.map((p) => p.id).join(' · ')}`);
  process.exit(1);
}
const ANCHO = Number(process.env.ANCHO ?? 1024);
const SELECTOR = process.env.SEL
  ?? 'main [class]:not(svg):not(svg *):not(p):not(span):not(b):not(i):not(dt):not(dd):not(li)';

const base = fs.mkdtempSync(path.join(os.tmpdir(), 'donde-'));
fs.mkdirSync(path.join(base, 'antes'), { recursive: true });
for (const recurso of pagina.assets) {
  const origen = path.join(raizRepo, recurso);
  if (fs.existsSync(origen)) fs.cpSync(origen, path.join(base, 'antes', recurso), { recursive: true });
}
if (fs.existsSync(path.join(raizRepo, 'index.html'))) {
  fs.cpSync(path.join(raizRepo, 'index.html'), path.join(base, 'antes', 'index.html'));
}
fs.cpSync(path.join(raizRepo, 'dist'), path.join(base, 'Portafolio'), { recursive: true });

const TIPOS = { '.html': 'text/html;charset=utf-8', '.css': 'text/css;charset=utf-8',
  '.js': 'text/javascript;charset=utf-8', '.png': 'image/png', '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg', '.webp': 'image/webp', '.svg': 'image/svg+xml',
  '.pdf': 'application/pdf', '.json': 'application/json', '.woff2': 'font/woff2' };
const servidor = http.createServer((pet, res) => {
  let f = path.join(base, decodeURIComponent(pet.url.split('?')[0]));
  if (fs.existsSync(f) && fs.statSync(f).isDirectory()) f = path.join(f, 'index.html');
  if (!fs.existsSync(f) || fs.statSync(f).isDirectory()) { res.writeHead(404); res.end(); return; }
  res.writeHead(200, { 'content-type': TIPOS[path.extname(f)] ?? 'application/octet-stream' });
  res.end(fs.readFileSync(f));
});
await new Promise((r) => servidor.listen(0, '127.0.0.1', r));
const S = `http://127.0.0.1:${servidor.address().port}`;
const navegador = await abrirNavegador();
const interceptarFuentes = await prepararFuentes(CSS_DEL_SITIO).catch(() => null);

async function capturas(url) {
  const ctx = await navegador.newContext({ viewport: { width: ANCHO, height: 900 }, reducedMotion: 'reduce' });
  await ctx.clock.setFixedTime(new Date('2026-06-15T15:30:00'));
  if (interceptarFuentes) await interceptarFuentes(ctx);
  const p = await ctx.newPage();
  await p.goto(url, { waitUntil: 'load' });
  await p.evaluate(async () => {
    const alto = document.documentElement.scrollHeight;
    for (let y = 0; y < alto; y += Math.max(400, window.innerHeight)) {
      window.scrollTo(0, y); await new Promise((r) => setTimeout(r, 60));
    }
    window.scrollTo(0, 0);
    try { await document.fonts.ready; } catch {}
  });
  await p.waitForFunction(() => Array.from(document.images).every((i) => i.complete), undefined, { timeout: 15000 }).catch(() => {});
  await p.waitForTimeout(1200);

  const nodos = await p.locator(SELECTOR).all();
  const salida = [];
  for (const nodo of nodos) {
    const etiqueta = await nodo.evaluate((e) =>
      e.tagName.toLowerCase() + (e.className && typeof e.className === 'string'
        ? '.' + e.className.trim().split(/\s+/).slice(0, 3).join('.') : ''));
    const caja = await nodo.boundingBox().catch(() => null);
    let png = null;
    if (caja && caja.width > 0 && caja.height > 0 && caja.height < 15000) {
      png = await nodo.screenshot({ timeout: 10000 }).catch(() => null);
    }
    salida.push({ etiqueta, png, alto: caja ? Math.round(caja.height) : 0 });
  }
  await ctx.close();
  return salida;
}

console.log(`\n══ ${pagina.id} ══  a ${ANCHO}px\nselector: ${SELECTOR}\n`);
const antes = await capturas(S + pagina.anterior);
const despues = await capturas(S + pagina.nueva);
await navegador.close();
servidor.close();
fs.rmSync(base, { recursive: true, force: true });

if (antes.length !== despues.length) {
  console.log(`⚠ distinto número de elementos: ${antes.length} antes · ${despues.length} ahora`);
}
let distintos = 0;
for (let i = 0; i < Math.min(antes.length, despues.length); i++) {
  const a = antes[i], b = despues[i];
  if (a.etiqueta !== b.etiqueta) {
    console.log(`✗ #${i} se desalinean: ${a.etiqueta}  →  ${b.etiqueta}`);
    break;
  }
  const igual = a.png && b.png && Buffer.compare(a.png, b.png) === 0;
  if (!igual) {
    distintos++;
    const nota = a.alto !== b.alto ? `  alto ${a.alto} → ${b.alto}` : '';
    console.log(`  ✗ ${a.etiqueta.slice(0, 48).padEnd(50)}${nota}`);
  }
}
console.log(`\n${distintos ? `${distintos} elemento(s) distintos de ${antes.length}` : `✓ los ${antes.length} elementos se ven igual`}`);
console.log('El más PROFUNDO de la lista es el que cambió; los de arriba solo lo contienen.\n');
