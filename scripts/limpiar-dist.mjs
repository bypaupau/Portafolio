/* Quita del sitio compilado la basura que macOS deja en las carpetas.

   Astro copia public/ a dist/ TAL CUAL, así que un .DS_Store dentro de
   public/ termina publicado en GitHub Pages. No rompe nada, pero es
   ruido de tu Mac en un sitio público, y vuelve a aparecer cada vez que
   abres la carpeta en Finder. Por eso se limpia en cada compilación en
   vez de borrarlo una sola vez. */
import fs from 'node:fs';
import path from 'node:path';
import { copiarUrlsHeredadas } from './urls-heredadas.mjs';

const BASURA = ['.DS_Store', 'Thumbs.db', 'desktop.ini', 'LEEME.txt'];
const dist = path.join(process.cwd(), 'dist');
if (!fs.existsSync(dist)) process.exit(0);

let quitados = 0;
const recorrer = (dir) => {
  for (const entrada of fs.readdirSync(dir, { withFileTypes: true })) {
    const ruta = path.join(dir, entrada.name);
    if (entrada.isDirectory()) recorrer(ruta);
    else if (BASURA.includes(entrada.name)) { fs.rmSync(ruta); quitados++; }
  }
};
recorrer(dist);
if (quitados) console.log(`   (limpiados ${quitados} archivo(s) de basura de dist/)`);

/* y las URLs que el sitio anterior ya exponía: el archivo vive una sola
   vez en public/, y aquí se deja además en su ruta vieja. */
const heredadas = copiarUrlsHeredadas(process.cwd());
if (heredadas) console.log(`   (${heredadas} URL(s) heredada(s) atendidas en dist/)`);
