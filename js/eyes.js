/* ═══════════════════════════════════════════════════════════
   pau.proyectos · LOS OJOS SIGUEN AL CURSOR
   Microinteracción de pau.exe, en archivo propio para que se pueda
   probar sola en _prototipos/boceto-codigo.html sin cargar todo el
   inicio — y para que haya UNA sola versión de la lógica.

   La regla: las pupilas se mueven en pasos de 1 PÍXEL DE LA GRILLA
   del sprite (1 unidad del viewBox 32×26 ≈ 5 px en pantalla), nunca
   suave. Es pixel art: SALTAN.

   Decisiones que importan:
     · el mismo desplazamiento se aplica a las tres expresiones
       (abierto, cerrado, feliz) para que al parpadear los ojos sigan
       mirando donde estaban;
     · en vertical solo hacia ARRIBA: un píxel hacia abajo metería el
       ojo dentro de la mejilla rosa, que se dibuja después y lo taparía;
     · zona muerta para que no tiemble con cada movimiento mínimo;
     · cursor lejos, fuera de la ventana, o pau.exe dormitando
       (clase .is-asleep, la pone js/home.js) → mirada al frente;
     · solo con mouse de verdad y solo sin reduced-motion: en táctil no
       hay cursor que seguir.

   Uso:  PXEyes.init(document.querySelector('.mon'))
   ═══════════════════════════════════════════════════════════ */
(function () {
  'use strict';

  function init(mon) {
    if (!mon) return false;
    var reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    var fino   = window.matchMedia('(hover: hover) and (pointer: fine)').matches;
    var ojos   = mon.querySelectorAll('.e-open, .e-closed, .e-happy');
    if (reduce || !fino || !ojos.length) return false;

    var ox = 0, oy = 0, px = 0, py = 0, pedido = false;

    function mirar() {
      pedido = false;
      var r = mon.getBoundingClientRect();
      if (!r.width) return;
      var cx = r.left + r.width / 2;
      var cy = r.top + r.height * 0.36;        /* la carita vive arriba del centro */
      var dx = px - cx, dy = py - cy;
      var lejos = Math.sqrt(dx * dx + dy * dy) > r.width * 2.8;
      var nx = 0, ny = 0;
      /* dormitando no mira a nadie: los ojos vuelven al centro y se
         quedan ahí hasta que js/home.js la despierte */
      if (!lejos && !mon.classList.contains('is-asleep')) {
        if (Math.abs(dx) > r.width * 0.16) nx = dx < 0 ? -1 : 1;
        if (dy < -r.height * 0.18)         ny = -1;
      }
      if (nx === ox && ny === oy) return;
      ox = nx; oy = ny;
      var t = (nx || ny) ? 'translate(' + nx + 'px,' + ny + 'px)' : '';
      ojos.forEach(function (g) { g.style.transform = t; });
    }

    document.addEventListener('pointermove', function (e) {
      if (e.pointerType === 'touch') return;
      px = e.clientX; py = e.clientY;
      if (!pedido) { pedido = true; requestAnimationFrame(mirar); }
    }, { passive: true });

    document.addEventListener('mouseleave', function () {
      ox = oy = 0;
      ojos.forEach(function (g) { g.style.transform = ''; });
    });

    return true;
  }

  window.PXEyes = { init: init };
})();
