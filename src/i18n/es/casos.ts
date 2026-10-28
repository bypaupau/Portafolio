/* ═══════════════════════════════════════════════════════════
   TEXTOS DE LAS PÁGINAS DE CASO · ESPAÑOL
   piezas: src/components/paginas/casos/BarraDeCaso.astro
   Solo la INTERFAZ de la barra del caso. El texto de cada caso vive en
   src/content/casos/. Lo que comparten los dos casos desde antes
   (cases.railLabel, el zoom) sigue en global.ts.
   ═══════════════════════════════════════════════════════════ */
export const spanishCasos = {
  /* el rótulo de la barra; también nombra al <nav> y al botón de móvil,
     que dice si está abierto con aria-expanded y no cambiando de nombre */
  'cases.bar.title': 'Índice del caso',
  'cases.bar.back': '← Proyectos',
  'cases.bar.top': '↑ Volver arriba',
  /* la franja de móvil: «1 de 8» */
  'cases.bar.of': 'de',
  /* el botón de un vídeo, delante de lo que el vídeo enseña */
  'cases.video.play': 'Reproducir el vídeo:',
} as const;
