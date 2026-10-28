/* ═══════════════════════════════════════════════════════════
   LAS PÁGINAS DE CASO · el nav se aparta mientras lees
   estilo: src/styles/casos/partes/nav-al-leer.css

   Al bajar, la barra superior se esconde y deja la pantalla al caso.
   Vuelve en cuanto se sube un poco.

   En la PORTADA no se esconde: ahí el título, la ventana y la ficha
   van justos de alto, y sin el nav encima se veían pegados al borde de
   la pantalla. Empieza a apartarse cuando la portada ya quedó atrás.

   Lo que se queda fijo (la barra del caso, la franja de móvil, los
   bloques fijos) se coloca con --nav-ocupa, no con --nav-h: así sube
   con el nav en vez de dejar un hueco de 54 px donde estaba.

   No se esconde nunca si el menú de móvil está abierto o si el foco
   está dentro del nav (alguien lo recorre con el teclado).

   MEJORA PROGRESIVA: sin JavaScript el nav se queda donde siempre.
   ═══════════════════════════════════════════════════════════ */
const raiz = document.documentElement;
const nav = document.querySelector<HTMLElement>('.barra-superior');
const portada = document.querySelector<HTMLElement>('.caso-portada');

if (nav) {
  /* cuánto hay que desplazarse en un sentido para que cuente: así un
     temblor del trackpad no lo hace parpadear */
  const UMBRAL = 8;
  let ultimaY = window.scrollY;
  let pedido = false;

  const fijarlo = (): boolean =>
    nav.contains(document.activeElement) ||
    nav.querySelector('[aria-expanded="true"]') !== null;

  const decidir = (): void => {
    pedido = false;
    const y = window.scrollY;
    /* hasta dónde se queda: el final de la portada (o, sin portada, el
       propio alto del nav) */
    const limite = portada ? portada.offsetTop + portada.offsetHeight - nav.offsetHeight : nav.offsetHeight;
    if (y <= limite || fijarlo()) {
      raiz.classList.remove('nav-escondido');
    } else if (y > ultimaY + UMBRAL) {
      raiz.classList.add('nav-escondido');
    } else if (y < ultimaY - UMBRAL) {
      raiz.classList.remove('nav-escondido');
    } else {
      return;   /* movimiento pequeño: no se toca la referencia */
    }
    ultimaY = y;
  };

  window.addEventListener('scroll', () => {
    if (pedido) return;
    pedido = true;
    requestAnimationFrame(decidir);
  }, { passive: true });

  /* con el teclado, entrar en el nav lo trae de vuelta */
  nav.addEventListener('focusin', () => raiz.classList.remove('nav-escondido'));
}
