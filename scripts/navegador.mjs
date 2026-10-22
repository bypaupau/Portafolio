/* ═══════════════════════════════════════════════════════════
   ABRIR EL NAVEGADOR DE PRUEBAS

   Playwright necesita que Chromium esté descargado, y eso es un paso
   aparte de `npm install`. Si falta, su error por defecto es largo y en
   inglés; aquí se cambia por una línea que dice exactamente qué correr.
   ═══════════════════════════════════════════════════════════ */
import fs from 'node:fs';
import { chromium } from 'playwright';

export async function abrirNavegador() {
  let ruta = '';
  try { ruta = chromium.executablePath(); } catch {}

  if (!ruta || !fs.existsSync(ruta)) {
    console.error('\n⛔ Falta el navegador de pruebas (Chromium).\n');
    console.error('   Corre esto una sola vez y vuelve a intentar:\n');
    console.error('       npx playwright install chromium\n');
    console.error('   Son unos 120 MB y se guardan fuera del proyecto,');
    console.error('   así que no engordan el repositorio.\n');
    process.exit(1);
  }

  try {
    return await chromium.launch();
  } catch (error) {
    console.error('\n⛔ Chromium está descargado pero no arranca.\n');
    console.error('   ' + String(error.message).split('\n')[0] + '\n');
    console.error('   Suele arreglarse reinstalándolo:\n');
    console.error('       npx playwright install --force chromium\n');
    process.exit(1);
  }
}
