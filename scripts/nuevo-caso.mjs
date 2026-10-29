/* ═══════════════════════════════════════════════════════════
   CREA UN CASO DE ESTUDIO NUEVO

     npm run nuevo-caso -- mi-proyecto

   Lo crea con el layout de todos los casos (el de Schaman y Grow With
   Phoenix desde 2026-10): la barra con el índice, la portada con su
   ventana y su ficha, y secciones con su acento. Deja tres cosas listas
   y te dice las DOS líneas que faltan por tocar.

   Las imágenes van en originales/images/casos/<caso>/, NO en public/:
   npm run imagenes las encuentra solo, sin tocar nada más.

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
const rutaImagenes = path.join(raiz, 'originales/images/casos', slug);

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

   El índice de la barra tiene una parada por sección, más la portada:
   si agregas una sección, agrega su parada. Los textos con <mark> (la
   frase clave, uno por párrafo) se dibujan con <Texto html>.
   ═══════════════════════════════════════════════════════════ */

export const ${enCamello} = {
  /* el <title>, la <meta description> y el nombre de la ventana (sale en el pie) */
  documento: {
    titulo: 'pau.proyectos · ${titulo}',
    descripcion: { es: 'TODO: de qué va el proyecto, en una frase.', en: 'TODO: what the project is about, in one sentence.' },
    nombreDeVentana: '${slug.replace(/-/g, '_')}.md',
  },

  /* EL ÍNDICE: el nombre dice la acción; el papel, qué es */
  indice: [
    { nombre: { es: 'Portada', en: 'Cover' }, papel: { es: 'Presentación', en: 'Introduction' } },
    { nombre: { es: 'TODO: primera sección', en: 'TODO: first section' }, papel: { es: 'TODO: qué es', en: 'TODO: what it is' } },
    { nombre: { es: 'TODO: segunda sección', en: 'TODO: second section' }, papel: { es: 'TODO: qué es', en: 'TODO: what it is' } },
  ],

  /* ══ 00 · PORTADA ══ */
  portada: {
    antetitulo: { es: 'TODO: contexto · año', en: 'TODO: context · year' },
    subtitulo: { es: 'TODO: una frase que diga qué resolviste.', en: 'TODO: one line on what you solved.' },
    introduccion: { es: 'TODO: de dónde salió el proyecto y <mark>qué hiciste</mark>.', en: 'TODO: where it came from and <mark>what you did</mark>.' },
    /* el saludo de la mascota de la barra, el mismo en todos los casos */
    saludo: {
      es: 'Entraste en modo minimalista para leer mejor el caso.',
      en: 'You’re in minimalist mode, to read the case more easily.',
    },
    /* la única ventana de la página: originales/images/casos/${slug}/portada.png */
    ventana: {
      nombre: '${slug.replace(/-/g, '_')}',
      pie: { es: 'TODO: qué se ve en la imagen.', en: 'TODO: what the image shows.' },
      alt: { es: 'TODO: la imagen, descrita para quien no la ve.', en: 'TODO: the image, described for someone who cannot see it.' },
    },
    /* la ficha, al lado de la ventana: cuatro rótulos cortos */
    ficha: [
      { rotulo: { es: 'Proyecto', en: 'Project' }, valor: { es: 'TODO', en: 'TODO' } },
      { rotulo: { es: 'Contexto', en: 'Context' }, valor: { es: 'TODO', en: 'TODO' } },
      { rotulo: { es: 'Mi rol', en: 'My role' }, valor: { es: 'TODO', en: 'TODO' } },
      { rotulo: { es: 'Herramientas', en: 'Tools' }, valor: { es: 'TODO', en: 'TODO' } },
    ],
  },

  /* ══ LAS SECCIONES · 01 en adelante ══ */
  secciones: [
    {
      antetitulo: { es: '01 / TODO', en: '01 / TODO' },
      titulo: { es: 'TODO: el título de la sección', en: 'TODO: section title' },
      parrafos: [
        { es: 'TODO: el primer párrafo.', en: 'TODO: first paragraph.' },
      ],
    },
    {
      antetitulo: { es: '02 / TODO', en: '02 / TODO' },
      titulo: { es: 'TODO: el título de la sección', en: 'TODO: section title' },
      parrafos: [
        { es: 'TODO: el primer párrafo.', en: 'TODO: first paragraph.' },
      ],
    },
  ],

  /* el cierre de siempre: volver, el proyecto y los otros proyectos */
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

   contenido   src/content/casos/${slug}.ts   ← TODO el texto
   estilo      src/styles/casos/caso.css
   imágenes    originales/images/casos/${slug}/ → npm run imagenes

   El layout de todos los casos: mira src/pages/casos/schaman-analytics-bi.astro
   para ver los bloques que hay (PantallasFijas, ParejaDeCaso,
   SubBloqueDeCaso, TiraDeTres, PreguntaDeDiseno, MedioDeCaso…).
   ═══════════════════════════════════════════════════════════ */
import BaseLayout from '../../layouts/BaseLayout.astro';
import Texto from '../../components/piezas/Texto.astro';
import BarraDeCaso from '../../components/paginas/casos/BarraDeCaso.astro';
import EncabezadoDeSeccion from '../../components/paginas/casos/EncabezadoDeSeccion.astro';
import FichaDePortada from '../../components/paginas/casos/FichaDePortada.astro';
import VentanaDeCaso from '../../components/paginas/casos/VentanaDeCaso.astro';
import CierreDeCaso from '../../components/paginas/casos/CierreDeCaso.astro';
import { rutaPagina } from '../../lib/rutas';
import { imagen, hayImagen } from '../../lib/imagenes';
import { ${enCamello} as contenido } from '../../content/casos/${slug}';
import '../../styles/casos/caso.css';

/* TODO: el enlace al proyecto (repositorio, prototipo…) */
const ENLACE = 'https://github.com/bypaupau';
const PROYECTOS = rutaPagina('proyectos');

/* cada captura, con sus medidas reales sacadas del manifiesto */
const captura = (nombre: string) => {
  const { src, ancho, alto } = imagen('images/casos/${slug}/' + nombre, 1704);
  return { imagen: src, ancho, alto };
};

/* el acento de cada sección; el primero es el de la portada */
const ACENTOS = ['var(--pink-light)', 'var(--sky)', 'var(--peach)', 'var(--mint)', 'var(--lav)', 'var(--yellow)'];

const { indice, portada, secciones } = contenido;
const PARADAS = indice.map((parada, i) => ({ ...parada, id: \`caso-\${String(i).padStart(2, '0')}\`, acento: ACENTOS[i % ACENTOS.length]! }));

/* la portada, hasta que pongas originales/images/casos/${slug}/portada.png
   y corras npm run imagenes */
const VENTANA = hayImagen('images/casos/${slug}/portada') ? captura('portada') : null;
---

<BaseLayout
  paginaActual="projects"
  paginaDeDatos="caso"
  claveTitulo="pages.projects.metaTitle"
  claveDescripcion="pages.projects.metaDescription"
  nombreDeVentana={contenido.documento.nombreDeVentana}
  claseBody="cs-body"
  tituloDelCaso={contenido.documento}
  sinTaskbar
>
  <div class="caso-pagina">

    <BarraDeCaso paradas={PARADAS} volver={PROYECTOS} saludo={portada.saludo} />

    <div class="caso-contenido">

      {/* ══ 00 · PORTADA ══ */}
      <header class="caso-portada" id="caso-00" style={\`--caso-acento:\${ACENTOS[0]}\`}>
        <Texto class="caso-antetitulo hx" style="--d:100ms" valor={portada.antetitulo} />
        <h1 class="caso-h1 hx" style="--d:170ms" data-escribir>${titulo}</h1>
        <Texto class="caso-subtitulo hx" style="--d:240ms" valor={portada.subtitulo} />
        {VENTANA ? (
          <div class="caso-portada-fila hx" style={\`--d:300ms;--proporcion:\${VENTANA.ancho} / \${VENTANA.alto}\`}>
            <VentanaDeCaso nombre={portada.ventana.nombre} {...VENTANA} alt={portada.ventana.alt} pie={portada.ventana.pie} />
            <FichaDePortada campos={portada.ficha} />
          </div>
        ) : (
          <div class="cs-rv"><FichaDePortada campos={portada.ficha} /></div>
        )}
        <Texto html class="caso-texto cs-rv" valor={portada.introduccion} />
      </header>

      {secciones.map((seccion, i) => {
        const parada = PARADAS[i + 1]!;
        return (
          <section class="caso-seccion" id={parada.id} style={\`--caso-acento:\${parada.acento}\`} aria-labelledby={\`h-\${parada.id}\`}>
            <EncabezadoDeSeccion id={\`h-\${parada.id}\`} antetitulo={seccion.antetitulo} titulo={seccion.titulo} />
            {seccion.parrafos.map((parrafo) => <Texto html class="caso-texto cs-rv" valor={parrafo} />)}
          </section>
        );
      })}

      <div class="cs-rv">
        <CierreDeCaso
          texto={contenido.cierre}
          enlaceDelProyecto={ENLACE}
          claseDelBoton="btn btn-yellow"
          relacionados={[
            /* TODO: los otros proyectos que quieras enlazar */
            { nombre: 'Schaman Analytics BI', meta: 'Rediseño de Interfaz · 2026',
              enlace: rutaPagina('casos/schaman-analytics-bi'),
              imagen: imagen('images/proyectos/schaman-analytics', 416).src,
              interno: true },
          ]}
        />
      </div>

    </div>
  </div>

  <script>
    import '../../scripts/casos/barra';
    import '../../scripts/casos/nav-al-leer';
    import '../../scripts/casos/escritura';
    import '../../scripts/casos/portada';
    import '../../scripts/casos/diagnostico';
    import '../../scripts/casos/videos';
  </script>
</BaseLayout>
`);

fs.mkdirSync(rutaImagenes, { recursive: true });
fs.writeFileSync(path.join(rutaImagenes, 'LEEME.txt'),
  `Los originales de este caso van aquí (PNG, JPG o WebP), a tamaño completo.\n\n` +
  `Después corre:  npm run imagenes\n` +
  `y la página pide cada una por su nombre, sin extensión:  captura('portada')\n\n` +
  `La portada se llama portada (portada.png): mientras no esté, la página\n` +
  `sale sin ventana. Nunca pongas originales en public/.\n` +
  `Cuando pongas la primera imagen, borra este archivo.\n`);

console.log(`\n✓ Caso "${slug}" creado:\n`);
console.log(`   src/content/casos/${slug}.ts           ← escribe aquí el texto`);
console.log(`   src/pages/casos/${slug}.astro          ← la estructura`);
console.log(`   originales/images/casos/${slug}/       ← los originales; luego npm run imagenes\n`);
console.log('Faltan DOS líneas que no puedo adivinar:\n');
console.log(`   1. src/content/proyectos/proyectos.ts`);
console.log(`      en el proyecto que corresponda, añade:   caso: "${slug}",`);
console.log(`      Con eso Proyectos ya lo enlaza y le pone "ver el caso".\n`);
console.log(`   2. scripts/paginas-a-comparar.mjs`);
console.log(`      añade una entrada para que entre en la verificación:\n`);
console.log(`        { id: '${slug}', nueva: '/Portafolio/casos/${slug}' },\n`);
console.log(`      Sin "anterior": es una página nueva, no hay con qué compararla.\n`);
console.log('Y después:  npm run build && npm run comparar ' + slug + ' && npm run interaccion ' + slug + '\n');
