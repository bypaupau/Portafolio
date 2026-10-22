/* ═══════════════════════════════════════════════════════════
   ¿EL ORDEN DE HOY DA LOS MISMOS GANADORES QUE EL ARCHIVO ÚNICO?

     npm run cascada

   En CSS, cuando dos declaraciones compiten por el mismo elemento y
   empatan en importancia y especificidad, gana la última que se
   carga. Por eso el orden de los @import de global.css no es
   decorativo: ES la cascada.

   Esta prueba compara el orden de hoy contra scripts/orden-original-css.mjs
   (el orden que tenía el archivo de 1524 líneas) y lista los pares de
   reglas que cambiaron de ganador. Si no lista ninguno, reagrupar los
   archivos no cambió lo que se ve.

   Los archivos se comparan por su NOMBRE, no por su carpeta, para que
   mover base/responsive.css a ajustes/responsive.css no cuente como
   archivo nuevo.

   Trabaja en dos pasos:

   1. Lee el CSS y denuncia todo par sospechoso. Aquí es conservador a
      propósito: ante la duda, denuncia.
   2. Si existe dist/, abre las 7 páginas construidas y comprueba si
      algún elemento REAL coincide con los dos selectores del par. Si no
      existe tal elemento en ningún sitio del portafolio, el par no es
      un choque y se descarta. Es la diferencia entre "podrían chocar en
      algún HTML imaginable" y "chocan en este sitio".

   Para el paso 2 las pseudoclases se quitan (:hover, :focus-within): un
   elemento puede llegar a estar en :hover si coincide sin el :hover.

   Lo que NO hace es callarse un choque real, así que "sin choques" se
   puede creer; un choque hay que ir a mirarlo.

   Entiende las ABREVIATURAS. `margin:0 0 16px` y `margin-top:12px` compiten,
   aunque no se llamen igual: la primera incluye a la segunda. No tenerlo en
   cuenta costó un fallo real en la etapa 8 — Contacto quedó 12 px más alto
   porque esas dos reglas cambiaron de orden y esta herramienta dijo que no
   había ningún choque. Ahora cada propiedad se expande a las propiedades
   finales que de verdad escribe, y el choque se busca ahí.

   Lo que sí sabe descartar, y por qué cada descarte es seguro:
   · una declaración con !important le gana a una sin él, pase lo que pase
     con el orden
   · si las dos declaran EL MISMO valor, da igual quién gane
   · si las dos reglas terminan en etiquetas distintas (a.active vs h3)
     no pueden ser el mismo elemento
   · si viven en @media que no pueden cumplirse a la vez — (hover:none)
     contra (hover:hover), o max-width:760 contra min-width:1100 — nunca
     compiten. Solo descarta los casos garantizados por la especificación;
     ante cualquier otra combinación de @media, asume que sí compiten.
   ═══════════════════════════════════════════════════════════ */
import fs from 'node:fs';
import path from 'node:path';
import { HOJAS } from './hojas-partidas.mjs';

/* ── se analiza UNA hoja: su índice contra el orden que tenía ──── */
async function analizar(hoja) {
  const dirGlobal = path.join(process.cwd(), path.dirname(hoja.indice).replace(/^.*?src/, 'src'));
  const barril = fs.readFileSync(path.join(process.cwd(), hoja.indice), 'utf8');
  const ordenHoy = [...barril.matchAll(/@import '\.\/([^']+)'/g)].map((m) => m[1]);
  const ORDEN_ORIGINAL = hoja.orden;

  const nombre = (f) => path.basename(f);
  const puestoOriginal = new Map(ORDEN_ORIGINAL.map((f, i) => [nombre(f), i]));
  const puestoHoy = new Map(ordenHoy.map((f, i) => [nombre(f), i]));
  const nuevos = ordenHoy.filter((f) => !puestoOriginal.has(nombre(f)));
  const perdidos = ORDEN_ORIGINAL.filter((f) => !puestoHoy.has(nombre(f)));

/* ── leer las reglas, anotando archivo, línea, selectores y
      propiedades (marcando cuáles llevan !important) ──────────── */
function sinComentarios(texto) {
  let fuera = '';
  for (let i = 0; i < texto.length; ) {
    if (texto.startsWith('/*', i)) {
      const f = texto.indexOf('*/', i + 2);
      const hasta = f < 0 ? texto.length : f + 2;
      for (let j = i; j < hasta; j++) fuera += texto[j] === '\n' ? '\n' : ' ';
      i = hasta;
    } else fuera += texto[i++];
  }
  return fuera;
}

const reglas = [];
for (const archivo of ordenHoy) {
  const ruta = path.join(dirGlobal, archivo);
  if (!fs.existsSync(ruta)) { console.error(`✗ falta ${archivo}`); process.exit(1); }
  const limpio = sinComentarios(fs.readFileSync(ruta, 'utf8'));

  /* cada regla se anota en la línea de SU PROPIO selector, también
     dentro de un @media. (La primera versión de esta herramienta les
     ponía la línea del @media y eso inventaba choques.) */
  const recorrer = (desde, hasta, medias = []) => {
    let i = desde;
    while (i < hasta) {
      while (i < hasta && /[\s;]/.test(limpio[i])) i++;
      const llave = limpio.indexOf('{', i);
      if (llave < 0 || llave >= hasta) break;
      const cabecera = limpio.slice(i, llave).trim();
      let prof = 1, j = llave + 1;
      while (j < hasta && prof > 0) { if (limpio[j] === '{') prof++; else if (limpio[j] === '}') prof--; j++; }
      if (/^@(media|supports|layer|container)/.test(cabecera)) recorrer(llave + 1, j - 1, [...medias, cabecera]);
      else if (cabecera && !cabecera.startsWith('@')) {
        /* las declaraciones NO se pueden partir con split(';'): un
           url("data:image/svg+xml;utf8,…") lleva ';' dentro y partía el
           cursor en dos, perdiendo su !important. Hay que respetar
           comillas y paréntesis. */
        const propiedades = new Map();   /* propiedad → {importante, valor} */
        const cuerpo = limpio.slice(llave + 1, j - 1);
        let trozo = '', comilla = null, par = 0;
        const guardar = (d) => {
          const dp = d.indexOf(':');
          if (dp <= 0 || d.slice(0, dp).includes('{')) return;
          const valor = d.slice(dp + 1).trim();
          propiedades.set(d.slice(0, dp).trim().toLowerCase(), {
            importante: /!\s*important\s*$/i.test(valor),
            valor: valor.replace(/!\s*important\s*$/i, '').trim().replace(/\s+/g, ' '),
          });
        };
        for (const ch of cuerpo) {
          if (comilla) { trozo += ch; if (ch === comilla) comilla = null; continue; }
          if (ch === '"' || ch === "'") { comilla = ch; trozo += ch; continue; }
          if (ch === '(') par++; else if (ch === ')') par--;
          if (ch === ';' && par === 0) { guardar(trozo); trozo = ''; continue; }
          trozo += ch;
        }
        guardar(trozo);
        if (propiedades.size) reglas.push({
          archivo, linea: limpio.slice(0, i).split('\n').length, medias,
          selectores: cabecera.split(',').map((s) => s.trim()).filter(Boolean), propiedades,
        });
      }
      i = j;
    }
  };
  recorrer(0, limpio.length, []);
}

/* ── abreviaturas ────────────────────────────────────────────────
   Cada abreviatura se expande a las propiedades finales que escribe, para
   que `margin` y `margin-top` se vean como lo que son: competidoras.
   Cuando una propiedad no está en esta tabla, se compara con su propio
   nombre, que es lo correcto para las que no son abreviaturas. */
const LADOS = ['top', 'right', 'bottom', 'left'];
const porLado = (p) => LADOS.map((l) => `${p}-${l}`);
const ABREVIATURAS = {
  margin: porLado('margin'),
  padding: porLado('padding'),
  inset: LADOS,
  gap: ['row-gap', 'column-gap'],
  overflow: ['overflow-x', 'overflow-y'],
  'border-radius': ['border-top-left-radius', 'border-top-right-radius', 'border-bottom-right-radius', 'border-bottom-left-radius'],
  'border-width': porLado('border').map((p) => `${p}-width`),
  'border-style': porLado('border').map((p) => `${p}-style`),
  'border-color': porLado('border').map((p) => `${p}-color`),
  border: porLado('border').flatMap((p) => [`${p}-width`, `${p}-style`, `${p}-color`]),
  'border-block': ['border-top-width', 'border-top-style', 'border-top-color', 'border-bottom-width', 'border-bottom-style', 'border-bottom-color'],
  'border-inline': ['border-left-width', 'border-left-style', 'border-left-color', 'border-right-width', 'border-right-style', 'border-right-color'],
  background: ['background-color', 'background-image', 'background-position', 'background-size', 'background-repeat', 'background-origin', 'background-clip', 'background-attachment'],
  font: ['font-style', 'font-variant', 'font-weight', 'font-stretch', 'font-size', 'line-height', 'font-family'],
  flex: ['flex-grow', 'flex-shrink', 'flex-basis'],
  'flex-flow': ['flex-direction', 'flex-wrap'],
  'place-items': ['align-items', 'justify-items'],
  'place-content': ['align-content', 'justify-content'],
  'place-self': ['align-self', 'justify-self'],
  'grid-area': ['grid-row-start', 'grid-column-start', 'grid-row-end', 'grid-column-end'],
  'grid-row': ['grid-row-start', 'grid-row-end'],
  'grid-column': ['grid-column-start', 'grid-column-end'],
  'grid-template': ['grid-template-rows', 'grid-template-columns', 'grid-template-areas'],
  transition: ['transition-property', 'transition-duration', 'transition-timing-function', 'transition-delay'],
  animation: ['animation-name', 'animation-duration', 'animation-timing-function', 'animation-delay', 'animation-iteration-count', 'animation-direction', 'animation-fill-mode', 'animation-play-state'],
  'list-style': ['list-style-type', 'list-style-position', 'list-style-image'],
  'text-decoration': ['text-decoration-line', 'text-decoration-style', 'text-decoration-color', 'text-decoration-thickness'],
  outline: ['outline-width', 'outline-style', 'outline-color'],
  'inset-block': ['top', 'bottom'],
  'inset-inline': ['left', 'right'],
};
/* además, las lógicas que apuntan a una física concreta */
for (const [logica, fisica] of Object.entries({
  'margin-block-start': 'margin-top', 'margin-block-end': 'margin-bottom',
  'margin-inline-start': 'margin-left', 'margin-inline-end': 'margin-right',
  'padding-block-start': 'padding-top', 'padding-block-end': 'padding-bottom',
  'padding-inline-start': 'padding-left', 'padding-inline-end': 'padding-right',
})) ABREVIATURAS[logica] = [fisica];
ABREVIATURAS['margin-block'] = ['margin-top', 'margin-bottom'];
ABREVIATURAS['margin-inline'] = ['margin-left', 'margin-right'];
ABREVIATURAS['padding-block'] = ['padding-top', 'padding-bottom'];
ABREVIATURAS['padding-inline'] = ['padding-left', 'padding-right'];

const finales = (propiedad) => ABREVIATURAS[propiedad] ?? [propiedad];

/* ── especificidad y "¿pueden ser el mismo elemento?" ──────────── */
function especificidad(sel) {
  const s = sel.replace(/::[a-z-]+(\([^)]*\))?/g, ' PSEUDOELEM ')
    .replace(/:(?:not|is|where)\([^)]*\)/g, ' PSEUDOCLASE ')
    .replace(/:[a-z-]+(\([^)]*\))?/g, ' PSEUDOCLASE ');
  return (s.match(/#[\w-]+/g) || []).length * 10000
    + (s.match(/\.[\w-]+|\[[^\]]+\]|PSEUDOCLASE/g) || []).length * 100
    + (s.match(/(?:^|[\s>+~])[a-z][\w-]*|PSEUDOELEM/g) || []).length;
}
function ultimoTrozo(sel) {
  const u = sel.split(/[\s>+~]+/).filter(Boolean).pop() ?? '';
  return {
    clases: new Set((u.match(/\.[\w-]+/g) || []).map((c) => c.slice(1))),
    id: (u.match(/#[\w-]+/) || [])[0],
    tag: (u.match(/^[a-z][\w-]*/) || [])[0],
    universal: u.startsWith('*') || u.startsWith(':root') || u.startsWith(':'),
  };
}
/* ¿pueden cumplirse los dos @media a la vez? Solo se atreve a decir NO
   en los casos que están garantizados por la especificación:
     (hover:none) vs (hover:hover) · (pointer:coarse) vs (pointer:fine)
     max-width:A vs min-width:B cuando B > A
   En cualquier otro caso contesta "sí, pueden", que es lo prudente. */
function mediasIncompatibles(ma, mb) {
  const rasgo = (ms, nombre) => {
    for (const m of ms) { const r = new RegExp(`\\(\\s*${nombre}\\s*:\\s*([a-z-]+)\\s*\\)`).exec(m); if (r) return r[1]; }
    return null;
  };
  for (const nombre of ['hover', 'any-hover', 'pointer', 'any-pointer']) {
    const a = rasgo(ma, nombre), b = rasgo(mb, nombre);
    if (a && b && a !== b) return `(${nombre}:${a}) y (${nombre}:${b}) no pueden darse a la vez`;
  }
  const num = (ms, nombre) => {
    const v = [];
    for (const m of ms) { const r = new RegExp(`\\(\\s*${nombre}\\s*:\\s*([\\d.]+)px\\s*\\)`).exec(m); if (r) v.push(parseFloat(r[1])); }
    return v;
  };
  for (const [x, y] of [[ma, mb], [mb, ma]]) {
    for (const maxi of num(x, 'max-width')) for (const mini of num(y, 'min-width')) {
      if (mini > maxi) return `max-width:${maxi}px y min-width:${mini}px no se solapan`;
    }
  }
  return null;
}

function puedenSerElMismo(a, b) {
  if (a.universal || b.universal) return true;
  if (a.tag && b.tag && a.tag !== b.tag) return false;   /* a.active vs h3: imposible */
  if (a.id && b.id) return a.id === b.id;
  if (a.clases.size && b.clases.size) {
    for (const c of a.clases) if (b.clases.has(c)) return true;
    return false;
  }
  return true;
}

const choques = [];
for (let i = 0; i < reglas.length; i++) {
  for (let j = i + 1; j < reglas.length; j++) {
    const a = reglas[i], b = reglas[j];
    if (a.archivo === b.archivo) continue;         /* dentro de un archivo nada se movió */
    const na = nombre(a.archivo), nb = nombre(b.archivo);
    if (!puestoOriginal.has(na) || !puestoOriginal.has(nb)) continue;   /* archivo nuevo: no había ganador antes */
    if ((puestoOriginal.get(na) < puestoOriginal.get(nb)) === (puestoHoy.get(na) < puestoHoy.get(nb))) continue;

    const choqueMedia = mediasIncompatibles(a.medias, b.medias);
    if (choqueMedia) continue;

    for (const [prop, da] of a.propiedades) {
      /* se busca la colisión entre las propiedades FINALES, no entre los
         nombres: así `margin` choca con `margin-top`, que es la verdad */
      const mias = finales(prop);
      let prop2 = null;
      for (const [otra] of b.propiedades) {
        if (finales(otra).some((f) => mias.includes(f))) { prop2 = otra; break; }
      }
      if (prop2 === null) continue;
      const db = b.propiedades.get(prop2);
      if (da.importante !== db.importante) continue;   /* !important decide, no el orden */
      if (prop === prop2 && da.valor === db.valor) continue;   /* misma propiedad y mismo valor: da igual quién gane */
      for (const sa of a.selectores) for (const sb of b.selectores) {
        if (especificidad(sa) !== especificidad(sb)) continue;
        if (!puedenSerElMismo(ultimoTrozo(sa), ultimoTrozo(sb))) continue;
        choques.push({ a, b, sa, sb, prop: prop === prop2 ? prop : `${prop} ↔ ${prop2}`, imp: da.importante });
      }
    }
  }
}

/* ── paso 2: ¿existe de verdad un elemento que coincida con los dos? ── */
const sinPseudo = (sel) => sel
  .replace(/::[a-z-]+(\([^)]*\))?/g, '')
  .replace(/:(?:hover|active|focus|focus-within|focus-visible|visited|target|checked|disabled|placeholder-shown)\b/g, '')
  .trim();

let descartados = 0;
const dist = path.join(process.cwd(), 'dist');
const paginas = fs.existsSync(dist)
  ? fs.readdirSync(dist, { recursive: true }).map(String).filter((f) => f.endsWith('index.html'))
  : [];

if (choques.length && paginas.length) {
  const { JSDOM } = await import('jsdom');
  /* un elemento puede llegar a estar en :hover si coincide sin el :hover,
     así que para esta comprobación las pseudoclases se quitan */
  const sinPseudo = (sel) => sel
    .replace(/::[a-z-]+(\([^)]*\))?/g, '')
    .replace(/:(?:hover|active|focus|focus-within|focus-visible|visited|target|checked|disabled|placeholder-shown|first-child|last-child|nth-child\([^)]*\))\b/g, '')
    .trim();

  const parejas = [...new Set(choques.map((c) => JSON.stringify([sinPseudo(c.sa), sinPseudo(c.sb)])))];
  const reales = new Set();
  const donde = new Map();
  for (const rel of paginas) {
    const { window } = new JSDOM(fs.readFileSync(path.join(dist, rel), 'utf8'));
    for (const k of parejas) {
      if (reales.has(k)) continue;
      const [a, b] = JSON.parse(k);
      try {
        const e = [...window.document.querySelectorAll(a)].find((el) => el.matches(b));
        if (e) { reales.add(k); donde.set(k, `${rel.replace('/index.html', '') || '/'} → <${e.tagName.toLowerCase()} class="${e.className}">`); }
      } catch { reales.add(k); donde.set(k, 'selector que no supe evaluar: lo dejo como choque'); }
    }
    window.close();
  }
  const antes = choques.length;
  for (let i = choques.length - 1; i >= 0; i--) {
    if (!reales.has(JSON.stringify([sinPseudo(choques[i].sa), sinPseudo(choques[i].sb)]))) choques.splice(i, 1);
  }
  for (const c of choques) c.donde = donde.get(JSON.stringify([sinPseudo(c.sa), sinPseudo(c.sb)]));
  descartados = antes - choques.length;
  console.log(`\n══ comprobado contra el HTML construido ══`);
  console.log(`  ${paginas.length} páginas · ${descartados} de ${antes} pares descartados`);
  console.log(`  (ningún elemento del portafolio coincide con los dos selectores a la vez)`);
} else if (choques.length) {
  console.log('\n  ⚠ sin dist/ · los pares de abajo están SIN filtrar. Corre npm run build primero.');
}

console.log(`\n══ ${hoja.nombre} ══\n  original: ${ORDEN_ORIGINAL.length} partes · hoy: ${ordenHoy.length}`);
if (nuevos.length) console.log(`  nuevos (sin ganador previo, no se revisan): ${nuevos.join(', ')}`);
if (perdidos.length) console.log(`  ya no están: ${perdidos.join(', ')}`);
console.log(`  reglas leídas: ${reglas.length}`);

const juntos = new Map();
for (const c of choques) {
  const k = `${c.a.archivo}:${c.a.linea}|${c.sa}|${c.b.archivo}:${c.b.linea}|${c.sb}`;
  if (!juntos.has(k)) juntos.set(k, { ...c, props: [] });
  juntos.get(k).props.push(c.prop + (c.imp ? ' !important' : ''));
}
console.log(`  pares que cambiaron de ganador: ${juntos.size}`);
for (const c of juntos.values()) {
  console.log(`\n    antes ganaba → ${puestoOriginal.get(nombre(c.a.archivo)) > puestoOriginal.get(nombre(c.b.archivo)) ? c.a.archivo : c.b.archivo}`);
  console.log(`    ${c.a.archivo}:${c.a.linea}  "${c.sa}"`);
  console.log(`    ${c.b.archivo}:${c.b.linea}  "${c.sb}"`);
  console.log(`       se pisan en: ${c.props.slice(0, 8).join(', ')}`);
  if (c.donde) console.log(`       el elemento real: ${c.donde}`);
}
  if (!juntos.size) console.log(`  ✓ el orden de hoy da los mismos ganadores que el archivo original`);
  return juntos.size;
}

/* ── y se analizan las tres ─────────────────────────────────────── */
let total = 0;
for (const hoja of HOJAS) total += await analizar(hoja);

if (total) {
  console.log(`\n⛔ ${total} par(es) cambiaron de ganador. Revisa cada uno antes de seguir.\n`);
} else {
  console.log(`\n✓ Las ${HOJAS.length} hojas dan los mismos ganadores que sus archivos originales.\n`);
}
process.exit(total ? 1 : 0);
