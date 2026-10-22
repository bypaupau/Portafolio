#!/usr/bin/env node
/* ═══════════════════════════════════════════════════════════
   COMPROBAR LAS DEPENDENCIAS

   Astro no es solo JavaScript: trae binarios compilados para un sistema
   concreto (el compilador, el empaquetador, el procesador de CSS y el de
   imágenes). Si `node_modules` se instaló en otro sistema, esos binarios
   no sirven y el error que sale es poco claro:

       Error: Cannot find native binding.

   Esto lo detecta antes y dice exactamente qué hacer.

   Uso:  npm run dependencias
   ═══════════════════════════════════════════════════════════ */
import fs from 'node:fs';
import path from 'node:path';

const raiz = process.cwd();
const sistema = process.platform;       // 'darwin' = macOS, 'linux'
const procesador = process.arch;        // 'arm64' en los Mac con chip Apple
const nombreDelSistema = { darwin: 'macOS', linux: 'Linux', win32: 'Windows' }[sistema] ?? sistema;

if (!fs.existsSync(path.join(raiz, 'node_modules'))) {
  console.error('\n⛔ No hay node_modules. Instala las dependencias:\n');
  console.error('       npm install\n');
  process.exit(1);
}

/* Recorre node_modules buscando paquetes que declaren os/cpu: esos son
   los que dependen del sistema. */
function paquetesNativos(carpeta, profundidad = 0, encontrados = []) {
  if (profundidad > 2) return encontrados;
  let entradas;
  try { entradas = fs.readdirSync(carpeta, { withFileTypes: true }); } catch { return encontrados; }

  for (const entrada of entradas) {
    if (!entrada.isDirectory()) continue;
    const ruta = path.join(carpeta, entrada.name);
    if (entrada.name.startsWith('@')) { paquetesNativos(ruta, profundidad + 1, encontrados); continue; }
    if (entrada.name === '.bin' || entrada.name === '.cache') continue;
    try {
      const meta = JSON.parse(fs.readFileSync(path.join(ruta, 'package.json'), 'utf8'));
      if (meta.os || meta.cpu) {
        encontrados.push({
          nombre: meta.name,
          sistemas: meta.os ?? [],
          procesadores: meta.cpu ?? [],
        });
      }
    } catch { /* paquete sin package.json legible */ }
  }
  return encontrados;
}

const nativos = paquetesNativos(path.join(raiz, 'node_modules')).sort((a, b) => a.nombre.localeCompare(b.nombre));

const sirve = (p) =>
  (p.sistemas.length === 0 || p.sistemas.includes(sistema)) &&
  (p.procesadores.length === 0 || p.procesadores.includes(procesador));

const buenos = nativos.filter(sirve);
const ajenos = nativos.filter((p) => !sirve(p));

console.log(`\nTu sistema: ${nombreDelSistema} ${procesador}`);
console.log(`Paquetes que dependen del sistema: ${nativos.length}\n`);

for (const p of nativos) {
  const marca = sirve(p) ? '  ✓' : '  ✗';
  const para = [p.sistemas.join('/') || 'cualquiera', p.procesadores.join('/') || 'cualquiera'].join(' · ');
  console.log(`${marca} ${p.nombre.padEnd(44)} para ${para}`);
}

if (ajenos.length) {
  console.error(`\n⛔ ${ajenos.length} paquete(s) son de OTRO sistema. Astro no va a compilar.`);
  console.error('\n   Esto pasa cuando node_modules se instaló en una máquina distinta.');
  console.error('   Se arregla reinstalando desde la tuya:\n');
  console.error('       rm -rf node_modules package-lock.json');
  console.error('       npm install\n');
  console.error('   node_modules/ está en .gitignore, así que esto no afecta al repositorio.\n');
  process.exit(1);
}

if (!buenos.length) {
  console.error('\n⚠  No se encontró ningún binario nativo. La instalación parece incompleta:\n');
  console.error('       rm -rf node_modules package-lock.json && npm install\n');
  process.exit(1);
}

console.log(`\n✓ Las ${buenos.length} dependencias nativas son de ${nombreDelSistema} ${procesador}. Todo listo.\n`);
