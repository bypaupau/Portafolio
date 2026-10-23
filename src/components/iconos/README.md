# icons/ · los sprites pixel como componentes

Antes estos SVG vivían como **cadenas de JavaScript** dentro de `js/i18n.js`,
concatenadas con `+`. Eso los volvía imposibles de leer y de editar: un pixel
mal puesto significaba contar comillas.

Aquí cada uno es un componente con su SVG escrito tal cual. Los datos de ruta
(`d="M3 0h5v1H3z…"`) son **idénticos** a los originales: no se redibujó nada.

`shape-rendering="crispEdges"` es lo que mantiene los bordes duros del pixel
art. No lo quites.

## No todos son pixel

`IconoLupa` e `IconoEquis` son de TRAZO, no sprites: vienen de Lucide
(licencia ISC) y los usa la vista ampliada de las imágenes. Por eso son
los dos únicos de esta carpeta SIN `crispEdges` — suavizar un trazo
redondo es lo correcto; suavizar un píxel, no.

Lo que sí comparten con el resto: el color entra por `currentColor` y
ninguno lleva un hexadecimal escrito dentro.
