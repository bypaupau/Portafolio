/* ═══════════════════════════════════════════════════════════
   TEXTOS COMPARTIDOS · INGLÉS
   Tipado contra las claves del español: si añades una clave allí y te
   olvidas aquí, TypeScript lo marca y el build no pasa.
   ═══════════════════════════════════════════════════════════ */
import type { spanishGlobal } from '../es/global';

export const englishGlobal: Record<keyof typeof spanishGlobal, string> = {
  'navigation.home': 'Home',
  'navigation.about': 'About me',
  'navigation.projects': 'Projects',
  'navigation.creative': 'Creative',
  'navigation.contact': 'Contact',
  'navigation.menuLabel': 'menu',
  'navigation.menuOpen': 'Open menu',
  'navigation.menuClose': 'Close menu',
  'navigation.closeLabel': 'Close',

  'footer.madeWith': 'made with',
  'footer.credit': '+ pixels · by Pau · © 2026',

  'language.spanish': 'Español',
  'language.english': 'English',
  'language.windowTitle': 'language.sys',
  'language.heading': 'LANGUAGE',
  'language.buttonLabel': 'Change language',
  'language.currentLabel': 'current language: English',
  'language.changedAnnouncement': 'Language changed to English',
  'language.formCode': 'en',

  'taskbar.backToTop': 'Back to top',
  'taskbar.battery': 'creative battery: 100% ✿',
  'taskbar.clock': 'Local time',

  /* ── páginas de caso ── */
  'cases.railLabel': 'Case sections',
  'cases.zoomOpen': 'Enlarge image',
  'cases.zoomClose': 'Close the enlarged view',
};
