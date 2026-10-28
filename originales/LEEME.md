# originales/ · las imágenes de origen

Nada de esta carpeta se publica. De aquí sale, con `npm run imagenes`, lo que sí
se publica en `public/images/`.

```
originales/
  images/proyectos/     las 10 capturas de proyectos a tamaño completo (hasta 3248px)
  images/contacto/      las 2 vistas previas del CV
  images/casos/schaman-analytics-bi/   las capturas del caso (hasta 3024px)
  video/casos/schaman-analytics-bi/    las 5 grabaciones .mov · NO van al repo
  sin-usar/             imágenes que ninguna página muestra, guardadas a propósito
```

Las capturas de `images/casos/` también pasan por `npm run imagenes`. Una
captura nueva para el caso va aquí, NO en `public/`; después se corre el
generador y la página la pide por su nombre, sin extensión.

## Los vídeos

`video/` está en `.gitignore`: son 72 MB de `.mov` que ningún script lee y
que solo viven en este Mac. Lo que se publica es su versión web, en
`public/video/casos/schaman-analytics-bi/`:

| grabación | se publica como |
|---|---|
| `grabacion-filtro-fecha.mov` | `filtro-de-fecha.mp4` |
| `grabacion-paginacion.mov` | `paginacion.mp4` |
| `grabacion-sesiones-en-tab-diferente.mov` | `sesiones-en-otra-pestana.mp4` |
| `grabacion-sorting.mov` | `orden-por-columna.mp4` |
| `video-sesiones-antes.mov` | `sesiones-antes.mp4` |

Cada `.mp4` sale así (H.264, sin audio, cabecera al principio, 1280 px):

```bash
ffmpeg -i <grabacion>.mov -vcodec libx264 -crf 23 -preset slow \
       -movflags +faststart -an -vf "scale=1280:-2" <nombre>.mp4
```

Y su póster, del segundo 1. El ffmpeg de Homebrew no trae codificador WebP,
así que el fotograma sale en PNG y lo pasa a WebP `sharp`, sin pérdida y con
las mismas opciones que `npm run imagenes` (`lossless: true, effort: 6`):

```bash
ffmpeg -ss 1 -i <nombre>.mp4 -frames:v 1 <nombre>-poster.png
```

Si recortaste la grabación en QuickTime, el `.mov` guarda el tramo entero y
una «lista de edición» que dice qué parte se ve. ffmpeg la respeta: el
`.mp4` tiene menos fotogramas en el archivo, pero los mismos en pantalla.

## ¿Por qué no están en `public/`?

Porque `public/` se publica **entero y tal cual**. Una captura de 3248 px y
4,5 MB puesta ahí viaja por internet completa aunque se vea en un recuadro de
208 px. Separarlas es lo que hizo que Proyectos pasara de 9,8 MB a 1,07 MB.

Si pones una imagen directamente en `public/`, funciona — pero `npm run peso`
te avisa de que es un original pesado y de que su sitio es este.

## `sin-usar/`

Fotos que no muestra ninguna página del portafolio, **ni la versión nueva ni la
publicada**, y que no son copia de nada. Están aquí para no perderlas cuando se
retire la carpeta `img/` del sitio anterior (etapa 11).

| archivo | qué es |
|---|---|
| `casos/grow-with-phoenix/01-04-pantalla.webp` | cuatro pantallas de Phoenix de una numeración anterior. Las que el caso muestra hoy están en `public/images/casos/grow-with-phoenix/pantallas/`, con nombres que dicen qué son (`pagina-inicio`, `pagina-escaneo`…). Estas cuatro son fotos distintas, no copias. |
| `proyectos/schaman-analytics-anterior.png` | la miniatura de Schaman hasta el 2026-10-28: un montaje en verde de una versión anterior de la interfaz. La de ahora sale de `images/casos/schaman-analytics-bi/main-menu.png`, recortada a la misma proporción (1,714). |
| `casos/schaman-analytics-bi/08-sesiones-anterior.webp` | la imagen de la sección 08 del caso de Schaman. Esa sección está escrita en `src/content/casos/schaman-analytics-bi.ts` pero ninguna página la muestra. Si algún día la recuperas, su imagen es esta. |
| `sobre-mi/dialogue-box-{fill,outline}.svg` | el bocadillo de Sobre mí como lo exportó Illustrator. Se dibujaba con `border-image` de nueve cortes; en la etapa 8 pasó a ser un borde CSS más la colita en `ColaDeBocadillo.astro`, que lleva el mismo trazado dentro. Se guardan por si quieres rehacer el dibujo. |

Si decides que no las quieres, se borran y no pasa nada más: están aquí por si
las quieres, no porque algo las necesite.
