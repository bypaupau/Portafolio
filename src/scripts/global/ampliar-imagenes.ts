/* ═══════════════════════════════════════════════════════════
   AMPLIAR LAS IMÁGENES DE CONTENIDO

   Una captura de un proyecto se mira. A 400px de ancho no se le ven
   las cifras, y hasta ahora la única forma de verlas era abrir la
   imagen en otra pestaña.

   ── QUÉ SE AMPLÍA, Y POR QUÉ ASÍ ───────────────────────────
   Toda imagen dentro de una FIGURA de contenido:

       figure.cs-fig2     las capturas y los diagramas de un caso
       figure.cs-shot     las pantallas de un grupo
       figure.cs-hero-fig la portada del caso

   El criterio no es una clase nueva que haya que acordarse de poner,
   sino la que ya llevan: si una captura vive en una de esas figuras,
   es contenido. Por eso un caso NUEVO no tiene que hacer nada —usa
   FiguraDeCaso, CapturaDeDecision o GrupoDePantallas y ya nace
   ampliable— y por eso quedan fuera solas las imágenes que no son
   contenido: el icono de GitHub de un botón, los logos y las
   miniaturas de los casos relacionados, que no van en una figura.

   Para dejar una figura fuera: data-sin-ampliar.
   Para ampliar un archivo distinto al que se ve (una miniatura con su
   versión grande aparte): data-ampliada="<ruta>" en el <img>.

   ── MEJORA PROGRESIVA ──────────────────────────────────────
   Sin JavaScript no hay botón ni lupa: queda la imagen de siempre,
   que es exactamente lo que había antes. El botón lo crea este
   script, así que nunca existe un control que no haga nada.

   ── POR QUÉ UN <dialog> NATIVO ─────────────────────────────
   Trae resueltos el cierre con Escape, el foco atrapado dentro y el
   resto de la página inerte. Escribir eso a mano son cien líneas y
   todas las formas de equivocarse.
   ═══════════════════════════════════════════════════════════ */
import { textoDe } from './language-runtime';

const FIGURAS_DE_CONTENIDO = 'figure.cs-fig2, figure.cs-shot, figure.cs-hero-fig';
/* lo que dura la aparición y el cierre. Es el mismo número que el CSS;
   si cambia allí, cambia aquí. */
const TRANSICION = 160;

const vista = document.querySelector<HTMLDialogElement>('#amp-vista');
const molde = document.querySelector<HTMLTemplateElement>('#amp-molde-lupa');
const imagen = vista?.querySelector<HTMLImageElement>('.amp-img');
const pie = vista?.querySelector<HTMLElement>('.amp-pie');

if (vista && molde && imagen && pie && typeof vista.showModal === 'function') {
  const menosMovimiento = window.matchMedia('(prefers-reduced-motion: reduce)');
  /* a quién devolver el foco al cerrar */
  let abiertaDesde: HTMLElement | null = null;
  /* y dónde estaba la página: devolver el foco la movía */
  let desplazamiento = 0;

  function abrir(boton: HTMLElement): void {
    const original = boton.querySelector('img');
    if (!original) return;

    abiertaDesde = boton;
    /* la imagen grande: la que pida el dato, y si no, la que se ve */
    imagen!.src = original.dataset.ampliada || original.currentSrc || original.src;
    imagen!.alt = original.alt;
    /* no se agranda más allá de su tamaño real: una captura estirada
       no enseña ningún detalle nuevo, solo lo emborrona */
    const real = original.naturalWidth;
    if (real) imagen!.style.setProperty('--amp-ancho', `${real}px`);
    else imagen!.style.removeProperty('--amp-ancho');

    /* la leyenda de la figura viaja con la imagen */
    const leyenda = boton.closest('figure')?.querySelector('figcaption');
    pie!.textContent = leyenda?.textContent?.trim() ?? '';
    pie!.hidden = pie!.textContent === '';

    /* el nombre accesible de la vista es el de la propia imagen */
    if (original.alt) vista!.setAttribute('aria-label', original.alt);
    else vista!.removeAttribute('aria-label');

    /* el fondo lo bloquea el CSS del dialogo (overscroll-behavior) y no
       una clase en <html>: asi no se cae el position:sticky del riel */
    desplazamiento = window.scrollY;
    vista!.showModal();
    /* el fotograma de espera es lo que deja que la transición corra:
       sin él, la clase entra en el mismo pintado que el display */
    requestAnimationFrame(() => vista!.classList.add('is-abierta'));
  }

  function cerrar(): void {
    const terminar = (): void => {
      vista!.close();
      /* se suelta la imagen grande: no tiene por qué seguir en memoria */
      imagen!.removeAttribute('src');
      /* preventScroll: devolver el foco a un botón que el navegador
         cree fuera de vista arrastraba la página cientos de píxeles.
         Y por si algún navegador no lo respeta, se vuelve a poner
         donde estaba. */
      abiertaDesde?.focus({ preventScroll: true });
      /* 'instant' y no el scrollTo de siempre: el sitio tiene
         scroll-behavior:smooth y devolver la posición se habría visto
         como un deslizamiento raro al cerrar. */
      if (window.scrollY !== desplazamiento) {
        window.scrollTo({ top: desplazamiento, behavior: 'instant' as ScrollBehavior });
      }
      abiertaDesde = null;
    };
    vista!.classList.remove('is-abierta');
    if (menosMovimiento.matches) terminar();
    else window.setTimeout(terminar, TRANSICION);
  }

  /* la X */
  vista.querySelector('[data-amp-cerrar]')?.addEventListener('click', cerrar);

  /* fuera de la imagen. El objetivo es el propio diálogo solo cuando
     se pulsa su fondo: un clic en la imagen o en la leyenda tiene por
     objetivo a esos, y no cierra nada. */
  vista.addEventListener('click', (evento) => {
    if (evento.target === vista) cerrar();
  });

  /* Las teclas que desplazan. El fondo es inerte mientras la vista
     está abierta, pero inerte no quiere decir quieto: con el foco
     dentro del diálogo, End o las flechas seguían moviendo la página
     de detrás. El espacio se deja pasar cuando cae sobre un botón,
     porque ahí no desplaza: pulsa. */
  const TECLAS_QUE_DESPLAZAN = new Set([
    'ArrowUp', 'ArrowDown', 'ArrowLeft', 'ArrowRight',
    'PageUp', 'PageDown', 'Home', 'End', ' ', 'Spacebar',
  ]);
  vista.addEventListener('keydown', (evento) => {
    if (!TECLAS_QUE_DESPLAZAN.has(evento.key)) return;
    const esEspacio = evento.key === ' ' || evento.key === 'Spacebar';
    if (esEspacio && (evento.target as HTMLElement).closest('button')) return;
    evento.preventDefault();
  });

  /* Escape. El diálogo lo cierra de golpe por su cuenta; se le quita
     para que se vaya con la misma transición que las otras dos formas
     de cerrar. */
  vista.addEventListener('cancel', (evento) => {
    evento.preventDefault();
    cerrar();
  });

  /* ── y ahora, convertir cada figura de contenido en un botón ── */
  document.querySelectorAll<HTMLElement>(FIGURAS_DE_CONTENIDO).forEach((figura) => {
    if (figura.hasAttribute('data-sin-ampliar')) return;
    const original = figura.querySelector('img');
    if (!original || original.closest('button')) return;

    const boton = document.createElement('button');
    boton.type = 'button';
    boton.className = 'amp';
    /* La etiqueta se pone AQUÍ y además se deja anotada. Las dos cosas
       hacen falta: traducirDocumento() busca descendientes, así que
       nunca vería el atributo del propio botón, y sin la anotación la
       etiqueta se quedaría en español al cambiar de idioma. */
    const etiqueta = textoDe('cases.zoomOpen');
    if (etiqueta !== null) boton.setAttribute('aria-label', etiqueta);
    boton.dataset.i18nAttr = 'aria-label:cases.zoomOpen';

    original.replaceWith(boton);
    boton.append(original, molde.content.cloneNode(true));
    boton.addEventListener('click', () => abrir(boton));
  });
}
