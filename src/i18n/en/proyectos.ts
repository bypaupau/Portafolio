/* TEXTOS DE PROYECTOS · INGLÉS      página: src/pages/proyectos.astro */
import type { spanishProyectos } from '../es/proyectos';

export const englishProyectos: Record<keyof typeof spanishProyectos, string> = {
  'pages.projects.metaTitle': 'pau.proyectos · projects',
  'pages.projects.metaDescription': 'Pau’s projects: design, development, data and games — hackathons, university and personal.',
  'taskbar.windowName.projects': 'projects/',

  'pages.projects.sectionLabel': 'hackathons, university & personal',
  'pages.projects.sectionTitle': 'Projects',
  'pages.projects.featuredHeading': '// featured',
  'pages.projects.archiveHeading': '// archive',
  'pages.projects.archiveWindowTitle': 'C:/pau/projects/archive · {n}',

  'pages.projects.filters.ariaLabel': 'Filter projects',
  'pages.projects.filters.all': 'All',
  'pages.projects.filters.design': 'Design / UX',
  'pages.projects.filters.development': 'Development',
  'pages.projects.filters.data': 'Data',
  'pages.projects.filters.games': 'Games',
  'pages.projects.countAll': '{n} projects',
  'pages.projects.countSome': '{n} of {t} projects',
  'pages.projects.liveAnnouncement': '{n} projects',
  'pages.projects.empty': 'No projects match those filters… yet! ✿',

  'pages.projects.context.hackathon': 'Hackathon',
  'pages.projects.context.university': 'University',
  'pages.projects.context.personal': 'Personal',

  'pages.projects.viewProject': 'view project',
  'pages.projects.readCase': 'read the case',
  'pages.projects.viewRepo': 'see repo →',
  'pages.projects.soon': 'soon ✦',

  'pages.projects.goToCase': 'go to case study',
  'pages.projects.viewRepository': 'view repository',

  'pages.projects.badge.inProgress': 'in progress',
};
