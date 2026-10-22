/* pau.exe, encendido. El orden importa poco, pero las piezas se
   comprueban una sola vez (elementos.ts) y aquí solo se arranca. */
import { hayPauExe } from './elementos';
import { encenderPauExe } from './reacciones';

if (hayPauExe) encenderPauExe();
