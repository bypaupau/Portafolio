/* ═══════════════════════════════════════════════════════════
   CREATIVO · filtrar por categoría      página: src/pages/creativo.astro

   Las tarjetas ya están en el HTML (las escribió Astro al compilar), así
   que filtrar es MOSTRARLAS Y OCULTARLAS, no volver a construirlas. El
   marcado de la tarjeta vive en un solo sitio:
   src/components/piezas/TarjetaDeTrabajo.astro

   Si no hay suficientes trabajos para que los filtros tengan sentido,
   Astro deja la barra oculta y este script no hace nada.
   ═══════════════════════════════════════════════════════════ */
import { textoDe } from '../global/language-runtime';
import { registrarAparicion } from '../global/scroll-reveal';

const barra = document.getElementById('cr-chipbar');
const rejilla = document.getElementById('cr-grid');
const cuenta = document.getElementById('cr-count');
const vacio = document.getElementById('cr-empty');
const anuncio = document.getElementById('cr-live');

if (barra && rejilla && cuenta && vacio && anuncio) {
  const tarjetas = Array.from(rejilla.querySelectorAll<HTMLElement>('[data-categoria]'));
  const proximamente = rejilla.querySelector<HTMLElement>('.cr-soon');
  const total = Number(barra.dataset.total ?? tarjetas.length);
  let categoriaElegida = '';

  /* "{n} de {t} trabajos" → con el número en negrita, como antes */
  const conNumeros = (clave: Parameters<typeof textoDe>[0], visibles: number) =>
    (textoDe(clave) ?? '').replace('{n}', `<b>${visibles}</b>`).replace('{t}', String(total));

  function dibujar(): void {
    let visibles = 0;
    for (const tarjeta of tarjetas) {
      const entra = !categoriaElegida || tarjeta.dataset.categoria === categoriaElegida;
      tarjeta.hidden = !entra;
      if (entra) visibles++;
    }

    /* la ficha "próximamente" solo acompaña a una galería corta */
    if (proximamente) proximamente.hidden = !(visibles > 0 && visibles < 3);

    if (!barra!.hidden) {
      cuenta!.innerHTML = conNumeros(
        visibles === total ? 'pages.creative.countAll' : 'pages.creative.countSome',
        visibles,
      );
    }

    vacio!.hidden = visibles > 0;
    vacio!.textContent = textoDe('pages.creative.empty') ?? '';
    anuncio!.textContent = (textoDe('pages.creative.liveAnnouncement') ?? '').replace('{n}', String(visibles));

    /* las que vuelven a aparecer tienen que poder animarse otra vez */
    registrarAparicion(rejilla!.querySelectorAll('.rv:not([hidden])'));
  }

  barra.addEventListener('click', (evento) => {
    const boton = (evento.target as HTMLElement).closest<HTMLButtonElement>('.chip');
    if (!boton) return;
    categoriaElegida = boton.dataset.val ?? '';
    for (const chip of barra.querySelectorAll<HTMLButtonElement>('.chip')) {
      const activo = (chip.dataset.val ?? '') === categoriaElegida;
      chip.classList.toggle('is-on', activo);
      chip.setAttribute('aria-pressed', String(activo));
    }
    dibujar();
    boton.focus();
  });

  document.addEventListener('langchange', dibujar);
  dibujar();
}
