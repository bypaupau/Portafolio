/* ═══════════════════════════════════════════════════════════
   INICIO · "y también …" · la palabra que cambia

   Cambia cada ~3.5 s con un fundido + 6 px. Termina la transición y la
   palabra se queda QUIETA hasta el próximo cambio. Se pausa si la
   portada no se ve o la pestaña está oculta.

   Con "menos movimiento" las palabras SIGUEN cambiando, pero solo con
   un fundido y más pausado (la clase .is-calm). El sitio anterior, en
   ese caso, las juntaba todas en una línea ("a · b · c · d"), y así la
   veía cualquiera con "reducir movimiento" activado en su sistema.

   Para lectores de pantalla hay un .sr-only aparte con las cuatro
   palabras seguidas: esto es decoración, no información.
   ═══════════════════════════════════════════════════════════ */
import { menosMovimiento, enPantalla } from './pau-exe/elementos';

const rueda = document.querySelector<HTMLElement>('.rot');
const palabras = rueda ? rueda.querySelectorAll<HTMLElement>('.rot-w') : null;

if (rueda && palabras && palabras.length > 1) {
  if (menosMovimiento) rueda.classList.add('is-calm');

  let actual = 0;
  const siguiente = (): void => {
    if (enPantalla()) {
      const sale = palabras[actual]!;
      actual = (actual + 1) % palabras.length;
      const entra = palabras[actual]!;

      sale.classList.remove('is-on');
      sale.classList.add('is-off');

      /* la que entra parte desde abajo, sin transición de "regreso" */
      entra.style.transition = 'none';
      entra.classList.remove('is-off');
      void entra.offsetWidth;
      entra.style.transition = '';
      entra.classList.add('is-on');
    }
    window.setTimeout(siguiente, menosMovimiento ? 5000 : 3500);
  };

  /* la primera espera a que termine la animación de entrada */
  window.setTimeout(siguiente, 4200);
}
