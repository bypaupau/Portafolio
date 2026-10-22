# La hoja compartida, por partes

`global.css` ya no tiene reglas: es un **índice** de 35 `@import` agrupados en
cuatro carpetas, de lo más general a lo más específico.

```
global.css          el índice · EL ORDEN DE SUS @import ES LA CASCADA
base/           7   los cimientos: variables, anchos, encabezados, animación, cursor
componentes/    5   piezas que se repiten: nav · ventana · botones · pie · taskbar
paginas/       19   lo propio de cada página, en el orden en que se recorre el sitio
ajustes/        4   lo que REESCRIBE a todo lo de arriba
```

## Antes de tocar nada, lee esto

En CSS, cuando dos reglas con la **misma especificidad** declaran la misma
propiedad sobre el mismo elemento, **gana la última**. Así que el orden de los
`@import` no es decorativo: es parte del diseño.

De ahí sale la regla de oro de estas cuatro carpetas:

> un archivo puede pisar a los de arriba, nunca a los de abajo.

Si escribes algo en `base/` y no se ve, es porque algo más abajo lo está
pisando. Búscalo ahí; no subas tu regla.

## Por qué existe `ajustes/`

Es la carpeta que hace que el agrupamiento funcione. Cuatro archivos tienen
como **trabajo** volver a escribir propiedades que ya están puestas más arriba,
así que no son cimientos: si suben, se quedan sin efecto.

| archivo | qué hace | por qué va al final |
|---|---|---|
| `rejilla-comun.css` | ≥1100px: el grid de dos columnas | refina el hero, los destacados y los títulos que ya existen |
| `responsive.css` | ≤1024px hasta el celular | reescribe el nav (hamburguesa), el contenedor, los botones |
| `hero-entre-barras.css` | el alto del hero | necesita `--task-h` del taskbar **y** pisar el `min-height` del hero |
| `menos-movimiento.css` | `prefers-reduced-motion` | apaga animaciones definidas más arriba |

Los dos primeros son espejo uno del otro: son los dos escalones de tamaño, uno
hacia arriba y otro hacia abajo. Antes estaban en `base/`, que es justo donde no
podían funcionar.

## ¿Dónde pongo un archivo nuevo?

- ¿define algo que usarán varias páginas? → `base/`
- ¿es una pieza que se repite (una barra, una tarjeta)? → `componentes/`
- ¿es de una página sola? → `paginas/`, al lado de los de su página
- ¿su trabajo es pisar lo que ya existe (un escalón de tamaño, un modo, un
  parche)? → `ajustes/`

Si dudas entre `paginas/` y `ajustes/`, pregúntate si la regla volvería a
escribir una propiedad que ya está puesta más arriba. Si sí, es `ajustes/`.

Después añade su `@import` en el grupo que le toca y corre `npm run cascada`.

## Cómo sé que agrupar no cambió nada

Tres pruebas. Las dos primeras son automáticas y se pueden repetir siempre:

1. **`npm run cambios`** — rejunta los 35 trozos en el orden que tenían en el
   archivo único y lo compara contra `css/styles.css` (el de la versión
   anterior, que sigue en su sitio).

   Al cerrar la etapa 7b daba **1390 líneas idénticas carácter por carácter**:
   la prueba de que partir y reagrupar no perdió ni cambió ninguna regla.

   Desde la etapa 8 ya no es una prueba sino un **registro**: el CSS se empezó
   a editar a propósito (colores y grosores a tokens), así que ahora lista
   línea por línea qué se desvió del original y de qué archivo salió. Se lee
   para entender, no para aprobar.

2. **`npm run cascada`** — compara el orden de hoy contra el original y lista
   los pares de reglas que cambiarían de ganador. Hoy: **0**.
   → *ninguna regla pasó a ganarle a otra.*

   Entiende las **abreviaturas**: `margin:0 0 16px` y `margin-top:12px`
   compiten aunque no se llamen igual. Y descarta pares por cuatro razones,
   todas seguras: `!important` en un solo lado, el mismo valor declarado en los
   dos, selectores que terminan en etiquetas distintas, y `@media` que no pueden
   cumplirse a la vez (`hover:none` contra `hover:hover`). El filtro final abre
   las 7 páginas construidas para ver si existe de verdad un elemento que
   coincida con los dos selectores: si no existe en el portafolio, no hay choque.

   > **Esta prueba ya falló una vez, y conviene saber cómo.** Al reagrupar se
   > puso `contacto-layout.css` antes de `contacto-campos.css`. Los dos definen
   > `.contact-intro .about-lead`: layout con `margin:0 0 16px` y campos con
   > `margin-top:12px`. En el archivo original layout iba después y ganaba; al
   > invertirlos empezó a ganar el `margin-top:12px` y la intro de Contacto
   > quedó **12 px más alta**. La herramienta dijo «0 choques» porque comparaba
   > *nombres* de propiedad y `margin` no es `margin-top`. Lo encontraron las
   > capturas en la etapa siguiente. Ahora expande las abreviaturas y lo
   > detecta; el `@import` de esos dos archivos lleva un comentario explicando
   > por qué ese orden no se puede «ordenar».
   >
   > La lección: `cascada` es rápida y precisa, pero **las capturas son la
   > verdad**. Si cambias el orden, corre las dos.

3. Y a mano, una vez: construir con el orden viejo y con el nuevo da **las
   mismas 821 reglas compiladas, el mismo multiconjunto exacto y los mismos
   90 850 bytes**, solo en otro orden.

Mismo contenido + mismos ganadores = se ve igual. Encima de todo eso están las
70 capturas de `npm run comparar`, que son las que vigilan que un cambio hecho
a propósito no rompa otra cosa sin querer.

## Los colores y los grosores no se escriben a mano

Desde la etapa 8, **ningún dibujo lleva un color escrito en hexadecimal**: los
723 que había en los 28 componentes SVG pasaron a `var(--token)`. Y los grosores
de los trazos a mano (`--trazo-subrayado`, `--trazo-circulo`) estaban escritos
dos veces, con los mismos números, en `inicio-texto-anotado.css` y en
`sobre-mi.css`; ahora viven una vez en `base/tokens.css`.

Así que para cambiar el color o el grosor de un dibujo **se edita un número en
`base/tokens.css`** y cambia en todas las páginas. Lo comprobamos: la
sustitución de los 723 colores dio exactamente las mismas cifras de píxeles que
antes, hasta el último píxel.

Eso incluye el **bocadillo de Sobre mí**, que era la excepción. Su borde era un
`border-image` de nueve cortes alimentado por dos SVG, y tenía un problema que
no se ve hasta que lo mides: esos SVG no traían `width` ni `height`, solo
`viewBox`. Sin tamaño intrínseco, el navegador los estiraba al tamaño de la
caja **antes** de cortarlos, así que el grosor del trazo cambiaba según cuánto
texto hubiera dentro — medía 2 px arriba y 4 px abajo.

Ahora el recuadro es un `border` de CSS corriente y la colita es un componente,
`ColaDeBocadillo.astro`, con el trazado original dentro. Los dos leen
`--trazo-bocadillo`, así que el grosor se cambia en un sitio y es el mismo por
los cuatro lados.

> Ojo con una prueba que **ya no sirve** para cambios de orden: en la etapa 7
> (partir el archivo) se comprobaba que el CSS compilado fuera idéntico byte a
> byte. Reordenar cambia ese archivo por definición, así que esa prueba
> necesariamente falla y no prueba nada. Para orden se usan las tres de arriba.

## Las otras dos hojas

No están aquí porque no las carga `global.css`, sino su propia página. Están
partidas igual que esta, cada una con su índice:

- `src/styles/sobre-mi/sobre-mi.css` — 13 partes en `sobre-mi/partes/`
- `src/styles/casos/caso.css` — 25 partes en `casos/partes/`

Las tres se parten con la misma herramienta:

```
node scripts/partir-hoja.mjs <archivo.css> <carpeta-destino>
```

Corta por las cabeceras de sección que el propio archivo ya tiene, escribe una
por archivo y convierte el original en índice. No toca ni una regla: rejuntar
los trozos da el archivo original byte a byte.

Y las tres las vigilan las mismas dos comprobaciones: `npm run cascada` (que
el orden no cambie de ganador) y `npm run cambios` (qué se ha editado desde
que se partieron). El registro de las tres está en
`scripts/hojas-partidas.mjs`.
