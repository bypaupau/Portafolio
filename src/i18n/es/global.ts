/* ═══════════════════════════════════════════════════════════
   TEXTOS COMPARTIDOS · ESPAÑOL
   Lo que sale en TODAS las páginas: navegación, pie, selector de
   idioma y taskbar. Un texto que solo usa una página NO va aquí: va
   en src/i18n/es/<pagina>.ts

   NOMBRES DE CLAVE: area.subarea.cosa, en inglés técnico, camelCase al
   final. La clave dice QUÉ es el texto, nunca en qué posición aparece.
   Sin índices numéricos — ver docs/arquitectura.md.
   ═══════════════════════════════════════════════════════════ */
export const spanishGlobal = {
  /* ── navegación ── */
  'navigation.home': 'Inicio',
  'navigation.about': 'Sobre mí',
  'navigation.projects': 'Proyectos',
  'navigation.creative': 'Creativo',
  'navigation.contact': 'Contacto',
  'navigation.menuLabel': 'menú',
  'navigation.menuOpen': 'Abrir menú',
  'navigation.menuClose': 'Cerrar menú',
  'navigation.closeLabel': 'Cerrar',

  /* ── pie ── */
  'footer.madeWith': 'hecho con',
  'footer.credit': '+ pixeles · por Pau · © 2026',

  /* ── selector de idioma ── */
  'language.spanish': 'Español',
  'language.english': 'English',
  'language.windowTitle': 'idioma.sys',
  'language.heading': 'IDIOMA',
  'language.buttonLabel': 'Cambiar idioma',
  'language.currentLabel': 'idioma actual: Español',
  'language.changedAnnouncement': 'Idioma cambiado a Español',
  /* valor del campo oculto _language del formulario de Contacto */
  'language.formCode': 'es',

  /* ── taskbar ── */
  'taskbar.backToTop': 'Volver arriba',
  'taskbar.battery': 'batería creativa: 100% ✿',
  'taskbar.clock': 'Hora local',

  /* ── páginas de caso ── */
  'cases.railLabel': 'Secciones del caso',
  'cases.zoomOpen': 'Ampliar la imagen',
  'cases.zoomClose': 'Cerrar la vista ampliada',
} as const;
