/* ═══════════════════════════════════════════════════════════
   PARTIR UNA HOJA DE ESTILO LARGA POR SUS PROPIAS SECCIONES

     node scripts/partir-hoja.mjs <archivo.css> <carpeta-destino>

   Un archivo de 900 líneas no se lee: se busca dentro. Esta herramienta lo
   corta por las cabeceras de sección que el propio archivo ya tiene
   (/* ════ NOMBRE ════), escribe una por archivo, y deja el original
   convertido en un ÍNDICE de @import en el mismo orden.

   Lo importante: NO toca una sola regla. Corta y nada más. Por eso cada
   trozo lleva una nota de cabecera que termina en una marca, y debajo
   empieza el CSS tal cual; así `npm run cambios` puede volver a juntarlos
   y comprobar que el resultado es el archivo original, carácter por
   carácter.

   El orden de los @import ES la cascada, igual que en global.css: cuando
   dos reglas empatan en importancia y especificidad gana la última. Por
   eso el índice conserva el orden en que estaban las secciones, y por eso
   `npm run cascada` vigila que ese orden no cambie de ganador.

   Reconoce los dos formatos de cabecera que usa este repositorio:
     /* ════════ NOMBRE ════════          (en una línea)
     /* ═══════                           (la raya sola, el nombre debajo)
   ═══════════════════════════════════════════════════════════ */
import fs from 'node:fs';
import path from 'node:path';

const [entrada, destino] = process.argv.slice(2);
if (!entrada || !destino) {
  console.error('\n  uso: node scripts/partir-hoja.mjs <archivo.css> <carpeta-destino>\n');
  process.exit(1);
}

const raiz = process.cwd();
const texto = fs.readFileSync(path.join(raiz, entrada), 'utf8');
const lineas = texto.split('\n');
const MARCA = '/* ── fin de la nota · abajo empieza el CSS tal cual ── */';

const RAYA = /^\/\*\s*[═]{4,}\s*$/;                    /* la raya sola */
const TITULADA = /^\/\*\s*[═]{4,}\s+(.+?)\s*[═]*\s*(\*\/)?\s*$/;   /* raya + nombre */

const cortes = [];
for (let i = 0; i < lineas.length; i++) {
  const l = lineas[i];
  if (RAYA.test(l)) {
    const titulo = (lineas[i + 1] ?? '').trim();
    if (titulo && !titulo.startsWith('*/')) cortes.push({ linea: i, titulo });
  } else {
    const m = TITULADA.exec(l);
    if (m && m[1] && !/^[═\s]*$/.test(m[1])) cortes.push({ linea: i, titulo: m[1].trim() });
  }
}
if (!cortes.length) { console.error('\n  no encontré ninguna cabecera de sección\n'); process.exit(1); }

/* la primera sección se come todo lo que haya antes: es la cabecera del archivo */
/* El nombre del archivo sale del título de la sección:
   · se corta en el "·", porque lo de después suele ser la explicación
     ("DECISIONES · una necesidad y lo que colgó" → decisiones)
   · salvo que delante solo haya un número, y entonces se usa el título
     entero ("01 · RUTA" → 01-ruta, que es mejor que 01)
   · se quitan las palabras vacías y se dejan tres como mucho
     ("ÍCONO DENTRO DE UN BOTÓN" → icono-boton) */
const VACIAS = new Set(['de','del','la','las','el','los','un','una','unos','unas','y','o','en',
  'dentro','para','con','por','que','su','sus','al','lo','mas','mi','sin','sobre',
  'se','es','son','ha','han','esta','estan','cada','ya']);
const palabrasDe = (t) => t.toLowerCase()
  .normalize('NFD').replace(new RegExp('[\\u0300-\\u036f]', 'g'), '')
  .replace(/[^a-z0-9]+/g, ' ').trim().split(/\s+/).filter(Boolean);

function nombreDe(titulo) {
  const todas = palabrasDe(titulo);
  const antes = palabrasDe(titulo.split('\u00b7')[0]);
  /* si delante del · solo hay números, el nombre está en el título entero */
  const base = antes.some((w) => !/^\d+$/.test(w)) ? antes : todas;
  const utiles = base.filter((w) => !VACIAS.has(w));
  return { partes: (utiles.length ? utiles : base), todas: todas.filter((w) => !VACIAS.has(w)) };
}

const partes = [];
const usados = new Set();
for (let k = 0; k < cortes.length; k++) {
  const desde = k === 0 ? 0 : cortes[k].linea;
  const hasta = k === cortes.length - 1 ? lineas.length : cortes[k + 1].linea;

  /* la primera parte se come la cabecera del archivo y lo que venga antes
     de la primera sección de verdad, así que se llama siempre igual */
  let nombre;
  if (k === 0) nombre = 'base';
  else {
    const { partes: p, todas } = nombreDe(cortes[k].titulo);
    nombre = p.slice(0, 3).join('-') || 'seccion';
    /* si ya existe, se alarga con la siguiente palabra útil del título:
       "HERO · LIENZO ANCHO" junto a "HERO" queda hero-lienzo, no hero-2 */
    let extra = 0;
    while (usados.has(nombre)) {
      const siguiente = todas[p.length + extra];
      nombre = siguiente ? `${p.slice(0, 3).join('-')}-${siguiente}` : `${nombre}-${extra + 2}`;
      extra++;
      if (extra > 4) break;
    }
  }
  usados.add(nombre);

  partes.push({
    nombre, titulo: cortes[k].titulo,
    desde: desde + 1, hasta,
    /* el salto de línea que separaba esta sección de la siguiente va aquí:
       sin él, rejuntar los trozos pierde un carácter por frontera y deja de
       dar el archivo original exacto */
    cuerpo: lineas.slice(desde, hasta).join('\n') + (k === cortes.length - 1 ? '' : '\n'),
  });
}

const carpeta = path.join(raiz, destino);
fs.mkdirSync(carpeta, { recursive: true });
for (const p of partes) {
  const nota = `/* ${p.titulo}\n\n`
    + `   Parte de ${path.basename(entrada)}. Se carga desde ahí, que es quien\n`
    + `   manda el ORDEN: aquí eran las líneas ${p.desde}–${p.hasta}.\n`
    + `   Las reglas están sin tocar. */\n${MARCA}\n`;
  fs.writeFileSync(path.join(carpeta, `${p.nombre}.css`), nota + p.cuerpo);
}

const rel = path.relative(path.dirname(path.join(raiz, entrada)), carpeta).replace(/\\/g, '/');

/* y el archivo original pasa a ser el ÍNDICE */
const indice = `/* \u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550
   ${partes[0].titulo.split('\u00b7')[0].trim()} \u00b7 ÍNDICE

   Este archivo ya no tiene reglas: dice en qué ORDEN se cargan las
   ${partes.length} partes de ${rel}/. Antes era un solo archivo de ${lineas.length}
   líneas, que es donde deja de poder leerse y se empieza a buscar dentro.

   El orden importa: en CSS, cuando dos reglas empatan en importancia y
   especificidad, gana la última que se carga. Así que esta lista ES la
   cascada, y conserva el orden exacto que tenían las secciones.

   Si cambias el orden, corre  npm run cascada : compara contra el orden
   original y avisa si algún par de reglas cambió de ganador.
   \u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550 */

${partes.map((p) => `@import './${rel}/${p.nombre}.css';${' '.repeat(Math.max(1, 34 - p.nombre.length))}/* ${p.titulo.replace(/\s+/g, ' ').trim().slice(0, 52)} */`).join('\n')}
`;
fs.writeFileSync(path.join(raiz, entrada), indice);

console.log(`\n  ${partes.length} partes en ${destino}/`);
console.log(`  ${entrada} pasa a ser el índice (${lineas.length} líneas \u2192 ${indice.split('\n').length})\n`);
for (const p of partes) console.log(`     ${String(p.hasta - p.desde + 1).padStart(4)} líneas  ${p.nombre}.css   ${p.titulo.split('\u00b7')[0].trim().slice(0, 44)}`);
console.log('');
