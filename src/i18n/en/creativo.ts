/* TEXTOS DE CREATIVO · INGLÉS         página: src/pages/creativo.astro */
import type { spanishCreativo } from '../es/creativo';

export const englishCreativo: Record<keyof typeof spanishCreativo, string> = {
  'pages.creative.metaTitle': 'pau.proyectos · creative',
  'pages.creative.metaDescription': 'Pau’s other projects and curiosities: illustration, books and creative experiments outside the professional portfolio.',
  'taskbar.windowName.creative': 'creative/',

  'pages.creative.sectionLabel': '// outside the main portfolio',
  'pages.creative.sectionTitle': 'Other projects & curiosities',
  'pages.creative.intro': 'I also make other little things I like to share. Not everything I create fits my professional profile — but that doesn’t mean it doesn’t deserve a space! ♡',
  'pages.creative.galleryHeading': 'Gallery of works',
  'pages.creative.viewWork': 'view work',

  'pages.creative.filters.ariaLabel': 'Filter works',
  'pages.creative.filters.all': 'All',
  'pages.creative.filters.illustration': 'Illustration',
  'pages.creative.filters.personal': 'Personal projects',
  'pages.creative.filters.experiment': 'Creative experiments',
  'pages.creative.filters.other': 'Other',
  'pages.creative.countAll': '{n} works',
  'pages.creative.countSome': '{n} of {t} works',
  'pages.creative.liveAnnouncement': '{n} works',
  'pages.creative.empty': 'Nothing here yet… soon! ✿',

  'pages.creative.soonTitle': 'coming soon',
  'pages.creative.soonText': 'this little corner keeps growing ✿',
};
