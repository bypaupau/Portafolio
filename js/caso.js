/* ═══════════════════════════════════════════════════════════
   pau.proyectos · riel de las páginas de caso
     · marca la parada en la que estás
     · pinta el camino recorrido
     · le pasa a la parada activa el color de su sección

   Mejora progresiva: sin JS el riel sigue siendo una lista de
   anclas que funciona. Esto solo lo hace reaccionar.
   ═══════════════════════════════════════════════════════════ */
(function () {
  'use strict';

  var rail = document.querySelector('.cs-rail-list');
  if (!rail) return;

  var items = Array.prototype.slice.call(rail.querySelectorAll('.cs-rail-item'));
  var secs  = items.map(function (li) {
    var a = li.querySelector('a');
    var id = a && a.getAttribute('href');
    return (id && id.charAt(0) === '#') ? document.getElementById(id.slice(1)) : null;
  });
  if (!secs.filter(Boolean).length) return;

  var navH = 0;
  function medirNav() {
    var v = getComputedStyle(document.documentElement).getPropertyValue('--nav-h');
    navH = parseInt(v, 10) || 54;
  }
  medirNav();

  var activo = -1;
  function pintar() {
    /* la parada activa es la última cuyo inicio ya quedó por encima
       de la línea de lectura (el nav + un respiro) */
    var linea = navH + 120, k = 0;
    for (var i = 0; i < secs.length; i++) {
      if (secs[i] && secs[i].getBoundingClientRect().top <= linea) k = i;
    }
    /* al final del documento, la última parada siempre gana: si la
       sección final es corta nunca llegaría a cruzar la línea */
    if (window.innerHeight + window.scrollY >= document.body.offsetHeight - 2) k = secs.length - 1;

    if (k !== activo) {
      activo = k;
      items.forEach(function (li, i) {
        var on = i === k;
        li.classList.toggle('is-here', on);
        var a = li.querySelector('a');
        if (a) { if (on) a.setAttribute('aria-current', 'true'); else a.removeAttribute('aria-current'); }
      });
      /* el riel toma el color de la sección en la que estás */
      var c = secs[k] ? getComputedStyle(secs[k]).getPropertyValue('--cs') : '';
      rail.parentNode.style.setProperty('--cs', c.trim() || 'var(--pink)');

      /* celular: el riel se acuesta y se desliza. La parada activa
         siempre a la vista, igual que los chips de Proyectos. */
      if (rail.scrollWidth > rail.clientWidth) {
        var li = items[k];
        if (li) rail.scrollTo({ left: Math.max(0, li.offsetLeft - 20), behavior: 'smooth' });
      }
    }
    rail.style.setProperty('--cs-progress', ((k + 1) / items.length * 100) + '%');
  }

  var pedido = false;
  function alScroll() {
    if (pedido) return;
    pedido = true;
    requestAnimationFrame(function () { pedido = false; pintar(); });
  }

  window.addEventListener('scroll', alScroll, { passive: true });
  window.addEventListener('resize', function () { medirNav(); alScroll(); }, { passive: true });
  document.addEventListener('langchange', alScroll);
  pintar();

  /* el motor de aparición compartido se encarga de los bloques .cs-rv.
     La clase que los esconde se pone solo si el motor está vivo, para
     que sin JS (o con "menos movimiento") no quede nada invisible. */
  if (window.PXReveal && window.PXReveal.activo) {
    document.documentElement.classList.add('cs-motion');
    window.PXReveal.register(document.querySelectorAll('.cs-rv'));
  }
})();
