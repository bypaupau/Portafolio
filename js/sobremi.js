/* ═══════════════════════════════════════════════════════════
   pau.proyectos · Sobre mí
   Esta página ya no trae su propio observador: el motor de aparición
   al scroll vive en js/portfolio.js (window.PXReveal) y lo comparten
   las cuatro páginas. Aquí solo queda lo propio de Sobre mí:

     1) QUÉ entra dentro de cada sección y en qué orden
        (eyebrow → título → subtítulo → contenido)
     2) la RUTA de 01: las paradas se encadenan de izquierda a derecha
        y el camino punteado se dibuja mientras llegan. Es la única
        animación del sitio que cuenta una historia en vez de solo
        presentar contenido, así que tiene su propio orden.

   La animación sigue siendo reversible (al salir y volver a entrar) y
   sigue sin scale ni rebote, a propósito.
   ═══════════════════════════════════════════════════════════ */
(function () {
  'use strict';

  var sections = document.querySelectorAll('.ab-reveal');
  if (!sections.length || !window.PXReveal) return;

  /* qué entra dentro de cada sección, en orden de lectura */
  var PIEZAS = [
    ':scope > .ab-head > *',                                    /* 01 / ··· · título · subtítulo */
    ':scope > .ab-title', ':scope > .ab-sub', ':scope > .hero-btns',  /* cierre */
    ':scope > .win',                                            /* ruta · pistas */
    '.tool', ':scope > .ab-more',                               /* herramientas */
    '.ev', ':scope > .ab-all'                                   /* evidencia */
  ].join(',');

  var items = [];
  sections.forEach(function (sec) {
    sec.querySelectorAll(PIEZAS).forEach(function (el) {
      el.classList.add('ab-rv');
      items.push(el);
    });
  });
  window.PXReveal.register(items);

  /* ── LA RUTA DE 01 ────────────────────────────────────────
     Las paradas entran una tras otra y el camino se dibuja con ellas.
     Se cuelga de la ventana que ya observa PXReveal: cuando esa
     ventana recibe .is-in, las paradas arrancan; cuando la pierde,
     vuelven a su estado inicial y la próxima vez se repite.
     Si no hay motor (o hay reduced-motion), las paradas nunca se
     esconden: el HTML ya es visible por defecto.                */
  var route = document.querySelector('.route');
  if (!route || !window.PXReveal.activo) return;

  var win = route.closest('.win');
  if (!win) return;

  var stops = route.querySelectorAll('.stop');
  route.classList.add('route-motion');
  stops.forEach(function (s, i) { s.style.setProperty('--stop-i', i); });

  /* observamos la clase de la ventana: una sola fuente de verdad */
  new MutationObserver(function () {
    route.classList.toggle('is-walking', win.classList.contains('is-in'));
  }).observe(win, { attributes: true, attributeFilter: ['class'] });

  /* por si la ventana ya estaba dentro del viewport al cargar */
  if (win.classList.contains('is-in')) route.classList.add('is-walking');
})();
