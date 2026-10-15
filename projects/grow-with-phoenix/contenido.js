/* ═══════════════════════════════════════════════════════════
   grow-with-phoenix · contenido de su página individual
   Se registra solo: basta con incluir este archivo con <script>.
   Funciona abriendo el HTML desde Finder (file://), sin servidor.

   Los campos con "" o [] están VACÍOS a propósito: ver `pendiente`.
   Nada aquí fue inventado — lo que está lleno viene de data/proyectos.js.
   ═══════════════════════════════════════════════════════════ */
(window.CASOS = window.CASOS || {})["grow-with-phoenix"] = {
  slug: "grow-with-phoenix",

  /* 'caso' = página completa · 'ficha' = página corta · 'tarjeta' = sin página propia */
  tamano: "caso",
  /* 'sin-empezar' → 'borrador' → 'publicado'. Solo 'publicado' se enlaza desde las tarjetas. */
  publicacion: 'publicado',   /* versión provisional: pages/caso/grow-with-phoenix.html */

  /* ── lo que ya existe en data/proyectos.js (no se duplica a mano: se lee de ahí) ── */
  nombre: "Grow With Phoenix",
  resumen: {
    "es": "Analizamos los desiertos alimentarios de Phoenix, Arizona con datos satelitales y diseñamos el prototipo de una app que acompaña a la gente a cultivar su propia comida.",
    "en": "We analyzed the food deserts of Phoenix, Arizona with satellite data and designed a prototype app that helps people grow their own food."
  },
  etiquetas: [
    "Figma",
    "UX/UI",
    "Python",
    "Google Earth Engine",
    "Google Colab",
    "Data Science"
  ],
  periodo: "2025",
  contexto: "SpaceHACK for Sustainability 2025",

  /* ── ficha del caso: NADA de esto está documentado todavía ── */
  ficha: {
    rol:      { es: '', en: '' },   /* qué hiciste tú exactamente */
    equipo:   { es: '', en: '' },   /* sola / N personas — y quién hizo qué */
    duracion: { es: '', en: '' },   /* ej: "48 h de hackathon", "6 semanas" */
    logro:    {
      "es": "1er lugar internacional",
      "en": "1st place worldwide"
    }
  },

  /* ── portada: la miniatura actual, ya convertida a WebP ── */
  portada: {
    img: 'img/portada.webp',
    alt: { es: '', en: '' }          /* describe la imagen para quien no la ve */
  },

  enlaces: [
    {
      "tipo": "proyecto",
      "url": "https://drive.google.com/file/d/14QEug3cvbm_SLL2dG_udZX4H6NDujfX7/view?usp=sharing",
      "texto": {
        "es": "ver proyecto →",
        "en": "view project →"
      }
    }
  ],

  /* ── el relato. Bloques del catálogo (ver projects/README.md):
     texto · lead · figura · galeria · ventana · split · pasos ·
     cita · lista · codigo · comparacion · media

     Cada bloque puede llevar `marca` para ser honesta sobre su estado:
     'implementado' | 'propuesta' | 'en-progreso' | 'mejora-futura'

     Ejemplo (bórralo al escribir el primero de verdad):
       { tipo: 'lead',   es: 'Una frase que abre la sección.', en: '…' },
       { tipo: 'texto',  es: 'Un párrafo.', en: '…' },
       { tipo: 'figura', img: 'img/01-problema.webp',
         alt: { es: '…', en: '…' }, pie: { es: '…', en: '…' },
         marca: 'implementado' },
  ── */
  bloques: [],

  /* ── qué falta para poder publicar este caso ── */
  pendiente: [
    "ficha: equipo (quiénes) y duración real del hackathon — la página los declara 'por documentar'",
    "v1: pantallas del prototipo de 2025 además de las 4 que salieron del mockup",
    "v2: pantallas del rediseño, cuando existan",
    "v2: qué le ves mal a v1 — tres cosas y por qué (el corazón del caso)",
    "investigación: capturas de los mapas de GEE que SÍ salieron de datos reales",
    "investigación: las referencias científicas y las especies evaluadas",
    "concordancia entre las pantallas conservadas y el flujo Discover · Grow · Cook",
    "fuente verificable del resultado del concurso"
  ]
};
