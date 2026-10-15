/* ═══════════════════════════════════════════════════════════
   catventures · contenido de su página individual
   Se registra solo: basta con incluir este archivo con <script>.
   Funciona abriendo el HTML desde Finder (file://), sin servidor.

   Los campos con "" o [] están VACÍOS a propósito: ver `pendiente`.
   Nada aquí fue inventado — lo que está lleno viene de data/proyectos.js.
   ═══════════════════════════════════════════════════════════ */
(window.CASOS = window.CASOS || {})["catventures"] = {
  slug: "catventures",

  /* 'caso' = página completa · 'ficha' = página corta · 'tarjeta' = sin página propia */
  tamano: "caso",
  /* 'sin-empezar' → 'borrador' → 'publicado'. Solo 'publicado' se enlaza desde las tarjetas. */
  publicacion: 'sin-empezar',

  /* ── lo que ya existe en data/proyectos.js (no se duplica a mano: se lee de ahí) ── */
  nombre: "Catventures - Unity 2D",
  resumen: {
    "es": "Videojuego pixel art hecho en Unity para aprender C#; el diseño y la ilustración fueron parte del trabajo.",
    "en": "A pixel art video game made in Unity to learn C#, where design and illustration were part of the work."
  },
  etiquetas: [
    {
      "es": "Diseño",
      "en": "Design"
    },
    "C#",
    "Unity",
    {
      "es": "Ilustración",
      "en": "Illustration"
    }
  ],
  periodo: {
    "es": "Agosto 2026",
    "en": "August 2026"
  },
  contexto: {
    "es": "Lenguajes de Programación",
    "en": "Programming Languages"
  },

  /* ── ficha del caso: NADA de esto está documentado todavía ── */
  ficha: {
    rol:      { es: '', en: '' },   /* qué hiciste tú exactamente */
    equipo:   { es: '', en: '' },   /* sola / N personas — y quién hizo qué */
    duracion: { es: '', en: '' },   /* ej: "48 h de hackathon", "6 semanas" */
    logro:    {
      "es": "diseño + código",
      "en": "design + code"
    }
  },

  /* ── portada: la miniatura actual, ya convertida a WebP ── */
  portada: {
    img: 'img/portada.webp',
    alt: { es: '', en: '' }          /* describe la imagen para quien no la ve */
  },

  enlaces: [
    {
      "tipo": "repo",
      "url": "https://github.com/bypaupau/JuegoGrupal-ProyectoIIParcial",
      "texto": {
        "es": "ver el código",
        "en": "view the code"
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
    "ficha: rol, equipo y duración (no están documentados en ningún sitio)",
    "bloques: el relato del caso, en crudo — qué hiciste tú y qué decidiste",
    "img/: stills, mockups o diagramas además de la portada",
    "img/: sprites sueltos, paleta y un GIF de gameplay (10-15 s)"
  ]
};
