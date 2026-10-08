/* ═══════════════════════════════════════════════════════════
   pau.proyectos · script compartido por todas las páginas
     1)  menú hamburguesa en celular
     1b) botones de CV que descargan el PDF del idioma activo
     2)  MOTOR DE APARICIÓN AL SCROLL (window.PXReveal)
         Antes vivía duplicado en home.js (.rv) y sobremi.js (.ab-rv)
         con las mismas constantes escritas dos veces. Ahora el motor
         es uno solo y cada página le entrega sus elementos; las dos
         clases siguen existiendo porque cada hoja de estilo define
         su propia animación.
     3)  limpieza de .hx cuando termina la entrada de la página
     4)  Contacto: estado "enviando…" al mandar el formulario
   ═══════════════════════════════════════════════════════════ */
(function () {
  'use strict';

  /* ── 1 · MENÚ MÓVIL ─────────────────────────────────────── */
  var toggle = document.getElementById('nav-toggle');
  var tabs   = document.getElementById('nav-tabs');

  if (toggle && tabs) {
    /* textos del botón en el idioma activo (js/i18n.js) */
    var txt = function (k, es) { return window.I18N ? I18N.t('nav.' + k) : es; };
    var abrir = function (si) {
      tabs.classList.toggle('open', si);
      toggle.setAttribute('aria-expanded', si ? 'true' : 'false');
      toggle.setAttribute('aria-label', si ? txt('close', 'Cerrar menú') : txt('open', 'Abrir menú'));
    };
    abrir(false);
    document.addEventListener('langchange', function () { abrir(tabs.classList.contains('open')); });

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

  /* ── 1b · CV SEGÚN EL IDIOMA ─────────────────────────────────
     <a data-cv="../cv/" download> → ../cv/esp.pdf o ../cv/eng.pdf.
     data-cv es la ruta a la carpeta cv/ desde la página ("cv/" en el inicio).
     El href del HTML ya apunta al PDF en español, así funciona sin JS. */
  function syncCV() {
    var en = window.I18N && I18N.lang === 'en';
    document.querySelectorAll('[data-cv]').forEach(function (a) {
      a.setAttribute('href', a.getAttribute('data-cv') + (en ? 'eng.pdf' : 'esp.pdf'));
      if (!a.hasAttribute('data-cv-open'))   /* "ver CV" abre el PDF; el resto lo descarga */
        a.setAttribute('download', en ? 'Paula-Martillo-CV-EN.pdf' : 'Paula-Martillo-CV-ES.pdf');
    });
    document.querySelectorAll('[data-cv-img]').forEach(function (img) {
      img.setAttribute('src', img.getAttribute('data-cv-img') + (en ? 'cv-en.png' : 'cv-es.png'));
    });
  }
  syncCV();
  document.addEventListener('langchange', syncCV);


  /* ── 2 · APARICIÓN AL SCROLL · motor compartido ─────────────
     Dos observadores:
       entra → se anima en cuanto cruza el borde inferior (menos un 10%
               de margen, para que no arranque pegado al filo)
       sale  → al quedar 100% fuera se resetea, listo para repetirse
     Separarlos es lo que evita que algo desaparezca mientras todavía
     se ve un pedacito.

     El disparo es por BORDE y no por proporción (antes: "que se vea el
     15% del elemento"). Con elementos chicos da igual, pero la ventana
     del archivo de Proyectos mide varias pantallas de alto: pedirle un
     15% obligaba a scrollear cientos de píxeles pasado su título antes
     de que apareciera, y si quedaba justo en el filo no aparecía nunca. El stagger se calcula entre los elementos que
     ENTRAN JUNTOS, en orden de lectura, con tope para que nadie
     espere más de ~0.3 s.

     Mejora progresiva: el contenido es visible por defecto; las clases
     que lo esconden (.rv-motion / .ab-motion) solo se ponen si hay
     IntersectionObserver y nadie pidió menos movimiento.          */
  window.PXReveal = (function () {
    var root   = document.documentElement;
    var reduce = window.matchMedia('(prefers-reduced-motion:reduce)').matches;
    var activo = !reduce && 'IntersectionObserver' in window;
    var STEP = 0.1;    /* --mo-step */
    var TOPE = 3;      /* nadie espera más de 0.3 s */
    var orden = 0;     /* posición en el documento, para ordenar el stagger */
    var entra, sale, redTimer = null;

    if (activo) {
      root.classList.add('rv-motion', 'ab-motion');

      entra = new IntersectionObserver(function (items) {
        items
          .filter(function (e) {
            return e.isIntersecting && !e.target.classList.contains('is-in');
          })
          .map(function (e) { return e.target; })
          .sort(function (a, b) { return a.dataset.rv - b.dataset.rv; })
          .forEach(function (el, k) {
            el.style.setProperty('--rv-delay', (Math.min(k, TOPE) * STEP) + 's');
            el.classList.add('is-in');
          });
      }, { threshold: 0, rootMargin: '0px 0px -10% 0px' });

      sale = new IntersectionObserver(function (items) {
        items.forEach(function (e) {
          if (!e.isIntersecting) e.target.classList.remove('is-in');
        });
      }, { threshold: 0 });
    }

    /* red de seguridad: si algo falla, lo que está en pantalla NUNCA
       se queda invisible. Se reprograma en cada registro. */
    function red() {
      clearTimeout(redTimer);
      redTimer = setTimeout(function () {
        document.querySelectorAll('.rv:not(.is-in), .ab-rv:not(.is-in)').forEach(function (el) {
          var r = el.getBoundingClientRect();
          if (r.top < window.innerHeight && r.bottom > 0) el.classList.add('is-in');
        });
      }, 1500);
    }

    function register(nodos) {
      var lista = Array.prototype.slice.call(nodos || []);
      if (!lista.length) return;
      if (!activo) {                      /* sin motor: todo visible y ya */
        lista.forEach(function (el) { el.classList.add('is-in'); });
        return;
      }
      lista.forEach(function (el) {
        if (!el.dataset.rv) el.dataset.rv = ++orden;
        entra.observe(el);
        sale.observe(el);
      });
      red();
    }

    /* lo que ya está en el HTML cuando carga la página */
    register(document.querySelectorAll('.rv, .ab-rv'));

    return { register: register, activo: activo };
  })();


  /* ── 3 · FIN DE LA ENTRADA DE LA PÁGINA ─────────────────────
     Al terminar, se quita .hx: así ninguna otra animación (el temblor
     de la ventana, un hover) puede volver a dispararla. */
  document.addEventListener('animationend', function (e) {
    if (e.animationName === 'hx-in') e.target.classList.remove('hx');
  });


  /* ── 4 · CONTACTO · "enviando…" ─────────────────────────────
     El formulario de Formspree navega de verdad, así que el estado se
     ve el ratito que tarda en irse la página. Es el único momento del
     sitio donde hay una espera real que avisar. */
  var form = document.querySelector('.contact-form');
  if (form) {
    form.addEventListener('submit', function () {
      var b = form.querySelector('button[type="submit"]');
      if (!b) return;
      b.classList.add('is-sending');
      b.textContent = (window.I18N ? I18N.t('contact.sending') : 'enviando…');
    });
  }

})();
