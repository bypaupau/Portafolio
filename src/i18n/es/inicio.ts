/* ═══════════════════════════════════════════════════════════
   TEXTOS DE INICIO · ESPAÑOL          página: src/pages/index.astro

   Incluye los de pau.exe (lo que dice la compu). El sitio anterior los
   tenía en un grupo aparte llamado "exe"; aquí van con el resto de la
   página, bajo pages.home.exe.*, porque solo existen en Inicio.

   Los seis mensajes de .exe.state.N son los que la compu va contando
   cuando le haces clic, en ese orden. Antes eran un array; separados,
   el validador puede avisar si falta uno en inglés.
   ═══════════════════════════════════════════════════════════ */
export const spanishInicio = {

  /* ── cabecera de la página (no se ve en pantalla) ── */
  'pages.home.metaTitle': 'Paula Martillo · diseño + código ✿',
  'pages.home.metaDescription': 'Portafolio de Pau (Paula Martillo): diseño ideas y las convierto en realidad. UX/UI, product design y desarrollo, desde Guayaquil.',
  'taskbar.windowName.home': 'inicio',

  /* ── hero · quién es, en cinco segundos ── */
  'pages.home.greeting': 'hola, soy',
  'pages.home.role': 'Diseño ideas y las convierto en realidad.',
  'pages.home.studies': 'Ingeniería en Computación · UEES · Guayaquil, Ecuador',
  'pages.home.also': 'y también',
  'pages.home.also.word.1': 'diseñadora',
  'pages.home.also.word.2': 'ilustradora',
  'pages.home.also.word.3': 'developer',
  'pages.home.also.word.4': 'creadora',
  'pages.home.also.forScreenReaders': 'diseñadora, ilustradora, developer y creadora',
  'pages.home.passion.start': 'Apasionada por la',
  'pages.home.passion.creativity': 'creatividad',
  'pages.home.passion.and': 'y la',
  'pages.home.passion.technology': 'tecnología',
  'pages.home.passion.middle': '— y por todo lo que nace al',
  'pages.home.passion.unite': 'unirlas',
  'pages.home.passion.end': '. ✿',
  'pages.home.button.projects': 'Ver proyectos',
  'pages.home.button.resume': 'Descargar CV',
  'pages.home.status.label': 'disponible',
  'pages.home.status.text': 'abierta a pasantías · UX/UI · product design',
  'pages.home.scrollHint': 'desliza para explorar',

  /* ── pau.exe · la ventana con la compu ── */
  'pages.home.exe.computerDescription': 'computadora pixel sonriendo',
  'pages.home.exe.welcomeForScreenReaders': '¡bienvenid@!',
  'pages.home.exe.welcome': '¡bienvenid@! ✿',
  'pages.home.exe.wakeUp': '¿hola? ✿',
  'pages.home.exe.running': 'pau.exe is running...',
  'pages.home.exe.stillHere': 'still here? ♡',
  'pages.home.exe.languageChanged': 'hablemos en español ✿',
  'pages.home.exe.minimize': 'no me minimices :c',
  'pages.home.exe.maximize': 'ya estoy en grande ✦',
  'pages.home.exe.close': 'nice try :)',
  'pages.home.exe.konami': 'achievement unlocked ✦',
  'pages.home.exe.hint.email': '> escríbeme ✉',
  'pages.home.exe.hint.github': '> mis repos',
  'pages.home.exe.hint.linkedin': '> conectemos ♡',

  /* ── puente · tres verbos que la describen ── */
  'pages.home.verbs.label': '// un poquito más sobre mí ↓',
  'pages.home.verbs.title': 'Tres cosas que me encanta hacer',
  'pages.home.verbs.design': 'diseñar',
  'pages.home.verbs.design.what': 'interfaces, ilustración y todo lo visual',
  'pages.home.verbs.build': 'construir',
  'pages.home.verbs.build.what': 'prototipos y productos que funcionan',
  'pages.home.verbs.explore': 'explorar',
  'pages.home.verbs.explore.what': 'datos, análisis y experimentos',
  'pages.home.verbs.end': '…y lo mejor pasa cuando se juntan. ✿',

  /* ── proyectos destacados · las tres tarjetas ── */
  'pages.home.featured.label': '// proyectos destacados',
  'pages.home.featured.title': 'de ideas → a cosas reales ✦',
  'pages.home.featured.subtitle': 'Algunos proyectos que he hecho realidad.',
  'pages.home.featured.seeAll': 'ver los 10 proyectos →',
  'pages.home.featured.viewProject': 'ver proyecto',
  'pages.home.featured.phoenix.award': '1er lugar internacional',
  'pages.home.featured.phoenix.imageAlt': 'Pantallas del prototipo de la app Grow With Phoenix',
  'pages.home.featured.phoenix.peek': 'Datos satelitales convertidos en una app para cultivar tu propia comida.',
  'pages.home.featured.wildfire.award': '3er lugar general',
  'pages.home.featured.wildfire.name': 'Rutas de incendio',
  'pages.home.featured.wildfire.windowTitle': 'rutas_de_incendio',
  'pages.home.featured.wildfire.imageAlt': 'Visualización de rutas de evacuación ante incendios',
  'pages.home.featured.wildfire.peek': 'Rutas de escape seguras ante un incendio. Mi parte: el modelado.',
  'pages.home.featured.catventures.award': 'diseño + código',
  'pages.home.featured.catventures.imageAlt': 'Escena pixel art del videojuego Catventures',
  'pages.home.featured.catventures.peek': 'Un juego pixel art en Unity: diseño, ilustración y C#, en equipo.',
  'pages.home.featured.chip.uxui': 'UX/UI',
  'pages.home.featured.chip.data': 'datos',
  'pages.home.featured.chip.modeling': 'modelado',
  'pages.home.featured.chip.game': 'videojuego',
  'pages.home.featured.chip.illustration': 'ilustración',

  /* ── cierre · ¿y ahora? ── */
  'pages.home.next.sectionLabel': '¿y ahora?',
  'pages.home.next.windowTitle': '¿y_ahora?.txt',
  'pages.home.next.meet.question': '¿Quieres conocer a la persona detrás de los proyectos?',
  'pages.home.next.meet.button': 'Conoce a Pau →',
  'pages.home.next.hire.question': 'Disponible para pasantías',
  'pages.home.next.hire.subtitle': 'UX/UI · product design · desarrollo',
  'pages.home.next.hire.button': 'Escríbeme →',

  /* ── los mensajes que cuenta la compu al hacerle clic ── */
  'pages.home.exe.state.1': 'loading...',
  'pages.home.exe.state.2': 'ready!',
  'pages.home.exe.state.3': 'welcome!',
  'pages.home.exe.state.4': 'pau.exe is running...',
  'pages.home.exe.state.5': 'compilando ideas...',
  'pages.home.exe.state.6': 'hi there ♡',
} as const;
