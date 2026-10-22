/* ═══════════════════════════════════════════════════════════
   TRABAJOS CREATIVOS       página: src/pages/creativo.astro

   Lo que vive fuera del portafolio profesional: ilustración, libros,
   experimentos. Agregar un trabajo = agregar un objeto aquí, nada más.

   Viene de data/creativos.js del sitio anterior, sin cambios de
   contenido. Lo que cambió son los nombres de dos campos, para que digan
   qué guardan:  img → imagen  ·  enlaceTxt → enlaceTexto
   ═══════════════════════════════════════════════════════════ */
import type { TrabajoCreativo } from './tipos';

export const trabajosCreativos: TrabajoCreativo[] = [
  {
    nombre: { es: 'La guía del adulto chiquito', en: 'The little grown-up guide' },
    archivo: 'guia_adulto_chiquito',
    color: 'yellow',
    categoria: 'ilustracion',
    meta: { es: 'Libro ilustrado · 24 páginas', en: 'Illustrated book · 24 pages' },
    descripcion: {
      es: 'Una guía ilustrada de 24 páginas, hecha como regalo para acompañar a alguien que se muda solo a otra ciudad. Adentro hay farmacias y remedios caseros, cuidado personal, dónde comer y los trámites de la vida adulta. Está dibujada y diagramada entera en blanco y negro.',
      en: 'A 24-page illustrated guide, made as a gift for someone moving alone to another city. Inside: pharmacies and home remedies, personal care, where to eat and the paperwork of adult life. Drawn and laid out entirely in black and white.',
    },
    etiqueta: { es: 'ilustración editorial', en: 'editorial illustration' },
    sello: 'libro',
    selloColor: 's-lav',
    herramientas: ['Illustrator', 'Procreate'],
    imagen: 'images/creativo/guia-adulto-chiquito.png',
    enlace: 'documents/trabajos-disenio/GuiaDelAdultoChiquito.pdf',
    enlaceTexto: { es: 'ver guía completa', en: 'view full guide' },
  },
];
