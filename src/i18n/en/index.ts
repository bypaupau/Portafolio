import type { TranslationKey } from '../keys';
import { englishGlobal } from './global';
import { englishContacto } from './contacto';
import { englishCreativo } from './creativo';
import { englishProyectos } from './proyectos';
import { englishSobreMi } from './sobre-mi';
import { englishInicio } from './inicio';

export const englishInterface: Record<TranslationKey, string> = {
  ...englishGlobal,
  ...englishContacto,
  ...englishCreativo,
  ...englishProyectos,
  ...englishSobreMi,
  ...englishInicio,
};
