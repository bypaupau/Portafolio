# originales/ · las imágenes de origen

Nada de esta carpeta se publica. De aquí sale, con `npm run imagenes`, lo que sí
se publica en `public/images/`.

```
originales/
  images/proyectos/     las 10 capturas de proyectos a tamaño completo (hasta 3248px)
  images/contacto/      las 2 vistas previas del CV
  sin-usar/             imágenes que ninguna página muestra, guardadas a propósito
```

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
| `casos/schaman-analytics-bi/08-sesiones-anterior.webp` | la imagen de la sección 08 del caso de Schaman. Esa sección está escrita en `src/content/casos/schaman-analytics-bi.ts` pero ninguna página la muestra. Si algún día la recuperas, su imagen es esta. |
| `sobre-mi/dialogue-box-{fill,outline}.svg` | el bocadillo de Sobre mí como lo exportó Illustrator. Se dibujaba con `border-image` de nueve cortes; en la etapa 8 pasó a ser un borde CSS más la colita en `ColaDeBocadillo.astro`, que lleva el mismo trazado dentro. Se guardan por si quieres rehacer el dibujo. |

Si decides que no las quieres, se borran y no pasa nada más: están aquí por si
las quieres, no porque algo las necesite.
