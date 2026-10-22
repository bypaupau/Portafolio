/* ═══════════════════════════════════════════════════════════
   TEXTO DE LOS DATOS EN LOS DOS IDIOMAS

   El contenido de src/content/ usa `"texto"` (igual en ambos idiomas) o
   `{ es, en }`. Esto es lo que lo resuelve al dibujar.

   Astro escribe el español en el HTML y, cuando los dos idiomas
   difieren, deja el inglés en `data-i18n-en`. El script de idioma los
   intercambia sin recargar, y la página se lee sin JavaScript.
   Ver src/scripts/global/language-runtime.ts
   ═══════════════════════════════════════════════════════════ */
import { defaultLanguage, supportedLanguages, type Language } from '../i18n/languages';

/** Un texto igual en los dos idiomas, o uno distinto para cada uno. */
export type TextoBilingue = string | { es: string; en: string };

/** Lo que necesita un elemento para mostrarse y poder cambiar de idioma. */
export interface TextoConIdioma {
  texto: string;
  atributos: Record<string, string>;
}

/** El texto en un idioma. Si falta, cae al idioma por defecto. */
export function enIdioma(valor: TextoBilingue, idioma: Language = defaultLanguage): string {
  if (typeof valor === 'string') return valor;
  return valor[idioma] ?? valor[defaultLanguage];
}

/**
 * Los atributos para cambiar de idioma. Si el texto es igual en los dos,
 * no devuelve nada: no tiene sentido ensuciar el HTML con atributos que
 * no van a hacer nada.
 */
export function atributosDeIdioma(valor: TextoBilingue): Record<string, string> {
  if (typeof valor === 'string') return {};
  const difieren = supportedLanguages.some((l) => valor[l] !== valor[defaultLanguage]);
  if (!difieren) return {};
  return { 'data-i18n-es': valor.es, 'data-i18n-en': valor.en };
}

/** Las dos cosas juntas, que es como las piden los componentes. */
export function conIdioma(valor: TextoBilingue | undefined, siFalta = ''): TextoConIdioma {
  if (valor === undefined) return { texto: siFalta, atributos: {} };
  return { texto: enIdioma(valor), atributos: atributosDeIdioma(valor) };
}

/**
 * Un texto que viene de una CLAVE de traducción. Deja `data-i18n` puesto,
 * que es lo que permite cambiar de idioma sin recargar.
 *
 * No confundir con textoFijo(): ese es para texto que no se traduce
 * nunca. Pasar una clave por textoFijo() hace que el texto se quede
 * congelado en español — pasó con el enlace de las tarjetas destacadas
 * de Proyectos.
 */
export function textoDeClave(clave: string, traducido: string): TextoConIdioma {
  return { texto: traducido, atributos: { 'data-i18n': clave } };
}

/** Un texto que no se traduce nunca (un nombre propio, una herramienta). */
export function textoFijo(texto: string): TextoConIdioma {
  return { texto, atributos: {} };
}

/**
 * Un texto bilingüe CON MARCADO dentro (<b>, <strong>, un enlace).
 * Se usa con set:html, y los atributos dejan el otro idioma listo para
 * que el script lo intercambie. Ver data-i18n-html-es en
 * src/scripts/global/language-runtime.ts
 */
export function htmlConIdioma(valor: TextoBilingue): TextoConIdioma {
  const atributos = atributosDeIdioma(valor);
  return {
    texto: enIdioma(valor),
    atributos:
      'data-i18n-es' in atributos
        ? {
            'data-i18n-html-es': atributos['data-i18n-es']!,
            'data-i18n-html-en': atributos['data-i18n-en']!,
          }
        : {},
  };
}

/**
 * El texto alternativo de una imagen, en los dos idiomas. Devuelve
 * directamente los atributos que lleva el <img>.
 */
export function altConIdioma(valor: TextoBilingue): Record<string, string> {
  const atributos = atributosDeIdioma(valor);
  const alt = { alt: enIdioma(valor) };
  if (!('data-i18n-es' in atributos)) return alt;
  return {
    ...alt,
    'data-i18n-alt-es': atributos['data-i18n-es']!,
    'data-i18n-alt-en': atributos['data-i18n-en']!,
  };
}
