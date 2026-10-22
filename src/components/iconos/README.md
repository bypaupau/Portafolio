# icons/ · los sprites pixel como componentes

Antes estos SVG vivían como **cadenas de JavaScript** dentro de `js/i18n.js`,
concatenadas con `+`. Eso los volvía imposibles de leer y de editar: un pixel
mal puesto significaba contar comillas.

Aquí cada uno es un componente con su SVG escrito tal cual. Los datos de ruta
(`d="M3 0h5v1H3z…"`) son **idénticos** a los originales: no se redibujó nada.

`shape-rendering="crispEdges"` es lo que mantiene los bordes duros del pixel
art. No lo quites.
