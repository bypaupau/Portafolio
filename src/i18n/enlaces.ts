/* ═══════════════════════════════════════════════════════════
   ENLACES DENTRO DE UN TEXTO TRADUCIDO

   Algunos textos llevan un enlace a otra página del sitio. Si la URL se
   escribe dentro de la traducción se rompe, porque el sitio vive en un
   subdirectorio: "proyectos.html" funcionaba desde /pages/, pero desde
   /Portafolio/sobre-mi apuntaría a /Portafolio/proyectos.html.

   Así que la traducción deja un HUECO con el nombre de la página:

       '… mi <a href="{pagina:proyectos}">app de tracking de libros</a>.'

   y la URL de verdad la pone rutaPagina(), igual al compilar que en el
   navegador al cambiar de idioma.
   ═══════════════════════════════════════════════════════════ */
import { rutaPagina } from '../lib/rutas';

/** Cambia cada {pagina:x} por la URL real de esa página. */
export function conEnlaces(texto: string): string {
  return texto.replace(/\{pagina:([a-z0-9-]*)\}/g, (_, ruta: string) => rutaPagina(ruta));
}
