/* ═══════════════════════════════════════════════════════════
   simulacion-laravel-prolog · contenido de su página individual
   Se registra solo: basta con incluir este archivo con <script>.
   Funciona abriendo el HTML desde Finder (file://), sin servidor.

   Los campos con "" o [] están VACÍOS a propósito: ver `pendiente`.
   Nada aquí fue inventado — lo que está lleno viene de data/proyectos.js.
   ═══════════════════════════════════════════════════════════ */
(window.CASOS = window.CASOS || {})["simulacion-laravel-prolog"] = {
  slug: "simulacion-laravel-prolog",

  /* 'caso' = página completa · 'ficha' = página corta · 'tarjeta' = sin página propia */
  tamano: "tarjeta",
  /* 'sin-empezar' → 'borrador' → 'publicado'. Solo 'publicado' se enlaza desde las tarjetas. */
  publicacion: 'sin-empezar',

  /* ── lo que ya existe en data/proyectos.js (no se duplica a mano: se lee de ahí) ── */
  nombre: {
    "es": "Simulación de Videojuego · Laravel + Prolog",
    "en": "Video Game Simulation · Laravel + Prolog"
  },
  resumen: {
    "es": "Simulación de un videojuego que combina Laravel para la lógica web y Prolog para el razonamiento.",
    "en": "Simulation of a video game that combines Laravel for the web logic and Prolog for the reasoning."
  },
  etiquetas: [
    "Laravel",
    "Prolog",
    "PHP"
  ],
  periodo: {
    "es": "Junio 2026",
    "en": "June 2026"
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
      "es": "",
      "en": ""
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
      "url": "https://github.com/bypaupau/RPG-Game",
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
    "ficha: rol, equipo y duración (no están documentados en ningún sitio)"
  ]
};
