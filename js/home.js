/* ═══════════════════════════════════════════════════════════
   pau.proyectos · inicio
   Pequeñas cosas que hacen que la portada se sienta viva:
     1) pau.exe: parpadeo, expresiones, texto que se escribe solo,
        mensajes de "sistema" y respuestas a los botones
     1b) los ojos siguen al cursor (js/eyes.js)
     1c) despierta cuando el cursor entra y dormita si la dejan sola
     1d) la pantalla del monitor se tiñe de lo que señalas
     1e) cada control y cada botón social tiene SU gesto y SU expresión
     2) (sin parallax: la página es "quieta, pero viva")
     3) "↓ desliza para explorar ↓" se va al bajar y vuelve arriba
     4) aparición al scroll que se repite al subir y al bajar
     5) la palabra de "y también …" que cambia cada tanto
     6) easter eggs (controles _ ▢ ✕, konami, consola)

   Reglas:
     · prefers-reduced-motion → nada automático ni animado; los
       clics siguen respondiendo, pero con cambios instantáneos.
     · táctil → sin cursor ni hovers.
     · nada se mueve solo salvo la carita de pau.exe: lo demás
       solo reacciona cuando la persona interactúa.
     · nada corre si la pestaña está oculta o el hero no se ve.
   ═══════════════════════════════════════════════════════════ */
(function () {
  'use strict';

  var root   = document.documentElement;
  var reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  var finePointer = window.matchMedia('(hover: hover) and (pointer: fine)').matches;

  var hero = document.querySelector('.hero');
  var card = document.querySelector('.hero-card');
  var mon  = card && card.querySelector('.mon');
  var cap  = card && card.querySelector('.cap-type');
  if (!hero || !card || !mon || !cap) return;

  function rnd(a, b) { return a + Math.random() * (b - a); }

  /* ¿se ve el hero? (para no gastar nada cuando no hace falta) */
  var heroVisible = true;
  if ('IntersectionObserver' in window) {
    new IntersectionObserver(function (e) { heroVisible = e[0].isIntersecting; }, { threshold: 0.05 })
      .observe(hero);
  }
  function awake() { return heroVisible && !document.hidden; }

  /* textos en el idioma activo (js/translations.js → grupo "exe");
     si i18n.js no cargó, se queda con el español de siempre */
  var FALLBACK = { welcome: '¡bienvenid@! ✿' };
  function T(k) { return window.I18N ? I18N.t('exe.' + k) : (FALLBACK[k] || k); }

  /* ── 1 · pau.exe ─────────────────────────────────────────── */
  function WELCOME() { return T('welcome'); }
  var typingTimer = null, backTimer = null;

  /* escribe `text` letra por letra. El resto del mensaje ya ocupa su
     espacio (invisible), así el texto centrado no se mueve. */
  function type(text, speed, done) {
    clearTimeout(typingTimer);
    var chars = Array.from(text);           /* respeta ✿ ♡ ✦ como 1 letra */
    if (reduce || !speed) {
      cap.textContent = text;
      if (done) done();
      return;
    }
    var i = 0;
    (function step() {
      var on  = chars.slice(0, i).join('');
      var off = chars.slice(i).join('');
      cap.innerHTML = '';
      cap.appendChild(document.createTextNode(on));
      var c = document.createElement('span'); c.className = 'caret'; cap.appendChild(c);
      var o = document.createElement('span'); o.className = 'off'; o.textContent = off; cap.appendChild(o);
      if (i++ < chars.length) typingTimer = setTimeout(step, speed);
      else typingTimer = setTimeout(function () { cap.textContent = text; if (done) done(); }, 900);
    })();
  }

  /* muestra un mensaje un ratito y vuelve a la bienvenida */
  function say(text, ms) {
    clearTimeout(backTimer);
    type(text, 38, function () {
      backTimer = setTimeout(function () { type(WELCOME(), 45); }, ms || 1800);
    });
  }

  /* caritas */
  var faceTimer = null;
  function face(f, ms) {
    clearTimeout(faceTimer);
    mon.setAttribute('data-face', f);
    if (ms) faceTimer = setTimeout(function () { mon.setAttribute('data-face', ''); }, ms);
  }

  /* al cargar: la bienvenida se escribe cuando la ventana termina de entrar */
  var introDelay = root.classList.contains('hx-motion') ? 1050 : 0;
  cap.textContent = '';
  setTimeout(function () { type(WELCOME(), 70); }, introDelay);

  /* parpadeo ocasional (y de vez en cuando una carita feliz o un guiño) */
  if (!reduce) {
    var blinks = 0;
    (function scheduleBlink() {
      setTimeout(function () {
        if (awake() && !dormida && !mon.getAttribute('data-face')) {
          blinks++;
          if (blinks % 7 === 0) face(Math.random() < .5 ? 'happy' : 'wink', 1400);
          else {
            face('blink', 130);
            if (Math.random() < .2) setTimeout(function () { face('blink', 120); }, 260);  /* doble */
          }
        }
        scheduleBlink();
      }, rnd(3200, 6500));
    })();

    /* "estados del sistema" automáticos: solo 2 en toda la visita,
       y solo si la persona se queda mirando el inicio */
    var AUTO = [['running', 16000], ['still', 48000]];
    AUTO.forEach(function (m) {
      setTimeout(function () {
        if (awake() && !dormida && !cap.querySelector('.caret')) say(T(m[0]), 2200);
      }, m[1]);
    });
  }

  /* ── DESPIERTA Y DORMITA ─────────────────────────────────
     pau.exe tiene un ciclo, no solo reacciones sueltas:
       · el cursor entra a la ventana  → despierta y saluda
       · nadie la toca en 25 s         → cierra los ojos y se queda
                                         QUIETA (dormitar va hacia la
                                         quietud, no hacia el movimiento)
       · cualquier gesto dentro        → despierta
     Con reduced-motion no dormita: unos ojos cerrados para siempre en
     una página sin movimiento se leerían como un error de dibujo. */
  var dormida = false, idleTimer = null;
  var IDLE = 25000;          /* ← el único número que hay que tocar */

  function reposar() {
    if (dormida) return;
    dormida = true;
    clearTimeout(faceTimer);
    mon.classList.add('is-asleep');
    mon.setAttribute('data-face', 'blink');     /* ojos cerrados, sin timeout */
  }

  function despertar(saluda) {
    clearTimeout(idleTimer);
    if (dormida) {
      dormida = false;
      mon.classList.remove('is-asleep');
      face('happy', 900);
      if (saluda) say(T('wake'), 1200);
    }
    if (!reduce) idleTimer = setTimeout(reposar, IDLE);
  }

  if (!reduce) idleTimer = setTimeout(reposar, IDLE);
  card.addEventListener('pointerenter', function () { despertar(true); });
  card.addEventListener('pointermove', function () { despertar(false); });
  card.addEventListener('pointerdown', function () { despertar(false); });
  card.addEventListener('focusin', function () { despertar(false); });

  /* ── GESTOS DE LA VENTANA ────────────────────────────────
     Tres clases, tres animaciones cortas. Siempre se limpian las tres
     antes de poner una, porque 'duck' y 'shake' animan la misma
     propiedad y si se solapan se pisan. */
  var GESTOS = ['duck', 'grow', 'shake'];
  function gesto(n) {
    if (reduce) return;
    card.classList.remove.apply(card.classList, GESTOS);
    void card.offsetWidth;                      /* reinicia la animación */
    card.classList.add(n);
  }
  card.addEventListener('animationend', function (e) {
    if (/^win-(shake|duck|grow)$/.test(e.animationName))
      card.classList.remove.apply(card.classList, GESTOS);
  });

  /* la pantalla del monitor da un golpe de luz (1 cuadro) */
  function destello() {
    if (reduce) return;
    var antes = mon.getAttribute('data-scr');
    mon.setAttribute('data-scr', 'flash');
    setTimeout(function () {
      if (mon.getAttribute('data-scr') !== 'flash') return;
      antes ? mon.setAttribute('data-scr', antes) : mon.removeAttribute('data-scr');
    }, 110);
  }

  /* el sprite se hunde 2 px al presionarlo: el mismo peso que ya
     tienen .btn y .social al hacer :active */
  function hundir() {
    if (reduce) return;
    mon.classList.remove('is-pressed');
    void mon.getBoundingClientRect().width;
    mon.classList.add('is-pressed');
  }
  mon.addEventListener('animationend', function (e) {
    if (e.animationName === 'mon-press') mon.classList.remove('is-pressed');
  });
  mon.addEventListener('pointerdown', hundir);

  /* clic en la compu: va contando sus estados */
  var si = 0;
  mon.addEventListener('click', function (e) {
    var STATES = T('states');
    face('happy', 1200);
    say(STATES[si++ % STATES.length]);
    spark(e.clientX, e.clientY);
  });

  /* ── LOS TRES BOTONES ────────────────────────────────────
     Dos cosas que antes no pasaban:
       · LA PANTALLA SE TIÑE del color del botón señalado. Esos colores
         ya existían en css/styles.css (.social.mail es rosa, .gh es
         lavanda, .in es celeste) y nadie los relacionaba con nada: la
         compu ahora "muestra" lo que estás por abrir.
       · CADA DESTINO TIENE SU CARA. Antes los tres daban la misma
         sonrisa; ahora la compu opina: sonríe al mail, se sorprende
         con los repos y guiña a LinkedIn. */
  var EXPR = { mail: 'happy', gh: 'oh', in: 'wink' };
  card.querySelectorAll('.social').forEach(function (a) {
    var key = a.classList.contains('mail') ? 'mail' : a.classList.contains('gh') ? 'gh' : 'in';
    function enter() {
      despertar(false);
      clearTimeout(backTimer);
      type(T('hint.' + key), 22);
      face(EXPR[key]);
      mon.setAttribute('data-scr', key);
    }
    function leave() {
      face('');
      mon.removeAttribute('data-scr');
      backTimer = setTimeout(function () { type(WELCOME(), 30); }, 350);
    }
    if (finePointer) { a.addEventListener('mouseenter', enter); a.addEventListener('mouseleave', leave); }
    a.addEventListener('focus', enter);
    a.addEventListener('blur', leave);
    /* al elegirlo de verdad, lo confirma una vez más antes de irse */
    a.addEventListener('click', function () { face(EXPR[key], 1100); destello(); });
  });

  /* cambio de idioma desde la taskbar: pau.exe reacciona (sin moverse) */
  document.addEventListener('langchange', function () {
    despertar(false);
    clearTimeout(backTimer);
    face('happy', 1200);
    say(T('lang'), 1400);
  });

  /* título: pau.exe ↔ pausita.exe al pasar el mouse */
  var title = card.querySelector('.win-title');
  if (title && finePointer) {
    title.addEventListener('mouseenter', function () { title.textContent = 'pausita.exe'; });
    title.addEventListener('mouseleave', function () { title.textContent = 'pau.exe'; });
  }

  /* controles _ ▢ ✕ : no obedecen, pero contestan */
  var ctrls = card.querySelectorAll('.win-ctrls i');
  /* Antes los tres decían una frase y solo el ✕ se movía. Ahora cada
     uno tiene SU gesto, de ~250 ms, en el mismo vocabulario de sombras
     duras y desplazamientos de 2-3 px que ya usan .btn y .win:
       _  la ventana se hunde (intenta minimizarse y no puede)
       ▢  su sombra engorda un momento (intenta agrandarse)
       ✕  el temblor de siempre + boca de sorpresa + golpe de luz     */
  var CTRL = [
    function () { face('blink', 500);  say(T('min'));   gesto('duck');  },
    function () { face('happy', 1200); say(T('max'));   gesto('grow');  },
    function () { face('oh', 1300);    say(T('close')); gesto('shake'); destello(); }
  ];
  ctrls.forEach(function (c, i) {
    c.addEventListener('click', function (e) { if (CTRL[i]) CTRL[i](); spark(e.clientX, e.clientY); });
  });
  /* chispita pixel (solo para easter eggs, solo con mouse) */
  function spark(x, y) {
    if (reduce || !finePointer || !x) return;
    var s = document.createElement('span');
    s.className = 'px-spark'; s.setAttribute('aria-hidden', 'true');
    s.style.left = x + 'px'; s.style.top = y + 'px';
    s.innerHTML = '<i></i><i></i><i></i><i></i>';
    document.body.appendChild(s);
    setTimeout(function () { s.remove(); }, 480);
  }

  /* ── 1b · LOS OJOS SIGUEN AL CURSOR ──────────────────────
     La lógica vive en js/eyes.js (archivo propio para poder probarla
     sola en el prototipo y que haya una sola versión). Aquí solo se
     enciende sobre la compu de pau.exe.                             */
  if (window.PXEyes) PXEyes.init(mon);

  /* ── 5 · IDENTIDAD SECUNDARIA ────────────────────────────
     Cambia de palabra cada ~3.5 s con un fade + 6px. Termina la
     transición y la palabra se queda QUIETA hasta el próximo cambio.
     Se pausa si el hero no se ve o la pestaña está oculta.
     Con reduced-motion: las palabras SIGUEN cambiando, pero solo con un
     fundido suave (sin desplazamiento) y más pausado (.is-calm). Antes se
     juntaban todas en una línea ("a · b · c · d"), y así la veía cualquiera
     con "reducir movimiento" activado en su sistema. */
  var rot = document.querySelector('.rot');
  if (rot) {
    var words = rot.querySelectorAll('.rot-w');
    if (words.length > 1) {
      if (reduce) rot.classList.add('is-calm');
      var wi = 0;
      var nextWord = function () {
        if (awake()) {
          var out = words[wi];
          wi = (wi + 1) % words.length;
          var inn = words[wi];
          out.classList.remove('is-on'); out.classList.add('is-off');
          /* la que entra parte desde abajo, sin transición de "regreso" */
          inn.style.transition = 'none'; inn.classList.remove('is-off');
          void inn.offsetWidth; inn.style.transition = '';
          inn.classList.add('is-on');
        }
        setTimeout(nextWord, reduce ? 5000 : 3500);
      };
      setTimeout(nextWord, 4200);   /* la primera espera a que termine la entrada */
    }
  }

  /* ── 3 · SCROLL HINT ─────────────────────────────────────── */
  var hint = document.querySelector('.scroll-hint');
  if (hint) {
    var hintCheck = function () { hint.classList.toggle('is-gone', window.scrollY > 24); };
    window.addEventListener('scroll', hintCheck, { passive: true });
    hintCheck();
  }

  /* ── 4 · APARICIÓN AL SCROLL ──────────────────────────────
     Ya no vive aquí: el motor es compartido por las cuatro páginas y
     está en js/portfolio.js (window.PXReveal). Esta página solo pone
     la clase .rv en su HTML y el motor la recoge en su barrido inicial. */

  /* ── 5b · KONAMI ↑↑↓↓←→←→BA ─────────────────────────────── */
  var KONAMI = ['ArrowUp','ArrowUp','ArrowDown','ArrowDown','ArrowLeft','ArrowRight','ArrowLeft','ArrowRight','b','a'];
  var k = 0;
  document.addEventListener('keydown', function (e) {
    var key = e.key.length === 1 ? e.key.toLowerCase() : e.key;
    k = (key === KONAMI[k]) ? k + 1 : (key === KONAMI[0] ? 1 : 0);
    if (k === KONAMI.length) {
      k = 0;
      face('happy', 2400);
      say(T('konami'), 2600);
      var r = mon.getBoundingClientRect();
      spark(r.left + r.width / 2, r.top + r.height / 2);
      console.log('%c✦ achievement unlocked: curios@ certificad@', 'color:#E87EA1;font:600 13px monospace');
    }
  });

  /* ── 5c · para quien abre la consola ─────────────────────── */
  console.log(
    '%c<pausita.exe>%c\n♡ made with curiosity + too much coffee\n' +
    '¿curioseando el código? me caes bien.\npsst… prueba ↑↑↓↓←→←→BA en el inicio.',
    'font:700 14px monospace;color:#2C1A24;background:#FCE8EF;border:2px solid #2C1A24;padding:3px 8px',
    'font:12px monospace;color:#7A5566;line-height:1.6'
  );
})();
