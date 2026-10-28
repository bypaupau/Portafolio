/* ═══════════════════════════════════════════════════════════
   LAS PÁGINAS DE CASO · la barra del caso
   componente: src/components/paginas/casos/BarraDeCaso.astro

   Sale de riel.ts, que sigue sirviendo a Grow With Phoenix hasta la
   etapa 6. La lógica es la misma —qué sección cruzó la línea de
   lectura— con dos cosas más:

     · las paradas anteriores a la activa se marcan .es-leida (sin
       estilo propio en la lista minimalista, pero el estado está)
     · el SUB-ÍNDICE: dentro de la parada abierta, qué sub-bloque
       estás leyendo

   Y en móvil, la franja con la parada actual y su desplegable.

   MEJORA PROGRESIVA: sin JavaScript la barra es una lista de anclas que
   funciona. Esto solo la hace reaccionar.
   ═══════════════════════════════════════════════════════════ */
import { registrarAparicion, motorActivo } from '../global/scroll-reveal';

const barra = document.querySelector<HTMLElement>('.caso-barra');
const lista = barra?.querySelector<HTMLOListElement>('.caso-paradas');

if (barra && lista) {
  document.documentElement.classList.add('caso-con-js');

  const paradas = Array.from(lista.querySelectorAll<HTMLLIElement>(':scope > .caso-parada'));
  const destinoDe = (enlace: HTMLAnchorElement | null): HTMLElement | null => {
    const href = enlace?.getAttribute('href') ?? '';
    return href.startsWith('#') ? document.getElementById(href.slice(1)) : null;
  };
  const secciones = paradas.map((p) => destinoDe(p.querySelector(':scope > a')));
  const subparadas = paradas.map((p) => Array.from(p.querySelectorAll<HTMLLIElement>('.caso-subparada')));
  const subsecciones = subparadas.map((subs) => subs.map((s) => destinoDe(s.querySelector('a'))));

  const franja = barra.querySelector<HTMLElement>('.caso-franja');
  const boton = barra.querySelector<HTMLButtonElement>('.caso-franja-boton');
  const enFranja = (cual: string) => franja?.querySelector<HTMLElement>(`[data-franja="${cual}"]`) ?? null;

  /* la línea de lectura: el nav, la franja si está a la vista, y un respiro */
  const lineaDeLectura = (): number => {
    /* lo que ocupa el nav AHORA: 0 si se apartó al bajar (nav-al-leer.ts) */
    const nav = document.documentElement.classList.contains('nav-escondido') ? 0
      : parseInt(getComputedStyle(document.documentElement).getPropertyValue('--nav-h'), 10) || 54;
    const altoFranja = franja && franja.offsetParent ? barra.offsetHeight : 0;
    return nav + altoFranja + 120;
  };
  const ultimaQueCruzo = (lista: (HTMLElement | null)[], linea: number): number => {
    let cual = -1;
    lista.forEach((s, i) => { if (s && s.getBoundingClientRect().top <= linea) cual = i; });
    return cual;
  };

  const copiarTexto = (origen: HTMLElement | null, destino: HTMLElement | null): void => {
    if (!origen || !destino) return;
    destino.textContent = origen.textContent;
    /* también el otro idioma, por si se cambia con la franja a la vista */
    for (const atributo of ['data-i18n-es', 'data-i18n-en']) {
      const valor = origen.getAttribute(atributo);
      if (valor === null) destino.removeAttribute(atributo);
      else destino.setAttribute(atributo, valor);
    }
  };

  let activa = -1;
  let subActiva = -1;
  const pintar = (): void => {
    const linea = lineaDeLectura();
    let cual = Math.max(0, ultimaQueCruzo(secciones, linea));
    /* al final del documento gana la última: si la sección final es
       corta, nunca llegaría a cruzar la línea */
    if (window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 2) {
      cual = paradas.length - 1;
    }
    const sub = ultimaQueCruzo(subsecciones[cual] ?? [], linea);

    if (cual === activa && sub === subActiva) return;
    const cambioDeParada = cual !== activa;
    activa = cual;
    subActiva = sub;

    paradas.forEach((parada, i) => {
      parada.classList.toggle('es-leida', i < cual);
      parada.classList.toggle('es-aqui', i === cual);
      const enlace = parada.querySelector(':scope > a');
      if (i === cual) enlace?.setAttribute('aria-current', 'true');
      else enlace?.removeAttribute('aria-current');
    });
    subparadas.forEach((subs, i) => subs.forEach((s, j) => {
      const aqui = i === cual && j === sub;
      s.classList.toggle('es-aqui', aqui);
      const enlace = s.querySelector('a');
      if (aqui) enlace?.setAttribute('aria-current', 'true');
      else enlace?.removeAttribute('aria-current');
    }));

    /* la barra toma el color de la sección en la que estás */
    const color = secciones[cual] ? getComputedStyle(secciones[cual]!).getPropertyValue('--caso-acento').trim() : '';
    barra.style.setProperty('--cs', color || 'var(--pink)');

    if (cambioDeParada) {
      const parada = paradas[cual]!;
      const numero = enFranja('num');
      if (numero) numero.textContent = String(cual).padStart(2, '0');
      copiarTexto(parada.querySelector('.caso-parada-nombre'), enFranja('nombre'));
      copiarTexto(parada.querySelector('.caso-parada-papel'), enFranja('papel'));
      const n = enFranja('n');
      if (n) n.textContent = String(cual + 1);
    }
  };

  let pedido = false;
  const alScroll = (): void => {
    if (pedido) return;
    pedido = true;
    requestAnimationFrame(() => { pedido = false; pintar(); });
  };
  window.addEventListener('scroll', alScroll, { passive: true });
  window.addEventListener('resize', alScroll, { passive: true });
  /* al cambiar de idioma, la franja copia el texto nuevo */
  document.addEventListener('langchange', () => { activa = -1; subActiva = -2; pintar(); });
  pintar();

  /* ── el saludo de la mascota ──
     Aparece al abrir la página y se va solo a los 7 segundos, o antes
     si se cierra. Nace oculto en el HTML: sin JavaScript no sale. */
  const saludo = barra.querySelector<HTMLElement>('.caso-saludo');
  if (saludo) {
    const DURA = 7000;
    let temporizador = 0;
    const irse = (): void => {
      window.clearTimeout(temporizador);
      saludo.classList.remove('esta-visible');
      /* se oculta al terminar de desvanecerse (180 ms, como el CSS) */
      window.setTimeout(() => { saludo.hidden = true; }, 200);
    };
    saludo.hidden = false;
    requestAnimationFrame(() => requestAnimationFrame(() => saludo.classList.add('esta-visible')));
    temporizador = window.setTimeout(irse, DURA);
    saludo.querySelector('.caso-saludo-cerrar')?.addEventListener('click', irse);
  }

  /* ── el desplegable de móvil ── */
  const abrir = (siONo: boolean): void => {
    barra.classList.toggle('esta-abierta', siONo);
    boton?.setAttribute('aria-expanded', String(siONo));
  };
  boton?.addEventListener('click', () => abrir(!barra.classList.contains('esta-abierta')));
  /* al elegir una parada el desplegable se cierra: ya cumplió */
  lista.addEventListener('click', (e) => {
    if ((e.target as HTMLElement).closest('a')) abrir(false);
  });
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && barra.classList.contains('esta-abierta')) { abrir(false); boton?.focus(); }
  });
}

/* Los bloques .cs-rv aparecen al bajar, igual que en riel.ts. La clase
   que los esconde solo se pone si el motor está vivo: sin JavaScript (o
   con «menos movimiento») no queda nada invisible. */
if (motorActivo) {
  document.documentElement.classList.add('cs-motion');
  registrarAparicion(document.querySelectorAll('.cs-rv'));
}
