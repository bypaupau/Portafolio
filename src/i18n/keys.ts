/* El español es la fuente de la verdad: define QUÉ claves existen.
   Los demás idiomas se tipan contra esta lista, así que a TypeScript
   le consta que ninguno se queda corto. */
import { spanishInterface } from './es';

export type TranslationKey = keyof typeof spanishInterface;

export const allTranslationKeys = Object.keys(spanishInterface) as TranslationKey[];
