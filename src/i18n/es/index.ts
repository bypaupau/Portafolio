/* El español es la FUENTE DE LA VERDAD: define qué claves existen.
   Para añadir una página, crea su archivo y añádelo a esta mezcla. */
import { spanishGlobal } from './global';
import { spanishContacto } from './contacto';
import { spanishCreativo } from './creativo';
import { spanishProyectos } from './proyectos';
import { spanishSobreMi } from './sobre-mi';
import { spanishInicio } from './inicio';

export const spanishInterface = {
  ...spanishGlobal,
  ...spanishContacto,
  ...spanishCreativo,
  ...spanishProyectos,
  ...spanishSobreMi,
  ...spanishInicio,
} as const;
