/* ═══════════════════════════════════════════════════════════
   pau.proyectos · idioma + taskbar
     1) motor de traducción: lee js/translations.js y traduce todo
        lo que tenga data-i18n / data-i18n-html / data-i18n-attr
     2) la taskbar del "pequeño sistema operativo de Pau":
        ventana activa · 🌐 idioma · batería · reloj
     3) el popover de idioma (navegable con teclado)

   El idioma se guarda en el navegador (localStorage) y se aplica
   al instante en cada página, sin recargar.
   Otros scripts pueden escuchar el cambio:
     document.addEventListener('langchange', function (e) { e.detail.lang … })
   ═══════════════════════════════════════════════════════════ */
(function () {
  'use strict';

  var LANGS   = ['es', 'en'];        /* el primero es el idioma por defecto */
  var KEY     = 'pau.lang';
  var DICT    = window.TRANSLATIONS || {};
  var root    = document.documentElement;
  var page    = document.body.getAttribute('data-page') || 'home';
  var reduce  = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  /* ── preferencia guardada (si el navegador no deja guardar, no pasa nada) ── */
  function load() {
    try { var l = localStorage.getItem(KEY); if (LANGS.indexOf(l) >= 0) return l; } catch (e) {}
    return LANGS[0];
  }
  function save(l) { try { localStorage.setItem(KEY, l); } catch (e) {} }

  var lang = load();

  /* ── 1 · MOTOR ─────────────────────────────────────────────
     t('home.greeting') → grupo "home", clave "greeting".
     Si falta en inglés, cae al español; si falta en ambos, muestra la clave. */
  function lookup(l, key) {
    var i = key.indexOf('.');
    var group = DICT[l] && DICT[l][key.slice(0, i)];
    return group ? group[key.slice(i + 1)] : undefined;
  }
  function t(key) {
    var v = lookup(lang, key);
    if (v === undefined) v = lookup(LANGS[0], key);
    if (v === undefined) { if (window.console) console.warn('[i18n] falta la clave:', key); return key; }
    return v;
  }
  /* para datos con versión por idioma: "texto" o { es:"…", en:"…" } */
  function pick(v) {
    if (v && typeof v === 'object') return v[lang] != null ? v[lang] : v[LANGS[0]];
    return v == null ? '' : v;
  }

  function apply(scope) {
    scope = scope || document;
    scope.querySelectorAll('[data-i18n]').forEach(function (el) {
      el.textContent = t(el.getAttribute('data-i18n'));
    });
    scope.querySelectorAll('[data-i18n-html]').forEach(function (el) {
      el.innerHTML = t(el.getAttribute('data-i18n-html'));
    });
    scope.querySelectorAll('[data-i18n-attr]').forEach(function (el) {
      el.getAttribute('data-i18n-attr').split(';').forEach(function (pair) {
        var p = pair.split(':');
        if (p.length === 2) el.setAttribute(p[0].trim(), t(p[1].trim()));
      });
    });
  }

  function applyPage() {
    root.lang = lang;
    document.title = t('meta.title.' + page);
    var desc = document.querySelector('meta[name="description"]');
    if (desc) desc.setAttribute('content', t('meta.desc.' + page));
    apply(document);
  }

  /* ── 2 · TASKBAR ─────────────────────────────────────────── */
  var GLOBE =
    '<svg class="tb-globe" viewBox="0 0 11 11" shape-rendering="crispEdges" aria-hidden="true" focusable="false" xmlns="http://www.w3.org/2000/svg">' +
      '<path fill="#2C1A24" d="M3 0h5v1H3zM1 1h2v1H1zM8 1h2v1H8zM1 2h1v1H1zM9 2h1v1H9zM0 3h1v5H0zM10 3h1v5h-1zM1 8h1v1H1zM9 8h1v1H9zM1 9h2v1H1zM8 9h2v1H8zM3 10h5v1H3z"/>' +
      '<path fill="#D6EEFB" d="M3 1h5v1H3zM2 2h7v1H2zM1 3h9v5H1zM2 8h7v1H2zM3 9h5v1H3z"/>' +
      '<path fill="#E87EA1" d="M5 1h1v9H5zM1 5h9v1H1zM3 2h1v1H3zM7 2h1v1H7zM2 3h1v2H2zM8 3h1v2H8zM2 6h1v2H2zM8 6h1v2H8zM3 8h1v1H3zM7 8h1v1H7z"/>' +
    '</svg>';
  var CHECK =
    '<svg class="tb-check" viewBox="0 0 7 5" shape-rendering="crispEdges" aria-hidden="true" focusable="false" xmlns="http://www.w3.org/2000/svg">' +
      '<path fill="currentColor" d="M6 0h1v1H6zM5 1h1v1H5zM0 2h1v1H0zM4 2h1v1H4zM1 3h1v1H1zM3 3h1v1H3zM2 4h1v1H2z"/>' +
    '</svg>';
  var APP_ICON =
    '<svg class="tb-app-ico" viewBox="0 0 9 8" shape-rendering="crispEdges" aria-hidden="true" focusable="false" xmlns="http://www.w3.org/2000/svg">' +
      '<path fill="#2C1A24" d="M0 0h9v8H0z"/><path fill="#FCE8EF" d="M1 1h7v1H1z"/><path fill="#FFFFFF" d="M1 3h7v4H1z"/>' +
      '<path fill="#E87EA1" d="M6 1h1v1H6zM2 4h3v1H2zM2 5h2v1H2z"/>' +
    '</svg>';
  var BATTERY =
    '<svg class="tb-bat-ico" viewBox="0 0 14 7" shape-rendering="crispEdges" aria-hidden="true" focusable="false" xmlns="http://www.w3.org/2000/svg">' +
      '<path fill="#2C1A24" d="M0 0h12v1H0zM0 6h12v1H0zM0 1h1v5H0zM11 1h1v5h-1zM12 2h2v3h-2z"/>' +
      '<path fill="#3FA06A" d="M2 2h2v3H2zM5 2h2v3H5zM8 2h2v3H8z"/>' +
    '</svg>';

  function option(l) {
    /* cada idioma se escribe en su propio idioma (así se reconoce siempre) */
    return '<li role="none"><button type="button" class="tb-opt" role="menuitemradio" data-lang="' + l + '" lang="' + l + '" aria-checked="false" tabindex="-1">' +
             '<span class="tb-opt-mark">' + CHECK + '</span>' +
             '<span class="tb-opt-name" data-i18n="lang.' + l + '"></span>' +
             '<span class="tb-opt-code" aria-hidden="true">' + l.toUpperCase() + '</span>' +
           '</button></li>';
  }

  var bar = document.createElement('div');
  bar.className = 'taskbar';
  bar.innerHTML =
    '<button type="button" class="tb-app" data-i18n-attr="aria-label:task.top; title:task.top">' +
      APP_ICON + '<span class="tb-app-name" data-i18n="task.app.' + page + '"></span>' +
    '</button>' +
    '<div class="tb-tray">' +
      '<div class="tb-lang-wrap">' +
        '<button type="button" class="tb-btn tb-lang" id="tb-lang" aria-haspopup="menu" aria-expanded="false" aria-controls="tb-lang-menu">' +
          GLOBE + '<span class="tb-code" aria-hidden="true"></span>' +
        '</button>' +
        '<div class="win tb-pop" id="tb-lang-menu" hidden>' +
          '<div class="win-bar sky">' +
            '<span class="win-title" data-i18n="lang.title"></span>' +
            '<span class="win-ctrls"><button type="button" class="tb-x" data-i18n-attr="aria-label:nav.close" tabindex="-1">✕</button></span>' +
          '</div>' +
          '<p class="tb-pop-h" id="tb-lang-h" data-i18n="lang.heading" aria-hidden="true"></p>' +
          '<ul class="tb-opts" role="menu" aria-labelledby="tb-lang">' + LANGS.map(option).join('') + '</ul>' +
        '</div>' +
      '</div>' +
      '<span class="tb-sep" aria-hidden="true"></span>' +
      '<span class="tb-bat" role="img" data-i18n-attr="aria-label:task.battery; title:task.battery">' + BATTERY + '<span aria-hidden="true">100%</span></span>' +
      '<time class="tb-clock" data-i18n-attr="title:task.clock"></time>' +
    '</div>' +
    '<p class="sr-only" aria-live="polite" id="tb-live"></p>';
  document.body.appendChild(bar);

  var btn   = bar.querySelector('#tb-lang');
  var pop   = bar.querySelector('#tb-lang-menu');
  var opts  = Array.prototype.slice.call(bar.querySelectorAll('.tb-opt'));
  var code  = bar.querySelector('.tb-code');
  var clock = bar.querySelector('.tb-clock');
  var live  = bar.querySelector('#tb-live');

  /* la "ventana activa": volver arriba */
  bar.querySelector('.tb-app').addEventListener('click', function () {
    window.scrollTo({ top: 0, behavior: reduce ? 'auto' : 'smooth' });
  });

  /* reloj: hora local real, se actualiza al cambiar el minuto */
  var clockTimer = null;
  function tick() {
    var now = new Date();
    var loc = lang === 'en' ? 'en-US' : 'es-EC';
    try {
      /* español: 24 h (11:23) · inglés: 12 h (11:23 AM) */
      clock.textContent = now.toLocaleTimeString(loc, lang === 'en'
        ? { hour: 'numeric', minute: '2-digit' }
        : { hour: '2-digit', minute: '2-digit', hourCycle: 'h23' });
      clock.setAttribute('datetime', now.toISOString());
      clock.setAttribute('title', t('task.clock') + ' · ' +
        now.toLocaleDateString(loc, { weekday: 'long', day: 'numeric', month: 'long' }));
    } catch (e) {
      clock.textContent = ('0' + now.getHours()).slice(-2) + ':' + ('0' + now.getMinutes()).slice(-2);
    }
    clearTimeout(clockTimer);
    clockTimer = setTimeout(tick, (60 - now.getSeconds()) * 1000 + 50);
  }

  /* estado visible del selector: código + ✓ + aria */
  function syncLangUI() {
    code.textContent = lang.toUpperCase();
    btn.setAttribute('aria-label', t('lang.button') + ' (' + t('lang.current') + ')');
    btn.setAttribute('title', t('lang.button'));
    opts.forEach(function (o) {
      var on = o.getAttribute('data-lang') === lang;
      o.setAttribute('aria-checked', on ? 'true' : 'false');
      o.classList.toggle('is-on', on);
    });
  }

  /* ── 3 · POPOVER ─────────────────────────────────────────── */
  function isOpen() { return !pop.hidden; }

  function place() {
    /* que nunca se salga de la pantalla (celulares angostos) */
    pop.style.translate = '';
    var r = pop.getBoundingClientRect(), m = 8, dx = 0;
    if (r.left < m) dx = m - r.left;
    else if (r.right > window.innerWidth - m) dx = (window.innerWidth - m) - r.right;
    if (dx) pop.style.translate = dx + 'px 0';
  }

  function open(focusIdx) {
    pop.hidden = false;
    btn.setAttribute('aria-expanded', 'true');
    place();
    var i = typeof focusIdx === 'number' ? focusIdx : LANGS.indexOf(lang);
    (opts[(i + opts.length) % opts.length]).focus();
  }
  function close(returnFocus) {
    if (!isOpen()) return;
    pop.hidden = true;
    btn.setAttribute('aria-expanded', 'false');
    if (returnFocus) btn.focus();
  }

  btn.addEventListener('click', function (e) {
    e.stopPropagation();
    if (isOpen()) close(false); else open();
  });
  btn.addEventListener('keydown', function (e) {
    if (e.key === 'ArrowDown' || e.key === 'ArrowUp') {
      e.preventDefault();
      open(e.key === 'ArrowUp' ? opts.length - 1 : 0);
    }
  });

  opts.forEach(function (o, i) {
    o.addEventListener('click', function () {
      setLang(o.getAttribute('data-lang'));
      close(true);
    });
    o.addEventListener('keydown', function (e) {
      var k = e.key, n = null;
      if (k === 'ArrowDown') n = i + 1;
      else if (k === 'ArrowUp') n = i - 1;
      else if (k === 'Home') n = 0;
      else if (k === 'End') n = opts.length - 1;
      else if (k === 'Escape') { e.preventDefault(); close(true); return; }
      else if (k === 'Tab') { close(false); return; }
      if (n !== null) { e.preventDefault(); opts[(n + opts.length) % opts.length].focus(); }
    });
  });

  bar.querySelector('.tb-x').addEventListener('click', function () { close(true); });

  /* clic fuera / Escape en cualquier parte → se cierra */
  document.addEventListener('click', function (e) {
    if (isOpen() && !pop.contains(e.target) && e.target !== btn) close(false);
  });
  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape' && isOpen()) close(true);
  });
  window.addEventListener('resize', function () { if (isOpen()) place(); });

  /* ── CAMBIAR DE IDIOMA ───────────────────────────────────── */
  function setLang(l) {
    if (LANGS.indexOf(l) < 0 || l === lang) return;
    lang = l;
    save(l);
    applyPage();
    syncLangUI();
    tick();
    live.textContent = t('lang.changed');
    document.dispatchEvent(new CustomEvent('langchange', { detail: { lang: l } }));
  }

  /* otra pestaña cambió el idioma → esta también */
  window.addEventListener('storage', function (e) {
    if (e.key === KEY && e.newValue) setLang(e.newValue);
  });

  /* API pública para los demás scripts */
  window.I18N = {
    t: t, pick: pick, apply: apply, set: setLang,
    get lang() { return lang; }
  };

  /* arranque: todo en el idioma guardado, antes de que corran los demás scripts */
  applyPage();
  syncLangUI();
  tick();
})();
