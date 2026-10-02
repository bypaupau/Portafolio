/* ═══════════════════════════════════════════════════════════
   pau.proyectos · inicio
   Pequeñas cosas que hacen que la portada se sienta viva:
     1) pau.exe: parpadeo, expresiones, texto que se escribe solo,
        mensajes de "sistema" y respuestas a los botones
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

  /* cuando termina la entrada, se quita .hx: así ninguna otra animación
     (p. ej. el temblor de la ventana) puede volver a dispararla */
  document.addEventListener('animationend', function (e) {
    if (e.animationName === 'hx-in') e.target.classList.remove('hx');
  });

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
        if (awake() && !mon.getAttribute('data-face')) {
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
      setTimeout(function () { if (awake() && !cap.querySelector('.caret')) say(T(m[0]), 2200); }, m[1]);
    });
  }

  /* clic en la compu: va contando sus estados */
  var si = 0;
  mon.addEventListener('click', function (e) {
    var STATES = T('states');
    face('happy', 1200);
    say(STATES[si++ % STATES.length]);
    spark(e.clientX, e.clientY);
  });

  /* los tres botones: la ventana "lee" a dónde vas */
  card.querySelectorAll('.social').forEach(function (a) {
    var key = a.classList.contains('mail') ? 'mail' : a.classList.contains('gh') ? 'gh' : 'in';
    function enter() { clearTimeout(backTimer); type(T('hint.' + key), 22); face('happy'); }
    function leave() { face(''); backTimer = setTimeout(function () { type(WELCOME(), 30); }, 350); }
    if (finePointer) { a.addEventListener('mouseenter', enter); a.addEventListener('mouseleave', leave); }
    a.addEventListener('focus', enter);
    a.addEventListener('blur', leave);
  });

  /* cambio de idioma desde la taskbar: pau.exe reacciona (sin moverse) */
  document.addEventListener('langchange', function () {
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
  var CTRL = [
    function () { face('blink', 500); say(T('min')); },
    function () { face('happy', 1200); say(T('max')); },
    function () {
      face('oh', 1300); say(T('close'));
      if (!reduce) { card.classList.remove('shake'); void card.offsetWidth; card.classList.add('shake'); }
    }
  ];
  ctrls.forEach(function (c, i) {
    c.addEventListener('click', function (e) { if (CTRL[i]) CTRL[i](); spark(e.clientX, e.clientY); });
  });
  card.addEventListener('animationend', function (e) {
    if (e.animationName === 'win-shake') card.classList.remove('shake');
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

  /* ── 5 · IDENTIDAD SECUNDARIA ────────────────────────────
     Cambia de palabra cada ~3.5 s con un fade + 6px. Termina la
     transición y la palabra se queda QUIETA hasta el próximo cambio.
     Se pausa si el hero no se ve o la pestaña está oculta.
     Con reduced-motion: se muestran todas juntas, sin cambiar. */
  var rot = document.querySelector('.rot');
  if (rot) {
    var words = rot.querySelectorAll('.rot-w');
    if (reduce) {
      rot.classList.add('is-static');
      var joinWords = function () {
        rot.innerHTML = '<span class="rot-w is-on">' +
          Array.prototype.map.call(words, function (w) { return w.textContent; }).join(' · ') + '</span>';
      };
      joinWords();
      /* al cambiar de idioma, i18n.js ya tradujo los <span> originales (siguen en memoria) */
      document.addEventListener('langchange', function () {
        if (window.I18N) words.forEach(function (w) { w.textContent = I18N.t(w.getAttribute('data-i18n')); });
        joinWords();
      });
    } else if (words.length > 1) {
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
        setTimeout(nextWord, 3500);
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

  /* ── 4 · APARICIÓN AL SCROLL (bajando y subiendo) ───────────
     El mismo sistema de dos observadores que Sobre mí:
       entra → se anima cuando se ve ≥15%, si no estaba ya animado
       sale  → al quedar 100% fuera, se resetea para la próxima vez */
  var rvs = document.querySelectorAll('.rv');
  if (rvs.length && !reduce && 'IntersectionObserver' in window) {
    root.classList.add('rv-motion');
    rvs.forEach(function (el, i) { el.dataset.rv = i; });
    var entra = new IntersectionObserver(function (entries) {
      entries.filter(function (e) { return e.isIntersecting && !e.target.classList.contains('is-in'); })
        .map(function (e) { return e.target; })
        .sort(function (a, b) { return a.dataset.rv - b.dataset.rv; })
        .forEach(function (el, k) {
          el.style.setProperty('--rv-delay', (Math.min(k, 3) * 0.12) + 's');
          el.classList.add('is-in');
        });
    }, { threshold: 0.15, rootMargin: '0px 0px -6% 0px' });
    var sale = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) { if (!e.isIntersecting) e.target.classList.remove('is-in'); });
    }, { threshold: 0 });
    rvs.forEach(function (el) { entra.observe(el); sale.observe(el); });
    /* red de seguridad: lo que está en pantalla nunca queda invisible */
    setTimeout(function () {
      rvs.forEach(function (el) {
        var r = el.getBoundingClientRect();
        if (r.top < window.innerHeight && r.bottom > 0) el.classList.add('is-in');
      });
    }, 1500);
  }

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
