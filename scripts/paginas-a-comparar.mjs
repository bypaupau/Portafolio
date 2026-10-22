/* ═══════════════════════════════════════════════════════════
   QUÉ COMPARAR EN CADA ETAPA

   Por cada página migrada, una entrada:
     id         nombre de la carpeta de capturas
     nueva      ruta en el sitio compilado (dentro de dist/)
     (ya no hay 'anterior': el sitio viejo se retiró en la etapa 11, así
     que la comparación dejó de ser "lo nuevo contra lo viejo" y pasó a ser
     "lo de hoy contra la última versión que diste por buena".)
                **OPCIONAL**: una página nueva (que no existía en el sitio
                publicado) la omite. Entonces la comparación usa como
                referencia su propia captura guardada en
                _revision-visual/_base/, y la prueba de "la URL anterior
                redirige" se salta.
     assets     carpetas de la raíz que necesita la versión vieja
     tituloIgual  true si el <title> es el MISMO en los dos idiomas.
                  Solo lo necesita Inicio: las páginas de caso traen su
                  título en el propio HTML (data-title-es/en) y la prueba
                  lo lee de ahí.

   Se añade una línea por etapa. Las que no estén aquí no se comparan.
   ═══════════════════════════════════════════════════════════ */
export const paginasAComparar = [
  {
    id: 'contacto',
    nueva: '/Portafolio/contacto/',
    assets: ['pages', 'css', 'js', 'img', 'cv', 'favicon.png', 'favicon.svg'],
  },
  {
    id: 'creativo',
    nueva: '/Portafolio/creativo',
    assets: ['pages', 'css', 'js', 'data', 'img', 'trabajos-disenio', 'favicon.png', 'favicon.svg'],
  },
  {
    id: 'proyectos',
    nueva: '/Portafolio/proyectos',
    assets: ['pages', 'css', 'js', 'data', 'img', 'favicon.png', 'favicon.svg'],
  },
  {
    id: 'sobre-mi',
    nueva: '/Portafolio/sobre-mi',
    assets: ['pages', 'css', 'js', 'img', 'resources', 'favicon.png', 'favicon.svg'],
  },
  {
    id: 'inicio',
    nueva: '/Portafolio/',
    assets: ['pages', 'css', 'js', 'img', 'cv', 'favicon.png', 'favicon.svg'],
    /* "Paula Martillo · diseño + código ✿" es igual en español y en
       inglés: es su nombre. Así que aquí el título NO debe cambiar. */
    tituloIgual: true,
  },
  {
    id: 'caso-phoenix',
    nueva: '/Portafolio/casos/grow-with-phoenix',
    assets: ['pages', 'css', 'js', 'img', 'projects', 'favicon.png', 'favicon.svg'],
  },
  {
    id: 'caso-schaman',
    nueva: '/Portafolio/casos/schaman-analytics-bi',
    assets: ['pages', 'css', 'js', 'img', 'projects', 'favicon.png', 'favicon.svg'],
  },
];

/* Se pueden acotar desde la línea de comandos, para ir más rápido
   mientras se depura una página:
     ANCHOS=1440 IDIOMAS=es npm run comparar proyectos          */
export const anchosAProbar = (process.env.ANCHOS ?? '320,375,768,1024,1440')
  .split(',').map(Number);
export const idiomasAProbar = (process.env.IDIOMAS ?? 'es,en').split(',');
