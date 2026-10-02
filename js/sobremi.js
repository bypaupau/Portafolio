/* ═══════════════════════════════════════════════════════════
   pau.proyectos · Sobre mí
   Las secciones aparecen una sola vez al entrar en pantalla,
   como carpetas que se abren mientras exploras.

   Mejora progresiva: el contenido es visible por defecto. La clase
   .ab-motion (que es la que oculta) solo se pone si hay
   IntersectionObserver y el usuario NO pidió movimiento reducido.
   ═══════════════════════════════════════════════════════════ */
(function () {
  'use strict';

  var items = document.querySelectorAll('.ab-reveal');
  if (!items.length) return;

  var reduce = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (reduce || !('IntersectionObserver' in window)) return;

  document.documentElement.classList.add('ab-motion');

  var io = new IntersectionObserver(function (entries) {
    entries.forEach(function (e) {
      if (e.isIntersecting) {
        e.target.classList.add('is-in');
        io.unobserve(e.target);          /* una vez: no reaparece al volver a subir */
      }
    });
  }, { threshold: 0.08, rootMargin: '0px 0px -6% 0px' });

  items.forEach(function (el) { io.observe(el); });

  /* red de seguridad: si algo falla, nada se queda invisible */
  window.setTimeout(function () {
    items.forEach(function (el) {
      var r = el.getBoundingClientRect();
      if (r.top < window.innerHeight) el.classList.add('is-in');
    });
  }, 1500);
})();
