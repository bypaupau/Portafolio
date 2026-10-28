/* ═══════════════════════════════════════════════════════════
   LA PORTADA DE UN CASO · cuánto espacio queda para la ventana
   lo usa: .caso-portada-fila (src/styles/casos/partes/medios.css)

   La ventana de portada tiene que entrar ENTERA en la primera pantalla,
   y lo que tiene encima no mide siempre lo mismo: la frase de Schaman
   va en una línea y la de Phoenix en dos. Esto mide dónde empieza la
   ventana y lo deja en --sobre-la-ventana; el CSS hace el resto.

   Se mide con offsetTop y no con getBoundingClientRect: la portada
   entra con una animación que la desplaza, y el desplazamiento no debe
   contar. Sin JavaScript, el CSS usa 324 px.
   ═══════════════════════════════════════════════════════════ */
const fila = document.querySelector<HTMLElement>('.caso-portada-fila');

if (fila) {
  const BARRA_Y_BORDES = 38;   /* la barra de título de la ventana */
  const RESPIRO = 16;          /* entre su borde de abajo y el de la pantalla */

  const medir = (): void => {
    let arriba = 0;
    for (let el: HTMLElement | null = fila; el; el = el.offsetParent as HTMLElement | null) arriba += el.offsetTop;
    fila.style.setProperty('--sobre-la-ventana', `${arriba + BARRA_Y_BORDES + RESPIRO}px`);
  };
  medir();
  window.addEventListener('resize', medir, { passive: true });
  /* al cambiar de idioma la frase puede pasar a otra línea */
  document.addEventListener('langchange', medir);
}
