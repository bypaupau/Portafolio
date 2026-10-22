/* ═══════════════════════════════════════════════════════════
   TEXTOS DE SOBRE MÍ · INGLÉS         página: src/pages/sobre-mi.astro
   Las claves son exactamente las mismas que en es/sobre-mi.ts; el tipo
   de abajo hace que falte una sea un error al compilar.
   ═══════════════════════════════════════════════════════════ */
import type { spanishSobreMi } from '../es/sobre-mi';

export const englishSobreMi: Record<keyof typeof spanishSobreMi, string> = {

  /* ── cabecera de la página (no se ve en pantalla) ── */
  'pages.about.metaTitle': 'pau.proyectos · about me',
  'pages.about.metaDescription': 'Pau — a Computer Engineering student who thinks and builds through design. UX/UI, product design and where design meets code.',
  'taskbar.windowName.about': 'about_me.txt',

  /* ── hero · polaroid e introducción ── */
  'pages.about.photo.alt': 'Pau smiling, wearing glasses and a headband, in her room full of drawings and plants',
  'pages.about.photo.caption': 'pau · guayaquil',
  'pages.about.filePath': 'C:/pau/about_me.txt',
  'pages.about.hello': 'hi, I’m pau',
  'pages.about.lead.first': 'Before I was into programming, I made art. I went through illustration, design and marketing before landing in <strong>Computer Engineering</strong>; and at some point I realized I wasn’t changing direction: it was all pointing to the same place.',
  'pages.about.lead.second.start': 'I care about how design changes the way people',
  'pages.about.lead.second.interact': 'interact',
  'pages.about.lead.second.middle': 'with technology. And since I also code, I can take those ideas beyond the screen and turn them into something that works,',
  'pages.about.lead.second.myself': 'myself',
  'pages.about.status': 'open to internships · UX/UI · product design',

  /* ── ¿qué estoy haciendo ahora? · el bocadillo bajo el hero ── */
  'pages.about.now.question': 'what am I up to right now...?',
  'pages.about.now.uiuxCourse': 'watching Fundamentals of UI/UX Design by CalArts · Coursera',
  'pages.about.now.webBootcamp': 'watching The Complete Full-Stack Web Development Bootcamp by Angela Yu · Udemy',
  'pages.about.now.dataScienceProgram': 'registered for GCI World Data Science by University of Tokyo 2026',
  'pages.about.now.ownProjects': 'Working on my portfolio, personal projects and university',

  /* ── 01 · la ruta ── */
  'pages.about.route.eyebrow': '01 / where I come from',
  'pages.about.route.title': 'Combining the pieces in my path.',
  'pages.about.route.subtitle': 'Every stage left me something I use when I design today.',
  'pages.about.route.windowTitle': 'C:/pau/01_path',
  'pages.about.route.illustration': 'illustration',
  'pages.about.route.illustration.text': 'Taught me to look slowly: proportion, color, detail.',
  'pages.about.route.design': 'design',
  'pages.about.route.design.text': 'Understanding why something works visually, and why sometimes it doesn’t.',
  'pages.about.route.marketing': 'marketing',
  'pages.about.route.marketing.text': 'Remembering that everything I make is for someone.',
  'pages.about.route.computing': 'computing',
  'pages.about.route.computing.text': 'Being able to build what I used to only draw.',
  'pages.about.route.computing.meta': 'UEES · 6th semester',
  'pages.about.route.youAreHere': 'I’m here',
  'pages.about.route.nowLabel': 'now:',
  'pages.about.route.now.text': 'Where all four pieces are used at once.',

  /* ── 02 · herramientas, agrupadas por lo que hace con ellas ── */
  'pages.about.tools.eyebrow': '02 / what I work with',
  'pages.about.tools.title': 'Design first. Code is how I make it real.',
  'pages.about.tools.design.verb': 'design',
  'pages.about.tools.design.what': 'interfaces & illustration',
  'pages.about.tools.build.verb': 'build',
  'pages.about.tools.build.what': 'prototypes that work',
  'pages.about.tools.analyze.verb': 'analyze',
  'pages.about.tools.analyze.what': 'data before deciding',
  'pages.about.tools.more': 'more tools in my stack',

  /* ── 03 · pistas, fuera de la pantalla ── */
  'pages.about.clues.eyebrow': '03 / away from the screen',
  'pages.about.clues.title': 'Clues about me.',
  'pages.about.clues.subtitle': 'What I do when I’m not in class (and what sneaks into my designs).',
  'pages.about.clues.windowTitle': 'C:/pau/03_clues',
  'pages.about.clues.draw': 'I <b>draw</b> chibis, little books and still lifes — sometimes all on the same page.',
  'pages.about.clues.paint': 'I <b>paint</b>, and Studio Ghibli concept art is my weakness.',
  'pages.about.clues.play': 'I <b>play</b> video games and, without meaning to, end up analyzing their menus.',
  'pages.about.clues.music': '<b>Music</b> in the background to draw, code, or both at once.',
  'pages.about.clues.craft': '<b>Crochet and clay</b>: designing, but with my hands.',
  'pages.about.clues.read': 'I <b>read</b> a lot. That’s why my <a href="{pagina:proyectos}">book tracking app</a> exists.',

  /* ── cierre ── */
  'pages.about.next.title': 'Shall we keep going?',
  'pages.about.next.subtitle': 'Now you know where I come from. Take a look at what I’ve built.',
  'pages.about.next.projects': 'See projects',
  'pages.about.next.write': 'Write to me',
} as const;
