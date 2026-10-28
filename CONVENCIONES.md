# Cómo se trabaja en este portafolio

Reglas para cualquier cosa que se agregue de aquí en adelante. No son estilo
personal: cada una existe porque algo se rompió o se volvió ilegible sin ella,
y abajo está el porqué. **Léelo antes de tocar nada.**

---

## 1 · La regla de oro

**Cada página del portafolio es UN archivo en `src/pages/`.** Lo abres y lees
su estructura de arriba abajo. Nada de seguir cinco capas para entender qué
sale en pantalla.

Si una página crece, lo que se parte son sus *piezas* (componentes, estilos),
nunca su esqueleto. El archivo de la página sigue siendo el índice legible de
lo que hay en ella.

---

## 2 · Nombres

**Todo en español.** Carpetas, archivos, componentes, variables, clases
nuevas, mensajes de commit. Hubo siete carpetas en inglés (`work-card`,
`archive-row`, `language-switcher`…) y eran las únicas que desentonaban; se
renombraron.

**Nombres descriptivos, no abreviados.** El nombre dice *qué es la cosa*, no
cómo se llamaba el archivo del que salió.

| ✗ | ✓ |
|---|---|
| `sch.f.rol.3` | `miRol.puntos[2]` |
| `WorkCard` | `TarjetaDeTrabajo` |
| `icono-dentro-de-un` | `icono-boton` |
| `01.css` | `01-ruta.css` |

**`PascalCase.astro` para componentes**, y el nombre del archivo es el del
componente. Si renombras uno, renombra las dos cosas: el import y la etiqueta.

**Nada de nombres que mientan.** Si un archivo se llama `-960` pero mide
935 px, el número sobra o está mal. El generador de imágenes nombra por el
ancho **real**, nunca por el pedido.

---

## 3 · Dónde va cada cosa

```
src/
  pages/              una página = un archivo
  layouts/            BaseLayout: head, fuentes, nav, pie, taskbar
  components/
    globales/         en TODAS las páginas (los monta BaseLayout)
    piezas/           se reutilizan entre páginas
    dibujos/          SVG decorativos que usan dos o más páginas
    iconos/           SVG de interfaz (pixel art)
    paginas/          lo propio de UNA página: inicio/ · sobre-mi/ · casos/
  content/            EL CONTENIDO (proyectos, casos), no la interfaz
  i18n/               los textos de la interfaz, un archivo por página
  styles/             tres hojas, cada una partida (ver §5)
  lib/ · scripts/     utilidades y comportamiento
public/               se publica TAL CUAL: imágenes generadas, PDF, redirecciones
originales/           material de origen · NO se publica
```

**¿Dónde pongo un componente nuevo?**

- ¿sale en todas las páginas? → `globales/`
- ¿lo usan dos o más páginas? → `piezas/` si es estructura, `dibujos/` si es
  decoración, `iconos/` si es un icono de interfaz
- ¿es de una página sola? → `paginas/<esa-página>/`

Entre `dibujos/` e `iconos/`: un dibujo adorna y se puede quitar sin perder
información; un icono *dice* algo (la batería, el idioma, el tipo de sello).

**Un dibujo hecho en código es un archivo, nunca algo suelto dentro de una
página.** Los `<svg>` escritos a mano cuentan como dibujos: cada uno va en su
propio `.astro`, con el nombre de lo que dibuja (`TazaDeCafe.astro`, no
`Svg3.astro`), en la carpeta que le toque por la regla de arriba. Hoy hay 33
repartidos así: 9 en `dibujos/`, 8 en `iconos/`, 3 propios de Inicio y 13
propios de Sobre mí — y **cero** `<svg>` dentro de un archivo de `pages/`.

La razón es la de siempre: un dibujo pegado dentro de la página solo se
encuentra leyendo la página entera. Antes 432 líneas de SVG vivían como texto
dentro de `js/i18n.js`, donde no se podían ni ver ni editar.

Dos cosas que no se pierden al sacar un dibujo a su archivo:

- los colores van en `var(--token)`, nunca en hexadecimal (§6);
- si es pixel art lleva `shape-rendering="crispEdges"`. Sin eso el navegador
  suaviza los bordes y el píxel deja de ser píxel.

**No se crea una carpeta para un solo archivo.** Siete de las catorce que
había tenían uno dentro: una carpeta así no agrupa nada, solo añade un clic.

---

## 4 · Imágenes

**Los originales van en `originales/`, nunca en `public/`.** Lo que está en
`public/` se publica entero y tal cual: una captura de 3248 px y 4,5 MB puesta
ahí viaja completa aunque se vea en un recuadro de 208 px. Separarlas hizo que
Proyectos pasara de **10,1 MB a 1,2 MB**.

```
originales/images/proyectos/trackinglibros.png     3248px · no se publica
        │  npm run imagenes
        ▼
public/images/proyectos/trackinglibros-416.webp     filas del archivo
public/images/proyectos/trackinglibros-1120.webp    rejilla destacada
public/images/proyectos/trackinglibros.webp         la grande, para el zoom
src/content/imagenes.json                           el manifiesto
```

**Ninguna página escribe el nombre de un archivo de imagen.** Se pide el ancho
que hace falta y el manifiesto da la ruta y las medidas reales:

```astro
import { imagen, imagenGrande, imagenMasGrande } from '../lib/imagenes';
imagen('images/proyectos/trackinglibros', 1120)   // { src, ancho, alto }
```

Los `width`/`height` salen medidos del archivo, así que no se desfasan — y eso
es lo que evita el salto de maquetación mientras la imagen carga. Si pides un
ancho que no existe, **la compilación falla** con un mensaje que lo dice. Es a
propósito.

El ancho que se pide es **el doble** del tamaño al que se ve: una pantalla
retina dibuja el doble de píxeles.

Cuatro reglas que el generador respeta y que conviene conocer:

1. **Nunca agrandar.** Agrandar no añade detalle: lo inventa borroso.
2. **Si el original ya cabe, no se redimensiona.** Redimensionar un PNG con
   paleta le inventa miles de colores y lo deja *más* pesado. Pasó de verdad.
3. **La grande solo si aporta** (si el original supera en 1,4× al ancho mayor).
4. Todo **WebP sin pérdida**: exacto bit a bit, sin artefactos. Si el
   original ya es un `.webp` (solo se admite dentro de `originales/`) y cabe,
   se copia tal cual: recodificar uno con pérdida solo lo engorda.

---

## 5 · Estilos

Tres hojas, cada una partida en archivos con un índice:

```
src/styles/global/global.css      35 partes · base/ componentes/ paginas/ ajustes/
src/styles/sobre-mi/sobre-mi.css  13 partes
src/styles/casos/caso.css         25 partes
```

**El orden de los `@import` ES la cascada.** En CSS, cuando dos reglas empatan
en importancia y especificidad, gana la última que se carga. El índice no es
decorativo.

De ahí la regla de los cuatro grupos de `global/`:

> un archivo puede pisar a los de arriba, nunca a los de abajo.

Si escribes algo en `base/` y no se ve, algo más abajo lo está pisando:
búscalo ahí, no subas tu regla. Y si lo que escribes *reescribe* algo que ya
existe (un escalón de tamaño, un modo, un parche), va en `ajustes/`.

**Para partir una hoja larga:**

```
node scripts/partir-hoja.mjs <archivo.css> <carpeta-destino>
```

Corta por las cabeceras de sección que el archivo ya tiene y convierte el
original en índice. No toca una regla: rejuntar los trozos da el archivo
original byte a byte.

**Nunca reordenes los `@import` sin correr `npm run cascada`.** Esa prueba ya
atrapó un fallo real: al reagrupar, `contacto-layout` quedó antes de
`contacto-campos` y la intro de Contacto creció 12 px.

---

## 6 · Colores y medidas: ningún número suelto

**Ningún componente lleva un color en hexadecimal.** Había 723 escritos a mano
en 28 componentes; todos pasaron a `var(--token)`. Los tokens viven en
`src/styles/global/base/tokens.css` y son el único sitio donde se cambian.

Lo mismo con los grosores de trazo: `--trazo-subrayado`, `--trazo-circulo`,
`--trazo-bocadillo`. Antes los mismos números estaban escritos en dos archivos
distintos.

**Los SVG van en línea, como componentes**, no como archivos de fondo. Solo así
heredan los tokens. Un SVG metido por CSS lleva sus colores congelados dentro.

La excepción son los tres sitios donde el CSS solo acepta una imagen y no cabe
un componente: `cursor:`, `background-image` y `border-image`. Ahí quedan dos
dibujos —los cursores pixel en `base/cursor-pixel.css` y la flechita del
desplegable en `paginas/proyectos-filtros.css`— y ahí sí llevan el hexadecimal
escrito dentro, con el costo asumido: si cambia el rosa de la marca, hay que
cambiarlo a mano en esos dos archivos. Cada uno vive en el archivo que lleva su
nombre; no se reparten entre hojas.

Si un dibujo necesita un color que no existe como token, se crea el token
(prefijo `--dib-` para los que solo viven dentro de los dibujos).

---

## 7 · Textos

**Todo texto visible es bilingüe**, `{ es: '…', en: '…' }`. El contenido vive
en `src/content/` (proyectos, casos) y los textos de interfaz en `src/i18n/`,
un archivo por página.

**Las traducciones son la fuente de la verdad**, no el marcado.

**Ojo con los espacios.** Astro descarta el salto de línea entre dos elementos
que están en líneas distintas, y ahí se pierde el espacio. Si dos elementos en
línea tienen que ir separados por un espacio, se pone explícito: `{' '}`.

---

## 8 · Antes de dar algo por bueno

```
npm run revisar
```

Encadena todo. Qué comprueba cada parte:

| | |
|---|---|
| `build` | compila, y antes valida las traducciones |
| `cambios` | qué se ha editado del CSS original, línea por línea |
| `cascada` | que el orden de los `@import` no cambió qué regla gana |
| `urls` | las 23 URLs, incluidas las viejas que ya compartiste |
| `peso` | imágenes rotas, originales publicados por error, cosas que sobran |
| `comparar` | 70 capturas contra la última versión que diste por buena |
| `interaccion` | 167 pruebas de comportamiento |

Si `comparar` marca diferencias **que tú querías**, se aceptan como nueva base:

```
npm run comparar -- --aceptar
```

Y si marca algo que no esperabas, `npm run donde -- <pagina>` te dice qué
elemento cambió, en vez de buscar a ciegas.

---

## 9 · Lo que no se hace

- **No se commitea nada compilado.** `dist/` se regenera; el workflow lo
  construye en cada push a `main`.
- **No se ponen originales en `public/`.** `npm run peso` avisa.
- **No se borra `originales/sitio-anterior/`**: son la referencia de
  `npm run cambios`.
- **No se toca `.nojekyll`.** Sin él, GitHub pasa todo por Jekyll, que
  interpreta los `{{ }}` del código y descarta las carpetas que empiezan por
  `_`, como el `_astro/` de la compilación.
- **No se escriben nombres de archivo de imagen a mano** (§4).
- **No se firman los commits con marcas de herramientas de IA** — ni
  `Co-Authored-By`, ni menciones en el mensaje, ni en los archivos.

---

## 10 · Agregar cosas

**Una página nueva**

1. `src/pages/mi-pagina.astro` — copia `contacto.astro`, que es la más corta
2. `src/i18n/es/mi-pagina.ts` y `en/mi-pagina.ts`, más su línea en los `index.ts`
3. Si va en el menú: una línea en `src/lib/navegacion.ts`
4. Estilo propio → `src/styles/mi-pagina/`; si no, `global/paginas/`
5. Una entrada en `scripts/paginas-a-comparar.mjs` para que entre en la verificación

**Un caso de estudio**

```
npm run nuevo-caso -- <slug>
```

Crea el contenido, la página y la carpeta de originales, con el layout de
todos los casos (la barra con el índice, la portada con ventana y ficha),
y te dice las dos ediciones que quedan. Los originales del caso van en
`originales/images/casos/<caso>/`: `npm run imagenes` encuentra solo
cada carpeta de ahí, sin tocar el generador.

**Un proyecto con su imagen**

1. La captura a tamaño completo en `originales/images/proyectos/`
2. `npm run imagenes`
3. En `src/content/proyectos/proyectos.ts`: `imagen: "images/proyectos/<nombre>"`,
   **sin extensión**
4. `npm run peso`

Si te saltas el paso 2, el 3 hace que la compilación falle diciéndotelo.

---

## 11 · Cómo se publica

Cada push a `main` dispara `.github/workflows/publicar.yml`: instala, compila
y publica `dist/`. En el repositorio nunca hay nada compilado.

Pages está en **GitHub Actions**, no en «deploy from a branch» — esa opción no
compila nada y serviría el código fuente tal cual.
