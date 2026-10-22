/* ═══════════════════════════════════════════════════════════
   RUTAS · el sitio vive en un subdirectorio (/Portafolio/)

   El problema que esto resuelve: una ruta absoluta escrita a mano
   ("/cv/esp.pdf") funciona en local y se ROMPE en GitHub Pages,
   porque allí el archivo está en /Portafolio/cv/esp.pdf.

   Regla única: todo recurso de public/ se escribe con rutaPublica().
       rutaPublica('documents/cv/esp.pdf')  → /Portafolio/documents/cv/esp.pdf
       rutaPublica('images/contacto/x.png') → /Portafolio/images/contacto/x.png

   Y todo enlace interno con rutaPagina().
       rutaPagina('contacto')           → /Portafolio/contacto
       rutaPagina('')                   → /Portafolio/
   ═══════════════════════════════════════════════════════════ */

/* Astro deja aquí el valor de `base`. Puede venir con o sin barra
   final según la configuración de trailingSlash, así que se normaliza
   una sola vez y nadie más tiene que acordarse. */
const raiz = (() => {
  const base = import.meta.env.BASE_URL || '/';
  return base.endsWith('/') ? base : base + '/';
})();

/** Ruta a un archivo de public/ (imágenes, PDF, favicon). */
export function rutaPublica(rutaRelativa: string): string {
  return raiz + rutaRelativa.replace(/^\/+/, '');
}

/** Ruta a una página del sitio. Cadena vacía = la portada. */
export function rutaPagina(rutaRelativa = ''): string {
  const limpia = rutaRelativa.replace(/^\/+/, '');
  return limpia === '' ? raiz : raiz + limpia;
}
