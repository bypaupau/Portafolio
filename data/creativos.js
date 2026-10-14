// ── CREATIVO ──  trabajos que viven fuera del portafolio profesional
// (ilustración, libros, experimentos). Los dibuja pages/creativo.html:
// agregar un trabajo = agregar un objeto aquí, nada más.
//
// IDIOMAS: igual que data/proyectos.js → un texto normal se ve igual en
// español e inglés; { es: "…", en: "…" } le da una versión a cada idioma.
//
// CAMPOS
//   nombre        título de la tarjeta
//   archivo       lo que se lee en la barra de la ventana (estilo nombre de archivo)
//   color         barra de la ventana: "" (rosa) | peach | sky | mint | lav | yellow
//   categoria     "ilustracion" | "personal" | "experimento" | "otros"
//                 → los filtros aparecen solos cuando haya 4+ trabajos de 2+ categorías
//   meta          línea corta bajo el título (técnica, formato, extensión…)
//   descripcion   2–3 líneas fieles al trabajo
//   etiqueta      texto del sticker  ·  sello: "libro" | "" (sticker sin ícono)
//   selloColor    color del sticker: s-pink | s-lav | s-sky | s-mint | s-gold
//   herramientas  etiquetas de herramientas — solo las que puedas confirmar
//   img           ruta relativa a la RAÍZ del sitio (ej: "img/archivo.png")
//   enlace        ruta o URL al trabajo completo · "" si todavía no hay nada que abrir
//   enlaceTxt     texto del enlace
const CREATIVOS = [
  {
    nombre: { es: 'La guía del adulto chiquito', en: 'The little grown-up guide' },
    archivo: 'guia_adulto_chiquito',
    color: 'yellow',
    categoria: 'ilustracion',
    meta: { es: 'Libro ilustrado · 24 páginas', en: 'Illustrated book · 24 pages' },
    descripcion: {
      es: 'Una guía ilustrada de 24 páginas, hecha como regalo para acompañar a alguien que se muda solo a otra ciudad. Adentro hay farmacias y remedios caseros, cuidado personal, dónde comer y los trámites de la vida adulta. Está dibujada y diagramada entera en blanco y negro.',
      en: 'A 24-page illustrated guide, made as a gift for someone moving alone to another city. Inside: pharmacies and home remedies, personal care, where to eat and the paperwork of adult life. Drawn and laid out entirely in black and white.'
    },
    etiqueta: { es: 'ilustración editorial', en: 'editorial illustration' },
    sello: 'libro',
    selloColor: 's-lav',
    herramientas: ['Illustrator', 'Procreate'],
    img: 'img/guia-adulto-chiquito.png',
    enlace: 'trabajos-disenio/GuiaDelAdultoChiquito.pdf',
    enlaceTxt: { es: 'ver guía completa', en: 'view full guide' }
  }
];
