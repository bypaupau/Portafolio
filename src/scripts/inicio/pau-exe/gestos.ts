/* ═══════════════════════════════════════════════════════════
   pau.exe · LOS GESTOS

   Cuatro movimientos cortos, en el mismo vocabulario que ya usan los
   botones del sitio: sombras duras y desplazamientos de 2-3 px.

     gesto('duck')   la ventana se hunde   (intenta minimizarse)
     gesto('grow')   su sombra engorda     (intenta agrandarse)
     gesto('shake')  el temblor de siempre (no la vas a cerrar)
     destello()      la pantalla da un golpe de luz, un solo cuadro
     hundir()        el sprite baja 2 px al presionarlo
     chispita(x, y)  cuatro pixeles que salen del clic

   Las tres clases de gesto se limpian SIEMPRE antes de poner una:
   'duck' y 'shake' animan la misma propiedad y si se solapan se pisan.
   Nada de esto corre con "menos movimiento".
   ═══════════════════════════════════════════════════════════ */
import { ventana, compu, menosMovimiento, punteroFino } from './elementos';

const GESTOS = ['duck', 'grow', 'shake'];

export function gesto(cual: 'duck' | 'grow' | 'shake'): void {
  if (menosMovimiento || !ventana) return;
  ventana.classList.remove(...GESTOS);
  void ventana.offsetWidth;            /* reinicia la animación */
  ventana.classList.add(cual);
}

export function destello(): void {
  if (menosMovimiento || !compu) return;
  const antes = compu.getAttribute('data-scr');
  compu.setAttribute('data-scr', 'flash');
  window.setTimeout(() => {
    if (compu.getAttribute('data-scr') !== 'flash') return;
    if (antes) compu.setAttribute('data-scr', antes);
    else compu.removeAttribute('data-scr');
  }, 110);
}

export function hundir(): void {
  if (menosMovimiento || !compu) return;
  compu.classList.remove('is-pressed');
  void compu.getBoundingClientRect().width;
  compu.classList.add('is-pressed');
}

export function chispita(x?: number, y?: number): void {
  if (menosMovimiento || !punteroFino || !x || !y) return;
  const chispa = document.createElement('span');
  chispa.className = 'px-spark';
  chispa.setAttribute('aria-hidden', 'true');
  chispa.style.left = x + 'px';
  chispa.style.top = y + 'px';
  chispa.innerHTML = '<i></i><i></i><i></i><i></i>';
  document.body.appendChild(chispa);
  window.setTimeout(() => chispa.remove(), 480);
}

/** Limpia las clases cuando la animación termina, para poder repetirla. */
export function limpiarAlTerminar(): void {
  ventana?.addEventListener('animationend', (evento) => {
    if (/^win-(shake|duck|grow)$/.test((evento as AnimationEvent).animationName)) {
      ventana.classList.remove(...GESTOS);
    }
  });
  compu?.addEventListener('animationend', (evento) => {
    if ((evento as AnimationEvent).animationName === 'mon-press') {
      compu.classList.remove('is-pressed');
    }
  });
}
