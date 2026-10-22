# components/ · las piezas, en cinco grupos

El mismo vocabulario que `src/styles/global/`, para que las dos carpetas se
lean igual: lo general arriba, lo específico abajo.

```
globales/    4   en TODAS las páginas · los monta BaseLayout
piezas/      4   se reutilizan entre páginas
dibujos/     9   SVG decorativos que usan dos o más páginas
iconos/      8   SVG de interfaz (pixel art) · tiene su propio README
paginas/    22   lo propio de UNA página: inicio/ · sobre-mi/ · casos/
```

## ¿Dónde pongo un componente nuevo?

- ¿sale en todas las páginas? → `globales/`
- ¿lo usan dos o más páginas? → `piezas/` si es estructura, `dibujos/` si es
  decoración, `iconos/` si es un icono de interfaz
- ¿es de una página sola? → `paginas/<esa-página>/`

Si dudas entre `dibujos/` e `iconos/`: un dibujo adorna y se puede quitar sin
que se pierda información; un icono dice algo (la batería, el idioma, el tipo
de sello). Por eso están separados aunque los dos sean SVG.

## Dos reglas de nombres

1. **Todo en español**, igual que el resto del proyecto. `SiteNavigation` era
   la excepción, no la regla.
2. **`PascalCase.astro`**, y el nombre del archivo es el del componente. Si
   renombras uno, renombra las dos cosas: el import y la etiqueta.

## Por qué no hay una carpeta por componente

Antes sí: siete de las catorce carpetas tenían **un solo archivo dentro**.
Una carpeta que contiene un archivo no agrupa nada, solo añade un clic. Ahora
una carpeta existe cuando hay varias cosas que agrupar.
