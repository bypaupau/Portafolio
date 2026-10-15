# projects/ · una carpeta por proyecto

Aquí vive **el contenido** de cada proyecto: su relato, sus imágenes, sus enlaces y
sus etiquetas. No vive aquí nada de apariencia: los estilos, la ventana, el nav y el
motor de idioma siguen siendo compartidos y están donde siempre.

La idea es que agregar un proyecto sea **crear una carpeta**, no duplicar una página.

```
projects/
  README.md              ← esto
  <slug>/
    contenido.js         ← el caso: ficha, enlaces, bloques narrativos (ES/EN)
    img/
      portada.webp       ← la imagen principal
      01-....webp        ← stills, mockups, diagramas
```

## Por qué `.js` y no `.json`

Un `.json` haría falta cargarlo con `fetch()`, y `fetch()` **no funciona al abrir el
HTML desde Finder** (`file://` lo bloquea por CORS). Como el banco de pruebas y la
forma de revisar el sitio dependen de abrir archivos directo, cada `contenido.js` se
registra solo:

```js
(window.CASOS = window.CASOS || {})['mi-proyecto'] = { … };
```

Basta incluirlo con `<script>`. Sin servidor, sin build, sin dependencias.

## Agregar un proyecto nuevo

1. Copia la carpeta de uno existente y renómbrala con el *slug* (minúsculas, guiones).
2. Vacía `contenido.js` y llena lo que tengas. **Lo que no sepas, déjalo vacío y
   anótalo en `pendiente`** — un campo vacío es honesto; uno inventado no.
3. Mete las imágenes en `img/` como WebP (ver abajo).
4. Agrégalo a `data/proyectos.js` con su `slug`, para que aparezca en las tarjetas.

Nada de esto toca HTML ni CSS.

## Los campos de `contenido.js`

| Campo | Qué es |
|---|---|
| `tamano` | `caso` (página completa) · `ficha` (página corta) · `tarjeta` (sin página propia) |
| `publicacion` | `sin-empezar` → `borrador` → `publicado`. Solo `publicado` se enlaza desde las tarjetas, así puedes dejar borradores en el repo sin que se vean. |
| `nombre`, `resumen`, `etiquetas`, `periodo`, `contexto` | vienen de `data/proyectos.js`; no los edites en dos sitios |
| `ficha` | rol, equipo, duración, logro — lo que una persona de reclutamiento busca primero |
| `portada`, `enlaces`, `bloques` | el contenido de la página |
| `pendiente` | qué falta para poder publicarlo. Es una lista de trabajo, no decoración. |

Cualquier texto acepta las dos formas que ya usa el sitio: `"texto"` (igual en los dos
idiomas) o `{ es: "…", en: "…" }`. Si falta `en`, se muestra el `es`.

## El catálogo de bloques

`bloques` es un array ordenado. Cada bloque tiene un `tipo`:

| tipo | para qué |
|---|---|
| `lead` | la frase grande que abre una sección |
| `texto` | párrafo editorial |
| `figura` | imagen grande con pie |
| `galeria` | 2–3 stills en fila |
| `ventana` | captura dentro de la ventana retro |
| `split` | texto a un lado, imagen al otro |
| `pasos` | proceso paso a paso |
| `cita` | la decisión clave, en grande |
| `lista` | decisiones, restricciones, requisitos |
| `codigo` | fragmento de código |
| `comparacion` | antes / después |
| `media` | GIF o video corto |

Si un caso necesita algo que no está en esta tabla, **se agrega al catálogo**, no al
archivo del caso. Eso es lo que evita que cada página termine con estilos propios.

## Las marcas de honestidad

Cualquier bloque puede llevar `marca`:

| marca | significa |
|---|---|
| `implementado` | funciona, está en el repo |
| `propuesta` | se diseñó, no se construyó |
| `en-progreso` | existe a medias |
| `mejora-futura` | idea, no trabajo hecho |

Sirve para que un prototipo de Figma no se lea como una app que existe.

## Imágenes

WebP, ancho máximo 1600 px. Desde esta carpeta:

```sh
# fotos, mockups y capturas de UI
convert origen.png -resize '1600x1600>' -quality 82 -define webp:method=6 <slug>/img/nombre.webp

# PIXEL ART: sin pérdida y sin redimensionar, o se comen los bordes duros
convert origen.png -define webp:lossless=true -define webp:method=6 <slug>/img/nombre.webp
```

Las 10 portadas actuales ya están convertidas: **10,2 MB → 619 KB (−94 %)**, con PSNR
de 37–43 dB (indistinguible) y Catventures sin pérdida, idéntico pixel a pixel.

Los PNG originales siguen intactos en `img/`. No se borró nada.

## Si algún día esto migra a Astro

La estructura está pensada para que la migración no la toque. Un `contenido.js`
cambia de

```js
(window.CASOS = window.CASOS || {})['slug'] = { … };
```

a

```js
export default { … };
```

Una línea por archivo, automatizable. Las carpetas, las imágenes, los bloques y las
marcas se quedan igual. **Por eso el contenido se organizó antes de decidir el
framework y no después.**
