/* ═══════════════════════════════════════════════════════════
   GENERAR LAS IMÁGENES QUE USA LA WEB, DESDE LOS ORIGINALES

     npm run imagenes

   El problema: las capturas de los proyectos son archivos de hasta 3248 px
   y 4,5 MB que se muestran en recuadros de 208 px. El navegador baja los
   4,5 MB y los encoge él mismo. Son 9,8 MB para dibujar una fracción.

   Por cada original genera una versión por cada ANCHO que el sitio
   necesita, con el ancho EN EL NOMBRE, más la grande para el zoom:

     trackinglibros-416.webp     filas del archivo · pie de los casos
     trackinglibros-1120.webp    rejilla destacada
     trackinglibros.webp         la grande, solo al hacer clic
     originales/…/trackinglibros.png   el original, fuera de public/

   Todas SIN PÉRDIDA. WebP sin pérdida es exacto bit a bit: no hay
   artefactos ni calidad que perder. Lo único que se descarta son píxeles
   que la pantalla nunca iba a dibujar. La excepción: si el original ya
   es un .webp y ya cabe, se copia tal cual (ver aWebpSinPerdida).

   El ancho va en el nombre a propósito. `-mini` no sirve: en este
   repositorio ya significaba otra cosa (eran conversiones a WebP del
   tamaño completo, de 1800 px, que se mostraban a 64 px). Un número no
   se puede malinterpretar, y permite comprobar automáticamente que cada
   imagen tiene al menos el doble del tamaño al que se ve.

   El número del nombre es el ancho REAL del archivo, no el que se pidió.
   Si pides 1120 y el original mide 1024, el archivo se llama -1024:
   nunca se agranda, y el nombre nunca miente. Las páginas no construyen
   el nombre a mano, lo leen del manifiesto, así que les da igual.
   Y si dos anchos pedidos dan el mismo archivo, se genera una sola vez.

   ── las cuatro reglas, que importan más de lo que parece ──

   1. NUNCA agrandar. Si el original es más chico que el ancho pedido, se
      queda como está. Agrandar no añade detalle: lo inventa borroso.

   2. Si el original ya cabe, NO se redimensiona: solo cambia de formato.
      Redimensionar un PNG con paleta le inventa miles de colores y lo
      deja MÁS pesado. Pasó de verdad: catventures.png (1352 px) daba
      23 KB sin redimensionar y 37 KB redimensionada a 1120.

   3. La grande solo se genera si aporta detalle de verdad: si el original
      apenas supera al ancho más grande que ya se generó (menos de 1,4×),
      no hay nada más que ver y el manifiesto anota que no existe.

   4. Los originales viven en originales/, FUERA de public/. Son el
      material de origen: se conservan enteros para imprimir o para una
      versión futura, pero no viajan por internet.

   ── el manifiesto ──

   Al terminar escribe src/content/imagenes.json con el ancho y el alto
   REALES de cada archivo. Las páginas sacan de ahí sus atributos width y
   height, así que nunca hay que escribirlos a mano ni se desfasan: eso es
   lo que evita el salto de maquetación mientras la imagen carga.

   Y si pides un ancho que no existe en el manifiesto, la compilación
   FALLA con un mensaje claro en vez de publicar una imagen rota. Es a
   propósito: si agregas un proyecto y olvidas correr `npm run imagenes`,
   quieres enterarte ahí, no en vivo.
   ═══════════════════════════════════════════════════════════ */
import fs from 'node:fs';
import path from 'node:path';
import sharp from 'sharp';

const raiz = process.cwd();
const PUBLICO = path.join(raiz, 'public');
const ORIGINALES = path.join(raiz, 'originales');
const MANIFIESTO = path.join(raiz, 'src/content/imagenes.json');

/* images/casos/<caso> y sus subcarpetas, tal como estén en originales/ */
function carpetasDeCasos() {
  const base = path.join(ORIGINALES, 'images/casos');
  if (!fs.existsSync(base)) return [];
  return fs.readdirSync(base, { recursive: true, withFileTypes: true })
    .filter((d) => d.isDirectory())
    .map((d) => path.relative(ORIGINALES, path.join(d.parentPath ?? d.path, d.name)).split(path.sep).join('/'))
    .sort();
}

/* ── qué optimizar, y por qué esos anchos ────────────────────────
   Cada ancho es EL DOBLE del tamaño más grande al que se ve la imagen en
   ese sitio, porque una pantalla retina dibuja el doble de píxeles. */
const QUE_OPTIMIZAR = [
  {
    carpeta: 'images/proyectos',
    anchos: [
      { px: 416, para: 'filas del archivo de Proyectos (208 px) y pie de "otros proyectos" de los casos (64 px)' },
      { px: 1120, para: 'rejilla destacada de Proyectos (hasta ~560 px) y destacados de Inicio (~381 px)' },
    ],
    grande: 2000,
  },
  {
    carpeta: 'images/contacto',
    anchos: [
      { px: 960, para: '.cv-sheet tiene max-width:440px; los originales miden 935 px, así que ni se redimensionan' },
    ],
    grande: null,
  },
  /* LOS CASOS DE ESTUDIO: todos con el mismo layout, la misma columna
     de contenido (852 px) y el mismo ancho, el doble. No se listan a
     mano: cada carpeta de originales/images/casos/ (y sus subcarpetas,
     porque el script no entra en ellas solo) es un grupo. Un caso nuevo
     no obliga a tocar este archivo. */
  ...carpetasDeCasos().map((carpeta) => ({
    carpeta,
    anchos: [
      { px: 1704, para: 'la columna de contenido de un caso (852px); lo que mide menos no se redimensiona' },
    ],
    grande: null,   /* el zoom usa la misma que se ve: ninguna figura de caso lleva data-ampliada */
  })),
];

const EXTENSIONES = ['.png', '.jpg', '.jpeg'];
const esOriginal = (f) => EXTENSIONES.includes(path.extname(f).toLowerCase());
/* En originales/ también vale un .webp: casi todas las capturas de Schaman
   solo existen así, porque se exportaron ya en WebP y no se guardó el PNG.
   En public/ no: ahí un .webp es lo GENERADO, y tomarlo por original lo
   regeneraría encima de sí mismo. */
const esWebp = (f) => path.extname(f).toLowerCase() === '.webp';
const esOriginalGuardado = (f) => esOriginal(f) || esWebp(f);
const kb = (n) => `${Math.round(n / 1024)} KB`;

async function aWebpSinPerdida(entrada, salida, anchoMaximo, anchoOriginal) {
  /* Un .webp que ya cabe se COPIA, byte a byte. Recodificarlo sin pérdida
     no le devuelve lo que perdió al exportarse con pérdida: solo lo engorda.
     Es la regla 2 en su caso extremo: si no hay nada que cambiar, no se toca. */
  if (esWebp(entrada) && anchoOriginal <= anchoMaximo) {
    fs.copyFileSync(entrada, salida);
    const meta = await sharp(salida).metadata();
    return { ancho: meta.width, alto: meta.height, bytes: fs.statSync(salida).size };
  }
  let img = sharp(entrada);
  if (anchoOriginal > anchoMaximo) img = img.resize({ width: anchoMaximo, withoutEnlargement: true });
  await img.webp({ lossless: true, effort: 6 }).toFile(salida);
  const meta = await sharp(salida).metadata();
  return { ancho: meta.width, alto: meta.height, bytes: fs.statSync(salida).size };
}

const manifiesto = {};
let totalAntes = 0, totalWeb = 0, totalGrande = 0, hechas = 0;
const generados = new Set();

for (const grupo of QUE_OPTIMIZAR) {
  const enOriginales = path.join(ORIGINALES, grupo.carpeta);
  const enPublico = path.join(PUBLICO, grupo.carpeta);
  /* la primera vez los originales todavía están en public/; después, en originales/ */
  const desde = fs.existsSync(enOriginales) && fs.readdirSync(enOriginales).some(esOriginalGuardado)
    ? enOriginales : enPublico;
  if (!fs.existsSync(desde)) { console.log(`  (no existe ${grupo.carpeta}, se salta)`); continue; }

  const archivos = fs.readdirSync(desde).filter(desde === enOriginales ? esOriginalGuardado : esOriginal).sort();
  if (!archivos.length) { console.log(`  (sin originales en ${grupo.carpeta})`); continue; }

  console.log(`\n── ${grupo.carpeta}`);
  for (const a of grupo.anchos) console.log(`     ${a.px}px → ${a.para}`);
  console.log('');

  for (const archivo of archivos) {
    const nombre = path.basename(archivo, path.extname(archivo));
    const origen = path.join(desde, archivo);
    const meta = await sharp(origen).metadata();
    const bytesAntes = fs.statSync(origen).size;
    totalAntes += bytesAntes;
    fs.mkdirSync(enPublico, { recursive: true });

    const entrada = { original: `${grupo.carpeta}/${archivo}`, anchoOriginal: meta.width, anchos: {}, grande: null };
    const trozos = [];
    let anchoMayorGenerado = 0;

    const yaHechos = new Map();   /* ancho real → lo generado, para no repetir archivo */
    for (const { px } of grupo.anchos) {
      /* el nombre lleva el ancho REAL, que nunca supera al del original */
      const anchoReal = Math.min(px, meta.width);
      const rel = `${grupo.carpeta}/${nombre}-${anchoReal}.webp`;
      let hecho = yaHechos.get(anchoReal);
      if (!hecho) {
        hecho = await aWebpSinPerdida(origen, path.join(raiz, 'public', rel), px, meta.width);
        yaHechos.set(anchoReal, hecho);
        generados.add(rel);
        totalWeb += hecho.bytes;
        trozos.push(`${px === anchoReal ? px : `${px}→${anchoReal}`}px ${kb(hecho.bytes)}`);
      }
      entrada.anchos[px] = { ruta: rel, ancho: hecho.ancho, alto: hecho.alto };
      anchoMayorGenerado = Math.max(anchoMayorGenerado, hecho.ancho);
    }

    if (grupo.grande && meta.width > anchoMayorGenerado * 1.4) {
      const rel = `${grupo.carpeta}/${nombre}.webp`;
      const hecho = await aWebpSinPerdida(origen, path.join(raiz, 'public', rel), grupo.grande, meta.width);
      entrada.grande = { ruta: rel, ancho: hecho.ancho, alto: hecho.alto };
      generados.add(rel);
      totalGrande += hecho.bytes;
      trozos.push(`grande ${hecho.ancho}px ${kb(hecho.bytes)}`);
    } else {
      trozos.push(meta.width > anchoMayorGenerado ? 'sin grande: el original no da más detalle'
        : esWebp(archivo) ? 'ya cabía y ya era WebP: copiado tal cual'
        : 'ya cabía: solo cambió de formato');
    }

    manifiesto[`${grupo.carpeta}/${nombre}`] = entrada;
    hechas++;
    console.log(`   ${nombre.padEnd(20)} ${String(meta.width).padStart(4)}px ${kb(bytesAntes).padStart(8)}  →  ${trozos.join(' · ')}`);
  }

  if (desde === enPublico) {
    fs.mkdirSync(enOriginales, { recursive: true });
    for (const archivo of archivos) fs.renameSync(path.join(enPublico, archivo), path.join(enOriginales, archivo));
    console.log(`   ↳ ${archivos.length} originales movidos a originales/${grupo.carpeta}/`);
  }
}

fs.mkdirSync(path.dirname(MANIFIESTO), { recursive: true });
fs.writeFileSync(MANIFIESTO, JSON.stringify(manifiesto, null, 2) + '\n');

/* ── archivos derivados que quedaron de antes y ya nadie genera ── */
const sobrantes = [];
for (const grupo of QUE_OPTIMIZAR) {
  const dir = path.join(PUBLICO, grupo.carpeta);
  if (!fs.existsSync(dir)) continue;
  for (const f of fs.readdirSync(dir)) {
    if (!f.endsWith('.webp')) continue;
    if (!generados.has(`${grupo.carpeta}/${f}`)) sobrantes.push(`${grupo.carpeta}/${f}`);
  }
}

console.log(`\n══ resumen ══`);
console.log(`  ${hechas} imágenes`);
console.log(`  originales:          ${kb(totalAntes).padStart(9)}  (en originales/, ya no se publican)`);
console.log(`  lo que carga la web: ${kb(totalWeb).padStart(9)}${totalWeb ? `  · ${(totalAntes / totalWeb).toFixed(1)}× más liviano` : ''}`);
console.log(`  las grandes:         ${kb(totalGrande).padStart(9)}  (solo al hacer clic)`);
if (sobrantes.length) {
  console.log(`\n  ⚠ ${sobrantes.length} .webp que este script NO genera y que quizá ya nadie use:`);
  for (const s of sobrantes) console.log(`      ${s}`);
  console.log(`    No los borro: compruébalo con  grep -rn "<nombre>" src/`);
}
console.log(`\n  manifiesto: src/content/imagenes.json\n`);
