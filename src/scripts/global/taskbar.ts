/* ═══════════════════════════════════════════════════════════
   COMPORTAMIENTO DE LA TASKBAR
     · el reloj (hora local real, se actualiza al cambiar el minuto)
     · la ventanita de idioma: abrir, cerrar, teclado
     · "volver arriba" al pulsar el nombre de la ventana

   El MARCADO está en src/components/globales/. Antes esto y el motor
   de traducción eran el mismo archivo (js/i18n.js); ahora el idioma
   vive en language-runtime.ts y aquí queda solo la barra.
   ═══════════════════════════════════════════════════════════ */
import { supportedLanguages, isSupportedLanguage, type Language } from '../../i18n/languages';
import { cambiarIdioma, idiomaDelSitio, textoDe } from './language-runtime';

/* La barra de abajo, o —en las páginas que no la llevan, como las de
   caso— el sitio que hospeda el selector de idioma, marcado con
   data-anfitrion-idioma. Ahí no hay reloj ni nombre de ventana: esas
   dos partes son opcionales. */
const barra = document.querySelector<HTMLElement>('.taskbar, [data-anfitrion-idioma]');
if (barra) {
  const botonIdioma = barra.querySelector<HTMLButtonElement>('#tb-lang')!;
  const ventanita = barra.querySelector<HTMLElement>('#tb-lang-menu')!;
  const opciones = Array.from(barra.querySelectorAll<HTMLButtonElement>('.tb-opt'));
  const codigo = barra.querySelector<HTMLElement>('.tb-code')!;
  const reloj = barra.querySelector<HTMLTimeElement>('.tb-clock');
  const anuncio = barra.querySelector<HTMLElement>('#tb-live')!;
  const botonArriba = barra.querySelector<HTMLButtonElement>('.tb-app');
  const botonCerrar = barra.querySelector<HTMLButtonElement>('.tb-x')!;

  const prefiereMenosMovimiento = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  /* ── volver arriba ───────────────────────────────────────── */
  botonArriba?.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: prefiereMenosMovimiento ? 'auto' : 'smooth' });
  });

  /* ── el reloj ────────────────────────────────────────────── */
  let temporizador: number | undefined;

  function actualizarReloj(): void {
    if (!reloj) return;
    const ahora = new Date();
    const idioma = idiomaDelSitio();
    const configuracionRegional = idioma === 'en' ? 'en-US' : 'es-EC';

    try {
      /* español: 24 h (11:23) · inglés: 12 h (11:23 AM) */
      reloj.textContent = ahora.toLocaleTimeString(
        configuracionRegional,
        idioma === 'en'
          ? { hour: 'numeric', minute: '2-digit' }
          : { hour: '2-digit', minute: '2-digit', hourCycle: 'h23' },
      );
      reloj.setAttribute('datetime', ahora.toISOString());
      const etiqueta = textoDe('taskbar.clock');
      const fecha = ahora.toLocaleDateString(configuracionRegional, {
        weekday: 'long',
        day: 'numeric',
        month: 'long',
      });
      if (etiqueta !== null) reloj.setAttribute('title', `${etiqueta} · ${fecha}`);
    } catch {
      /* Intl incompleto: la hora simple siempre se puede mostrar */
      const hh = String(ahora.getHours()).padStart(2, '0');
      const mm = String(ahora.getMinutes()).padStart(2, '0');
      reloj.textContent = `${hh}:${mm}`;
    }

    window.clearTimeout(temporizador);
    temporizador = window.setTimeout(actualizarReloj, (60 - ahora.getSeconds()) * 1000 + 50);
  }

  /* ── estado visible del selector ─────────────────────────── */
  function sincronizarSelector(): void {
    const idioma = idiomaDelSitio();
    codigo.textContent = idioma.toUpperCase();

    const nombreBoton = textoDe('language.buttonLabel');
    const idiomaActualTexto = textoDe('language.currentLabel');
    if (nombreBoton !== null && idiomaActualTexto !== null) {
      botonIdioma.setAttribute('aria-label', `${nombreBoton} (${idiomaActualTexto})`);
      botonIdioma.setAttribute('title', nombreBoton);
    }

    opciones.forEach((opcion) => {
      const activa = opcion.dataset.lang === idioma;
      opcion.setAttribute('aria-checked', activa ? 'true' : 'false');
      opcion.classList.toggle('is-on', activa);
    });
  }

  /* ── abrir y cerrar la ventanita ─────────────────────────── */
  const estaAbierta = (): boolean => !ventanita.hidden;

  /* que no se salga de la pantalla en celulares angostos */
  function reubicar(): void {
    ventanita.style.translate = '';
    const caja = ventanita.getBoundingClientRect();
    const margen = 8;
    let desplazamiento = 0;
    if (caja.left < margen) desplazamiento = margen - caja.left;
    else if (caja.right > window.innerWidth - margen) {
      desplazamiento = window.innerWidth - margen - caja.right;
    }
    if (desplazamiento) ventanita.style.translate = `${desplazamiento}px 0`;
  }

  function abrir(indiceAEnfocar?: number): void {
    ventanita.hidden = false;
    botonIdioma.setAttribute('aria-expanded', 'true');
    reubicar();
    const indice =
      typeof indiceAEnfocar === 'number'
        ? indiceAEnfocar
        : supportedLanguages.indexOf(idiomaDelSitio());
    opciones[(indice + opciones.length) % opciones.length]?.focus();
  }

  function cerrar(devolverFoco: boolean): void {
    if (!estaAbierta()) return;
    ventanita.hidden = true;
    botonIdioma.setAttribute('aria-expanded', 'false');
    if (devolverFoco) botonIdioma.focus();
  }

  botonIdioma.addEventListener('click', (evento) => {
    evento.stopPropagation();
    if (estaAbierta()) cerrar(false);
    else abrir();
  });

  botonIdioma.addEventListener('keydown', (evento) => {
    if (evento.key === 'ArrowDown' || evento.key === 'ArrowUp') {
      evento.preventDefault();
      abrir(evento.key === 'ArrowUp' ? opciones.length - 1 : 0);
    }
  });

  opciones.forEach((opcion, indice) => {
    opcion.addEventListener('click', () => {
      const elegido = opcion.dataset.lang;
      if (isSupportedLanguage(elegido)) {
        cambiarIdioma(elegido as Language);
        cerrar(true);
      }
    });

    opcion.addEventListener('keydown', (evento) => {
      let destino: number | null = null;
      switch (evento.key) {
        case 'ArrowDown': destino = indice + 1; break;
        case 'ArrowUp':   destino = indice - 1; break;
        case 'Home':      destino = 0; break;
        case 'End':       destino = opciones.length - 1; break;
        case 'Escape':    evento.preventDefault(); cerrar(true); return;
        case 'Tab':       cerrar(false); return;
      }
      if (destino !== null) {
        evento.preventDefault();
        opciones[(destino + opciones.length) % opciones.length]?.focus();
      }
    });
  });

  botonCerrar.addEventListener('click', () => cerrar(true));

  document.addEventListener('click', (evento) => {
    const destino = evento.target as Node;
    if (estaAbierta() && !ventanita.contains(destino) && destino !== botonIdioma) cerrar(false);
  });

  document.addEventListener('keydown', (evento) => {
    if (evento.key === 'Escape' && estaAbierta()) cerrar(true);
  });

  window.addEventListener('resize', () => {
    if (estaAbierta()) reubicar();
  });

  /* ── al cambiar el idioma, la barra se pone al día ───────── */
  document.addEventListener('langchange', () => {
    sincronizarSelector();
    actualizarReloj();
    const aviso = textoDe('language.changedAnnouncement');
    if (aviso !== null) anuncio.textContent = aviso;
  });

  sincronizarSelector();
  actualizarReloj();
}
