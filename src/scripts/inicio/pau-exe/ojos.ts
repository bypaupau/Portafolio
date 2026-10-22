/* ═══════════════════════════════════════════════════════════
   pau.exe · LOS OJOS SIGUEN AL CURSOR

   Port de js/eyes.js, sin cambios de conducta.

   La regla: las pupilas se mueven en pasos de UN PÍXEL DE LA GRILLA del
   sprite (una unidad del viewBox 32×26 ≈ 5 px en pantalla), nunca
   suave. Es pixel art: SALTAN.

   Decisiones que importan:
     · el mismo desplazamiento se aplica a las TRES expresiones de ojos,
       para que al parpadear sigan mirando donde estaban;
     · en vertical solo hacia ARRIBA: un píxel hacia abajo metería el ojo
       dentro de la mejilla rosa, que se dibuja después y lo taparía;
     · zona muerta, para que no tiemble con cada movimiento mínimo;
     · cursor lejos, fuera de la ventana, o pau.exe dormitando → mirada
       al frente.
   ═══════════════════════════════════════════════════════════ */
import { compu, menosMovimiento, punteroFino } from './elementos';

export function encenderLosOjos(): void {
  if (!compu || menosMovimiento || !punteroFino) return;

  const ojos = compu.querySelectorAll<SVGGElement>('.e-open, .e-closed, .e-happy');
  if (!ojos.length) return;

  let haciaX = 0;
  let haciaY = 0;
  let cursorX = 0;
  let cursorY = 0;
  let pedido = false;

  const mirar = (): void => {
    pedido = false;
    const caja = compu.getBoundingClientRect();
    if (!caja.width) return;

    const centroX = caja.left + caja.width / 2;
    const centroY = caja.top + caja.height * 0.36;   /* la carita vive arriba del centro */
    const dx = cursorX - centroX;
    const dy = cursorY - centroY;
    const lejos = Math.sqrt(dx * dx + dy * dy) > caja.width * 2.8;

    let nuevoX = 0;
    let nuevoY = 0;
    /* dormitando no mira a nadie */
    if (!lejos && !compu.classList.contains('is-asleep')) {
      if (Math.abs(dx) > caja.width * 0.16) nuevoX = dx < 0 ? -1 : 1;
      if (dy < -caja.height * 0.18) nuevoY = -1;
    }
    if (nuevoX === haciaX && nuevoY === haciaY) return;

    haciaX = nuevoX;
    haciaY = nuevoY;
    const mover = nuevoX || nuevoY ? `translate(${nuevoX}px,${nuevoY}px)` : '';
    ojos.forEach((grupo) => { grupo.style.transform = mover; });
  };

  document.addEventListener('pointermove', (evento) => {
    if (evento.pointerType === 'touch') return;
    cursorX = evento.clientX;
    cursorY = evento.clientY;
    if (!pedido) { pedido = true; requestAnimationFrame(mirar); }
  }, { passive: true });

  document.addEventListener('mouseleave', () => {
    haciaX = 0;
    haciaY = 0;
    ojos.forEach((grupo) => { grupo.style.transform = ''; });
  });
}
