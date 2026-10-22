# Portafolio

Portafolio de **Paula Martillo (Pau)**, estudiante de Ingeniería en Computación en la UEES: diseño ideas y las convierto en realidad.

🌐 **Sitio:** [bypaupau.github.io/Portafolio](https://bypaupau.github.io/Portafolio/)

## Qué es cada carpeta de la raíz

Ahora mismo aquí conviven **dos sitios**: el que está publicado y el nuevo en
Astro. Por eso hay tantas carpetas. Es temporal y a propósito — mientras el
viejo siga aquí, volver atrás es cambiar un ajuste en GitHub.

**El sitio nuevo (lo que edito):**

| | |
|---|---|
| `src/` | las 7 páginas, sus textos, estilos, scripts y dibujos |
| `public/` | imágenes, PDF y las redirecciones de las URLs viejas |
| `scripts/` | las herramientas de revisión (no van al sitio) |
| `originales/` | las imágenes de origen a tamaño completo. **No se publican**: de aquí sale lo que sí se publica, con `npm run imagenes`. Tiene su propio `LEEME.md` |
| `docs/` | cómo está hecho y cómo agregar cosas |
| `astro.config.mjs` · `package.json` · `tsconfig.json` | configuración |

Para saber qué hay en la raíz y qué se puede borrar, sin contarlo a mano:

```
npm run duplicados
```

Dice, archivo por archivo, qué del sitio anterior ya está byte a byte en el
nuevo (hoy: 62 archivos, 13,4 MB), qué es huérfano de siempre, y qué es una
decisión tuya. Hoy queda **una**: `img/logos/github.png`, un logo de 5000×5000
que el sitio nuevo no usa porque le basta el icono de 64×64.

**El sitio publicado hoy (se retira en la etapa 11, no antes):**

| | |
|---|---|
| `index.html` · `pages/` | las páginas viejas |
| `css/` · `js/` · `data/` | sus estilos, scripts y datos |
| `img/` · `cv/` · `trabajos-disenio/` · `resources/` | sus archivos |
| `favicon.png` · `favicon.svg` | (el nuevo tiene los suyos en `public/`) |

**Material y apoyo:**

| | |
|---|---|
| `projects/` | material de origen de los casos (PDF y PNG de Figma, 27 MB) |
| `captures/` | las capturas que se ven más abajo en este README |

**Se regenera solo — se puede borrar sin pensarlo:**

| | |
|---|---|
| `node_modules/` | `npm install` lo rehace |
| `dist/` | `npm run build` lo rehace |
| `.astro/` | caché de Astro |
| `_revision-visual/` | las capturas de la comparación · **pesa ~130 MB** |
| `_borrar/` | lo que quedó de reorganizar |

Los cinco de abajo están en `.gitignore`: no se suben nunca.

## Capturas

### Inicio
![](captures/inicio1.png)
![](captures/inicio2.png)

### Proyectos
![](captures/proyectos.png)

### Sobre mí
![](captures/sobremi1.png)
![](captures/sobremi2.png)

### Contacto
![](captures/contacto.png)

---

## Cómo está hecho

Sitio estático con [Astro](https://astro.build), publicado en GitHub Pages.
Diseño propio: paleta rosa pastel y detalle pixel retro, con ilustraciones y
sprites hechos a mano en SVG.

```sh
npm install
npm run dev      # desarrollo
npm run build    # compila a dist/ (valida las traducciones antes)
```

- [docs/como-agregar.md](docs/como-agregar.md) — **una receta por cada cosa
  que quieras agregar**: un caso, una página, una decoración, un texto.
- [docs/recorrido.md](docs/recorrido.md) — **empieza por aquí.** Cómo abrirlo
  en tu Mac y, sobre todo, dónde tocar para cambiar cada cosa.
- [docs/arquitectura.md](docs/arquitectura.md) — dónde está cada cosa, las
  convenciones de nombres y cómo funcionan las traducciones
- [docs/plan-de-migracion.md](docs/plan-de-migracion.md) — estado de la
  migración por etapas
- [docs/revisar-una-etapa.md](docs/revisar-una-etapa.md) — cómo comprobar en
  tu Mac que una página migrada se ve y se comporta igual que la publicada
