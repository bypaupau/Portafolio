/* ═══════════════════════════════════════════════════════════
   EL TÍTULO DEL CASO SE ESCRIBE · máquina de escribir
   lo usa: <h1 data-escribir> en las páginas de caso

   El título aparece letra a letra con un cursor pixel, una sola vez,
   y al terminar el cursor se va: la portada queda quieta.

   SIN SALTOS: el texto que falta por escribir ya está en su sitio,
   invisible. Así el título ocupa desde el principio las mismas líneas
   que ocupará al final y nada de debajo se mueve mientras se escribe.

   MEJORA PROGRESIVA: el HTML trae el título completo. Sin JavaScript o
   con «menos movimiento» se queda tal cual. Un lector de pantalla lee
   el título entero (aria-label), no las letras sueltas.
   ═══════════════════════════════════════════════════════════ */
import { motorActivo } from '../global/scroll-reveal';

const PAUSA_INICIAL = 260;   /* ms: deja que la página asiente antes */
const POR_LETRA = 62;        /* ms por letra: ~1,2 s para «Schaman Analytics BI» */

document.querySelectorAll<HTMLElement>('[data-escribir]').forEach((titulo) => {
  const texto = (titulo.textContent ?? '').trim();
  if (!motorActivo || !texto) return;

  titulo.setAttribute('aria-label', texto);
  titulo.textContent = '';
  const visible = document.createElement('span');
  visible.setAttribute('aria-hidden', 'true');
  const escrito = document.createElement('span');
  const cursor = document.createElement('span');
  cursor.className = 'caso-cursor';
  const resto = document.createElement('span');
  resto.className = 'caso-por-escribir';
  resto.textContent = texto;
  visible.append(escrito, cursor, resto);
  titulo.append(visible);

  const letras = Array.from(texto);
  let i = 0;
  const escribir = (): void => {
    i += 1;
    escrito.textContent = letras.slice(0, i).join('');
    resto.textContent = letras.slice(i).join('');
    if (i < letras.length) window.setTimeout(escribir, POR_LETRA);
    else window.setTimeout(() => cursor.remove(), 900);
  };
  window.setTimeout(escribir, PAUSA_INICIAL);
});
