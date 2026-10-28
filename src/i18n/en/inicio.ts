/* ═══════════════════════════════════════════════════════════
   TEXTOS DE INICIO · INGLÉS           página: src/pages/index.astro
   Mismas claves que en es/inicio.ts; el tipo de abajo hace que falte
   una sea un error al compilar.
   ═══════════════════════════════════════════════════════════ */
import type { spanishInicio } from '../es/inicio';

export const englishInicio: Record<keyof typeof spanishInicio, string> = {

  /* ── cabecera de la página (no se ve en pantalla) ── */
  'pages.home.metaTitle': 'Paula Martillo · diseño + código ✿',
  'pages.home.metaDescription': 'Portfolio of Pau (Paula Martillo): I design ideas and bring them to life. UX/UI, product design and development, from Guayaquil.',
  'taskbar.windowName.home': 'home',

  /* ── hero · quién es, en cinco segundos ── */
  'pages.home.greeting': 'hi, I’m',
  'pages.home.role': 'I design ideas and bring them to life.',
  'pages.home.studies': 'Computer Engineering · UEES · Guayaquil, Ecuador',
  'pages.home.also': 'and also',
  'pages.home.also.word.1': 'designer',
  'pages.home.also.word.2': 'illustrator',
  'pages.home.also.word.3': 'developer',
  'pages.home.also.word.4': 'creator',
  'pages.home.also.forScreenReaders': 'designer, illustrator, developer and creator',
  'pages.home.passion.start': 'Passionate about',
  'pages.home.passion.creativity': 'creativity',
  'pages.home.passion.and': 'and',
  'pages.home.passion.technology': 'technology',
  'pages.home.passion.middle': '— and everything that comes from',
  'pages.home.passion.unite': 'combining them',
  'pages.home.passion.end': '. ✿',
  'pages.home.button.projects': 'See projects',
  'pages.home.button.resume': 'Download CV',
  'pages.home.status.label': 'available',
  'pages.home.status.text': 'open to internships · UX/UI · product design',
  'pages.home.scrollHint': 'scroll to explore',

  /* ── pau.exe · la ventana con la compu ── */
  'pages.home.exe.computerDescription': 'smiling pixel computer',
  'pages.home.exe.welcomeForScreenReaders': 'welcome!',
  'pages.home.exe.welcome': 'welcome! ✿',
  'pages.home.exe.running': 'pau.exe is running...',
  'pages.home.exe.stillHere': 'still here? ♡',
  'pages.home.exe.languageChanged': 'switching to english ✿',
  'pages.home.exe.minimize': 'don’t minimize me :c',
  'pages.home.exe.maximize': 'already full size ✦',
  'pages.home.exe.close': 'nice try :)',
  'pages.home.exe.konami': 'achievement unlocked ✦',
  'pages.home.exe.hint.email': '> write to me ✉',
  'pages.home.exe.hint.github': '> my repos',
  'pages.home.exe.hint.linkedin': '> let’s connect ♡',

  /* ── puente · tres verbos que la describen ── */
  'pages.home.verbs.label': '// a little more about me ↓',
  'pages.home.verbs.title': 'Three things I love to do',
  'pages.home.verbs.design': 'design',
  'pages.home.verbs.design.what': 'interfaces, illustration and all things visual',
  'pages.home.verbs.build': 'build',
  'pages.home.verbs.build.what': 'prototypes and products that actually work',
  'pages.home.verbs.explore': 'explore',
  'pages.home.verbs.explore.what': 'data, analysis and experiments',
  'pages.home.verbs.end': '…and the best part happens when they meet. ✿',

  /* ── proyectos destacados · las tres tarjetas ── */
  'pages.home.featured.label': '// A little bit of my work',
  'pages.home.featured.title': 'From ideas to real projects ',
  'pages.home.featured.subtitle': 'A few projects I’ve been a part of',
  'pages.home.featured.seeAll': 'see all my projects →',
  'pages.home.featured.viewProject': 'view project',
  'pages.home.featured.phoenix.award': '1st place worldwide',
  'pages.home.featured.phoenix.imageAlt': 'Screens from the Grow With Phoenix app prototype',
  'pages.home.featured.phoenix.peek': 'Satellite data turned into an app for growing your own food.',
  'pages.home.featured.schaman.award': 'redesign',
  'pages.home.featured.wildfire.name': 'Wildfire routes',
  'pages.home.featured.wildfire.windowTitle': 'wildfire_routes',
  'pages.home.featured.schaman.imageAlt': 'Redesigned Schaman Analytics BI overview: the overall score and the five indicators',
  'pages.home.featured.schaman.peek': 'A dashboard that already worked, redesigned to be easier to explore. My part: the interface.',
  'pages.home.featured.catventures.award': 'design + code',
  'pages.home.featured.catventures.imageAlt': 'Pixel art scene from the Catventures video game',
  'pages.home.featured.catventures.peek': 'A pixel art game in Unity: design, illustration and C#, as a team.',
  'pages.home.featured.chip.uxui': 'UX/UI',
  'pages.home.featured.chip.data': 'data',
  'pages.home.featured.chip.modeling': 'modeling',
  'pages.home.featured.chip.game': 'game',
  'pages.home.featured.chip.illustration': 'illustration',

  /* ── cierre · ¿y ahora? ── */
  'pages.home.next.sectionLabel': 'what next?',
  'pages.home.next.windowTitle': 'what_next?.txt',
  'pages.home.next.meet.question': 'Want to meet the person behind the projects?',
  'pages.home.next.meet.button': 'Meet Pau →',
  'pages.home.next.hire.question': 'Open to internships',
  'pages.home.next.hire.subtitle': 'UX/UI · product design · development',
  'pages.home.next.hire.button': 'Get in touch →',

  /* ── los mensajes que cuenta la compu al hacerle clic ── */
  'pages.home.exe.state.1': 'loading...',
  'pages.home.exe.state.2': 'ready!',
  'pages.home.exe.state.3': 'welcome!',
  'pages.home.exe.state.4': 'pau.exe is running...',
  'pages.home.exe.state.5': 'compiling ideas...',
  'pages.home.exe.state.6': 'hi there ♡',
} as const;
