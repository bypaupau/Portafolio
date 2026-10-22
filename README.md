# Portafolio

Portafolio de **Paula Martillo (Pau)**, estudiante de Ingeniería en Computación en la UEES: diseño ideas y las convierto en realidad.

🌐 **Sitio:** [bypaupau.github.io/Portafolio](https://bypaupau.github.io/Portafolio/)

## Qué es cada carpeta de la raíz

| | |
|---|---|
| `src/` | las 7 páginas, sus textos, estilos, scripts y dibujos |
| `public/` | lo que se publica tal cual: imágenes, PDF y las redirecciones de las URLs viejas |
| `originales/` | las imágenes a tamaño completo y el material de origen. **No se publica** |
| `scripts/` | las herramientas de verificación (no van al sitio) |
| `docs/` | cómo está hecho y cómo agregar cosas (no se versiona) |
| `projects/` · `captures/` | material de los proyectos y capturas del README |
| `astro.config.mjs` · `package.json` · `tsconfig.json` | configuración |
| `node_modules/` · `dist/` · `.astro/` | se regeneran solas, no se versionan |

El sitio se publica solo: cada push a `main` dispara
`.github/workflows/publicar.yml`, que compila y sube el resultado. En el
repositorio nunca hay nada compilado.


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
