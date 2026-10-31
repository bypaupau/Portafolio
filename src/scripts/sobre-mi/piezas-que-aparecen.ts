/* ═══════════════════════════════════════════════════════════
   SOBRE MÍ · qué aparece al bajar, y en qué orden

   El motor de aparición es compartido (src/scripts/global/scroll-reveal.ts,
   window.PXReveal). Aquí solo se dice QUÉ piezas de esta página entran
   y en qué orden de lectura: primero el número de sección, luego el
   título, luego el subtítulo, y al final el contenido.

   Si no hay JavaScript, nada de esto corre y la página se lee completa:
   el HTML ya sale visible por defecto.
   ═══════════════════════════════════════════════════════════ */
import { registrarAparicion } from '../global/scroll-reveal';

/* en orden de lectura dentro de cada sección .ab-reveal.
   La lista está repetida en partes/aparicion-hacer-scroll.css, que las
   esconde antes de que este script corra: si cambia una, cambia la otra. */
const PIEZAS = [
  ':scope > .now-msg', /* el bocadillo de "¿qué estoy haciendo ahora?" */
  ':scope > .ab-head > *', /* 01 / ··· · título · subtítulo */
  ':scope > .win', /* la ventana de la ruta y la de las pistas */
  '.tool', /* las tres tarjetas de herramientas */
  ':scope > .ab-more', /* el <details> de herramientas adicionales */
  ':scope > .ab-title',
  ':scope > .ab-sub',
  ':scope > .hero-btns', /* el cierre "¿seguimos?" */
].join(',');

/* El script viejo (js/sobremi.js) listaba además '.ev' y '.ab-all', de una
   sección "03 · evidencia" que ya no está en la página. No se copiaron
   porque no seleccionan nada; sus textos siguen en js/translations.js. */

const secciones = document.querySelectorAll<HTMLElement>('.ab-reveal');
if (secciones.length) {
  const piezas: HTMLElement[] = [];
  secciones.forEach((seccion) => {
    seccion.querySelectorAll<HTMLElement>(PIEZAS).forEach((pieza) => {
      pieza.classList.add('ab-rv');
      piezas.push(pieza);
    });
  });
  registrarAparicion(piezas);
}
