/* ═══════════════════════════════════════════════════════════
   LAS PÁGINAS DE CASO · el riel de secciones

   Port de js/caso.js, sin cambios de conducta. Hace tres cosas:
     · marca la parada en la que estás
     · pinta el camino recorrido (--cs-progress)
     · le pasa a la parada activa el color de su sección (--cs)

   MEJORA PROGRESIVA: sin JavaScript el riel sigue siendo una lista de
   anclas que funciona. Esto solo lo hace reaccionar.

   Lo comparten los dos casos: el riel es igual, lo que cambia son las
   secciones, y esas se leen del propio HTML.
   ═══════════════════════════════════════════════════════════ */
import { registrarAparicion, motorActivo } from '../global/scroll-reveal';

const riel = document.querySelector<HTMLElement>('.cs-rail-list');

if (riel) {
  const paradas = Array.from(riel.querySelectorAll<HTMLElement>('.cs-rail-item'));
  const secciones = paradas.map((parada) => {
    const enlace = parada.querySelector('a');
    const destino = enlace?.getAttribute('href') ?? '';
    return destino.startsWith('#') ? document.getElementById(destino.slice(1)) : null;
  });

  if (secciones.some(Boolean)) {
    let altoDelNav = 54;
    const medirNav = (): void => {
      const valor = getComputedStyle(document.documentElement).getPropertyValue('--nav-h');
      altoDelNav = parseInt(valor, 10) || 54;
    };
    medirNav();

    let activa = -1;
    const pintar = (): void => {
      /* la parada activa es la última cuya sección ya pasó la línea de
         lectura (el nav más un respiro) */
      const linea = altoDelNav + 120;
      let cual = 0;
      secciones.forEach((seccion, i) => {
        if (seccion && seccion.getBoundingClientRect().top <= linea) cual = i;
      });
      /* al final del documento gana la última: si la sección final es
         corta, nunca llegaría a cruzar la línea */
      if (window.innerHeight + window.scrollY >= document.body.offsetHeight - 2) {
        cual = secciones.length - 1;
      }

      if (cual !== activa) {
        activa = cual;
        paradas.forEach((parada, i) => {
          const aqui = i === cual;
          parada.classList.toggle('is-here', aqui);
          const enlace = parada.querySelector('a');
          if (!enlace) return;
          if (aqui) enlace.setAttribute('aria-current', 'true');
          else enlace.removeAttribute('aria-current');
        });

        /* el riel toma el color de la sección en la que estás */
        const seccion = secciones[cual];
        const color = seccion ? getComputedStyle(seccion).getPropertyValue('--cs') : '';
        (riel.parentNode as HTMLElement | null)
          ?.style.setProperty('--cs', color.trim() || 'var(--pink)');

        /* en celular el riel se acuesta y se desliza: la parada activa
           siempre a la vista, igual que los chips de Proyectos */
        if (riel.scrollWidth > riel.clientWidth) {
          const parada = paradas[cual];
          if (parada) riel.scrollTo({ left: Math.max(0, parada.offsetLeft - 20), behavior: 'smooth' });
        }
      }
      riel.style.setProperty('--cs-progress', ((cual + 1) / paradas.length) * 100 + '%');
    };

    let pedido = false;
    const alScroll = (): void => {
      if (pedido) return;
      pedido = true;
      requestAnimationFrame(() => { pedido = false; pintar(); });
    };

    window.addEventListener('scroll', alScroll, { passive: true });
    window.addEventListener('resize', () => { medirNav(); alScroll(); }, { passive: true });
    document.addEventListener('langchange', alScroll);
    pintar();
  }
}

/* Los bloques .cs-rv aparecen al bajar. La clase que los esconde solo
   se pone si el motor está vivo, así sin JavaScript (o con "menos
   movimiento") no queda nada invisible. */
if (motorActivo) {
  document.documentElement.classList.add('cs-motion');
  registrarAparicion(document.querySelectorAll('.cs-rv'));
}
