/* ═══════════════════════════════════════════════════════════
   SOBRE MÍ · la ruta de la sección 01

   Las cinco paradas (ilustración → diseño → marketing → computación →
   aquí estoy) se encadenan de izquierda a derecha y el camino punteado
   se dibuja mientras llegan. Es la única animación del sitio que cuenta
   algo en vez de solo presentar contenido, por eso tiene su propio
   archivo y su propio orden.

   Cómo arranca: NO vuelve a observar el scroll. Se cuelga de la ventana
   que ya observa el motor compartido — cuando esa ventana recibe la clase
   .is-in, la ruta empieza a caminar. Una sola fuente de verdad.

   Sin JavaScript, o con "menos movimiento" activado, las paradas nunca
   se esconden: el HTML ya es visible por defecto.
   ═══════════════════════════════════════════════════════════ */
import { motorActivo } from '../global/scroll-reveal';

const ruta = document.querySelector<HTMLElement>('.route');
const ventana = ruta?.closest<HTMLElement>('.win');

if (ruta && ventana && motorActivo) {

  /* cada parada sabe qué número es, y el CSS la retrasa con eso */
  ruta.classList.add('route-motion');
  ruta.querySelectorAll<HTMLElement>('.stop').forEach((parada, i) => {
    parada.style.setProperty('--stop-i', String(i));
  });

  const caminar = () => {
    ruta.classList.toggle('is-walking', ventana.classList.contains('is-in'));
  };
  new MutationObserver(caminar).observe(ventana, {
    attributes: true,
    attributeFilter: ['class'],
  });

  /* por si la ventana ya estaba a la vista al cargar */
  caminar();
}
