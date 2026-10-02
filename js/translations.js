/* ═══════════════════════════════════════════════════════════
   pau.proyectos · TRADUCCIONES (ES / EN)
   Todos los textos de la interfaz viven aquí, en un solo lugar.

   Cómo se usan:
     · en el HTML →  data-i18n="clave"          (texto)
                     data-i18n-html="clave"     (texto con <b>, <a>…)
                     data-i18n-attr="aria-label:clave; title:clave"
     · en el JS   →  I18N.t('clave')
   Para agregar un idioma: copia el bloque `es` con otro código
   (ej. `pt: {...}`) y agrégalo a LANGS en js/i18n.js.

   Los textos de cada proyecto (descripción, fechas…) NO van aquí:
   viven junto al proyecto en data/proyectos.js como { es:"…", en:"…" },
   así agregar un proyecto sigue siendo tocar un solo archivo.
   ═══════════════════════════════════════════════════════════ */
var TRANSLATIONS = {

  /* ─────────────────────────── ESPAÑOL ─────────────────────────── */
  es: {
    meta: {
      'title.home':     'Paula Martillo · diseño + código ✿',
      'title.about':    'pau.proyectos · sobre mí',
      'title.subjects': 'pau.proyectos · materias',
      'title.projects': 'pau.proyectos · proyectos',
      'title.contact':  'pau.proyectos · contacto',
      'desc.home':      'Portafolio de Pau (Paula Martillo): diseño ideas y las convierto en realidad. UX/UI, product design y desarrollo, desde Guayaquil.',
      'desc.about':     'Pau — estudiante de Ingeniería en Computación que piensa y crea desde el diseño. UX/UI, product design y la intersección entre diseño y código.',
      'desc.subjects':  'Materias de Pau por semestre.',
      'desc.projects':  'Proyectos de Pau: diseño, desarrollo, datos y videojuegos — hackathones, universidad y personales.',
      'desc.contact':   'Contacta a Pau — email, GitHub, LinkedIn y CV.'
    },

    nav: {
      home: 'Inicio', about: 'Sobre mí', subjects: 'Materias', projects: 'Proyectos', contact: 'Contacto',
      menu: 'menú', open: 'Abrir menú', close: 'Cerrar menú'
    },

    foot: { made: 'hecho con', rest: '+ pixeles · por Pau · © 2026', index: 'índice académico ↗' },

    /* ── taskbar (el pequeño sistema operativo) ── */
    task: {
      'app.home': 'inicio', 'app.about': 'sobre_mi.txt', 'app.subjects': 'materias/',
      'app.projects': 'proyectos/', 'app.contact': 'contacto.exe',
      top: 'Volver arriba',
      battery: 'batería creativa: 100% ✿',
      clock: 'Hora local'
    },
    lang: {
      button:  'Cambiar idioma',
      current: 'idioma actual: Español',
      title:   'idioma.sys',
      heading: 'IDIOMA',
      es: 'Español', en: 'English',
      changed: 'Idioma cambiado a Español',
      code: 'es'
    },

    /* ── INICIO ── */
    home: {
      greeting: 'hola, soy',
      role: 'Diseño ideas y las convierto en realidad.',
      sem:  'Ingeniería en Computación · UEES · Guayaquil, Ecuador',
      also: 'y también',
      'w1': 'diseñadora', 'w2': 'ilustradora', 'w3': 'developer', 'w4': 'creadora',
      alsoSr: 'diseñadora, ilustradora, developer y creadora',
      'desc.1': 'Apasionada por la',
      'desc.creativity': 'creatividad',
      'desc.2': 'y la',
      'desc.technology': 'tecnología',
      'desc.3': '— y por todo lo que nace al',
      'desc.unite': 'unirlas',
      'desc.4': '. ✿',
      'btn.projects': 'Ver proyectos',
      'btn.cv': 'Descargar CV',
      'btn.about': 'Sobre mí',
      'status.key': 'disponible',
      'status.txt': 'abierta a pasantías · UX/UI · product design',
      monitor: 'computadora pixel sonriendo',
      scroll: 'desliza para explorar',
      'feat.label': '// proyectos destacados',
      'feat.title': 'de ideas → a cosas reales ✦',
      'feat.sub': 'Algunos proyectos que he hecho realidad.',
      'feat.all': 'ver los 10 proyectos →',
      'p.cta': 'ver proyecto',
      'p.phx.peek': 'Datos satelitales convertidos en una app para cultivar tu propia comida.',
      'p.fire.peek': 'Rutas de escape seguras ante un incendio. Mi parte: el modelado.',
      'p.cat.peek': 'Un juego pixel art en Unity: diseño, ilustración y C#, en equipo.',
      'p.c.ux': 'UX/UI', 'p.c.data': 'datos', 'p.c.model': 'modelado', 'p.c.game': 'videojuego', 'p.c.ill': 'ilustración',
      'bridge.label': '// un poquito más sobre mí ↓',
      'bridge.title': 'Tres cosas que me encanta hacer',
      'bridge.end': '…y lo mejor pasa cuando se juntan. ✿',
      'verb.design': 'diseñar', 'verb.design.what': 'interfaces, ilustración y todo lo visual',
      'verb.build': 'construir', 'verb.build.what': 'prototipos y productos que funcionan',
      'verb.explore': 'explorar', 'verb.explore.what': 'datos, análisis y experimentos',
      'outro.aria': '¿y ahora?', 'outro.label': '// siguiente paso',
      'outro.win': '¿y_ahora?.txt',
      'outro.meet.q': '¿Quieres conocer a la persona detrás de los proyectos?',
      'outro.meet.btn': 'Conoce a Pau →',
      'outro.hire.q': 'Disponible para pasantías',
      'outro.hire.sub': 'UX/UI · product design · desarrollo',
      'outro.hire.btn': 'Escríbeme →'
    },

    /* mensajes de pau.exe (js/home.js) */
    exe: {
      welcome: '¡bienvenid@! ✿',
      welcomeSr: '¡bienvenid@!',
      running: 'pau.exe is running...',
      still:   'still here? ♡',
      states:  ['loading...', 'ready!', 'welcome!', 'pau.exe is running...', 'compilando ideas...', 'hi there ♡'],
      'hint.mail': '> escríbeme ✉',
      'hint.gh':   '> mis repos',
      'hint.in':   '> conectemos ♡',
      min:   'no me minimices :c',
      max:   'ya estoy en grande ✦',
      close: 'nice try :)',
      konami: 'achievement unlocked ✦',
      lang:  'hablemos en español ✿'
    },

    /* ── SOBRE MÍ ── */
    about: {
      'photo.alt': 'Pau sonriendo, con lentes y vincha, en su cuarto lleno de dibujos y plantas',
      'photo.cap': 'pau · guayaquil',
      path: 'C:/pau/sobre_mi.txt',
      hello: 'hola, soy pau',
      lead1: 'Antes de programar, dibujaba. Pasé por la ilustración, el diseño y el marketing antes de llegar a <strong>Ingeniería en Computación</strong>; y en algún momento entendí que no estaba cambiando de rumbo: todo apuntaba al mismo lugar.',
      'lead2.1': 'Me interesa cómo el diseño cambia la forma en que las personas',
      'lead2.interact': 'interactúan',
      'lead2.2': 'con la tecnología. Y como también programo, puedo llevar esas ideas más allá de la pantalla y convertirlas en algo que funciona,',
      'lead2.myself': 'yo misma',
      status: 'abierta a pasantías · UX/UI · product design',

      'route.num': '01 / de dónde vengo',
      'route.title': 'No cambié de carrera: fui juntando piezas.',
      'route.sub': 'Cada etapa me dejó algo que hoy uso al diseñar.',
      'route.win': 'C:/pau/01_ruta',
      'route.ill': 'ilustración', 'route.ill.txt': 'Me enseñó a mirar con calma: proporción, color, detalle.',
      'route.des': 'diseño', 'route.des.txt': 'Entender por qué algo funciona visualmente, y por qué a veces no.',
      'route.mkt': 'marketing', 'route.mkt.txt': 'Recordar que todo lo que hago es para alguien.',
      'route.cs': 'computación', 'route.cs.txt': 'Poder construir lo que antes solo dibujaba.',
      'route.cs.meta': 'UEES · 6to semestre',
      'route.here': 'aquí estoy',
      'route.now': 'ahora:',
      'route.now.txt': 'Donde las cuatro piezas se usan al mismo tiempo.',

      'tools.num': '02 / con qué trabajo',
      'tools.title': 'Diseño primero. El código es cómo lo vuelvo real.',
      'tools.design': 'diseñar', 'tools.design.what': 'interfaces e ilustración',
      'tools.build': 'construir', 'tools.build.what': 'prototipos que funcionan',
      'tools.analyze': 'analizar', 'tools.analyze.what': 'datos antes de decidir',
      'tools.more': 'herramientas adicionales de mi stack',

      'ev.num': '03 / evidencia',
      'ev.title': 'Menos adjetivos, más pruebas.',
      'ev.sub': 'Tres proyectos que dicen más de mí que cualquier lista.',
      'ev.proof': 'lo que demuestra',
      'ev.phx.alt': 'Pantallas del prototipo de la app Grow With Phoenix',
      'ev.phx.seal': '1er lugar internacional',
      'ev.phx.what': 'Cruzamos datos satelitales de Phoenix, Arizona, con el problema de los desiertos alimentarios y lo convertimos en el prototipo de una app que acompaña a la gente a cultivar su propia comida.',
      'ev.phx.proof': 'Puedo llevar un análisis técnico hasta una experiencia que cualquiera entiende.',
      'ev.phx.news': 'noticia UEES', 'ev.phx.cert': 'certificado',
      'ev.fire.alt': 'Visualización de rutas de evacuación ante incendios',
      'ev.fire.seal': '3er lugar general',
      'ev.fire.name': 'Rutas de incendio',
      'ev.fire.win': 'rutas_de_incendio',
      'ev.fire.what': 'Con el equipo Artemis analizamos datos satelitales para predecir rutas de escape seguras durante un incendio, y quedamos primeros en nuestro track. Mi parte fue el modelado.',
      'ev.fire.proof': 'También sé trabajar desde los datos, que es donde empiezan las buenas decisiones de diseño.',
      'ev.fire.link': 'notebook en GitHub',
      'ev.cat.alt': 'Escena pixel art del videojuego Catventures',
      'ev.cat.seal': 'diseño + código',
      'ev.cat.meta': 'Unity 2D · 2026 · proyecto grupal',
      'ev.cat.what': 'Un videojuego pixel art hecho en Unity para aprender C#, donde el diseño y la ilustración fueron parte del trabajo, no un adorno al final.',
      'ev.cat.proof': 'Donde más disfruto es cuando diseño y programación viven en el mismo proyecto.',
      'ev.cat.link': 'repositorio',
      'ev.all': 'ver todos los proyectos →',

      'out.num': '03 / fuera de la pantalla',
      'out.title': 'Pistas sobre mí.',
      'out.sub': 'Lo que hago cuando no estoy en clase (y que se cuela en lo que diseño).',
      'out.win': 'C:/pau/03_pistas',
      'clue.draw':  '<b>Dibujo</b> chibis, libritos y bodegones — a veces todo en la misma página.',
      'clue.paint': '<b>Pinto</b>, y el concept art de Studio Ghibli es mi debilidad.',
      'clue.play':  '<b>Juego</b> videojuegos y, sin querer, termino analizando sus menús.',
      'clue.music': '<b>Música</b> de fondo para dibujar, programar o las dos cosas a la vez.',
      'clue.craft': '<b>Crochet y arcilla</b>: diseñar, pero con las manos.',
      'clue.read':  '<b>Leo</b> bastante. Por eso existe mi <a href="proyectos.html">app de tracking de libros</a>.',

      'next.title': '¿Seguimos?',
      'next.sub': 'Ya sabes de dónde vengo. Ahora mira lo que he construido.',
      'next.projects': 'Ver proyectos',
      'next.write': 'Escríbeme'
    },

    /* ── MATERIAS ── */
    subjects: {
      label: 'Proyectos académicos',
      title: 'Materias',
      'soon.bar': 'próximamente',
      'soon.period': '7mo · 8vo semestre',
      'soon.name': 'Por cursar',
      'soon.txt': 'Espacio reservado para 7mo y 8vo semestre — lo mejor está por venir. ✿'
    },

    /* ── PROYECTOS ── */
    projects: {
      label: 'hackathones, universidad y personales',
      title: 'Proyectos',
      'f.type': 'tipo', 'f.subject': 'materia', 'f.skill': 'habilidad',
      'f.all': 'Todos', 'f.reset': 'limpiar ✕',
      intro: '',
      'f.disc': 'disciplina', 'f.ctx': 'contexto', 'chips.aria': 'Filtrar proyectos',
      'd.diseno': 'Diseño / UX', 'd.desarrollo': 'Desarrollo', 'd.datos': 'Datos', 'd.juegos': 'Videojuegos',
      'c.hackathon': 'Hackathon', 'c.universidad': 'Universidad', 'c.personal': 'Personal',
      feat: '// destacados', arch: '// archivo', 'arch.win': 'C:/pau/proyectos/archivo · {n}',
      view: 'ver proyecto', live: '{n} proyectos',
      'ctx.k': 'de dónde viene:', 'count.all': '{n} proyectos', 'count.some': '{n} de {t} proyectos',
      'type.academico': 'Académicos', 'type.personal': 'Personales', 'type.hackathon': 'Hackathones',
      'tag.academico': 'académico', 'tag.personal': 'personal', 'tag.hackathon': 'hackathon',
      repo: 'ver repo →',
      soon: 'pronto ✦',
      'thumb.soon': '▢ captura<br>pronto',
      empty: 'Sin proyectos con esos filtros… ¡pronto! ✿'
    },

    /* insignias de estado (materias + proyectos) */
    badge: { 'completado': 'listo', 'en-progreso': 'en progreso', 'pronto': 'pronto' },

    /* ── CONTACTO ── */
    contact: {
      label: 'contacto.exe',
      title: 'Hablemos',
      win: 'nuevo_mensaje',
      heart: 'corazón pixel',
      lead: 'Siempre abierta a oportunidades creativas y desafiantes. Escríbeme directo o revisa mis proyectos.',
      cv: 'Descargar CV',
      'cv.win': 'cv_paula_martillo.pdf', 'cv.page': 'pág. 1 / 1',
      'cv.view': 'Ver CV ↗', 'cv.dl': 'Descargar',
      'cv.alt': 'Vista previa del CV de Paula Martillo',
      name: 'nombre', 'name.ph': '¿cómo te llamas?',
      email: 'correo', 'email.ph': 'tu@correo.com',
      msg: 'mensaje', 'msg.ph': 'cuéntame en qué puedo ayudar ✿',
      subject: 'Nuevo mensaje desde tu portafolio ✿',
      send: 'Enviar mensaje →'
    }
  },

  /* ─────────────────────────── ENGLISH ─────────────────────────── */
  en: {
    meta: {
      'title.home':     'Paula Martillo · diseño + código ✿',
      'title.about':    'pau.proyectos · about me',
      'title.subjects': 'pau.proyectos · courses',
      'title.projects': 'pau.proyectos · projects',
      'title.contact':  'pau.proyectos · contact',
      'desc.home':      'Portfolio of Pau (Paula Martillo): I design ideas and bring them to life. UX/UI, product design and development, from Guayaquil.',
      'desc.about':     'Pau — a Computer Engineering student who thinks and builds through design. UX/UI, product design and where design meets code.',
      'desc.subjects':  'Pau’s courses by semester.',
      'desc.projects':  'Pau’s projects: design, development, data and games — hackathons, university and personal.',
      'desc.contact':   'Get in touch with Pau — email, GitHub, LinkedIn and CV.'
    },

    nav: {
      home: 'Home', about: 'About me', subjects: 'Courses', projects: 'Projects', contact: 'Contact',
      menu: 'menu', open: 'Open menu', close: 'Close menu'
    },

    foot: { made: 'made with', rest: '+ pixels · by Pau · © 2026', index: 'academic index ↗' },

    task: {
      'app.home': 'home', 'app.about': 'about_me.txt', 'app.subjects': 'courses/',
      'app.projects': 'projects/', 'app.contact': 'contact.exe',
      top: 'Back to top',
      battery: 'creative battery: 100% ✿',
      clock: 'Local time'
    },
    lang: {
      button:  'Change language',
      current: 'current language: English',
      title:   'language.sys',
      heading: 'LANGUAGE',
      es: 'Español', en: 'English',
      changed: 'Language changed to English',
      code: 'en'
    },

    home: {
      greeting: 'hi, I’m',
      role: 'I design ideas and bring them to life.',
      sem:  'Computer Engineering · UEES · Guayaquil, Ecuador',
      also: 'and also',
      'w1': 'designer', 'w2': 'illustrator', 'w3': 'developer', 'w4': 'creator',
      alsoSr: 'designer, illustrator, developer and creator',
      'desc.1': 'Passionate about',
      'desc.creativity': 'creativity',
      'desc.2': 'and',
      'desc.technology': 'technology',
      'desc.3': '— and everything that comes from',
      'desc.unite': 'combining them',
      'desc.4': '. ✿',
      'btn.projects': 'See projects',
      'btn.cv': 'Download CV',
      'btn.about': 'About me',
      'status.key': 'available',
      'status.txt': 'open to internships · UX/UI · product design',
      monitor: 'smiling pixel computer',
      scroll: 'scroll to explore',
      'feat.label': '// featured projects',
      'feat.title': 'from ideas → to real things ✦',
      'feat.sub': 'A few projects I’ve brought to life.',
      'feat.all': 'see all 10 projects →',
      'p.cta': 'view project',
      'p.phx.peek': 'Satellite data turned into an app for growing your own food.',
      'p.fire.peek': 'Safe escape routes during a wildfire. My part: the modeling.',
      'p.cat.peek': 'A pixel art game in Unity: design, illustration and C#, as a team.',
      'p.c.ux': 'UX/UI', 'p.c.data': 'data', 'p.c.model': 'modeling', 'p.c.game': 'game', 'p.c.ill': 'illustration',
      'bridge.label': '// a little more about me ↓',
      'bridge.title': 'Three things I love to do',
      'bridge.end': '…and the best part happens when they meet. ✿',
      'verb.design': 'design', 'verb.design.what': 'interfaces, illustration and all things visual',
      'verb.build': 'build', 'verb.build.what': 'prototypes and products that actually work',
      'verb.explore': 'explore', 'verb.explore.what': 'data, analysis and experiments',
      'outro.aria': 'what next?', 'outro.label': '// next step',
      'outro.win': 'what_next?.txt',
      'outro.meet.q': 'Want to meet the person behind the projects?',
      'outro.meet.btn': 'Meet Pau →',
      'outro.hire.q': 'Open to internships',
      'outro.hire.sub': 'UX/UI · product design · development',
      'outro.hire.btn': 'Get in touch →'
    },

    exe: {
      welcome: 'welcome! ✿',
      welcomeSr: 'welcome!',
      running: 'pau.exe is running...',
      still:   'still here? ♡',
      states:  ['loading...', 'ready!', 'welcome!', 'pau.exe is running...', 'compiling ideas...', 'hi there ♡'],
      'hint.mail': '> write to me ✉',
      'hint.gh':   '> my repos',
      'hint.in':   '> let’s connect ♡',
      min:   'don’t minimize me :c',
      max:   'already full size ✦',
      close: 'nice try :)',
      konami: 'achievement unlocked ✦',
      lang:  'switching to english ✿'
    },

    about: {
      'photo.alt': 'Pau smiling, wearing glasses and a headband, in her room full of drawings and plants',
      'photo.cap': 'pau · guayaquil',
      path: 'C:/pau/about_me.txt',
      hello: 'hi, I’m pau',
      lead1: 'Before I was into programming, I made art. I went through illustration, design and marketing before landing in <strong>Computer Engineering</strong>; and at some point I realized I wasn’t changing direction: it was all pointing to the same place.',
      'lead2.1': 'I care about how design changes the way people',
      'lead2.interact': 'interact',
      'lead2.2': 'with technology. And since I also code, I can take those ideas beyond the screen and turn them into something that works,',
      'lead2.myself': 'myself',
      status: 'open to internships · UX/UI · product design',

      'route.num': '01 / where I come from',
      'route.title': 'I didn’t switch careers: I kept collecting pieces.',
      'route.sub': 'Every stage left me something I use when I design today.',
      'route.win': 'C:/pau/01_path',
      'route.ill': 'illustration', 'route.ill.txt': 'Taught me to look slowly: proportion, color, detail.',
      'route.des': 'design', 'route.des.txt': 'Understanding why something works visually, and why sometimes it doesn’t.',
      'route.mkt': 'marketing', 'route.mkt.txt': 'Remembering that everything I make is for someone.',
      'route.cs': 'computing', 'route.cs.txt': 'Being able to build what I used to only draw.',
      'route.cs.meta': 'UEES · 6th semester',
      'route.here': 'I’m here',
      'route.now': 'now:',
      'route.now.txt': 'Where all four pieces are used at once.',

      'tools.num': '02 / what I work with',
      'tools.title': 'Design first. Code is how I make it real.',
      'tools.design': 'design', 'tools.design.what': 'interfaces & illustration',
      'tools.build': 'build', 'tools.build.what': 'prototypes that work',
      'tools.analyze': 'analyze', 'tools.analyze.what': 'data before deciding',
      'tools.more': 'more tools in my stack',

      'ev.num': '03 / evidence',
      'ev.title': 'Fewer adjectives, more proof.',
      'ev.sub': 'Three projects that say more about me than any list.',
      'ev.proof': 'what it shows',
      'ev.phx.alt': 'Screens from the Grow With Phoenix app prototype',
      'ev.phx.seal': '1st place worldwide',
      'ev.phx.what': 'We crossed satellite data from Phoenix, Arizona, with the problem of food deserts and turned it into a prototype app that helps people grow their own food.',
      'ev.phx.proof': 'I can take a technical analysis all the way to an experience anyone understands.',
      'ev.phx.news': 'UEES news', 'ev.phx.cert': 'certificate',
      'ev.fire.alt': 'Visualization of wildfire evacuation routes',
      'ev.fire.seal': '3rd place overall',
      'ev.fire.name': 'Wildfire routes',
      'ev.fire.win': 'wildfire_routes',
      'ev.fire.what': 'With team Artemis we analyzed satellite data to predict safe escape routes during a wildfire, and we came first in our track. My part was the modeling.',
      'ev.fire.proof': 'I can also work from the data, which is where good design decisions start.',
      'ev.fire.link': 'notebook on GitHub',
      'ev.cat.alt': 'Pixel art scene from the Catventures video game',
      'ev.cat.seal': 'design + code',
      'ev.cat.meta': 'Unity 2D · 2026 · group project',
      'ev.cat.what': 'A pixel art video game made in Unity to learn C#, where design and illustration were part of the work, not decoration at the end.',
      'ev.cat.proof': 'I enjoy it most when design and programming live in the same project.',
      'ev.cat.link': 'repository',
      'ev.all': 'see all projects →',

      'out.num': '03 / away from the screen',
      'out.title': 'Clues about me.',
      'out.sub': 'What I do when I’m not in class (and what sneaks into my designs).',
      'out.win': 'C:/pau/03_clues',
      'clue.draw':  'I <b>draw</b> chibis, little books and still lifes — sometimes all on the same page.',
      'clue.paint': 'I <b>paint</b>, and Studio Ghibli concept art is my weakness.',
      'clue.play':  'I <b>play</b> video games and, without meaning to, end up analyzing their menus.',
      'clue.music': '<b>Music</b> in the background to draw, code, or both at once.',
      'clue.craft': '<b>Crochet and clay</b>: designing, but with my hands.',
      'clue.read':  'I <b>read</b> a lot. That’s why my <a href="proyectos.html">book tracking app</a> exists.',

      'next.title': 'Shall we keep going?',
      'next.sub': 'Now you know where I come from. Take a look at what I’ve built.',
      'next.projects': 'See projects',
      'next.write': 'Write to me'
    },

    subjects: {
      label: 'Academic projects',
      title: 'Courses',
      'soon.bar': 'coming soon',
      'soon.period': '7th · 8th semester',
      'soon.name': 'Up next',
      'soon.txt': 'Space saved for 7th and 8th semester — the best is yet to come. ✿'
    },

    projects: {
      label: 'hackathons, university & personal',
      title: 'Projects',
      'f.type': 'type', 'f.subject': 'course', 'f.skill': 'skill',
      'f.all': 'All', 'f.reset': 'clear ✕',
      intro: '',
      'f.disc': 'discipline', 'f.ctx': 'context', 'chips.aria': 'Filter projects',
      'd.diseno': 'Design / UX', 'd.desarrollo': 'Development', 'd.datos': 'Data', 'd.juegos': 'Games',
      'c.hackathon': 'Hackathon', 'c.universidad': 'University', 'c.personal': 'Personal',
      feat: '// featured', arch: '// archive', 'arch.win': 'C:/pau/projects/archive · {n}',
      view: 'view project', live: '{n} projects',
      'ctx.k': 'where it’s from:', 'count.all': '{n} projects', 'count.some': '{n} of {t} projects',
      'type.academico': 'Academic', 'type.personal': 'Personal', 'type.hackathon': 'Hackathons',
      'tag.academico': 'academic', 'tag.personal': 'personal', 'tag.hackathon': 'hackathon',
      repo: 'see repo →',
      soon: 'soon ✦',
      'thumb.soon': '▢ screenshot<br>soon',
      empty: 'No projects match those filters… yet! ✿'
    },

    badge: { 'completado': 'done', 'en-progreso': 'in progress', 'pronto': 'soon' },

    contact: {
      label: 'contact.exe',
      title: 'Let’s talk',
      win: 'new_message',
      heart: 'pixel heart',
      lead: 'Always open to creative, challenging opportunities. Write to me directly or take a look at my projects.',
      cv: 'Download CV',
      'cv.win': 'resume_paula_martillo.pdf', 'cv.page': 'p. 1 / 1',
      'cv.view': 'View résumé ↗', 'cv.dl': 'Download',
      'cv.alt': 'Preview of Paula Martillo’s résumé',
      name: 'name', 'name.ph': 'what’s your name?',
      email: 'email', 'email.ph': 'you@email.com',
      msg: 'message', 'msg.ph': 'tell me how I can help ✿',
      subject: 'New message from your portfolio ✿',
      send: 'Send message →'
    }
  }
};
