/* TEXTOS DE CONTACTO · INGLÉS        página: src/pages/contacto.astro */
import type { spanishContacto } from '../es/contacto';

export const englishContacto: Record<keyof typeof spanishContacto, string> = {
  'pages.contact.metaTitle': 'pau.proyectos · contact',
  'pages.contact.metaDescription': 'Get in touch with Pau — email, GitHub, LinkedIn and CV.',
  'taskbar.windowName.contact': 'contact.exe',

  'pages.contact.sectionLabel': 'contact.exe',
  'pages.contact.sectionTitle': 'Let’s talk',
  'pages.contact.composeWindowTitle': 'new_message',
  'pages.contact.lead': 'Always open to creative, challenging opportunities. Write to me directly or take a look at my projects.',
  'pages.contact.resumeDownloadButton': 'Download CV',

  'pages.contact.form.nameLabel': 'name',
  'pages.contact.form.namePlaceholder': 'what’s your name?',
  'pages.contact.form.emailLabel': 'email',
  'pages.contact.form.emailPlaceholder': 'you@email.com',
  'pages.contact.form.messageLabel': 'message',
  'pages.contact.form.messagePlaceholder': 'tell me how I can help ✿',
  'pages.contact.form.emailSubject': 'New message from your portfolio ✿',
  'pages.contact.form.submitButton': 'Send message →',
  'pages.contact.form.submitSending': 'sending…',

  'pages.contact.resume.windowTitle': 'resume_paula_martillo.pdf',
  'pages.contact.resume.pageCounter': 'p. 1 / 1',
  'pages.contact.resume.viewButton': 'View résumé ↗',
  'pages.contact.resume.downloadButton': 'Download',
  'pages.contact.resume.previewAlt': 'Preview of Paula Martillo’s résumé',
};
