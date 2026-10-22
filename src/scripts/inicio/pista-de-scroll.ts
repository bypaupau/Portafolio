/* INICIO · "↓ desliza para explorar ↓"
   Se va en cuanto la persona baja un poco, y vuelve al llegar arriba.
   Es el único elemento de la portada que reacciona al scroll. */
const pista = document.querySelector<HTMLElement>('.scroll-hint');

if (pista) {
  const revisar = (): void => pista.classList.toggle('is-gone', window.scrollY > 24);
  window.addEventListener('scroll', revisar, { passive: true });
  revisar();
}
