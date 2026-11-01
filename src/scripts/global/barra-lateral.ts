/* ═══════════════════════════════════════════════════════════
   LOS BOTONES ES / EN DE LA BARRA LATERAL

   El marcado está en src/components/globales/BarraLateral.astro.
   Hacen lo mismo que la ventanita de idioma de la taskbar: llaman a
   cambiarIdioma, y cuando el idioma cambia (desde aquí o desde otra
   pestaña) marcan el activo y lo anuncian.
   ═══════════════════════════════════════════════════════════ */
import { isSupportedLanguage, type Language } from '../../i18n/languages';
import { cambiarIdioma, idiomaDelSitio, textoDe } from './language-runtime';

const botones = Array.from(document.querySelectorAll<HTMLButtonElement>('[data-cambiar-idioma]'));
const anuncio = document.getElementById('aviso-de-idioma');

if (botones.length) {
  /* el activo se marca con aria-pressed y con .is-on (no solo color) */
  function sincronizar(): void {
    const idioma = idiomaDelSitio();
    botones.forEach((boton) => {
      const activo = boton.dataset.cambiarIdioma === idioma;
      boton.setAttribute('aria-pressed', activo ? 'true' : 'false');
      boton.classList.toggle('is-on', activo);
    });
  }

  botones.forEach((boton) => {
    boton.addEventListener('click', () => {
      const elegido = boton.dataset.cambiarIdioma;
      if (isSupportedLanguage(elegido)) cambiarIdioma(elegido as Language);
    });
  });

  document.addEventListener('langchange', () => {
    sincronizar();
    const aviso = textoDe('language.changedAnnouncement');
    if (anuncio && aviso !== null) anuncio.textContent = aviso;
  });

  sincronizar();
}
