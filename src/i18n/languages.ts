/* ═══════════════════════════════════════════════════════════
   Los idiomas del sitio. Para añadir uno (por ejemplo portugués):
     1. agrégalo a `supportedLanguages`
     2. crea src/i18n/pt/  (TypeScript te dirá qué claves faltan)
     3. regístralo en src/i18n/translate.ts
   ═══════════════════════════════════════════════════════════ */

export const supportedLanguages = ['es', 'en'] as const;

export type Language = (typeof supportedLanguages)[number];

/** El idioma en que se escribe el sitio y al que cae todo lo demás. */
export const defaultLanguage: Language = 'es';

/* La misma clave que usaba js/i18n.js: así, a quien ya visitó el
   sitio y eligió inglés, no se le pierde la preferencia al migrar. */
export const languageStorageKey = 'pau.lang';

export function isSupportedLanguage(value: unknown): value is Language {
  return typeof value === 'string' && (supportedLanguages as readonly string[]).includes(value);
}
