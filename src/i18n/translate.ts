/* ═══════════════════════════════════════════════════════════
   El traductor. Se usa en DOS momentos distintos:

   1. AL COMPILAR (en los .astro) · translate(clave)
      Escribe el texto español directamente en el HTML. Esto es nuevo:
      antes el HTML salía con los elementos VACÍOS y JavaScript los
      llenaba al cargar. Ahora la página se lee sin JavaScript, los
      buscadores ven el texto y no hay parpadeo inicial.

   2. EN EL NAVEGADOR · src/scripts/global/language-runtime.ts
      Si la visitante eligió inglés, cambia los textos al instante,
      sin recargar. Ese comportamiento se conserva igual que antes.
   ═══════════════════════════════════════════════════════════ */
import { defaultLanguage, type Language } from './languages';
import type { TranslationKey } from './keys';
import { spanishInterface } from './es';
import { englishInterface } from './en';

export const interfaceTranslations: Record<Language, Record<TranslationKey, string>> = {
  es: spanishInterface,
  en: englishInterface,
};

/**
 * Devuelve el texto de una clave. `TranslationKey` hace que una clave
 * mal escrita sea un error de tipos, no un identificador en pantalla.
 */
export function translate(key: TranslationKey, language: Language = defaultLanguage): string {
  const texto = interfaceTranslations[language]?.[key];
  if (texto !== undefined) return texto;

  /* Red de seguridad. En la práctica no debería ocurrir: los tipos y
     scripts/validar-traducciones.mjs lo atrapan antes de compilar. */
  const respaldo = interfaceTranslations[defaultLanguage][key];
  if (respaldo !== undefined) return respaldo;
  throw new Error(
    `[i18n] la clave "${key}" no existe en ningún idioma. ` +
      `Agrégala en src/i18n/es/ (y en en/).`,
  );
}

export type { TranslationKey, Language };
