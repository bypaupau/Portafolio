/* ═══════════════════════════════════════════════════════════
   TEXTOS DE SOBRE MÍ · ESPAÑOL        página: src/pages/sobre-mi.astro

   Los nombres de clave son los de la migración: 'pages.about.route.illustration'
   en vez de 'about.route.ill'. El texto es el mismo que mostraba el sitio
   anterior, copiado del diccionario, no reescrito.
   ═══════════════════════════════════════════════════════════ */
export const spanishSobreMi = {

  /* ── cabecera de la página (no se ve en pantalla) ── */
  'pages.about.metaTitle': 'pau.proyectos · sobre mí',
  'pages.about.metaDescription': 'Pau — estudiante de Ingeniería en Computación que piensa y crea desde el diseño. UX/UI, product design y la intersección entre diseño y código.',
  'taskbar.windowName.about': 'sobre_mi.txt',

  /* ── hero · polaroid e introducción ── */
  'pages.about.photo.alt': 'Pau sonriendo, con lentes y vincha, en su cuarto lleno de dibujos y plantas',
  'pages.about.photo.caption': 'pau · guayaquil',
  'pages.about.filePath': 'C:/pau/sobre_mi.txt',
  'pages.about.hello': 'hola, soy pau',
  'pages.about.lead.first': 'Antes de programar, dibujaba. Pasé por la ilustración, el diseño y el marketing antes de llegar a <strong>Ingeniería en Computación</strong>; y en algún momento entendí que no estaba cambiando de rumbo: todo apuntaba al mismo lugar.',
  'pages.about.lead.second.start': 'Me interesa cómo el diseño cambia la forma en que las personas',
  'pages.about.lead.second.interact': 'interactúan',
  'pages.about.lead.second.middle': 'con la tecnología. Y como también programo, puedo llevar esas ideas más allá de la pantalla y convertirlas en algo que funciona,',
  'pages.about.lead.second.myself': 'yo misma',
  'pages.about.status': 'abierta a pasantías · UX/UI · product design',

  /* ── ¿qué estoy haciendo ahora? · el bocadillo bajo el hero ── */
  'pages.about.now.question': '¿qué estoy haciendo en este momento...?',
  'pages.about.now.uiuxCourse': 'Realizando Fundamentals of UI/UX Design by CalArts - Coursera',
  'pages.about.now.webBootcamp': 'Aprendiendo de The Complete Full-Stack Web Development Bootcamp by Angela Yu - Udemy',
  'pages.about.now.dataScienceProgram': 'Aceptada en GCI World Data Science by University of Tokyo 2026',
  'pages.about.now.ownProjects': 'Trabajando en mi portafolio, proyectos personales y de la universidad',

  /* ── 01 · la ruta ── */
  'pages.about.route.eyebrow': '01 / de dónde vengo',
  'pages.about.route.title': 'Juntando las piezas de mi camino',
  'pages.about.route.subtitle': 'Cada etapa me dejó algo que hoy uso al diseñar.',
  'pages.about.route.windowTitle': 'C:/pau/01_ruta',
  'pages.about.route.illustration': 'ilustración',
  'pages.about.route.illustration.text': 'Me enseñó a mirar con calma: proporción, color, detalle.',
  'pages.about.route.design': 'diseño',
  'pages.about.route.design.text': 'Entender por qué algo funciona visualmente, y por qué a veces no.',
  'pages.about.route.marketing': 'marketing',
  'pages.about.route.marketing.text': 'Recordar que todo lo que hago es para alguien.',
  'pages.about.route.computing': 'computación',
  'pages.about.route.computing.text': 'Poder construir lo que antes solo dibujaba.',
  'pages.about.route.computing.meta': 'UEES · 6to semestre',
  'pages.about.route.youAreHere': 'aquí estoy',
  'pages.about.route.nowLabel': 'ahora:',
  'pages.about.route.now.text': 'Donde las cuatro piezas se usan al mismo tiempo.',

  /* ── 02 · herramientas, agrupadas por lo que hace con ellas ── */
  'pages.about.tools.eyebrow': '02 / con qué trabajo',
  'pages.about.tools.title': 'Diseño primero. El código es cómo lo vuelvo real.',
  'pages.about.tools.design.verb': 'diseñar',
  'pages.about.tools.design.what': 'interfaces e ilustración',
  'pages.about.tools.build.verb': 'construir',
  'pages.about.tools.build.what': 'prototipos que funcionan',
  'pages.about.tools.analyze.verb': 'analizar',
  'pages.about.tools.analyze.what': 'datos antes de decidir',
  'pages.about.tools.more': 'herramientas adicionales de mi stack',

  /* ── 03 · pistas, fuera de la pantalla ── */
  'pages.about.clues.eyebrow': '03 / fuera de la pantalla',
  'pages.about.clues.title': 'Pistas sobre mí.',
  'pages.about.clues.subtitle': 'Lo que hago cuando no estoy en clase (y que se cuela en lo que diseño).',
  'pages.about.clues.windowTitle': 'C:/pau/03_pistas',
  'pages.about.clues.draw': '<b>Dibujo</b> en mi tiempo libro, es la bases de todo en mi proceso.',
  'pages.about.clues.paint': '<b>Pinto</b>, me encantan las ilustraciones, las pinturas y todo lo artístico.',
  'pages.about.clues.play': '<b>Juego</b> y termino analizado el diseño de ellos. Especialmente juegos de Nintendo.',
  'pages.about.clues.music': '<b>Música</b> de fondo para dibujar, programar o las dos cosas a la vez.',
  'pages.about.clues.craft': '<b>Crochet y arcilla</b>: diseñar, pero con las manos.',
  'pages.about.clues.read': '<b>Leo</b> bastante. Por eso existe mi <a href="{pagina:proyectos}">app de tracking de libros</a>.',

  /* ── cierre ── */
  'pages.about.next.title': '¿Seguimos?',
  'pages.about.next.subtitle': 'Ya sabes de dónde vengo. Ahora mira lo que he construido.',
  'pages.about.next.projects': 'Ver proyectos',
  'pages.about.next.write': 'Escríbeme',
} as const;
