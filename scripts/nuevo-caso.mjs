/* ═══════════════════════════════════════════════════════════
   CREA UN CASO DE ESTUDIO NUEVO

     npm run nuevo-caso -- mi-proyecto

   Deja tres cosas listas y te dice las DOS líneas que faltan por tocar.
   No sobreescribe nada: si el caso ya existe, se detiene.
   ═══════════════════════════════════════════════════════════ */
import fs from 'node:fs';
import path from 'node:path';

const slug = (process.argv[2] ?? '').trim();
if (!/^[a-z][a-z0-9-]*$/.test(slug)) {
  console.error('Uso:  npm run nuevo-caso -- mi-proyecto');
  console.error('El nombre va en minúsculas, con guiones y sin acentos: es la URL.');
  process.exit(1);
}

const raiz = process.cwd();
const rutaContenido = path.join(raiz, 'src/content/casos', `${slug}.ts`);
const rutaPagina = path.join(raiz, 'src/pages/casos', `${slug}.astro`);
const rutaImagenes = path.join(raiz, 'public/images/casos', slug);

for (const r of [rutaContenido, rutaPagina]) {
  if (fs.existsSync(r)) {
    console.error(`Ya existe ${path.relative(raiz, r)}. No toco nada.`);
    process.exit(1);
  }
}

/* el nombre en camelCase, para la constante que exporta el contenido */
const enCamello = slug.replace(/-([a-z0-9])/g, (_, c) => c.toUpperCase());
const titulo = slug.replace(/-/g, ' ').replace(/(^|\s)\S/g, (c) => c.toUpperCase());

fs.writeFileSync(rutaContenido, `/* ═══════════════════════════════════════════════════════════
   CONTENIDO DEL CASO · ${titulo.toUpperCase()}
   página: src/pages/casos/${slug}.astro

   Esto NO es interfaz: es el texto del proyecto. Cada texto es una
   cadena (si dice lo mismo en los dos idiomas) o { es, en }.

   No hay claves que memorizar: los campos tienen nombre. Agrega los
   que necesites y bórralos si no los usas; la página de al lado decide
   qué se dibuja.
   ═══════════════════════════════════════════════════════════ */

export const ${enCamello} = {
  /* el <title>, la <meta description> y el nombre de la taskbar */
  documento: {
    titulo: 'pau.proyectos · ${titulo}',
    descripcion: { es: 'TODO: de qué va el proyecto, en una frase.', en: 'TODO: what the project is about, in one sentence.' },
    nombreDeVentana: '${slug.replace(/-/g, '_')}.md',
  },

  /* la portada */
  portada: {
    antetitulo: { es: 'TODO: contexto · año', en: 'TODO: context · year' },
    subtitulo: { es: 'TODO: una frase que diga qué resolviste.', en: 'TODO: one line on what you solved.' },
    introduccion: { es: 'TODO: de dónde salió el proyecto y qué hiciste.', en: 'TODO: where it came from and what you did.' },
    imagen: {
      pie: { es: 'TODO: qué se ve en la imagen.', en: 'TODO: what the image shows.' },
      alt: { es: 'TODO: descripción para quien no ve la imagen.', en: 'TODO: description for people who cannot see it.' },
    },
  },

  /* lo que hiciste y con qué */
  miRol: {
    etiqueta: { es: 'Mi rol', en: 'My role' },
    puntos: [
      { es: 'TODO: lo primero que hiciste.', en: 'TODO: the first thing you did.' },
    ],
  },
  herramientas: {
    etiqueta: { es: 'Herramientas', en: 'Tools' },
    /* llevan marcado: <b>Figma</b> — para qué */
    puntos: [
      '<b>TODO</b> — para qué la usaste.',
    ],
  },

  /* el riel lateral. Una parada por sección, en orden. */
  riel: {
    portada: { es: 'Portada', en: 'Cover' },
    paradas: [
      { es: 'El reto', en: 'The challenge' },
      { es: 'Lo que hice', en: 'What I did' },
    ],
  },

  /* una sección por cada parada del riel */
  secciones: [
    {
      numero: { es: '01 / el reto', en: '01 / the challenge' },
      titulo: { es: 'TODO: el título de la sección.', en: 'TODO: the section title.' },
      parrafos: [
        { es: 'TODO: el primer párrafo.', en: 'TODO: the first paragraph.' },
      ],
      nota: { es: '<b>Alcance:</b> TODO.', en: '<b>Scope:</b> TODO.' },
    },
    {
      numero: { es: '02 / lo que hice', en: '02 / what I did' },
      titulo: { es: 'TODO: el título de la sección.', en: 'TODO: the section title.' },
      parrafos: [
        { es: 'TODO: el primer párrafo.', en: 'TODO: the first paragraph.' },
      ],
    },
  ],

  /* el cierre */
  cierre: {
    volver: { es: '← volver a proyectos', en: '← back to projects' },
    verProyecto: { es: 'ver el proyecto ↗', en: 'view the project ↗' },
    otrosProyectos: { es: '// otros proyectos', en: '// other projects' },
  },
} as const;
`);

fs.writeFileSync(rutaPagina, `---
/* ═══════════════════════════════════════════════════════════
   CASO · ${titulo.toUpperCase()}  →  /Portafolio/casos/${slug}

   ── DÓNDE ESTÁ TODO LO DE ESTA PÁGINA ──────────────────────
   contenido   src/content/casos/${slug}.ts   ← TODO el texto
   estilo      src/styles/casos/caso.css      (compartida)
   script      src/scripts/casos/riel.ts      (compartido)
   piezas      src/components/paginas/casos/
   imágenes    public/images/casos/${slug}/

   Este archivo es TUYO: agrega, quita y reordena secciones como pida
   el proyecto. Las piezas de src/components/paginas/casos/ están para usarlas,
   no para obligarte:

     <Texto valor={x} />                      un párrafo
     <Texto como="h2" class="cs-h" valor={x} /> otra etiqueta
     <Texto como="li" html valor={x} />        si el texto lleva <b> o enlaces
     <FiguraDeCaso …>                          una imagen con título y pie
     <NotaDeCaso texto={x} />                  una nota al pie de sección
     <GrupoDePantallas …>                      texto + dos capturas
     <ParAntesDespues …>                       una comparación antes/después
   ═══════════════════════════════════════════════════════════ */
import BaseLayout from '../../layouts/BaseLayout.astro';
import Texto from '../../components/piezas/Texto.astro';
import RielDeCaso from '../../components/paginas/casos/RielDeCaso.astro';
import NotaDeCaso from '../../components/paginas/casos/NotaDeCaso.astro';
import CierreDeCaso from '../../components/paginas/casos/CierreDeCaso.astro';
import { conIdioma, altConIdioma, htmlConIdioma } from '../../lib/texto-bilingue';
import { rutaPublica } from '../../lib/rutas';
import { ${enCamello} as contenido } from '../../content/casos/${slug}';
import '../../styles/casos/caso.css';

/* TODO: el enlace público del proyecto (repositorio, demo, Drive) */
const ENLACE = 'https://github.com/bypaupau';

const img = (archivo: string) => rutaPublica('images/casos/${slug}/' + archivo);

/* el color de cada sección, en orden. Los tonos salen de los tokens. */
const COLORES = ['var(--peach)', 'var(--sky)', 'var(--mint)', 'var(--lav)', 'var(--yellow)'];
---

<BaseLayout
  paginaActual="projects"
  paginaDeDatos="caso"
  claveTitulo="pages.projects.metaTitle"
  claveDescripcion="pages.projects.metaDescription"
  nombreDeVentana={contenido.documento.nombreDeVentana}
  claseBody="cs-body"
  tituloDelCaso={contenido.documento}
>
  <div class="wrap">
    <div class="cs-grid">

      <RielDeCaso
        portada={contenido.riel.portada}
        paradas={contenido.riel.paradas}
        salida={{ texto: contenido.cierre.verProyecto, enlace: ENLACE }}
      />

      <div class="cs-main">

        {/* ══ PORTADA ══ */}
        <header class="cs-hero" id="cs-portada" style="--cs:var(--pink-mid)">
          <div class="cs-hero-top">
            <div>
              <Texto class="cs-kicker hx" style="--d:100ms" valor={contenido.portada.antetitulo} />
              <h1 class="cs-title hx" style="--d:170ms">${titulo}</h1>
              <Texto class="cs-sub hx" style="--d:240ms" valor={contenido.portada.subtitulo} />
              <Texto class="cs-text hx" style="--d:300ms" valor={contenido.portada.introduccion} />
            </div>
            <figure class="cs-hero-fig hx" style="--d:420ms">
              {/* TODO: pon la imagen en public/images/casos/${slug}/ */}
              <img src={img('portada.webp')} width="1600" height="900" loading="eager" decoding="async" {...altConIdioma(contenido.portada.imagen.alt)} />
              <Texto como="figcaption" valor={contenido.portada.imagen.pie} />
            </figure>
          </div>

          {/* lo que hiciste y con qué */}
          <dl class="cs-stars cs-rv">
            <div class="cs-star st-rol">
              <Texto como="dt" valor={contenido.miRol.etiqueta} />
              <dd><ul>{contenido.miRol.puntos.map((punto) => <Texto como="li" valor={punto} />)}</ul></dd>
            </div>
            <div class="cs-star st-win">
              <Texto como="dt" valor={contenido.herramientas.etiqueta} />
              <dd><ul>{contenido.herramientas.puntos.map((punto) => <Texto como="li" html valor={punto} />)}</ul></dd>
            </div>
          </dl>
        </header>

        {/* ══ LAS SECCIONES ══
            Una por cada parada del riel. El id tiene que ser #cs-1, #cs-2…
            porque es lo que el riel usa como ancla. */}
        {contenido.secciones.map((seccion, i) => (
          <section class="cs-sec" id={\`cs-\${i + 1}\`} style={\`--cs:\${COLORES[i % COLORES.length]}\`} aria-labelledby={\`h-cs-\${i + 1}\`}>
            <header class="cs-head cs-rv">
              <Texto class="cs-num" valor={seccion.numero} />
              <Texto como="h2" class="cs-h" id={\`h-cs-\${i + 1}\`} valor={seccion.titulo} />
            </header>
            {seccion.parrafos.map((parrafo) => <Texto class="cs-text cs-rv" valor={parrafo} />)}
            {'nota' in seccion && seccion.nota && <NotaDeCaso texto={seccion.nota} />}
          </section>
        ))}

        <CierreDeCaso
          texto={contenido.cierre}
          enlaceDelProyecto={ENLACE}
          relacionados={[
            /* TODO: uno o dos proyectos relacionados.
               interno: true si es otra página de este sitio. */
          ]}
        />

      </div>
    </div>
  </div>

  <script>
    import '../../scripts/casos/riel';
  </script>
</BaseLayout>
`);

fs.mkdirSync(rutaImagenes, { recursive: true });
fs.writeFileSync(path.join(rutaImagenes, 'LEEME.txt'),
  `Las imágenes de este caso van aquí.\n\n` +
  `Desde la página se usan con:  img('portada.webp')\n` +
  `que resuelve a /Portafolio/images/casos/${slug}/portada.webp\n\n` +
  `Nunca escribas la ruta a mano: se rompería al publicar.\n` +
  `Cuando pongas la primera imagen, borra este archivo.\n`);

console.log(`\n✓ Caso "${slug}" creado:\n`);
console.log(`   src/content/casos/${slug}.ts        ← escribe aquí el texto`);
console.log(`   src/pages/casos/${slug}.astro       ← la estructura`);
console.log(`   public/images/casos/${slug}/        ← las imágenes\n`);
console.log('Faltan DOS líneas que no puedo adivinar:\n');
console.log(`   1. src/content/proyectos/proyectos.ts`);
console.log(`      en el proyecto que corresponda, añade:   caso: "${slug}",`);
console.log(`      Con eso Proyectos ya lo enlaza y le pone "ver el caso".\n`);
console.log(`   2. scripts/paginas-a-comparar.mjs`);
console.log(`      añade una entrada para que entre en la verificación:\n`);
console.log(`        { id: '${slug}', nueva: '/Portafolio/casos/${slug}' },\n`);
console.log(`      Sin "anterior": es una página nueva, no hay con qué compararla.\n`);
console.log('Y después:  npm run build && npm run comparar ' + slug + ' && npm run interaccion ' + slug + '\n');
