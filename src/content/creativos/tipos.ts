/* ═══════════════════════════════════════════════════════════
   LA FORMA DE UN TRABAJO CREATIVO

   Antes esto era un bloque de comentarios encima de data/creativos.js.
   Ahora son tipos: el editor te autocompleta los campos y te marca el
   error si escribes mal una categoría o te olvidas de algo obligatorio.
   ═══════════════════════════════════════════════════════════ */

/* El tipo del texto bilingüe es compartido: vive junto a las funciones
   que lo resuelven, en src/lib/texto-bilingue.ts */
export type { TextoBilingue } from '../../lib/texto-bilingue';
import type { TextoBilingue } from '../../lib/texto-bilingue';

export const categorias = ['ilustracion', 'personal', 'experimento', 'otros'] as const;
export type Categoria = (typeof categorias)[number];

/** Color de la barra de la ventana de la tarjeta. '' es el rosa. */
export type ColorDeBarra = '' | 'peach' | 'sky' | 'mint' | 'lav' | 'yellow';

/** Color del sticker. */
export type ColorDeSello = 's-pink' | 's-lav' | 's-sky' | 's-mint' | 's-gold';

export interface TrabajoCreativo {
  /** título de la tarjeta */
  nombre: TextoBilingue;
  /** lo que se lee en la barra de la ventana, estilo nombre de archivo */
  archivo: TextoBilingue;
  color: ColorDeBarra;
  categoria: Categoria;
  /** línea corta bajo el título: técnica, formato, extensión… */
  meta: TextoBilingue;
  /** 2–3 líneas fieles al trabajo */
  descripcion: TextoBilingue;
  /** texto del sticker; vacío = sin sticker */
  etiqueta?: TextoBilingue;
  /** 'libro' dibuja el librito pixel; vacío = sticker sin ícono */
  sello?: 'libro' | '';
  selloColor?: ColorDeSello;
  /** solo las herramientas que puedas confirmar */
  herramientas: TextoBilingue[];
  /** ruta dentro de public/, sin la barra inicial */
  imagen: string;
  /** ruta dentro de public/ o URL completa; vacío = todavía no hay nada que abrir */
  enlace: string;
  enlaceTexto?: TextoBilingue;
}
