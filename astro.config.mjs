import { defineConfig } from 'astro/config';

/* ═══════════════════════════════════════════════════════════
   El sitio vive en https://bypaupau.github.io/Portafolio/
   o sea: un SUBDIRECTORIO, no la raíz del dominio.

   `base` es lo que hace que todas las rutas salgan bien.
   Nunca escribas una ruta absoluta a mano ("/img/x.png"):
   en producción le falta /Portafolio y la imagen no carga.
   Usa el ayudante de src/lib/rutas.ts  →  rutaPublica('img/x.png')

   `site` + `base` también alimentan las URLs canónicas y el sitemap.
   ═══════════════════════════════════════════════════════════ */
export default defineConfig({
  site: 'https://bypaupau.github.io',
  base: '/Portafolio',

  /* 'ignore' = GitHub Pages sirve /contacto y /contacto/ por igual.
     Es la opción más tolerante para alojamiento estático. */
  trailingSlash: 'ignore',

  /* 'directory' → dist/contacto/index.html  →  URL /Portafolio/contacto */
  build: { format: 'directory' },

  /* ── URLs DEL SITIO ANTERIOR ──────────────────────────────
     NO se usa la opción `redirects` de Astro: con build.format
     'directory' genera una CARPETA llamada "contacto.html" en vez de
     un archivo, así que /pages/contacto.html no quedaría servido.

     Las redirecciones viven en public/pages/*.html, como archivos
     reales, con el MISMO patrón que ya usaba pages/materias.html en
     este repositorio: <meta refresh> + canonical + noindex.
     Ver public/pages/README.md                                    */
});
