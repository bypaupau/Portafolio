/* ═══════════════════════════════════════════════════════════
   MENÚ HAMBURGUESA (solo celular, ≤760px)

   Se cierra al elegir un enlace, al tocar fuera, con Escape, y se
   reinicia si la ventana se agranda a escritorio.
   Antes era la sección 1 de js/portfolio.js, junto a tres cosas más.
   ═══════════════════════════════════════════════════════════ */
import { textoDe } from './language-runtime';

const boton = document.getElementById('nav-toggle');
const panel = document.getElementById('nav-tabs');

if (boton && panel) {
  function ponerAbierto(abierto: boolean): void {
    panel!.classList.toggle('open', abierto);
    boton!.setAttribute('aria-expanded', abierto ? 'true' : 'false');
    const etiqueta = textoDe(abierto ? 'navigation.menuClose' : 'navigation.menuOpen');
    if (etiqueta !== null) boton!.setAttribute('aria-label', etiqueta);
  }

  const estaAbierto = (): boolean => panel!.classList.contains('open');

  ponerAbierto(false);

  /* al cambiar el idioma hay que reescribir el aria-label */
  document.addEventListener('langchange', () => ponerAbierto(estaAbierto()));

  boton.addEventListener('click', (evento) => {
    evento.stopPropagation();
    ponerAbierto(!estaAbierto());
  });

  /* tocar fuera lo cierra */
  document.addEventListener('click', (evento) => {
    if (estaAbierto() && !panel.contains(evento.target as Node)) ponerAbierto(false);
  });

  /* Escape lo cierra y devuelve el foco al botón */
  document.addEventListener('keydown', (evento) => {
    if (evento.key === 'Escape' && estaAbierto()) {
      ponerAbierto(false);
      boton.focus();
    }
  });

  /* elegir un enlace lo cierra */
  panel.addEventListener('click', (evento) => {
    if ((evento.target as HTMLElement).closest('a')) ponerAbierto(false);
  });

  /* si se agranda a escritorio, se limpia el estado abierto */
  const escritorio = window.matchMedia('(min-width:761px)');
  escritorio.addEventListener('change', (evento) => {
    if (evento.matches) ponerAbierto(false);
  });
}
