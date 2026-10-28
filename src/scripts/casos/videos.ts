/* ═══════════════════════════════════════════════════════════
   LOS VÍDEOS DEL CASO · como GIFs
   componente: src/components/paginas/casos/MedioDeCaso.astro

   Son grabaciones de pantalla cortas y mudas: se leen mejor como un
   GIF que como un vídeo con controles. Al llegar a uno se reproduce
   solo y en bucle; al salir de la pantalla se pausa, para que no
   gaste batería ni red mientras nadie lo mira.

   Con «menos movimiento» NADA arranca solo: se queda el póster con el
   botón de reproducir de 60 px, y al pulsarlo vuelven los controles.
   Sin JavaScript, el HTML trae los controles del navegador.
   ═══════════════════════════════════════════════════════════ */
import { motorActivo } from '../global/scroll-reveal';

const figuras = Array.from(document.querySelectorAll<HTMLElement>('.caso-figura.es-video'));

if (motorActivo) {
  /* los que pausó quien lee: esos no vuelven a arrancar solos */
  const pausadosAMano = new WeakSet<HTMLVideoElement>();

  const alVerse = new IntersectionObserver((entradas) => {
    entradas.forEach((entrada) => {
      const video = entrada.target as HTMLVideoElement;
      if (entrada.isIntersecting && !pausadosAMano.has(video)) {
        void video.play().catch(() => { /* el navegador puede negarse: queda el póster */ });
      } else if (!entrada.isIntersecting) video.pause();
    });
  }, { threshold: 0.35 });

  figuras.forEach((figura) => {
    const video = figura.querySelector('video');
    if (!video) return;
    video.removeAttribute('controls');
    video.muted = true;
    video.loop = true;

    /* Algo que se mueve solo más de cinco segundos tiene que poder
       pararse (WCAG 2.2.2): clic, Enter o Espacio lo pausan y lo
       reanudan. */
    video.tabIndex = 0;
    const alternar = (): void => {
      if (video.paused) { pausadosAMano.delete(video); void video.play(); }
      else { pausadosAMano.add(video); video.pause(); }
    };
    video.addEventListener('click', alternar);
    video.addEventListener('keydown', (e) => {
      if (e.key === ' ' || e.key === 'Enter') { e.preventDefault(); alternar(); }
    });
    alVerse.observe(video);
  });
} else {
  figuras.forEach((figura) => {
    const video = figura.querySelector('video');
    const boton = figura.querySelector<HTMLButtonElement>('.caso-video-boton');
    if (!video || !boton) return;

    video.removeAttribute('controls');
    boton.hidden = false;
    boton.addEventListener('click', () => {
      boton.hidden = true;
      video.setAttribute('controls', '');
      void video.play();
      video.focus();
    });
    /* si se reproduce por otra vía (teclado sobre los controles), el
       botón sobra */
    video.addEventListener('play', () => { boton.hidden = true; video.setAttribute('controls', ''); });
  });
}
