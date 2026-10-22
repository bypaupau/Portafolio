/* ═══════════════════════════════════════════════════════════
   TEXTOS DE PROYECTOS · ESPAÑOL      página: src/pages/proyectos.astro
   El contenido de cada proyecto NO está aquí: vive en
   src/content/proyectos/proyectos.ts
   ═══════════════════════════════════════════════════════════ */
export const spanishProyectos = {
  'pages.projects.metaTitle': 'pau.proyectos · proyectos',
  'pages.projects.metaDescription': 'Proyectos de Pau: diseño, desarrollo, datos y videojuegos — hackathones, universidad y personales.',
  'taskbar.windowName.projects': 'proyectos/',

  'pages.projects.sectionLabel': 'hackathones, universidad y personales',
  'pages.projects.sectionTitle': 'Proyectos',
  'pages.projects.featuredHeading': '// destacados',
  'pages.projects.archiveHeading': '// archivo',
  /* {n} = cuántos proyectos hay en el archivo ahora mismo */
  'pages.projects.archiveWindowTitle': 'C:/pau/proyectos/archivo · {n}',

  /* ── filtros por disciplina ── */
  'pages.projects.filters.ariaLabel': 'Filtrar proyectos',
  'pages.projects.filters.all': 'Todos',
  'pages.projects.filters.design': 'Diseño / UX',
  'pages.projects.filters.development': 'Desarrollo',
  'pages.projects.filters.data': 'Datos',
  'pages.projects.filters.games': 'Videojuegos',
  /* {n} = cuántos se ven · {t} = cuántos hay en total */
  'pages.projects.countAll': '{n} proyectos',
  'pages.projects.countSome': '{n} de {t} proyectos',
  'pages.projects.liveAnnouncement': '{n} proyectos',
  'pages.projects.empty': 'Sin proyectos con esos filtros… ¡pronto! ✿',

  /* ── de dónde viene cada proyecto, en la fila del archivo ── */
  'pages.projects.context.hackathon': 'Hackathon',
  'pages.projects.context.university': 'Universidad',
  'pages.projects.context.personal': 'Personal',

  /* ── el enlace de cada tarjeta y de cada fila ── */
  'pages.projects.viewProject': 'ver proyecto',
  'pages.projects.readCase': 'ver el caso',
  'pages.projects.viewRepo': 'ver repo →',
  'pages.projects.soon': 'pronto ✦',

  'pages.projects.badge.inProgress': 'en progreso',
} as const;
