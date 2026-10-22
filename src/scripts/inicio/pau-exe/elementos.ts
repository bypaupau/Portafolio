/* ═══════════════════════════════════════════════════════════
   pau.exe · LAS PIEZAS Y EL AMBIENTE

   Todo lo de pau.exe empieza aquí: si alguna pieza no está, los demás
   archivos no hacen nada. Así ninguno tiene que comprobarlo otra vez.

   También vive aquí lo que los demás llaman "el ambiente": si la
   persona pidió menos movimiento, si hay un mouse de verdad, y si la
   portada está a la vista. Las reglas del sitio anterior se conservan:

     · menos movimiento → nada automático ni animado; los clics siguen
       respondiendo, pero el cambio es instantáneo
     · táctil → sin hovers ni cursor que seguir
     · pestaña oculta o portada fuera de pantalla → no se gasta nada
   ═══════════════════════════════════════════════════════════ */

export const menosMovimiento = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
export const punteroFino = window.matchMedia('(hover: hover) and (pointer: fine)').matches;

const portada = document.querySelector<HTMLElement>('.hero');
export const ventana = document.querySelector<HTMLElement>('.hero-card');
export const compu = ventana?.querySelector<SVGSVGElement>('.mon') ?? null;
export const renglon = ventana?.querySelector<HTMLElement>('.cap-type') ?? null;

/** ¿Están todas las piezas? Si no, pau.exe no se enciende. */
export const hayPauExe = Boolean(portada && ventana && compu && renglon);

let portadaALaVista = true;
if (portada && 'IntersectionObserver' in window) {
  new IntersectionObserver(
    (entradas) => { portadaALaVista = entradas[0]!.isIntersecting; },
    { threshold: 0.05 },
  ).observe(portada);
}

/** ¿Vale la pena hacer algo ahora mismo? */
export function enPantalla(): boolean {
  return portadaALaVista && !document.hidden;
}

/** Un número al azar entre los dos, para que nada se sienta mecánico. */
export function alAzar(desde: number, hasta: number): number {
  return desde + Math.random() * (hasta - desde);
}
