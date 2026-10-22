/* ═══════════════════════════════════════════════════════════
   FUENTES LOCALES PARA LAS PRUEBAS VISUALES

   El sitio carga Pixelify Sans, Press Start 2P, VT323 y Outfit desde
   Google Fonts. En una comparación eso es una carrera: si una petición
   falla o tarda, esa captura dibuja con el tipo de respaldo y la otra
   con el real. El diff marca cientos de píxeles sin que nada haya
   cambiado en el código (pasó: 232 y 189 px, alternando).

   Aquí se descargan UNA VEZ a node_modules/.cache/fuentes/ y después se
   sirven desde ahí interceptando las peticiones. Resultado: las dos
   versiones dibujan siempre con exactamente los mismos tipos, y la
   prueba funciona aunque no haya internet.
   ═══════════════════════════════════════════════════════════ */
import fs from 'node:fs';
import path from 'node:path';
import crypto from 'node:crypto';

const CACHE = path.join(process.cwd(), 'node_modules', '.cache', 'fuentes');
/* Google devuelve woff2 moderno solo si el User-Agent es un navegador */
const UA = 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/133.0.0.0 Safari/537.36';

const nombreDe = (url) => crypto.createHash('sha1').update(url).digest('hex').slice(0, 16);

async function traer(url, binario = false) {
  const archivo = path.join(CACHE, nombreDe(url) + (binario ? '.bin' : '.txt'));
  if (fs.existsSync(archivo)) return binario ? fs.readFileSync(archivo) : fs.readFileSync(archivo, 'utf8');
  const res = await fetch(url, { headers: { 'user-agent': UA } });
  if (!res.ok) throw new Error(`${res.status} al traer ${url}`);
  const datos = Buffer.from(await res.arrayBuffer());
  fs.mkdirSync(CACHE, { recursive: true });
  fs.writeFileSync(archivo, datos);
  return binario ? datos : datos.toString('utf8');
}

/**
 * Deja las fuentes en caché y devuelve una función que intercepta las
 * peticiones de un contexto de Playwright. Si no hay red y tampoco
 * caché, devuelve null y la comparación sigue (con tipos de respaldo,
 * iguales en ambas versiones).
 */
export async function prepararFuentes(urlsDeCss) {
  const hojas = new Map();     // url del css  → css con las urls ya locales
  const binarios = new Map();  // url del woff → bytes

  try {
    for (const urlCss of urlsDeCss) {
      const css = await traer(urlCss);
      for (const m of css.matchAll(/url\((https:\/\/fonts\.gstatic\.com\/[^)]+)\)/g)) {
        if (!binarios.has(m[1])) binarios.set(m[1], await traer(m[1], true));
      }
      hojas.set(urlCss, css);
    }
  } catch (e) {
    console.log(`⚠  No se pudieron preparar las fuentes (${e.message}).`);
    console.log('   La comparación sigue, pero con tipos de respaldo.');
    return null;
  }

  return async function interceptar(contexto) {
    await contexto.route('https://fonts.googleapis.com/**', async (ruta) => {
      const css = hojas.get(ruta.request().url());
      if (!css) return ruta.continue();
      await ruta.fulfill({ status: 200, contentType: 'text/css; charset=utf-8', body: css });
    });
    await contexto.route('https://fonts.gstatic.com/**', async (ruta) => {
      const datos = binarios.get(ruta.request().url());
      if (!datos) return ruta.continue();
      await ruta.fulfill({ status: 200, contentType: 'font/woff2', body: datos });
    });
  };
}

/** La hoja de estilos de Google que pide el sitio. */
export const CSS_DEL_SITIO = [
  'https://fonts.googleapis.com/css2?family=Pixelify+Sans:wght@400;500;600;700&family=Press+Start+2P&family=VT323&family=Outfit:wght@300;400;500;600;700&display=swap',
];
