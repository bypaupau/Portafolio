/* ═══════════════════════════════════════════════════════════
   PROYECTOS · filtrar por disciplina   página: src/pages/proyectos.astro

   Las tarjetas y las filas ya están en el HTML (las escribió Astro al
   compilar), así que filtrar es MOSTRARLAS Y OCULTARLAS. El marcado vive
   en un solo sitio: los componentes.

   Conserva lo que ya hacía el sitio anterior:
     · el filtro elegido queda en la URL (?disciplina=datos), así que se
       puede compartir o recargar sin perderlo
     · una opción sin resultados se atenúa (data-zero) en vez de contar
     · el archivo hace el cruce corto .fx-swap al cambiar de filtro,
       pero NO en la primera carga
   ═══════════════════════════════════════════════════════════ */
import { textoDe } from '../global/language-runtime';
import { registrarAparicion } from '../global/scroll-reveal';

const barra = document.querySelector<HTMLElement>('.chipbar');
const rejillaDestacados = document.getElementById('feat-grid');
const listaArchivo = document.getElementById('arch-list');
const contador = document.getElementById('fx-count');
const tituloArchivo = document.getElementById('arch-title');
const seccionDestacados = document.getElementById('sec-feat');
const seccionArchivo = document.getElementById('sec-arch');
const vacio = document.getElementById('no-proj');
const anuncio = document.getElementById('proj-live');
const intro = document.getElementById('proj-intro');

if (barra && rejillaDestacados && listaArchivo && contador && tituloArchivo
    && seccionDestacados && seccionArchivo && vacio && anuncio && intro) {

  const destacados = Array.from(rejillaDestacados.querySelectorAll<HTMLElement>('[data-disciplinas]'));
  const filas = Array.from(listaArchivo.querySelectorAll<HTMLElement>('[data-disciplinas]'));
  const total = Number(barra.dataset.total ?? destacados.length + filas.length);
  const chips = Array.from(barra.querySelectorAll<HTMLButtonElement>('.chip'));
  const tabs = barra.querySelector<HTMLElement>('#chips-d');

  const disciplinasDe = (el: HTMLElement) => (el.dataset.disciplinas ?? '').split('|').filter(Boolean);
  const entra = (el: HTMLElement, disciplina: string) =>
    !disciplina || disciplinasDe(el).includes(disciplina);

  /* el filtro inicial puede venir en la URL: ?disciplina=datos */
  const valoresValidos = chips.map((c) => c.dataset.val ?? '');
  const deLaUrl = new URLSearchParams(location.search).get('disciplina') ?? '';
  let disciplinaElegida = valoresValidos.includes(deLaUrl) ? deLaUrl : '';

  let primeraVez = true;

  function dibujar(): void {
    let visiblesDestacados = 0;
    for (const tarjeta of destacados) {
      const sale = entra(tarjeta, disciplinaElegida);
      tarjeta.hidden = !sale;
      if (sale) visiblesDestacados++;
    }
    let visiblesArchivo = 0;
    for (const fila of filas) {
      const sale = entra(fila, disciplinaElegida);
      fila.hidden = !sale;
      if (sale) visiblesArchivo++;
    }
    const visibles = visiblesDestacados + visiblesArchivo;

    /* el estado de cada pestaña */
    for (const chip of chips) {
      const valor = chip.dataset.val ?? '';
      const activa = valor === disciplinaElegida;
      chip.classList.toggle('is-on', activa);
      chip.setAttribute('aria-pressed', String(activa));
    }

    const plantilla = visibles === total ? 'pages.projects.countAll' : 'pages.projects.countSome';
    contador!.innerHTML = (textoDe(plantilla) ?? '')
      .replace('{n}', `<b>${visibles}</b>`)
      .replace('{t}', String(total));

    seccionDestacados!.hidden = visiblesDestacados === 0;
    seccionArchivo!.hidden = visiblesArchivo === 0;
    tituloArchivo!.textContent = (textoDe('pages.projects.archiveWindowTitle') ?? '')
      .replace('{n}', String(visiblesArchivo));

    vacio!.hidden = visibles > 0;
    vacio!.textContent = textoDe('pages.projects.empty') ?? '';
    anuncio!.textContent = (textoDe('pages.projects.liveAnnouncement') ?? '').replace('{n}', String(visibles));

    /* las que reaparecen tienen que poder animarse */
    registrarAparicion(rejillaDestacados!.querySelectorAll('.rv:not([hidden])'));

    /* el cruce corto del archivo: solo al CAMBIAR de filtro */
    if (!primeraVez) {
      listaArchivo!.classList.remove('fx-swap');
      void listaArchivo!.offsetWidth;        /* reinicia la animación */
      listaArchivo!.classList.add('fx-swap');
    }
    primeraVez = false;

    /* celular: la pestaña elegida siempre a la vista */
    const activa = barra!.querySelector<HTMLElement>('.chip.is-on');
    if (tabs && activa && tabs.scrollWidth > tabs.clientWidth) {
      tabs.scrollLeft = Math.max(0, activa.offsetLeft - 24);
    }
  }

  barra.addEventListener('click', (evento) => {
    const chip = (evento.target as HTMLElement).closest<HTMLButtonElement>('.chip');
    if (!chip) return;
    disciplinaElegida = chip.dataset.val ?? '';
    dibujar();
    chip.focus();

    /* el filtro queda en la URL, para poder compartirla o recargar */
    const parametros = new URLSearchParams();
    if (disciplinaElegida) parametros.set('disciplina', disciplinaElegida);
    const consulta = parametros.toString();
    try {
      history.replaceState(null, '', location.pathname + (consulta ? `?${consulta}` : ''));
    } catch { /* algunos navegadores lo bloquean en file:// */ }
  });

  document.addEventListener('langchange', dibujar);
  dibujar();
}
