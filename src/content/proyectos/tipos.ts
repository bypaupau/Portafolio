/* ═══════════════════════════════════════════════════════════
   LA FORMA DE UN PROYECTO

   Antes esto era un bloque de comentarios encima de data/proyectos.js.
   Ahora son tipos: el editor autocompleta y marca el error si escribes
   mal una disciplina o te olvidas de un campo obligatorio.
   ═══════════════════════════════════════════════════════════ */
export type { TextoBilingue } from '../../lib/texto-bilingue';
import type { TextoBilingue } from '../../lib/texto-bilingue';

/** Los chips de la página. */
export const disciplinas = ['diseno', 'desarrollo', 'datos', 'juegos'] as const;
export type Disciplina = (typeof disciplinas)[number];

/** De dónde viene el proyecto. Se leen en la metadata de cada fila. */
export const contextos = ['hackathon', 'universidad', 'personal'] as const;
export type Contexto = (typeof contextos)[number];

export type Estado = 'completado' | 'en-progreso' | 'pronto';
export type ColorDeBarra = 'sky' | 'lav' | 'mint' | 'peach' | 'yellow' | '';

/** El dibujo del sticker. Se eligió por lo que DIBUJA cada sprite. */
export type SelloDibujo = 'libro' | 'trofeo' | 'medalla' | 'gato';

/** El color del sticker. Son clases de css/styles.css: no se renombran. */
export type SelloColor = 's-pink' | 's-sky' | 's-gold' | 's-lav' | 's-mint';

export interface Proyecto {
  nombre: TextoBilingue;
  /** título corto para la tarjeta destacada; si falta se usa `nombre` */
  nombreCorto?: TextoBilingue;
  disciplinas: Disciplina[];
  /** "hackathon" · "academico" · "personal" — combinables con coma.
      `academico` se muestra como "Universidad": ver contextosDe() */
  tipo: string;
  /** la asignatura, o el evento en los hackathones */
  materia: TextoBilingue;
  /** "AAAA-MM" — ordena el archivo, de más reciente a más antiguo */
  fecha: string;
  periodo: TextoBilingue;
  /** línea bajo el título en la tarjeta destacada; si falta se usa `periodo` */
  meta?: TextoBilingue;
  descripcion: TextoBilingue;
  /** frase corta del proyecto; hoy no se dibuja en esta página */
  frase?: TextoBilingue;
  habilidades: TextoBilingue[];
  estado: Estado;

  /** 1, 2, 3… sale arriba en tarjeta grande, y en ese orden */
  destacado?: number;
  /** título de la barra de la ventana en la tarjeta destacada */
  archivo?: TextoBilingue;
  color?: ColorDeBarra;
  /** texto del sticker */
  logro?: TextoBilingue;
  sello?: SelloDibujo;
  selloColor?: SelloColor;

  /** ruta dentro de public/, sin barra inicial */
  imagen?: string;
  repositorio?: string;
  /** enlace externo que gana al repositorio */
  enlace?: string;
  enlaceTexto?: TextoBilingue;
  /** slug de su página de caso, si la tiene: /Portafolio/casos/<slug> */
  caso?: string;
}

/**
 * "academico, personal" → ['universidad', 'personal']
 *
 * Tolerante a mayúsculas y espacios, igual que el sitio anterior: así
 * "Academico" y "academico" no generan dos opciones distintas.
 */
export function contextosDe(proyecto: Proyecto): Contexto[] {
  return String(proyecto.tipo || '')
    .split(',')
    .map((parte) => {
      const limpio = parte.trim().toLowerCase();
      return limpio === 'academico' ? 'universidad' : limpio;
    })
    .filter((c): c is Contexto => (contextos as readonly string[]).includes(c));
}
