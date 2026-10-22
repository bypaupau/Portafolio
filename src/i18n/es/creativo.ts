/* ═══════════════════════════════════════════════════════════
   TEXTOS DE CREATIVO · ESPAÑOL        página: src/pages/creativo.astro
   El contenido de cada trabajo NO está aquí: vive en
   src/content/creativos/trabajos.ts
   ═══════════════════════════════════════════════════════════ */
export const spanishCreativo = {
  'pages.creative.metaTitle': 'pau.proyectos · creativo',
  'pages.creative.metaDescription': 'Otros proyectos y curiosidades de Pau: ilustración, libros y experimentos creativos fuera del portafolio profesional.',
  'taskbar.windowName.creative': 'creativo/',

  'pages.creative.sectionLabel': '// fuera del portafolio principal',
  'pages.creative.sectionTitle': 'Otros proyectos & curiosidades',
  'pages.creative.intro': 'Aquí también hago otras cositas que me gusta compartir. No todo lo que creo encaja en mi perfil profesional, ¡pero eso no significa que no merezca un espacio! ♡',
  'pages.creative.galleryHeading': 'Galería de trabajos',
  'pages.creative.viewWork': 'ver trabajo',

  /* ── filtros por categoría ── */
  'pages.creative.filters.ariaLabel': 'Filtrar trabajos',
  'pages.creative.filters.all': 'Todos',
  'pages.creative.filters.illustration': 'Ilustración',
  'pages.creative.filters.personal': 'Proyectos personales',
  'pages.creative.filters.experiment': 'Experimentos creativos',
  'pages.creative.filters.other': 'Otros',
  /* {n} = cuántos se ven · {t} = cuántos hay en total */
  'pages.creative.countAll': '{n} trabajos',
  'pages.creative.countSome': '{n} de {t} trabajos',
  'pages.creative.liveAnnouncement': '{n} trabajos',
  'pages.creative.empty': 'Nada por aquí todavía… ¡pronto! ✿',

  /* ── la ficha que ocupa el hueco mientras la galería es corta ── */
  'pages.creative.soonTitle': 'próximamente',
  'pages.creative.soonText': 'este rincón va a seguir creciendo ✿',
} as const;
