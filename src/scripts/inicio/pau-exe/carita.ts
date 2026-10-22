/* ═══════════════════════════════════════════════════════════
   pau.exe · LA CARITA

   Dos cosas distintas que conviene no confundir:

   1. LAS EXPRESIONES. carita('happy', 1200) pone data-face en la compu
      y lo quita sola a los 1200 ms. El CSS de .mon[data-face] decide
      qué ojos y qué boca se ven. Sin segundo argumento, se queda hasta
      que alguien la cambie.

   2. EL CICLO DE DORMIR. pau.exe no solo reacciona: tiene un ritmo.
        · nadie la toca en 25 s → cierra los ojos y se queda QUIETA
        · cualquier gesto dentro de la ventana → despierta
      Dormitar va hacia la quietud, no hacia el movimiento. Con "menos
      movimiento" NO dormita: unos ojos cerrados para siempre en una
      página sin animación se leerían como un error de dibujo.

   El parpadeo es lo único que se mueve solo en todo el sitio.
   ═══════════════════════════════════════════════════════════ */
import { compu, menosMovimiento, enPantalla, alAzar } from './elementos';

/** Cuánto aguanta sin que nadie la toque. Es el único número a tocar. */
const ESPERA_ANTES_DE_DORMIR = 25000;

let expresion: number | undefined;
let siesta: number | undefined;
let dormida = false;

export function carita(cara: string, cuanto?: number): void {
  if (!compu) return;
  window.clearTimeout(expresion);
  compu.setAttribute('data-face', cara);
  if (cuanto) {
    expresion = window.setTimeout(() => compu.setAttribute('data-face', ''), cuanto);
  }
}

export const estaDormida = (): boolean => dormida;

function dormir(): void {
  if (dormida || !compu) return;
  dormida = true;
  window.clearTimeout(expresion);
  compu.classList.add('is-asleep');
  compu.setAttribute('data-face', 'blink');   /* ojos cerrados, sin reloj */
}

/**
 * La despierta y reinicia la cuenta.
 * Devuelve `true` solo si venía dormida, para que quien llame decida
 * si además la saluda. (Antes el saludo vivía aquí dentro, y eso
 * obligaba a que la carita conociera el diálogo.)
 */
export function despertar(): boolean {
  window.clearTimeout(siesta);
  const seDespierta = dormida;
  if (dormida) {
    dormida = false;
    compu?.classList.remove('is-asleep');
    carita('happy', 900);
  }
  if (!menosMovimiento) siesta = window.setTimeout(dormir, ESPERA_ANTES_DE_DORMIR);
  return seDespierta;
}

/** Arranca el ciclo: parpadeo ocasional y la primera cuenta para dormir. */
export function empezarElCiclo(): void {
  if (menosMovimiento || !compu) return;

  siesta = window.setTimeout(dormir, ESPERA_ANTES_DE_DORMIR);

  let parpadeos = 0;
  const programar = (): void => {
    window.setTimeout(() => {
      if (enPantalla() && !dormida && !compu.getAttribute('data-face')) {
        parpadeos++;
        /* cada siete parpadeos, en vez de parpadear, sonríe o guiña */
        if (parpadeos % 7 === 0) {
          carita(Math.random() < 0.5 ? 'happy' : 'wink', 1400);
        } else {
          carita('blink', 130);
          /* y a veces es un parpadeo doble */
          if (Math.random() < 0.2) window.setTimeout(() => carita('blink', 120), 260);
        }
      }
      programar();
    }, alAzar(3200, 6500));
  };
  programar();
}
