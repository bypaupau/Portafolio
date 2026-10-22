/* ═══════════════════════════════════════════════════════════
   LAS URLs QUE EL SITIO ANTERIOR YA EXPONÍA

   El problema: GitHub Pages es un sitio estático. Para que una URL de un
   PDF siga llegando, el archivo tiene que ESTAR en esa ruta. Y a
   diferencia de una página, un PDF no se puede redirigir: un .html
   puesto en una ruta .pdf se descargaría roto.

   Antes esto se resolvía guardando el PDF dos veces en public/, y se
   notaba: dos carpetas que parecían lo mismo.

   La solución: **el archivo existe UNA vez en public/, y la compilación
   deja además una copia en la ruta vieja dentro de dist/.** Así:

     · el repositorio tiene un solo archivo (nada que confundir)
     · el sitio publicado responde las dos URLs
     · dist/ está en .gitignore, así que la copia no se versiona
     · nadie tiene que acordarse de nada

   Para retirar una URL heredada de verdad, se borra su línea de aquí.
   Entonces `npm run urls` la reportará como rota, que es lo correcto:
   ya no llega.
   ═══════════════════════════════════════════════════════════ */
import fs from 'node:fs';
import path from 'node:path';

export const URLS_HEREDADAS = [
  {
    archivo: 'documents/cv/esp.pdf',
    rutaVieja: 'cv/esp.pdf',
    motivo: 'era la URL del CV en español. Pudo pegarse en el campo "enlace a tu CV" de una postulación o en LinkedIn.',
  },
  {
    archivo: 'documents/cv/eng.pdf',
    rutaVieja: 'cv/eng.pdf',
    motivo: 'la versión en inglés del CV, por lo mismo.',
  },
  {
    archivo: 'documents/trabajos-disenio/GuiaDelAdultoChiquito.pdf',
    rutaVieja: 'trabajos-disenio/GuiaDelAdultoChiquito.pdf',
    motivo: 'estaba enlazado desde Creativo con "ver guía completa", así que alguien pudo guardar la URL.',
  },
];

/** Deja en dist/ una copia de cada archivo en su ruta anterior. */
export function copiarUrlsHeredadas(raiz) {
  const dist = path.join(raiz, 'dist');
  if (!fs.existsSync(dist)) return 0;

  let copiadas = 0;
  for (const { archivo, rutaVieja } of URLS_HEREDADAS) {
    const origen = path.join(dist, archivo);
    if (!fs.existsSync(origen)) {
      console.log(`   ⚠ no encuentro dist/${archivo}: la URL heredada /${rutaVieja} quedará rota`);
      continue;
    }
    const destino = path.join(dist, rutaVieja);
    fs.mkdirSync(path.dirname(destino), { recursive: true });
    fs.copyFileSync(origen, destino);
    copiadas++;
  }
  return copiadas;
}
