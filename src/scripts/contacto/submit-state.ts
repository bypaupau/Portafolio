/* ═══════════════════════════════════════════════════════════
   CONTACTO · el estado "enviando…"

   El formulario de Formspree navega de verdad, así que este estado
   se ve el ratito que tarda en irse la página. Es el único momento
   del sitio con una espera real que avisar.
   ═══════════════════════════════════════════════════════════ */
import { textoDe } from '../global/language-runtime';

const formulario = document.querySelector<HTMLFormElement>('.contact-form');

formulario?.addEventListener('submit', () => {
  const boton = formulario.querySelector<HTMLButtonElement>('button[type="submit"]');
  if (!boton) return;
  boton.classList.add('is-sending');
  const texto = textoDe('pages.contact.form.submitSending');
  if (texto !== null) boton.textContent = texto;
});
