/* ═══════════════════════════════════════════════════════════
   APARICIÓN AL HACER SCROLL

   Port de la sección 2 de js/portfolio.js, sin cambios de conducta.

   UN ELEMENTO APARECE UNA VEZ Y SE QUEDA QUIETO.

   El sitio anterior tenía un segundo observador que, al salir un bloque
   del todo de la pantalla, le quitaba `is-in` para que pudiera repetirse.
   En una página de caso con 48 bloques eso significaba 91 re-animaciones
   en un solo viaje de ida y vuelta: al volver a subir, la página entera
   parecía recargarse. Aquí, en cuanto un elemento aparece se deja de
   observar, y ya no vuelve a moverse.

   El disparo es por BORDE y no por proporción. Con elementos chicos da
   igual, pero una ventana de varias pantallas de alto nunca llegaría a
   mostrar un 15% de sí misma y no aparecería jamás.

   MEJORA PROGRESIVA: el contenido es visible por defecto. Las clases que
   lo esconden (.rv-motion / .ab-motion) solo se ponen si hay
   IntersectionObserver y nadie pidió menos movimiento.
   ═══════════════════════════════════════════════════════════ */
const raiz = document.documentElement;
const prefiereMenosMovimiento = window.matchMedia('(prefers-reduced-motion:reduce)').matches;
const activo = !prefiereMenosMovimiento && 'IntersectionObserver' in window;

const PASO = 0.1;   /* --mo-step: separación entre elementos que entran juntos */
const TOPE = 3;     /* nadie espera más de ~0.3 s */

let orden = 0;
let alEntrar: IntersectionObserver | undefined;
let temporizadorDeRed: number | undefined;

if (activo) {
  raiz.classList.add('rv-motion', 'ab-motion');

  alEntrar = new IntersectionObserver((entradas) => {
    entradas
      .filter((e) => e.isIntersecting && !e.target.classList.contains('is-in'))
      .map((e) => e.target as HTMLElement)
      .sort((a, b) => Number(a.dataset.rv) - Number(b.dataset.rv))
      .forEach((elemento, posicion) => {
        elemento.style.setProperty('--rv-delay', `${Math.min(posicion, TOPE) * PASO}s`);
        elemento.classList.add('is-in');
        /* ya apareció: se deja de observar y no vuelve a animarse */
        alEntrar!.unobserve(elemento);
      });
  }, { threshold: 0, rootMargin: '0px 0px -10% 0px' });
}

/* Red de seguridad: si algo falla, lo que está en pantalla NUNCA se queda
   invisible. Se reprograma en cada registro. */
function redDeSeguridad(): void {
  window.clearTimeout(temporizadorDeRed);
  temporizadorDeRed = window.setTimeout(() => {
    document.querySelectorAll('.rv:not(.is-in), .ab-rv:not(.is-in)').forEach((elemento) => {
      const caja = elemento.getBoundingClientRect();
      if (caja.top < window.innerHeight && caja.bottom > 0) elemento.classList.add('is-in');
    });
  }, 1500);
}

/** ¿Hay motor de aparición? (false con "menos movimiento" activado.)
    Lo consulta src/scripts/sobre-mi/ruta-animada.ts, que solo anima
    la ruta cuando el resto de la página también se anima. */
export const motorActivo = activo;

/** Registra elementos para que aparezcan al entrar en pantalla. */
export function registrarAparicion(nodos: Iterable<Element>): void {
  const lista = Array.from(nodos) as HTMLElement[];
  if (!lista.length) return;

  if (!activo) {                      /* sin motor: todo visible y ya */
    lista.forEach((e) => e.classList.add('is-in'));
    return;
  }
  lista.forEach((elemento) => {
    if (!elemento.dataset.rv) elemento.dataset.rv = String(++orden);
    if (elemento.classList.contains('is-in')) return;   /* ya apareció */
    alEntrar!.observe(elemento);
  });
  redDeSeguridad();
}

/* lo que ya está en el HTML al cargar */
registrarAparicion(document.querySelectorAll('.rv, .ab-rv'));

/* ── fin de la animación de entrada de la página ──
   Al terminar se quita .hx, así ninguna otra animación (el temblor de una
   ventana, un hover) puede volver a dispararla. Era la sección 3 de
   js/portfolio.js. */
document.addEventListener('animationend', (evento) => {
  const e = evento as AnimationEvent;
  if (e.animationName === 'hx-in') (e.target as HTMLElement).classList.remove('hx');
});
