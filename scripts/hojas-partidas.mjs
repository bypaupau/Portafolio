/* ═══════════════════════════════════════════════════════════
   LAS HOJAS DE ESTILO PARTIDAS, Y EL ORDEN QUE TENÍAN

   Tres hojas largas se partieron en archivos: la compartida y las dos
   propias de página. Este archivo guarda, para cada una, el orden exacto
   en que estaban sus secciones cuando era un archivo solo.

   Los originales ya no están en css/ —el sitio anterior se retiró en la
   etapa 11— sino conservados en originales/sitio-anterior/, justo para
   que `npm run cambios` siga teniendo con qué comparar.

   Lo guarda porque en CSS el orden ES la cascada: cuando dos reglas
   empatan en importancia y especificidad, gana la última. `npm run cascada`
   compara el orden de hoy contra estas listas y avisa si algún par de
   reglas cambió de ganador; `npm run cambios` las rejunta en este orden y
   las compara con el archivo original para enseñar qué se ha editado.

   NO reordenar estas listas. Si añades una parte nueva, va al final: es
   nueva, antes no existía, así que no puede haber cambiado nada.
   ═══════════════════════════════════════════════════════════ */
import { ORDEN_ORIGINAL } from './orden-original-css.mjs';

export const HOJAS = [
  {
    nombre: 'global',
    indice: 'src/styles/global/global.css',
    original: 'originales/sitio-anterior/styles.css',
    /* el suyo vive aparte desde la etapa 7: es el orden del archivo de 1524
       líneas, que NO es el de hoy (en la 7b se reagrupó por carpetas) */
    orden: ORDEN_ORIGINAL,
  },
  {
    nombre: 'sobre-mi',
    indice: 'src/styles/sobre-mi/sobre-mi.css',
    original: 'originales/sitio-anterior/sobremi.css',
    orden: [
      'partes/base.css',
      'partes/hero.css',
      'partes/secciones-estructura-comun.css',
      'partes/01-ruta.css',
      'partes/02-herramientas.css',
      'partes/04-pistas.css',
      'partes/cierre.css',
      'partes/micro-interacciones.css',
      'partes/aparicion-hacer-scroll.css',
      'partes/canvas-ancho-1100px.css',
      'partes/hero-lienzo.css',
      'partes/01-ruta-camina.css',
      'partes/estoy-haciendo-ahora.css',
    ],
  },
  {
    nombre: 'casos',
    indice: 'src/styles/casos/caso.css',
    original: 'originales/sitio-anterior/caso.css',
    orden: [
      'partes/base.css',
      'partes/rejilla.css',
      'partes/riel.css',
      'partes/portada.css',
      'partes/metadatos.css',
      'partes/decisiones.css',
      'partes/seccion.css',
      'partes/texto.css',
      'partes/etiquetas-fuente.css',
      'partes/marcas-honestidad.css',
      'partes/nota.css',
      'partes/grupos-pantallas.css',
      'partes/figuras-investigacion.css',
      'partes/triptico.css',
      'partes/salidas.css',
      'partes/icono-boton.css',
      'partes/aparicion-scroll.css',
      'partes/responsive.css',
      'partes/espacio-reservado.css',
      'partes/flujo.css',
      'partes/metricas.css',
      'partes/antes-despues.css',
      'partes/galeria.css',
      'partes/pendientes.css',
      'partes/responsive-bloques-nuevos.css',
    ],
  },
];
