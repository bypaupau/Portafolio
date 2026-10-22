/* ═══════════════════════════════════════════════════════════
   QUÉ HEMOS CAMBIADO DEL CSS ORIGINAL

     npm run cambios

   Tres hojas largas venían de la versión anterior y se partieron en
   archivos: css/styles.css (1524 líneas), css/sobremi.css (787) y
   css/caso.css (892). Los tres siguen en la raíz mientras el sitio viejo
   esté publicado.

   Esta herramienta rejunta los trozos de cada una en su orden original y
   los compara con aquel archivo, línea por línea. Lo que salga es
   exactamente lo que hemos cambiado a propósito desde entonces.

   ── por qué ya no dice «sí» o «no» ──

   Hasta la etapa 8 esto era una prueba: rejuntar tenía que dar el archivo
   original EXACTO, y cualquier diferencia era un error. Eso demostró que
   partir el CSS no perdió nada (1390 líneas idénticas carácter por
   carácter).

   Desde que empezamos a editar el CSS a propósito —llevar colores y
   grosores a tokens— esa prueba tenía que fallar por definición. Así que
   ahora es un REGISTRO: dice qué se desvió del original y te deja juzgar
   si cada desvío es el que querías.

   Quien vigila que no se rompa nada sin querer es `npm run comparar`:
   las 70 capturas. Esta herramienta es para entender, no para aprobar.

   (Se ignoran las líneas en blanco: al partir el archivo se recortaron
   las del final de cada trozo, y en CSS no significan nada.)
   ═══════════════════════════════════════════════════════════ */
import fs from 'node:fs';
import path from 'node:path';
import { HOJAS } from './hojas-partidas.mjs';

const raiz = process.cwd();
const MARCA = '/* ── fin de la nota · abajo empieza el CSS tal cual ── */\n';
const con = (t) => t.split('\n').filter((l) => l.trim() !== '');

function revisar(hoja) {
  const original = path.join(raiz, hoja.original);
  if (!fs.existsSync(original)) {
    console.log(`\n══ ${hoja.nombre} ══\n  (no está ${hoja.original}, de la versión anterior: nada con que comparar)`);
    return;
  }
  const carpeta = path.dirname(path.join(raiz, hoja.indice));

  /* las partes se buscan por su ruta y, si no, por el NOMBRE: en la hoja
     global varias cambiaron de carpeta sin cambiar de nombre */
  const porNombre = new Map();
  const recorrer = (d) => { for (const e of fs.readdirSync(d, { withFileTypes: true })) {
    const f = path.join(d, e.name);
    if (e.isDirectory()) recorrer(f); else if (e.name.endsWith('.css')) porNombre.set(e.name, f);
  } };
  recorrer(carpeta);

  let rejuntado = '';
  const deQuien = [];
  for (const parte of hoja.orden) {
    const directa = path.join(carpeta, parte);
    const ruta = fs.existsSync(directa) ? directa : porNombre.get(path.basename(parte));
    if (!ruta) { console.log(`\n══ ${hoja.nombre} ══\n  ✗ falta ${parte}`); return; }
    const texto = fs.readFileSync(ruta, 'utf8');
    const i = texto.indexOf(MARCA);
    const trozo = i < 0 ? texto : texto.slice(i + MARCA.length);
    rejuntado += trozo;
    for (const l of trozo.split('\n')) if (l.trim()) deQuien.push(path.basename(ruta));
  }

  const a = con(fs.readFileSync(original, 'utf8'));
  const b = con(rejuntado);

  /* diferencia por subsecuencia común más larga */
  const n = a.length, m = b.length;
  const tabla = Array.from({ length: n + 1 }, () => new Uint16Array(m + 1));
  for (let i = n - 1; i >= 0; i--) for (let j = m - 1; j >= 0; j--) {
    tabla[i][j] = a[i] === b[j] ? tabla[i + 1][j + 1] + 1 : Math.max(tabla[i + 1][j], tabla[i][j + 1]);
  }
  const cambios = [];
  let i = 0, j = 0;
  while (i < n && j < m) {
    if (a[i] === b[j]) { i++; j++; }
    else if (tabla[i + 1][j] >= tabla[i][j + 1]) cambios.push({ tipo: '−', linea: a[i], archivo: '' , n: ++i });
    else cambios.push({ tipo: '+', linea: b[j], archivo: deQuien[j], n: ++j });
  }
  while (i < n) cambios.push({ tipo: '−', linea: a[i], archivo: '', n: ++i });
  while (j < m) cambios.push({ tipo: '+', linea: b[j], archivo: deQuien[j], n: ++j });

  console.log(`\n══ ${hoja.nombre} ══  ${hoja.orden.length} partes · ${a.length} líneas originales · ${b.length} ahora`);
  if (!cambios.length) { console.log('  ✓ idéntico al archivo original, línea por línea'); return; }

  const quitadas = cambios.filter((c) => c.tipo === '−').length;
  const puestas = cambios.filter((c) => c.tipo === '+').length;
  console.log(`  ${quitadas} línea(s) quitada(s) · ${puestas} puesta(s)\n`);

  const porArchivo = new Map();
  for (const c of cambios) {
    const k = c.archivo || '(quitadas del original)';
    porArchivo.set(k, [...(porArchivo.get(k) ?? []), c]);
  }
  for (const [archivo, lista] of porArchivo) {
    console.log(`  ── ${archivo}`);
    for (const c of lista.slice(0, 10)) {
      const t = c.linea.trim();
      console.log(`     ${c.tipo} ${t.length > 90 ? t.slice(0, 87) + '…' : t}`);
    }
    if (lista.length > 10) console.log(`     … y ${lista.length - 10} línea(s) más`);
    console.log('');
  }
}

for (const hoja of HOJAS) revisar(hoja);
console.log('  Esto NO es un error: son los cambios hechos a propósito.');
console.log('  Quien vigila que nada se rompa sin querer es  npm run comparar.\n');
