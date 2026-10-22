/* ═══════════════════════════════════════════════════════════
   ¿SIGUEN FUNCIONANDO LAS URLs QUE YA COMPARTISTE?

     npm run urls

   Levanta el sitio COMPILADO y pide, una por una, todas las URLs que el
   sitio anterior exponía al público: sus páginas, los PDF, el favicon.
   De cada una dice si llega (200), si redirige y a dónde, o si se rompió.

   Por qué importa: una URL que mandaste en una postulación o que está
   dentro de tu CV no se puede cambiar después. Esto es la red para que
   ninguna se quede en el camino.

   La lista se arma LEYENDO la carpeta del sitio anterior, así que si
   mañana agregas un PDF a trabajos-disenio/, aparece aquí sin tocar nada.
   ═══════════════════════════════════════════════════════════ */
import http from 'node:http';
import fs from 'node:fs';
import path from 'node:path';
import { URLS_HEREDADAS } from './urls-heredadas.mjs';

const raiz = process.cwd();
const dist = path.join(raiz, 'dist');
if (!fs.existsSync(dist)) {
  console.error('No existe dist/. Corre `npm run build` antes.');
  process.exit(1);
}

/* ── URLs HEREDADAS ───────────────────────────────────────────────
   Las rutas que el sitio anterior exponía y que la compilación sigue
   atendiendo. La lista vive en scripts/urls-heredadas.mjs, al lado del
   código que las copia, para que nunca se desincronicen: si se borra una
   de allí, aquí aparece como rota, que es exactamente lo que es. */
const heredadas = new Map(
  URLS_HEREDADAS.map((u) => ['/Portafolio/' + u.rutaVieja, u]),
);

/* ── la lista, leída del sitio anterior ──────────────────────────── */
const urls = [];
const agregar = (url, queEs) => urls.push({ url, queEs });

/* ── las URLs del sitio ANTERIOR ────────────────────────────────────
   Hasta la etapa 11 esta lista se construía leyendo las carpetas viejas
   de la raíz. Al retirarlas, la lista se quedaba vacía y la herramienta
   decía "0 redirigen" tan contenta: dejaba de comprobar justo lo que más
   importa, que son los enlaces que ya compartiste y que no controlas.

   Así que ahora están escritas aquí. Son una promesa: mientras esta
   lista pase, cualquier enlace a tu portafolio que exista por ahí
   —en tu CV, en LinkedIn, en un correo— sigue llevando a algún sitio. */
agregar('/Portafolio/', 'la portada (es la URL que está en tu CV)');
agregar('/Portafolio/index.html', 'la portada con index.html explícito');

for (const [ruta, queEs] of [
  ['pages/sobremi.html',                       'Sobre mí, del sitio anterior'],
  ['pages/proyectos.html',                     'Proyectos, del sitio anterior'],
  ['pages/creativo.html',                      'Creativo, del sitio anterior'],
  ['pages/contacto.html',                      'Contacto, del sitio anterior'],
  ['pages/materias.html',                      'Materias, del sitio anterior'],
  ['pages/caso/grow-with-phoenix.html',        'el caso de Phoenix, del sitio anterior'],
  ['pages/caso/schaman-analytics-bi.html',     'el caso de Schaman, del sitio anterior'],
]) agregar(`/Portafolio/${ruta}`, queEs);

for (const f of ['favicon.png', 'favicon.svg']) agregar(`/Portafolio/${f}`, 'el favicon');

/* los PDF: sus rutas viejas las atiende la compilación (ver urls-heredadas.mjs)
   y las nuevas viven en public/documents/ */
for (const [ruta, queEs] of [
  ['cv/esp.pdf',                                        'tu CV en español, ruta vieja'],
  ['cv/eng.pdf',                                        'tu CV en inglés, ruta vieja'],
  ['trabajos-disenio/GuiaDelAdultoChiquito.pdf',        'un PDF de trabajos, ruta vieja'],
  ['documents/cv/esp.pdf',                              'tu CV en español'],
  ['documents/cv/eng.pdf',                              'tu CV en inglés'],
  ['documents/trabajos-disenio/GuiaDelAdultoChiquito.pdf', 'un PDF de trabajos'],
]) agregar(`/Portafolio/${ruta}`, queEs);

/* y las URLs nuevas */
for (const p of ['sobre-mi', 'proyectos', 'creativo', 'contacto',
                 'casos/grow-with-phoenix', 'casos/schaman-analytics-bi']) {
  agregar(`/Portafolio/${p}`, 'URL nueva');
}


/* ── servidor sobre dist/ ────────────────────────────────────────── */
const TIPOS = { '.html': 'text/html;charset=utf-8', '.css': 'text/css', '.js': 'text/javascript',
  '.png': 'image/png', '.jpg': 'image/jpeg', '.webp': 'image/webp', '.svg': 'image/svg+xml',
  '.pdf': 'application/pdf', '.json': 'application/json', '.txt': 'text/plain' };
const servidor = http.createServer((pet, res) => {
  const pedido = decodeURIComponent(pet.url.split('?')[0]);
  let f = path.join(dist, pedido.replace(/^\/Portafolio/, ''));
  if (fs.existsSync(f) && fs.statSync(f).isDirectory()) f = path.join(f, 'index.html');
  if (!fs.existsSync(f) || fs.statSync(f).isDirectory()) { res.writeHead(404); res.end(); return; }
  res.writeHead(200, { 'content-type': TIPOS[path.extname(f)] ?? 'application/octet-stream' });
  res.end(fs.readFileSync(f));
});
await new Promise((r) => servidor.listen(0, '127.0.0.1', r));
const S = `http://127.0.0.1:${servidor.address().port}`;

/* ── pedir cada una ─────────────────────────────────────────────── */
const traer = (url) => new Promise((resolver) => {
  http.get(S + url, (r) => {
    let cuerpo = '';
    r.on('data', (c) => { if (cuerpo.length < 4000) cuerpo += c; });
    r.on('end', () => resolver({ estado: r.statusCode, tipo: r.headers['content-type'] ?? '', cuerpo }));
  }).on('error', () => resolver({ estado: 0, tipo: '', cuerpo: '' }));
});

console.log(`\nComprobando ${urls.length} URLs contra el sitio compilado\n`);
let rotas = 0;
let redirigen = 0;
let atendidas = 0;
for (const { url, queEs } of urls) {
  const r = await traer(url);
  const corta = url.replace('/Portafolio', '') || '/';
  if (r.estado !== 200) {
    const heredada = heredadas.get(url);
    if (heredada) {
      rotas++;
      console.log(`  ✗ ${corta.padEnd(42)} ROTA · debería atenderla la compilación`);
      console.log(`       (${heredada.motivo})`);
      continue;
    }
    rotas++;
    console.log(`  ✗ ${corta.padEnd(42)} ${r.estado === 404 ? 'NO EXISTE' : 'error ' + r.estado}   (${queEs})`);
    continue;
  }
  if (heredadas.has(url)) atendidas++;

  /* ¿es una página de redirección? */
  const destino = r.cuerpo.match(/url=([^"'>]+)/i)?.[1] ?? r.cuerpo.match(/location\.replace\('([^']+)'\)/)?.[1];
  if (destino) {
    redirigen++;
    console.log(`  ↪ ${corta.padEnd(42)} redirige a ${destino}`);
  } else {
    const que = r.tipo.includes('pdf') ? 'PDF' : r.tipo.includes('html') ? 'página' : r.tipo.split(';')[0];
    console.log(`  ✓ ${corta.padEnd(42)} llega (${que})`);
  }
}
servidor.close();

console.log();
console.log(`  ${urls.length - rotas - redirigen} llegan directo`
  + ` · ${redirigen} redirigen · ${rotas} rotas`);
console.log(`  de las que llegan, ${atendidas} son rutas heredadas que la`
  + ` compilación atiende desde un solo archivo`);
console.log(rotas
  ? '\n⛔ Hay URLs rotas. NO cambies GitHub Pages hasta arreglarlas.\n'
  : '\n✓ Ninguna URL del sitio anterior se rompe.\n');
process.exit(rotas ? 1 : 0);
