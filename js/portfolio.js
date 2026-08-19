/* ═══════════════════════════════════════════════════════════
   pau.proyectos · script compartido por todas las páginas
   1) menú hamburguesa en celular
   2) pop-in de las tarjetas .popup al hacer scroll (solo inicio)
   ═══════════════════════════════════════════════════════════ */
(function () {
  'use strict';

  /* ── 1 · MENÚ MÓVIL ─────────────────────────────────────── */
  var toggle = document.getElementById('nav-toggle');
  var tabs   = document.getElementById('nav-tabs');

  if (toggle && tabs) {
    var abrir = function (si) {
      tabs.classList.toggle('open', si);
      toggle.setAttribute('aria-expanded', si ? 'true' : 'false');
      toggle.setAttribute('aria-label', si ? 'Cerrar menú' : 'Abrir menú');
    };

    toggle.addEventListener('click', function (e) {
      e.stopPropagation();
      abrir(!tabs.classList.contains('open'));
    });

    /* tocar fuera del menú lo cierra */
    document.addEventListener('click', function (e) {
      if (tabs.classList.contains('open') && !tabs.contains(e.target)) abrir(false);
    });

    /* Escape lo cierra y devuelve el foco al botón */
    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape' && tabs.classList.contains('open')) {
        abrir(false);
        toggle.focus();
      }
    });

    /* al elegir un link, se cierra */
    tabs.addEventListener('click', function (e) {
      if (e.target.closest('a')) abrir(false);
    });

    /* si se agranda la ventana a escritorio, limpiamos el estado abierto */
    var mq = window.matchMedia('(min-width:761px)');
    var alCambiar = function (ev) { if (ev.matches) abrir(false); };
    if (mq.addEventListener) mq.addEventListener('change', alCambiar);
    else if (mq.addListener) mq.addListener(alCambiar);   /* Safari viejo */
  }

  /* ── 2 · POP-IN DE LAS TARJETAS DEL INICIO ──────────────── */
  var popups = document.querySelectorAll('.popups');
  if (!popups.length) return;

  var sinMovimiento = window.matchMedia('(prefers-reduced-motion:reduce)').matches;

  /* Sin IntersectionObserver (o con movimiento reducido): se muestran y ya */
  if (sinMovimiento || !('IntersectionObserver' in window)) {
    document.querySelectorAll('.popup').forEach(function (el) { el.classList.add('pop'); });
    return;
  }

  /* Observamos CADA tarjeta por separado.
     En celular las 3 quedan una debajo de otra: si observáramos el contenedor
     entero (muy alto), habría que scrollear mucho antes de que aparecieran. */
  var io = new IntersectionObserver(function (entries) {
    entries.forEach(function (e) {
      var el = e.target;
      if (e.isIntersecting) {
        el.style.transitionDelay = (el.dataset.i * 0.12) + 's';
        el.classList.add('pop');
      } else {
        el.classList.remove('pop');
      }
    });
  }, { threshold: 0.35 });

  popups.forEach(function (cont) {
    cont.querySelectorAll('.popup').forEach(function (el, i) {
      el.dataset.i = i;
      io.observe(el);
    });
  });
})();
