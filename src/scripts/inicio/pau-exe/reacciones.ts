/* ═══════════════════════════════════════════════════════════
   pau.exe · QUÉ CONTESTA A CADA COSA

   Este archivo es solo el cableado: junta la carita, el diálogo y los
   gestos y los conecta a lo que hace la persona. Si quieres cambiar
   QUÉ dice, los textos están en src/i18n/{es,en}/inicio.ts; si quieres
   cambiar CÓMO se mueve, en gestos.ts.

   Lo que responde:
     la compu              clic → va contando sus seis estados
     _ ▢ ✕                 cada control tiene SU gesto y SU cara
     los tres botones      la pantalla se tiñe del color del destino y
                           la compu opina: sonríe al mail, se sorprende
                           con los repos, guiña a LinkedIn
     el título             pau.exe ↔ pausita.exe al pasar el mouse
     cambio de idioma      lo celebra, sin moverse
     entrar con el cursor  si estaba dormida, despierta y saluda
   ═══════════════════════════════════════════════════════════ */
import { ventana, compu, menosMovimiento, punteroFino, enPantalla } from './elementos';
import { carita, despertar, estaDormida, empezarElCiclo } from './carita';
import { escribir, decir, bienvenida, cancelarVuelta, volverALaBienvenida, estaEscribiendo } from './dialogo';
import { gesto, destello, hundir, chispita, limpiarAlTerminar } from './gestos';
import { dice, mensajesDeEstado } from './textos';
import { encenderLosOjos } from './ojos';

export function encenderPauExe(): void {
  if (!ventana || !compu) return;

  limpiarAlTerminar();

  /* ── la bienvenida, cuando la ventana termina de entrar ── */
  const esperaDeEntrada = document.documentElement.classList.contains('hx-motion') ? 1050 : 0;
  window.setTimeout(() => escribir(bienvenida(), 70), esperaDeEntrada);

  empezarElCiclo();
  encenderLosOjos();

  /* ── dos "estados del sistema" en toda la visita, y solo si la
        persona se queda mirando el inicio ── */
  if (!menosMovimiento) {
    ([['corriendo', 16000], ['sigueAhi', 48000]] as const).forEach(([clave, cuando]) => {
      window.setTimeout(() => {
        if (enPantalla() && !estaDormida() && !estaEscribiendo()) decir(dice(clave), 2200);
      }, cuando);
    });
  }

  /* ── despierta con cualquier gesto dentro de la ventana ── */
  const atender = (saluda: boolean) => () => {
    if (despertar() && saluda) decir(dice('despierta'), 1200);
  };
  ventana.addEventListener('pointerenter', atender(true));
  ventana.addEventListener('pointermove', atender(false));
  ventana.addEventListener('pointerdown', atender(false));
  ventana.addEventListener('focusin', atender(false));

  /* ── la compu ── */
  compu.addEventListener('pointerdown', hundir);
  let estado = 0;
  compu.addEventListener('click', (evento) => {
    const mensajes = mensajesDeEstado();
    carita('happy', 1200);
    if (mensajes.length) decir(mensajes[estado++ % mensajes.length]!);
    chispita(evento.clientX, evento.clientY);
  });

  /* ── los controles _ ▢ ✕ · no obedecen, pero contestan ── */
  const CONTROLES = [
    () => { carita('blink', 500);  decir(dice('minimizar')); gesto('duck'); },
    () => { carita('happy', 1200); decir(dice('maximizar')); gesto('grow'); },
    () => { carita('oh', 1300);    decir(dice('cerrar'));    gesto('shake'); destello(); },
  ];
  ventana.querySelectorAll<HTMLElement>('.win-ctrls i').forEach((control, i) => {
    control.addEventListener('click', (evento) => {
      CONTROLES[i]?.();
      chispita((evento as MouseEvent).clientX, (evento as MouseEvent).clientY);
    });
  });

  /* ── los tres botones: cada destino tiñe la pantalla y tiene su cara ── */
  const CARA_DE = { email: 'happy', github: 'oh', linkedin: 'wink' } as const;
  const COLOR_DE = { email: 'mail', github: 'gh', linkedin: 'in' } as const;
  const PISTA_DE = { email: 'pistaEmail', github: 'pistaGitHub', linkedin: 'pistaLinkedIn' } as const;

  ventana.querySelectorAll<HTMLAnchorElement>('.social').forEach((boton) => {
    const cual = boton.classList.contains('mail') ? 'email'
      : boton.classList.contains('gh') ? 'github' : 'linkedin';

    const entrar = (): void => {
      despertar();
      cancelarVuelta();
      escribir(dice(PISTA_DE[cual]), 22);
      carita(CARA_DE[cual]);
      compu.setAttribute('data-scr', COLOR_DE[cual]);
    };
    const salir = (): void => {
      carita('');
      compu.removeAttribute('data-scr');
      volverALaBienvenida(350);
    };

    if (punteroFino) {
      boton.addEventListener('mouseenter', entrar);
      boton.addEventListener('mouseleave', salir);
    }
    boton.addEventListener('focus', entrar);
    boton.addEventListener('blur', salir);
    /* al elegirlo de verdad, lo confirma una vez más antes de irse */
    boton.addEventListener('click', () => { carita(CARA_DE[cual], 1100); destello(); });
  });

  /* ── el título ── */
  const titulo = ventana.querySelector<HTMLElement>('.win-title');
  if (titulo && punteroFino) {
    titulo.addEventListener('mouseenter', () => { titulo.textContent = 'pausita.exe'; });
    titulo.addEventListener('mouseleave', () => { titulo.textContent = 'pau.exe'; });
  }

  /* ── cambio de idioma desde la taskbar ── */
  document.addEventListener('langchange', () => {
    despertar();
    cancelarVuelta();
    carita('happy', 1200);
    decir(dice('cambioDeIdioma'), 1400);
  });
}
