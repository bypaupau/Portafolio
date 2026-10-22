/* ═══════════════════════════════════════════════════════════
   IDIOMA EN EL NAVEGADOR · cambiar de idioma sin recargar

   El HTML ya viene con el texto en ESPAÑOL escrito por Astro al
   compilar. Este script solo interviene si hace falta otro idioma.

   LA DIFERENCIA IMPORTANTE CON EL SITIO ANTERIOR
   js/i18n.js, si no encontraba una clave, escribía el NOMBRE DE LA
   CLAVE en la pantalla. Así salió `sch.f.rol.3` en la página.
   Aquí eso no puede pasar: si una clave falta, se deja el texto que
   ya estaba (el español que escribió Astro) y se avisa por consola.
   Un texto sin traducir es un defecto menor; un identificador a la
   vista de un reclutador, no.

   Y hay una segunda red: scripts/validar-traducciones.mjs corre
   ANTES de compilar y no deja publicar con una clave incompleta.
   ═══════════════════════════════════════════════════════════ */
import { interfaceTranslations } from '../../i18n/translate';
import { conEnlaces } from '../../i18n/enlaces';
import {
  defaultLanguage,
  isSupportedLanguage,
  languageStorageKey,
  type Language,
} from '../../i18n/languages';
import type { TranslationKey } from '../../i18n/keys';

const esDesarrollo = import.meta.env.DEV;

function leerIdiomaGuardado(): Language {
  try {
    const guardado = localStorage.getItem(languageStorageKey);
    if (isSupportedLanguage(guardado)) return guardado;
  } catch {
    /* navegación privada o cookies bloqueadas: se usa el idioma por defecto */
  }
  return defaultLanguage;
}

function guardarIdioma(idioma: Language): void {
  try {
    localStorage.setItem(languageStorageKey, idioma);
  } catch {
    /* no poder guardar la preferencia no debe romper nada */
  }
}

let idiomaActual: Language = leerIdiomaGuardado();

export function idiomaDelSitio(): Language {
  return idiomaActual;
}

/** Texto de una clave en el idioma activo. `null` = no existe: no tocar el DOM. */
export function textoDe(clave: string): string | null {
  const enIdioma = interfaceTranslations[idiomaActual]?.[clave as TranslationKey];
  if (enIdioma !== undefined) return enIdioma;

  const enEspanol = interfaceTranslations[defaultLanguage]?.[clave as TranslationKey];
  if (enEspanol !== undefined) {
    if (esDesarrollo) {
      console.warn(`[i18n] "${clave}" no está traducida a "${idiomaActual}". Se muestra el español.`);
    }
    return enEspanol;
  }

  /* NUNCA devolver la clave. Se avisa y se deja el DOM como está. */
  console.warn(`[i18n] la clave "${clave}" no existe. Agrégala en src/i18n/es/ y en/.`);
  return null;
}

/** Traduce un trozo del documento (o todo, si no se indica otro). */
export function traducirDocumento(ambito: ParentNode = document): void {
  ambito.querySelectorAll<HTMLElement>('[data-i18n]').forEach((elemento) => {
    const texto = textoDe(elemento.dataset.i18n!);
    if (texto === null) return;
    /* data-i18n-minuscula: las pestañas de filtro se dibujan en
       minúscula por estilo. Sin esto, al cambiar de idioma volverían a
       salir capitalizadas y la pestaña cambiaría de ancho. */
    elemento.textContent = elemento.hasAttribute('data-i18n-minuscula')
      ? texto.toLowerCase()
      : texto;
  });

  /* texto con marcado (negritas, enlaces). Viene del diccionario, que
     es nuestro propio código fuente, no de nada que escriba un visitante. */
  ambito.querySelectorAll<HTMLElement>('[data-i18n-html]').forEach((elemento) => {
    const texto = textoDe(elemento.dataset.i18nHtml!);
    if (texto !== null) elemento.innerHTML = conEnlaces(texto);
  });

  /* ── TEXTO QUE VIENE DE LOS DATOS, NO DE UNA CLAVE ──────────
     El contenido de los proyectos y trabajos vive en src/content/ con la
     forma { es, en }. Astro escribe el español y deja el inglés en un
     atributo, para no duplicar el DOM ni depender de JavaScript:

       <span data-i18n-es="La guía…" data-i18n-en="The little…">La guía…</span>

     Al cambiar de idioma solo se intercambia el texto. Si el trabajo
     tiene el mismo texto en los dos idiomas (un nombre propio, una
     herramienta), Astro no pone estos atributos y aquí no pasa nada. */
  ambito.querySelectorAll<HTMLElement>('[data-i18n-es][data-i18n-en]').forEach((elemento) => {
    const texto = elemento.dataset[idiomaActual === 'en' ? 'i18nEn' : 'i18nEs'];
    if (texto !== undefined) elemento.textContent = texto;
  });

  /* Lo mismo, pero con marcado dentro (<b>, <strong>, un enlace). Lo
     usan las notas de los casos. El contenido sale de src/content/,
     que es nuestro código fuente, no de nada que escriba un visitante. */
  ambito
    .querySelectorAll<HTMLElement>('[data-i18n-html-es][data-i18n-html-en]')
    .forEach((elemento) => {
      const texto = elemento.dataset[idiomaActual === 'en' ? 'i18nHtmlEn' : 'i18nHtmlEs'];
      if (texto !== undefined) elemento.innerHTML = conEnlaces(texto);
    });

  /* Y el texto alternativo de una imagen, cuando viene de los datos y
     no de una clave. Las páginas de caso tienen decenas. */
  ambito
    .querySelectorAll<HTMLImageElement>('[data-i18n-alt-es][data-i18n-alt-en]')
    .forEach((imagen) => {
      const texto = imagen.dataset[idiomaActual === 'en' ? 'i18nAltEn' : 'i18nAltEs'];
      if (texto !== undefined) imagen.alt = texto;
    });

  /* "aria-label:clave; title:otra.clave" */
  ambito.querySelectorAll<HTMLElement>('[data-i18n-attr]').forEach((elemento) => {
    elemento.dataset.i18nAttr!.split(';').forEach((par) => {
      const [atributo, clave] = par.split(':');
      if (!atributo || !clave) return;
      const texto = textoDe(clave.trim());
      if (texto !== null) elemento.setAttribute(atributo.trim(), texto);
    });
  });
}

/* El <title> y la <meta description> de cada página: BaseLayout.astro
   los deja anotados en el <body>, así este script no necesita saber
   en qué página está. */
function traducirMetadatos(): void {
  const cuerpo = document.body;
  document.documentElement.lang = idiomaActual;

  /* Casi todas las páginas traen su título como CLAVE. Las de caso lo
     traen como CONTENIDO en los dos idiomas (data-title-es/en), porque
     el título del caso es parte del proyecto, no de la interfaz. */
  const tituloBilingue = cuerpo.dataset[idiomaActual === 'en' ? 'titleEn' : 'titleEs'];
  const claveTitulo = cuerpo.dataset.titleKey;
  if (tituloBilingue !== undefined) {
    document.title = tituloBilingue;
  } else if (claveTitulo) {
    const texto = textoDe(claveTitulo);
    if (texto !== null) document.title = texto;
  }

  const etiqueta = document.querySelector('meta[name="description"]');
  const descripcionBilingue =
    cuerpo.dataset[idiomaActual === 'en' ? 'descriptionEn' : 'descriptionEs'];
  const claveDescripcion = cuerpo.dataset.descriptionKey;
  if (etiqueta && descripcionBilingue !== undefined) {
    etiqueta.setAttribute('content', descripcionBilingue);
  } else if (etiqueta && claveDescripcion) {
    const texto = textoDe(claveDescripcion);
    if (texto !== null) etiqueta.setAttribute('content', texto);
  }
}

export function aplicarIdioma(): void {
  traducirMetadatos();
  traducirDocumento(document);
}

export function cambiarIdioma(nuevo: Language): void {
  if (nuevo === idiomaActual || !isSupportedLanguage(nuevo)) return;
  idiomaActual = nuevo;
  guardarIdioma(nuevo);
  aplicarIdioma();
  document.dispatchEvent(new CustomEvent('langchange', { detail: { lang: nuevo } }));
}

/** Otra pestaña cambió el idioma → esta se pone al día. */
window.addEventListener('storage', (evento) => {
  if (evento.key === languageStorageKey && isSupportedLanguage(evento.newValue)) {
    cambiarIdioma(evento.newValue);
  }
});

/* Al cargar: si el idioma guardado NO es el español que ya escribió
   Astro, hay que traducir. Si es español, no se toca nada: el HTML
   ya está correcto y el trabajo es cero. */
if (idiomaActual !== defaultLanguage) {
  aplicarIdioma();
} else {
  document.documentElement.lang = defaultLanguage;
}
