/* ═══════════════════════════════════════════════════════════
   pau.exe · LA CARITA

   Dos cosas distintas que conviene no confundir:

   1. LAS EXPRESIONES. carita('happy', 1200) pone data-face en la compu
      y lo quita sola a los 1200 ms. El CSS de .mon[data-face] decide
      qué ojos y qué boca se ven. Sin segundo argumento, se queda hasta
      que alguien la cambie.

   2. EL PARPADEO. Cada 4 segundos, siempre, sin pararse nunca. Antes
      parpadeaba a destiempo y se dormía a los 25 s sin que nadie la
      tocara; Pau prefirió (2026-10-28) que no se duerma y que el
      ritmo sea fijo, el mismo que la mascota de los casos.
      Si en ese momento tiene otra cara puesta (sonríe, se sorprende),
      ese parpadeo se salta: no le cierra los ojos a una expresión.
      Con «menos movimiento» no parpadea.
   ═══════════════════════════════════════════════════════════ */
import { compu, menosMovimiento } from './elementos';

/** Cada cuánto parpadea, y cuánto dura el parpadeo. */
const CADA = 4000;
const DURA = 130;

let expresion: number | undefined;

export function carita(cara: string, cuanto?: number): void {
  if (!compu) return;
  window.clearTimeout(expresion);
  compu.setAttribute('data-face', cara);
  if (cuanto) {
    expresion = window.setTimeout(() => compu.setAttribute('data-face', ''), cuanto);
  }
}

/** Arranca el parpadeo: cada 4 s, para siempre. */
export function empezarElCiclo(): void {
  if (menosMovimiento || !compu) return;
  window.setInterval(() => {
    if (!compu.getAttribute('data-face')) carita('blink', DURA);
  }, CADA);
}
