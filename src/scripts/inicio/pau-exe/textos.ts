/* ═══════════════════════════════════════════════════════════
   pau.exe · LO QUE DICE, en el idioma que esté activo

   Las claves van ESCRITAS COMPLETAS a propósito. La primera versión de
   este archivo las armaba con 'pages.home.exe.' + sufijo, y entonces
   scripts/validar-traducciones.mjs no podía comprobarlas: una errata
   en un sufijo habría salido en pantalla sin que nada avisara.
   Escritas enteras, el tipo TranslationKey y el validador las revisan.

   El texto está en src/i18n/{es,en}/inicio.ts.
   ═══════════════════════════════════════════════════════════ */
import { textoDe } from '../../global/language-runtime';
import type { TranslationKey } from '../../../i18n/keys';

const CLAVES = {
  bienvenida: 'pages.home.exe.welcome',
  corriendo: 'pages.home.exe.running',
  sigueAhi: 'pages.home.exe.stillHere',
  cambioDeIdioma: 'pages.home.exe.languageChanged',
  minimizar: 'pages.home.exe.minimize',
  maximizar: 'pages.home.exe.maximize',
  cerrar: 'pages.home.exe.close',
  konami: 'pages.home.exe.konami',
  pistaEmail: 'pages.home.exe.hint.email',
  pistaGitHub: 'pages.home.exe.hint.github',
  pistaLinkedIn: 'pages.home.exe.hint.linkedin',
} satisfies Record<string, TranslationKey>;

/** Un mensaje de pau.exe, en el idioma activo. */
export function dice(cual: keyof typeof CLAVES): string {
  return textoDe(CLAVES[cual]) ?? '';
}

/* Los seis mensajes que va contando al hacerle clic, en orden. */
const ESTADOS = [
  'pages.home.exe.state.1',
  'pages.home.exe.state.2',
  'pages.home.exe.state.3',
  'pages.home.exe.state.4',
  'pages.home.exe.state.5',
  'pages.home.exe.state.6',
] satisfies readonly TranslationKey[];

export const mensajesDeEstado = (): string[] =>
  ESTADOS.map((clave) => textoDe(clave) ?? '').filter(Boolean);
