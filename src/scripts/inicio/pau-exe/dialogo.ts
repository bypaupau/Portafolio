/* ═══════════════════════════════════════════════════════════
   pau.exe · EL TEXTO QUE SE ESCRIBE SOLO

   Un detalle que es fácil romper: mientras se escribe, el RESTO del
   mensaje ya ocupa su sitio (en un <span class="off"> invisible). Sin
   eso, el texto está centrado y va saltando letra a letra.

   Con "menos movimiento" no se escribe: aparece entero de una vez.
   ═══════════════════════════════════════════════════════════ */
import { renglon, menosMovimiento } from './elementos';
import { dice } from './textos';

let escribiendo: number | undefined;
let vuelta: number | undefined;

/** Escribe un texto letra por letra. */
export function escribir(texto: string, velocidad?: number, alTerminar?: () => void): void {
  if (!renglon) return;
  window.clearTimeout(escribiendo);

  /* Array.from respeta ✿ ♡ ✦ como una sola letra */
  const letras = Array.from(texto);

  if (menosMovimiento || !velocidad) {
    renglon.textContent = texto;
    alTerminar?.();
    return;
  }

  let i = 0;
  const paso = (): void => {
    renglon.textContent = '';
    renglon.appendChild(document.createTextNode(letras.slice(0, i).join('')));

    const cursor = document.createElement('span');
    cursor.className = 'caret';
    renglon.appendChild(cursor);

    const pendiente = document.createElement('span');
    pendiente.className = 'off';
    pendiente.textContent = letras.slice(i).join('');
    renglon.appendChild(pendiente);

    if (i++ < letras.length) {
      escribiendo = window.setTimeout(paso, velocidad);
    } else {
      escribiendo = window.setTimeout(() => {
        renglon.textContent = texto;
        alTerminar?.();
      }, 900);
    }
  };
  paso();
}

/** Lo que dice al cargar y a donde siempre vuelve. */
export const bienvenida = (): string => dice('bienvenida');

/** Dice algo un ratito y vuelve a la bienvenida. */
export function decir(texto: string, cuanto = 1800): void {
  window.clearTimeout(vuelta);
  escribir(texto, 38, () => {
    vuelta = window.setTimeout(() => escribir(bienvenida(), 45), cuanto);
  });
}

/** Para cuando algo más urgente va a hablar. */
export function cancelarVuelta(): void {
  window.clearTimeout(vuelta);
}

/** Vuelve a la bienvenida después de una pausa (al quitar el mouse). */
export function volverALaBienvenida(despues: number): void {
  vuelta = window.setTimeout(() => escribir(bienvenida(), 30), despues);
}

/** ¿Está escribiendo ahora mismo? */
export const estaEscribiendo = (): boolean => Boolean(renglon?.querySelector('.caret'));
