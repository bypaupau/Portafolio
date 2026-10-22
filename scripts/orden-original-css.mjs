/* ═══════════════════════════════════════════════════════════
   EL ORDEN QUE TENÍA EL ARCHIVO ÚNICO

   Antes de la etapa 7b, global.css era un solo archivo de 1524
   líneas; al partirlo, los @import quedaron en ese mismo orden,
   porque en CSS el orden ES la cascada.

   Esta lista guarda ese orden para siempre. `npm run cascada`
   compara el orden de hoy contra esta lista y avisa si algún par
   de reglas cambió de ganador. Es la prueba de que reagrupar (y
   cualquier cambio futuro de orden) no cambió lo que se ve.

   NO reordenar esta lista. Si agregas un archivo nuevo, va al
   final: es nuevo, antes no existía, así que no puede haber
   cambiado el ganador de nada.
   ═══════════════════════════════════════════════════════════ */
export const ORDEN_ORIGINAL = [
  'base/tokens.css',
  'base/contenedor.css',
  'componentes/nav.css',
  'componentes/ventana.css',
  'componentes/botones.css',
  'paginas/inicio-hero.css',
  'paginas/inicio-descubrir.css',
  'base/encabezados-y-tarjetas.css',
  'paginas/materias.css',
  'paginas/contacto-campos.css',
  'paginas/sobre-mi-skills.css',
  'paginas/proyectos-filtros.css',
  'componentes/pie.css',
  'base/responsive.css',
  'base/animacion.css',
  'paginas/inicio-entrada.css',
  'paginas/inicio-pau-exe.css',
  'paginas/inicio-texto-anotado.css',
  'base/aparicion.css',
  'paginas/inicio-secretos.css',
  'base/cursor-pixel.css',
  'paginas/inicio-responsive.css',
  'componentes/taskbar.css',
  /* el .hero que vivía al final de taskbar.css; en la etapa 7b salió a
     ajustes/hero-entre-barras.css. Se anota en SU posición original para
     que la prueba también compruebe que no cambió de ganador. */
  'ajustes/hero-entre-barras.css',
  'paginas/inicio-puente.css',
  'paginas/inicio-cierre.css',
  'paginas/inicio-destacados.css',
  'paginas/proyectos.css',
  'paginas/contacto-layout.css',
  'base/rejilla-comun.css',
  'base/transicion-entre-paginas.css',
  'paginas/proyectos-archivo.css',
  'paginas/contacto-formulario.css',
  'base/menos-movimiento.css',
  'paginas/creativo.css',
];
