/* ═══════════════════════════════════════════════════════════
   IMÁGENES · pedir el tamaño que hace falta, no el que había

   El problema que resuelve: una captura de 3248 px metida en un recuadro
   de 208 px hace que el navegador se descargue 4,5 MB para dibujar algo
   que necesita 78 KB. Antes de la etapa 8, Proyectos bajaba 9 MB.

   Ahora `npm run imagenes` genera una versión por cada ancho que el sitio
   necesita y anota en src/content/imagenes.json el ancho y el alto REALES
   de cada archivo. Aquí se consultan.

   Cómo se usa, desde una página o un componente:

       import { imagen, imagenGrande } from '../lib/imagenes';

       const portada = imagen('images/proyectos/trackinglibros', 1120);
       portada.src     → /Portafolio/images/proyectos/trackinglibros-1120.webp
       portada.ancho   → 1120
       portada.alto    → 675

   El ancho que se pide es EL DOBLE del tamaño al que se ve la imagen en
   ese sitio, porque una pantalla retina dibuja el doble de píxeles. Los
   anchos disponibles los decide scripts/optimizar-imagenes.mjs; ahí está
   escrito, ancho por ancho, en qué parte del sitio se usa cada uno.

   Si pides un ancho que no existe, la COMPILACIÓN FALLA con un mensaje
   que dice qué anchos hay. Es a propósito: si agregas un proyecto y se te
   olvida correr `npm run imagenes`, te enteras al compilar y no en vivo
   con una imagen rota.
   ═══════════════════════════════════════════════════════════ */
import manifiesto from '../content/imagenes.json';
import { rutaPublica } from './rutas';

export interface ImagenLista {
  /** Ruta lista para el atributo src, ya con /Portafolio/ delante. */
  src: string;
  ancho: number;
  alto: number;
}

interface Version { ruta: string; ancho: number; alto: number }
interface Entrada {
  original: string;
  anchoOriginal: number;
  anchos: Record<string, Version>;
  grande: Version | null;
}

const catalogo = manifiesto as Record<string, Entrada>;

/** Las claves del manifiesto son la ruta del original SIN extensión. */
export type BaseDeImagen = keyof typeof manifiesto;

function entrada(base: string): Entrada {
  const encontrada = catalogo[base];
  if (encontrada) return encontrada;
  throw new Error(
    `No hay ninguna imagen "${base}" en src/content/imagenes.json.\n`
    + `  Las claves son la ruta del original sin extensión, por ejemplo\n`
    + `  "images/proyectos/trackinglibros".\n`
    + `  Si acabas de añadir la imagen a originales/, corre:  npm run imagenes\n`
    + `  Hay ${Object.keys(catalogo).length} imágenes en el manifiesto.`,
  );
}

const lista = (v: Version): ImagenLista => ({ src: rutaPublica(v.ruta), ancho: v.ancho, alto: v.alto });

/**
 * La versión de `base` para un ancho de pantalla dado.
 * `anchoPedido` tiene que ser uno de los anchos que genera el script.
 */
export function imagen(base: string, anchoPedido: number): ImagenLista {
  const e = entrada(base);
  const version = e.anchos[String(anchoPedido)];
  if (!version) {
    throw new Error(
      `La imagen "${base}" no tiene una versión de ${anchoPedido}px.\n`
      + `  Anchos disponibles: ${Object.keys(e.anchos).join(', ')}.\n`
      + `  Los anchos se declaran en scripts/optimizar-imagenes.mjs (QUE_OPTIMIZAR);\n`
      + `  si añades uno ahí, corre después:  npm run imagenes`,
    );
  }
  return lista(version);
}

/**
 * La versión grande, para ver en detalle (el zoom).
 * Devuelve null cuando el original no daba para más: en ese caso la
 * versión más grande que existe ya es la que carga la página.
 */
export function imagenGrande(base: string): ImagenLista | null {
  const { grande } = entrada(base);
  return grande ? lista(grande) : null;
}

/**
 * La más grande que exista: la grande si la hay, y si no la de mayor
 * ancho de las normales. Útil para una portada que ocupa todo el ancho.
 */
export function imagenMasGrande(base: string): ImagenLista {
  const e = entrada(base);
  if (e.grande) return lista(e.grande);
  const anchos = Object.keys(e.anchos).map(Number).sort((a, b) => b - a);
  return imagen(base, anchos[0]);
}
