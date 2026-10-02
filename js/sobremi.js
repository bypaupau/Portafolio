/* ═══════════════════════════════════════════════════════════
   pau.proyectos · Sobre mí
   Entrada al hacer scroll — mismo sistema que "¿A dónde vamos?"
   en Inicio (js/portfolio.js):
     · IntersectionObserver que observa CADA elemento por separado
       (en celular las secciones son altas: observar la sección entera
       obligaría a scrollear mucho antes de ver nada)
     · sube 30px mientras aparece · stagger de 0.12s entre hermanos
   Igual que en Inicio, se repite cada vez que el elemento sale del
   viewport y vuelve a entrar (subiendo o bajando). Diferencia a
   propósito: sin scale ni rebote.

   Mejora progresiva: el contenido es visible por defecto. La clase
   .ab-motion (la que oculta) solo se pone si hay IntersectionObserver
   y el usuario NO pidió movimiento reducido.
   ═══════════════════════════════════════════════════════════ */
(function () {
  'use strict';

  var sections = document.querySelectorAll('.ab-reveal');
  if (!sections.length) return;

  var reduce = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (reduce || !('IntersectionObserver' in window)) return;

  /* qué entra dentro de cada sección, en orden de lectura:
     eyebrow → título → subtítulo → contenido (ventana, cards, links) */
  var PIEZAS = [
    ':scope > .ab-head > *',          /* 01 / ··· · título · subtítulo */
    ':scope > .ab-title', ':scope > .ab-sub', ':scope > .hero-btns',  /* cierre */
    ':scope > .win',                  /* ruta · pistas */
    '.tool', ':scope > .ab-more',     /* herramientas */
    '.ev', ':scope > .ab-all'         /* evidencia */
  ].join(',');

  var STEP = 0.12;      /* el mismo stagger que Inicio */
  var MAX_STEPS = 3;    /* tope: nada espera más de 0.36s */

  var items = [];
  sections.forEach(function (sec) {
    sec.querySelectorAll(PIEZAS).forEach(function (el) {
      el.classList.add('ab-rv');
      el.dataset.rv = items.length;    /* orden en el documento */
      items.push(el);
    });
  });

  document.documentElement.classList.add('ab-motion');

  /* Dos observadores, para que la animación se repita al subir y al bajar
     pero NUNCA mientras el elemento sigue en pantalla:
       · entra  → cuando se ve ≥15% (con el mismo margen de antes) se anima,
                  solo si no estaba ya animado.
       · sale   → cuando queda 100% fuera del viewport se le quita .is-in,
                  y queda listo para volver a entrar.
     Separarlos evita que algo desaparezca mientras aún se ve un pedacito. */
  var entra = new IntersectionObserver(function (entries) {
    /* lo que entra junto se escalona en orden de lectura */
    var llegan = entries
      .filter(function (e) { return e.isIntersecting && e.intersectionRatio >= 0.14 &&
               !e.target.classList.contains('is-in'); })
      .map(function (e) { return e.target; })
      .sort(function (a, b) { return a.dataset.rv - b.dataset.rv; });

    llegan.forEach(function (el, k) {
      el.style.setProperty('--rv-delay', (Math.min(k, MAX_STEPS) * STEP) + 's');
      el.classList.add('is-in');      /* añadir la clase reinicia la animación */
    });
  }, { threshold: 0.15, rootMargin: '0px 0px -6% 0px' });

  var sale = new IntersectionObserver(function (entries) {
    entries.forEach(function (e) {
      if (!e.isIntersecting) e.target.classList.remove('is-in');
    });
  }, { threshold: 0 });

  items.forEach(function (el) { entra.observe(el); sale.observe(el); });

  /* red de seguridad: si algo falla, lo que está en pantalla no se queda invisible */
  window.setTimeout(function () {
    items.forEach(function (el) {
      var r = el.getBoundingClientRect();
      if (r.top < window.innerHeight && r.bottom > 0) el.classList.add('is-in');
    });
  }, 1500);
})();
