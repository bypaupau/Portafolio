/* ═══════════════════════════════════════════════════════════
   EL CV SEGÚN EL IDIOMA

   Marcado:
     <a data-resume-link href="…/cv/esp.pdf" download>     → esp.pdf / eng.pdf
     <a data-resume-link data-resume-open href="…">        → abre, no descarga
     <img data-resume-preview data-vista-es="…" data-vista-en="…">  → la vista previa

   El href del HTML ya apunta al PDF en español, así que esto funciona
   incluso sin JavaScript: el script solo cambia la versión si el
   idioma activo es inglés.

   ANTES los atributos se llamaban data-cv / data-cv-img y guardaban
   la CARPETA ("../cv/"), que el script concatenaba con el nombre del
   archivo. Ahora la ruta completa está en el href y aquí solo se
   sustituye el trozo del idioma: una ruta de verdad, visible en el
   HTML y que se puede hacer clic desde el editor.

   Y desde la etapa 8 la vista previa ni eso: las dos rutas vienen puestas
   en el HTML desde el manifiesto de imágenes, así que este script no
   conoce ningún nombre de archivo de imagen.
   ═══════════════════════════════════════════════════════════ */
import { idiomaDelSitio } from './language-runtime';

/* nombre del archivo por idioma. Los PDF conservan su nombre de
   siempre (esp.pdf / eng.pdf) para no romper enlaces ya compartidos. */
const documentoPorIdioma = { es: 'esp.pdf', en: 'eng.pdf' } as const;
const nombreDeDescarga = {
  es: 'Paula-Martillo-CV-ES.pdf',
  en: 'Paula-Martillo-CV-EN.pdf',
} as const;

function cambiarUltimoSegmento(ruta: string, nuevoArchivo: string): string {
  return ruta.replace(/[^/]+$/, nuevoArchivo);
}

function sincronizarCV(): void {
  const idioma = idiomaDelSitio();

  document.querySelectorAll<HTMLAnchorElement>('[data-resume-link]').forEach((enlace) => {
    enlace.href = cambiarUltimoSegmento(enlace.href, documentoPorIdioma[idioma]);
    /* "Ver CV" abre el PDF en una pestaña; los demás lo descargan */
    if (!enlace.hasAttribute('data-resume-open')) {
      enlace.setAttribute('download', nombreDeDescarga[idioma]);
    }
  });

  /* las dos rutas vienen en el propio HTML, puestas desde el manifiesto de
     imágenes: aquí no hay ningún nombre de archivo escrito a mano, así que
     renombrar o cambiar el ancho de la vista previa no rompe este script */
  document.querySelectorAll<HTMLImageElement>('[data-resume-preview]').forEach((vista) => {
    const ruta = vista.dataset[idioma === 'en' ? 'vistaEn' : 'vistaEs'];
    if (ruta) vista.src = ruta;
  });
}

sincronizarCV();
document.addEventListener('langchange', sincronizarCV);
