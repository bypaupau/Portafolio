/* ═══════════════════════════════════════════════════════════
   INICIO · los secretitos

     ↑↑↓↓←→←→BA   el konami de siempre: la compu lo celebra
     la consola    un saludo para quien abra las herramientas y la
                   pista de que el konami existe

   El <3 del pie tiene su propio globito, pero eso es CSS
   (.egg-coffee[data-tip]), no hace falta JavaScript.
   ═══════════════════════════════════════════════════════════ */
import { compu, hayPauExe } from './pau-exe/elementos';
import { carita } from './pau-exe/carita';
import { decir } from './pau-exe/dialogo';
import { chispita } from './pau-exe/gestos';
import { dice } from './pau-exe/textos';

const KONAMI = ['ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown',
  'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight', 'b', 'a'];

if (hayPauExe) {
  let paso = 0;
  document.addEventListener('keydown', (evento) => {
    const tecla = evento.key.length === 1 ? evento.key.toLowerCase() : evento.key;
    paso = tecla === KONAMI[paso] ? paso + 1 : (tecla === KONAMI[0] ? 1 : 0);
    if (paso !== KONAMI.length) return;

    paso = 0;
    carita('happy', 2400);
    decir(dice('konami'), 2600);
    const caja = compu!.getBoundingClientRect();
    chispita(caja.left + caja.width / 2, caja.top + caja.height / 2);
    console.log('%c✦ achievement unlocked: curios@ certificad@',
      'color:#E87EA1;font:600 13px monospace');
  });
}

console.log(
  '%c<pausita.exe>%c\n♡ made with curiosity + too much coffee\n' +
  '¿curioseando el código? me caes bien.\npsst… prueba ↑↑↓↓←→←→BA en el inicio.',
  'font:700 14px monospace;color:#2C1A24;background:#FCE8EF;border:2px solid #2C1A24;padding:3px 8px',
  'font:12px monospace;color:#7A5566;line-height:1.6',
);
