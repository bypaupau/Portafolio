/* ═══════════════════════════════════════════════════════════
   LAS PÁGINAS DEL SITIO · una sola fuente de la verdad

   Esta lista alimenta la navegación, y a la vez es la lista de
   control de la migración: `migrada` dice si la página ya existe
   como .astro o si todavía la sirve el HTML viejo.

   Mientras `migrada` sea false, el enlace apunta a la URL NUEVA
   igualmente (que es el estado final correcto). Durante la
   transición ese enlace da 404 en `npm run preview`, y es lo
   esperado: la compilación de Astro NO está publicada todavía.
   El sitio en vivo sigue siendo el de los archivos de la raíz.

   URL vieja → nueva: cada página migrada añade su redirección en
   astro.config.mjs, así los enlaces que ya compartiste no se rompen.
   ═══════════════════════════════════════════════════════════ */
import type { TranslationKey } from '../i18n/keys';

export interface PaginaDelSitio {
  /** identificador estable, el que usan los .astro y el taskbar */
  readonly id: string;
  /** ruta relativa a la base. Cadena vacía = portada. */
  readonly ruta: string;
  /** clave del texto del enlace en el menú */
  readonly claveEnlace: TranslationKey;
  /** URL de la versión anterior, para la redirección */
  readonly urlAnterior: string;
  /** ¿ya migrada a Astro? */
  readonly migrada: boolean;
}

export const paginasDelSitio: readonly PaginaDelSitio[] = [
  { id: 'home',     ruta: '',          claveEnlace: 'navigation.home',     urlAnterior: '/index.html',                migrada: false },
  { id: 'about',    ruta: 'sobre-mi',  claveEnlace: 'navigation.about',    urlAnterior: '/pages/sobremi.html',        migrada: true  },
  { id: 'projects', ruta: 'proyectos', claveEnlace: 'navigation.projects', urlAnterior: '/pages/proyectos.html',      migrada: true  },
  { id: 'creative', ruta: 'creativo',  claveEnlace: 'navigation.creative', urlAnterior: '/pages/creativo.html',       migrada: true  },
  { id: 'contact',  ruta: 'contacto',  claveEnlace: 'navigation.contact',  urlAnterior: '/pages/contacto.html',       migrada: true  },
] as const;
