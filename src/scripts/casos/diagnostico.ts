/* ═══════════════════════════════════════════════════════════
   EL DIAGNÓSTICO FIJO · qué llamada está activa
   componente: src/components/paginas/casos/PantallasFijas.astro (02 y 06)

   La captura se queda quieta (position:sticky, en CSS); esto solo
   decide qué llamada está activa y enciende su pantalla: la última cuyo
   borde de arriba pasó una línea al 30 % de la altura. Se decide en
   cada scroll mientras el bloque está a la vista (ver abajo por qué ya
   no basta un IntersectionObserver sobre las llamadas).

   Solo en escritorio y con el motor de movimiento vivo (el mismo que
   decide las apariciones, ver scroll-reveal.ts). En móvil o con
   «menos movimiento» no se pone .esta-vivo: nada fijo, nada apagado,
   las tres llamadas legibles a la vez.
   ═══════════════════════════════════════════════════════════ */
import { motorActivo } from '../global/scroll-reveal';

const ESCRITORIO = window.matchMedia('(min-width:1024px)');

document.querySelectorAll<HTMLElement>('.caso-diagnostico').forEach((bloque) => {
  const llamadas = Array.from(bloque.querySelectorAll<HTMLElement>('.caso-llamada'));
  /* la pantalla que se enciende con cada llamada */
  const pantallas = Array.from(bloque.querySelectorAll<HTMLElement>('.caso-pantalla'));
  if (!motorActivo || !llamadas.length) return;

  const activar = (cual: number): void => {
    llamadas.forEach((l, i) => l.classList.toggle('es-activa', i === cual));
    pantallas.forEach((p, i) => p.classList.toggle('es-activa', i === cual));
  };

  /* CUÁL ESTÁ ACTIVA: la última llamada cuyo borde de arriba ya pasó una
     línea al 30 % de la pantalla. La línea no va al centro: ahí la
     llamada 2 se activaba antes de que la captura llegara a fijarse, y
     se veía moverse mientras cambiaba la pantalla. */
  const LINEA = 0.3;
  const decidir = (): void => {
    const linea = window.innerHeight * LINEA;
    let cual = 0;
    llamadas.forEach((l, i) => { if (l.getBoundingClientRect().top <= linea) cual = i; });
    activar(cual);
  };

  /* CUÁNDO SE DECIDE: en cada scroll, pero SOLO mientras el bloque está
     a la vista (eso sí lo dice un IntersectionObserver), y una vez por
     fotograma. Antes lo decidía un observador sobre cada llamada, y
     fallaba con los saltos: una llamada corta podía pasar de debajo de
     la franja a encima de ella en un solo fotograma (un ancla, un gesto
     rápido), sin «cruzarla» nunca, y se quedaba encendida la anterior. */
  let aLaVista = false;
  let pedido = false;
  const alScroll = (): void => {
    if (!aLaVista || pedido) return;
    pedido = true;
    requestAnimationFrame(() => { pedido = false; decidir(); });
  };
  const vigia = new IntersectionObserver(([entrada]) => {
    aLaVista = Boolean(entrada?.isIntersecting);
    if (aLaVista) decidir();
  });

  const segunAncho = (): void => {
    const vivo = ESCRITORIO.matches;
    bloque.classList.toggle('esta-vivo', vivo);
    if (vivo) {
      vigia.observe(bloque);
      window.addEventListener('scroll', alScroll, { passive: true });
      decidir();
    } else {
      vigia.disconnect(); aLaVista = false;
      window.removeEventListener('scroll', alScroll);
      activar(0);
    }
  };
  ESCRITORIO.addEventListener('change', segunAncho);
  segunAncho();
});
