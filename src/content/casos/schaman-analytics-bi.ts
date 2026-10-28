/* ═══════════════════════════════════════════════════════════
   CONTENIDO DEL CASO · SCHAMAN ANALYTICS BI
   página: src/pages/casos/schaman-analytics-bi.astro

   Esto NO es interfaz: es el texto del proyecto. Cada texto es una
   cadena (si es igual en los dos idiomas) o { es, en }.

   ── EL ORDEN DE LA HISTORIA · OCHO SECCIONES ───────────────
   00 portada      qué es, el panel rediseñado y la ficha
   01 origen       de dónde salió y por qué lo retomé
   02 reto         el diagnóstico y la pregunta de diseño
   03 vistas       primera decisión: separar el panel de las sesiones
   04 exploracion  segunda decisión: buscar, el periodo y el mapa
   05 datos        tercera decisión: color, jerarquía y tooltips
   06 resultado    lo implementado, en tres pantallas
   07 aprendizaje  lo que aprendí y lo que el caso no demuestra

   La 02 termina con tres prioridades y la 03, la 04 y la 05 son esas
   tres, en el mismo orden. Si se toca el orden de una, se toca el de
   la otra.

   ── EL RESALTE ─────────────────────────────────────────────
   Los textos con <mark> se dibujan con <Texto html>. Uno por párrafo y
   dos por sección como mucho: si todo está resaltado, nada lo está.

   ── LOS NOMBRES DE ARCHIVO NO ESTÁN AQUÍ ───────────────────
   Las capturas, los vídeos y sus medidas los pone la página: son
   interfaz. Aquí vive solo su pie y su texto alternativo.
   ═══════════════════════════════════════════════════════════ */


export const schamanAnalyticsBi = {

  documento: {
    nombreDeVentana: 'schaman_analytics_bi.md',
    titulo: 'pau.proyectos · Schaman Analytics BI',
    descripcion: {
      es: 'Rediseño UI/UX de una aplicación analítica omnicanal: retomé el dashboard de un proyecto universitario y trabajé la organización de sus vistas, la exploración de sesiones y el significado de sus datos.',
      en: 'UI/UX redesign of an omnichannel analytics app: I reopened the dashboard from a university project and reworked how its views are organised, how sessions are explored and what its data communicates.',
    },
  },

  /* ══ EL ÍNDICE · una parada por sección ══
     El nombre dice la acción; el papel dice qué es. Sin el papel, la 03
     y la 04 se confunden; sin el nombre, no se sabe a dónde se va. */
  indice: [
    { nombre: { es: 'Portada', en: 'Cover' }, papel: { es: 'Presentación', en: 'Introduction' } },
    { nombre: { es: 'El origen', en: 'The origin' }, papel: { es: 'Contexto del proyecto', en: 'Project context' } },
    { nombre: { es: 'El reto de diseño', en: 'The design challenge' }, papel: { es: 'Diagnóstico', en: 'Diagnosis' } },
    { nombre: { es: 'Organizar las vistas', en: 'Organising the views' }, papel: { es: 'Primera decisión', en: 'First decision' } },
    { nombre: { es: 'Facilitar la exploración', en: 'Easing exploration' }, papel: { es: 'Segunda decisión', en: 'Second decision' } },
    { nombre: { es: 'Clarificar los datos', en: 'Clarifying the data' }, papel: { es: 'Tercera decisión', en: 'Third decision' } },
    { nombre: { es: 'El resultado', en: 'The result' }, papel: { es: 'La solución implementada', en: 'The implemented solution' } },
    { nombre: { es: 'Lo que aprendí', en: 'What I learned' }, papel: { es: 'Reflexión', en: 'Reflection' } },
  ],

  /* el rótulo que llevan las piezas comparadas */
  etiquetas: {
    antes: { es: 'Antes', en: 'Before' },
    despues: { es: 'Después', en: 'After' },
    video: { es: 'Vídeo', en: 'Video' },
  },

  /* ══ 00 · PORTADA ══ */
  portada: {
    antetitulo: { es: 'Rediseño UI/UX independiente · 2026', en: 'Independent UI/UX redesign · 2026' },
    subtitulo: {
      es: 'De mostrar datos a facilitar su exploración',
      en: 'From showing data to making it explorable',
    },
    parrafos: [
      {
        es: 'Rediseñé la interfaz de una aplicación analítica desarrollada como parte de un proyecto universitario, con el objetivo de <mark>mejorar cómo se organizan, consultan e interpretan los datos de atención al cliente</mark>.',
        en: 'I redesigned the interface of an analytics application built as part of a university project, with the aim of <mark>improving how customer service data is organised, queried and interpreted</mark>.',
      },
      {
        es: 'Al volver sobre la primera versión, identifiqué oportunidades de mejora en la jerarquía visual, la navegación y la forma de explorar los registros. Mi trabajo consistió en replantear esas decisiones y llevarlas a una interfaz funcional.',
        en: 'Going back over the first version, I found room to improve its visual hierarchy, its navigation and the way records were explored. My work was to rethink those decisions and carry them through to a working interface.',
      },
    ],
    /* el saludo: lo dice la mascota de la barra, en un bocadillo que se
       va solo a los 7 segundos */
    saludo: {
      es: 'Entraste en modo minimalista para leer mejor el caso.',
      en: 'You’re in minimalist mode, to read the case more easily.',
    },
    /* LA FICHA: cuatro rótulos en fila */
    ficha: [
      { rotulo: { es: 'Proyecto', en: 'Project' }, valor: { es: 'Rediseño UI/UX independiente · 2026', en: 'Independent UI/UX redesign · 2026' } },
      { rotulo: { es: 'Contexto', en: 'Context' }, valor: { es: 'Proyecto universitario', en: 'University project' } },
      { rotulo: { es: 'Mi rol', en: 'My role' }, valor: { es: 'Evaluación de la interfaz, diseño UI/UX e implementación del frontend', en: 'Interface evaluation, UI/UX design and front-end implementation' } },
      { rotulo: { es: 'Tecnologías', en: 'Technologies' }, valor: 'React · Supabase' },
    ],
    /* LA ÚNICA VENTANA DE LA PÁGINA: lo de dentro sí es una aplicación */
    ventana: {
      nombre: 'schaman · panel general',
      pie: {
        es: 'El panel general rediseñado reúne la navegación, el score global y los cinco indicadores en una misma lectura. Los valores visibles son datos de demostración.',
        en: 'The redesigned overview brings navigation, the overall score and the five indicators into one reading flow. The values shown are demonstration data.',
      },
      alt: {
        es: 'Panel general rediseñado de Schaman, con menú lateral con nombres, el score global sobre fondo azul y cinco tarjetas de indicadores.',
        en: 'Schaman’s redesigned overview, with a labelled side menu, the overall score on a blue background and five indicator cards.',
      },
    },
  },

  /* ══ 01 · EL ORIGEN ══ */
  origen: {
    antetitulo: { es: '01 / El origen', en: '01 / The origin' },
    titulo: {
      es: 'Una aplicación construida para analizar la atención al cliente',
      en: 'An application built to analyse customer service',
    },
    nota: {
      es: 'No fue un encargo. Fue volver sobre algo que ya habíamos entregado.',
      en: 'It wasn’t a commission. It was going back to something we had already handed in.',
    },
    parrafos: [
      {
        es: 'Todo comenzó con una asignación universitaria. A mi equipo le correspondió trabajar con Schaman, una <mark>empresa orientada a la automatización de la atención al cliente mediante canales digitales.</mark> El ejercicio consistía en construir un almacén de datos a partir del modelo de negocio asignado y desarrollar una aplicación que permitiera consultar la información, generar reportes y visualizar indicadores relevantes.',
        en: 'It all began with a university assignment. My team was given Schaman, a company focused on automating customer service through digital channels. The exercise was to build a data warehouse from the assigned business model and develop an application to query the information, generate reports and view the relevant indicators.',
      },
      {
        es: 'La primera versión cumplía el propósito académico de presentar esos datos. Sin embargo, después de trabajar en ella, decidí volver a examinar su interfaz desde otra perspectiva: <mark>no solo qué información mostraba, sino cómo estaba organizada</mark> y qué tan clara resultaba su exploración.',
        en: 'The first version met the academic goal of presenting that data. After working on it, though, I decided to look at its interface again from another angle: <mark>not just what information it showed, but how it was organised</mark> and how clear it was to explore.',
      },
      {
        es: 'No se trataba de un encargo de Schaman. Era una iniciativa personal para retomar un proyecto existente, cuestionar algunas de sus decisiones de diseño y explorar cómo podía mejorar su experiencia de uso.',
        en: 'It was not a commission from Schaman. It was a personal initiative to pick up an existing project, question some of its design decisions and explore how its experience could improve.',
      },
    ],
    datos: [
      { rotulo: { es: 'Origen', en: 'Origin' }, texto: { es: 'Asignación universitaria, en equipo', en: 'University assignment, as a team' } },
      { rotulo: { es: 'El rediseño', en: 'The redesign' }, texto: { es: 'Iniciativa propia, posterior a la entrega', en: 'My own initiative, after the hand-in' } },
      { rotulo: { es: 'Qué ya existía', en: 'What already existed' }, texto: { es: 'Almacén de datos y aplicación de consulta funcionando', en: 'A working data warehouse and query application' } },
    ],
    figura: {
      titulo: { es: 'El punto de partida.', en: 'The starting point.' },
      pie: { es: 'El panel general de la primera versión: filtros por año y mes, cinco indicadores con colores independientes y gráficos de resumen.', en: 'The first version’s overview: year and month filters, five independently coloured indicators and summary charts.' },
      alt: {
        es: 'Panel general de la versión anterior, con cinco tarjetas de colores distintos y filtros de año y mes.',
        en: 'Overview of the earlier version, with five differently coloured cards and year and month filters.',
      },
    },
  },

  /* ══ 02 · EL RETO DE DISEÑO ══ */
  reto: {
    antetitulo: { es: '02 / El reto de diseño', en: '02 / The design challenge' },
    titulo: {
      es: 'La información estaba ahí. La oportunidad estaba en cómo explorarla.',
      en: 'The information was there. The opportunity was in how to explore it.',
    },
    parrafo: {
      es: 'El dashboard y la tabla de sesiones compartían una misma página. Las herramientas para localizar registros eran limitadas, y algunos elementos visuales no comunicaban con suficiente claridad el significado de los datos. <mark>No eran problemas que exigieran cambiar el propósito de la aplicación</mark>: el reto estaba en organizar mejor lo que ya existía.',
      en: 'The dashboard and the session table shared a single page. The tools for finding records were limited, and some visual elements did not communicate the meaning of the data clearly enough. <mark>None of this called for changing the application’s purpose</mark>: the challenge was to better organise what already existed.',
    },
    /* EL DIAGNÓSTICO FIJO: la columna de la captura se queda quieta y
       avanzan las tres llamadas; cada una trae su propia captura de la
       versión original. */
    diagnostico: [
      {
        pie: { es: 'Indicadores, gráficos y tabla de sesiones convivían en un mismo recorrido; para llegar a un registro había que atravesar el dashboard.', en: 'Indicators, charts and the sessions table shared one journey; reaching a record meant going through the dashboard.' },
        alt: { es: 'La página de inicio original entera: los indicadores y gráficos arriba y la tabla de sesiones al final, en un solo desplazamiento.', en: 'The whole original home page: indicators and charts on top and the session table at the end, in a single scroll.' },
      },
      {
        pie: { es: 'La tabla mostraba los registros, pero no ofrecía búsqueda, ordenamiento ni paginación para llegar a uno concreto.', en: 'The table showed the records, but offered no search, sorting or pagination to reach a specific one.' },
        alt: { es: 'La tabla de sesiones original: filas sin buscador, sin orden por columna y sin paginación.', en: 'The original session table: rows with no search, no column sorting and no pagination.' },
      },
      {
        pie: { es: 'Cada indicador usaba un color distinto, pero los títulos pequeños y la variedad cromática no construían una jerarquía clara.', en: 'Each indicator used a different colour, but small labels and colour variety did not create a clear hierarchy.' },
        alt: { es: 'Las tarjetas de indicadores originales, cada una con un color de borde distinto y títulos pequeños.', en: 'The original indicator cards, each with a different border colour and small titles.' },
      },
    ],
    pregunta: {
      rotulo: { es: 'La pregunta de diseño', en: 'The design question' },
      texto: {
        es: '¿Cómo podría hacer que la información analítica fuera más fácil de explorar e interpretar mediante una mejor organización de las vistas, herramientas de consulta más flexibles y una jerarquía visual más clara?',
        en: 'How could I make the analytical information easier to explore and interpret through better-organised views, more flexible query tools and a clearer visual hierarchy?',
      },
    },
    puente: {
      es: 'A partir de esa pregunta, organicé el rediseño en tres prioridades — y son, en el mismo orden, las tres decisiones que vienen después:',
      en: 'From that question I organised the redesign around three priorities — and they are, in the same order, the three decisions that follow:',
    },
    prioridades: [
      { es: 'Dar a cada tarea de análisis un espacio más definido.', en: 'Give each analysis task a more defined space.' },
      { es: 'Facilitar la búsqueda, la navegación y la exploración de los registros.', en: 'Make it easier to search, navigate and explore the records.' },
      { es: 'Hacer más claro el significado de los indicadores y los elementos visuales.', en: 'Make the meaning of the indicators and visual elements clearer.' },
    ],
  },

  /* ══ 03 · ORGANIZAR LAS VISTAS · primera decisión ══ */
  vistas: {
    antetitulo: { es: '03 / Organizar las vistas · Primera decisión', en: '03 / Organising the views · First decision' },
    titulo: {
      es: 'Separar la lectura general de la consulta de sesiones',
      en: 'Separating the overview from looking up sessions',
    },
    parrafos: [
      {
        es: 'En la versión original, la página Overview reunía los indicadores del dashboard y la tabla de sesiones. <mark>Dos necesidades distintas compartían el mismo espacio</mark>: consultar una visión general de los resultados y examinar registros individuales. Decidí separar ambas vistas.',
        en: 'In the original version, the Overview page held both the dashboard indicators and the session table. <mark>Two different needs shared the same space</mark>: getting an overview of the results and examining individual records. I decided to separate the two views.',
      },
      {
        es: '<b>El dashboard pasó a concentrarse en los indicadores y las visualizaciones generales, mientras que la página de sesiones quedó dedicada a consultar los registros individuales.</b> Mantuve la barra de filtros en ambas páginas, de modo que el periodo y los sectores seleccionados siguieran formando parte del contexto de consulta.',
        en: 'The dashboard now focuses on the indicators and overall charts, while the sessions page is dedicated to looking up individual records. I kept the filter bar on both pages, so the selected period and sectors stay part of the query context.',
      },
    ],
    cita: {
      es: 'La decisión no consistía simplemente en añadir otra página, sino en dar a cada tarea un propósito más definido.',
      en: 'The decision was not simply to add another page, but to give each task a more defined purpose.',
    },
    antes: {
      pie: { es: 'Para pasar de los indicadores a una sesión, había que recorrer el dashboard y continuar hasta la tabla al final de la misma página.', en: 'To move from the indicators to a session, you had to scroll through the dashboard to the table at the end of the same page.' },
      alt: { es: 'Grabación de la versión anterior: se baja por el panel general hasta llegar a la tabla de sesiones, al final de la página.', en: 'Recording of the earlier version: scrolling down the overview to reach the session table at the end of the page.' },
    },
    despues: {
      pie: { es: 'El dashboard queda para la lectura general y la tabla pasa a Sesiones, con los mismos filtros disponibles en ambas vistas.', en: 'The dashboard stays for the overview, while the table moves to Sessions with the same filters available in both views.' },
      alt: { es: 'Del panel general a la página de sesiones, que carga su tabla con los mismos filtros.', en: 'From the overview to the sessions page, which loads its table with the same filters.' },
    },
    cierre: {
      es: 'Las dos grabaciones recorren el mismo camino: mirar los indicadores y llegar a una sesión. En la primera hay que bajar por la misma página; en la segunda, <mark>la sesión vive en su propia pestaña</mark>.',
      en: 'Both recordings follow the same path: check the indicators and reach a session. In the first you scroll down the same page; in the second, <mark>sessions live in their own tab</mark>.',
    },
  },

  /* ══ 04 · FACILITAR LA EXPLORACIÓN · segunda decisión ══
     Tres sub-bloques; `corto` es su nombre en el sub-índice de la barra. */
  exploracion: {
    antetitulo: { es: '04 / Facilitar la exploración · Segunda decisión', en: '04 / Easing exploration · Second decision' },
    titulo: {
      es: 'Encontrar una sesión no debería depender de buscarla manualmente',
      en: 'Finding a session shouldn’t depend on hunting for it by hand',
    },
    buscar: {
      corto: { es: 'Buscar y ordenar', en: 'Search and sort' },
      titulo: { es: 'Buscar, ordenar y paginar', en: 'Search, sort and paginate' },
      parrafo: {
        es: 'En la versión original no existía una herramienta de búsqueda ni era posible ordenar las sesiones según los valores de sus columnas. Incorporé una búsqueda por ID, nombre o apellido del cliente y fecha —contemplando los formatos <code>DD-MM-AAAA</code> y <code>DD/MM/AAAA</code>—, ordenamiento por columnas y paginación: <mark>la tabla dejó de depender del desplazamiento continuo</mark>.',
        en: 'The original version had no search tool, and sessions could not be sorted by their column values. I added search by ID, customer first or last name and date — accepting both <code>DD-MM-YYYY</code> and <code>DD/MM/YYYY</code> —, column sorting and pagination: <mark>the table stopped depending on endless scrolling</mark>.',
      },
      orden: {
        rotulo: { es: 'Ordenar', en: 'Sort' },
        pie: { es: 'La tabla se ordena por una columna —o por varias con Mayús + clic— y cada encabezado aclara qué valor organiza.', en: 'The table sorts by one column —or several with Shift + click— and each header clarifies the value being organised.' },
        alt: { es: 'Grabación de la tabla de sesiones ordenándose por cliente y por ID.', en: 'Recording of the session table being sorted by customer and by ID.' },
      },
      paginacion: {
        rotulo: { es: 'Paginar', en: 'Paginate' },
        pie: { es: 'La paginación limita cada vista a diez filas, mantiene el total a la vista y permite saltar directamente entre páginas.', en: 'Pagination limits each view to ten rows, keeps the total in sight and allows direct jumps between pages.' },
        alt: { es: 'Grabación del pie de la tabla pasando de una página de sesiones a otra.', en: 'Recording of the table footer moving from one page of sessions to another.' },
      },
      tira: [
        { rotulo: { es: 'La necesidad', en: 'The need' }, titulo: { es: 'Localizar un registro concreto', en: 'Finding one specific record' }, texto: { es: 'A medida que aumentaba la cantidad de sesiones, recorrer la tabla manualmente dejaba de ser práctico.', en: 'As the number of sessions grew, scrolling through the table by hand stopped being practical.' } },
        { rotulo: { es: 'Por qué importa', en: 'Why it matters' }, titulo: { es: 'Investigar, no solo mirar', en: 'Investigating, not just looking' }, texto: { es: 'Una tabla que solo se desplaza sirve para hojear; para investigar hace falta llegar a una fila concreta.', en: 'A table that only scrolls is good for skimming; investigating means reaching one specific row.' } },
        { rotulo: { es: 'Qué hice', en: 'What I did' }, titulo: { es: 'Tres formas de llegar', en: 'Three ways in' }, texto: { es: 'Búsqueda por varios campos, orden ascendente y descendente por columna, y paginación con filas ajustables.', en: 'Search across several fields, ascending and descending column sorting, and pagination with adjustable rows.' } },
      ],
    },
    periodo: {
      corto: { es: 'Periodo', en: 'Period' },
      titulo: { es: 'Del calendario a un periodo de consulta más preciso', en: 'From month pickers to a more precise query period' },
      parrafo: {
        es: 'Los filtros temporales permitían elegir año y mes, pero no delimitar consultas por días concretos o rangos de fechas. Amplié los filtros para permitir ambas opciones: un día suelto, un rango, o el año entero si no se toca. <mark>Al aplicarlo se recalculan el score, los indicadores y la tabla</mark>.',
        en: 'The date filters let you pick a year and a month, but not narrow a query to specific days or date ranges. I extended them to allow both: a single day, a range, or the whole year if left alone. <mark>Applying it recalculates the score, the indicators and the table</mark>.',
      },
      antes: {
        pie: { es: 'Con año y mes en desplegables separados, la consulta no podía limitarse a días concretos ni a un intervalo.', en: 'With year and month in separate dropdowns, a query could not be narrowed to specific days or a date range.' },
        alt: { es: 'Filtros anteriores de año y mes, en dos desplegables.', en: 'Earlier year and month filters, in two dropdowns.' },
      },
      despues: {
        pie: { es: 'Un solo calendario permite elegir un día o un rango; al aplicarlo, se actualizan el score, los indicadores y la tabla.', en: 'One calendar lets you select a day or a range; applying it updates the score, the indicators and the table.' },
        alt: { es: 'Grabación del filtro de periodo: se abre el calendario, se marca un rango y se aplica.', en: 'Recording of the period filter: the calendar opens, a range is marked and applied.' },
      },
    },
    mapa: {
      corto: { es: 'Mapa', en: 'Map' },
      titulo: { es: 'Una vista nueva para ver dónde ocurren las sesiones', en: 'A new view to see where sessions happen' },
      parrafo: {
        es: 'El panel resumía el periodo y la tabla listaba sesiones una por una, pero ninguno de los dos respondía dónde ocurren: la zona era una columna más entre nueve. Añadí una página de mapa en la que cada provincia se tiñe según su volumen, el ranking por ciudad se despliega en zonas y <mark>los filtros de resolución permiten ver si un resultado se concentra en algún territorio</mark>.',
        en: 'The dashboard summarised the period and the table listed sessions one by one, but neither answered where they happen: the area was just one column out of nine. I added a map page where each province is shaded by volume, the city ranking expands into areas and <mark>the resolution filters show whether an outcome concentrates in any territory</mark>.',
      },
      rotulo: { es: 'Vista nueva', en: 'New view' },
      pie: { es: 'La vista geográfica no existía antes: el mapa convierte la zona, antes una columna más, en una forma de explorar la distribución de las sesiones.', en: 'There was no geographic view before: the map turns area, previously just another column, into a way to explore how sessions are distributed.' },
      alt: { es: 'Página de mapa con España coloreada por provincia y un ranking de ciudades desplegable por zonas.', en: 'Map page with Spain shaded by province and a city ranking that expands into areas.' },
    },
  },

  /* ══ 05 · CLARIFICAR LOS DATOS · tercera decisión ══ */
  datos: {
    antetitulo: { es: '05 / Clarificar los datos · Tercera decisión', en: '05 / Clarifying the data · Third decision' },
    titulo: {
      es: 'Hacer que los datos comuniquen mejor su significado',
      en: 'Making the data communicate its meaning better',
    },
    entradilla: {
      es: 'Las dos decisiones anteriores movieron cosas de sitio. Esta no mueve nada: cambia <mark>qué significa lo que ya estaba en pantalla</mark>. El color, los títulos de los indicadores y el contexto disponible sin salir de la vista.',
      en: 'The two previous decisions moved things around. This one moves nothing: it changes <mark>the meaning of what was already on screen</mark>. Colour, the indicator titles and the context available without leaving the view.',
    },
    color: {
      corto: { es: 'El color', en: 'Colour' },
      titulo: { es: 'El color debía ayudar a interpretar, no añadir ruido visual', en: 'Colour had to help interpretation, not add visual noise' },
      parrafo: {
        es: 'En la tabla original, distintos resultados usaban varios colores cuyo significado no era siempre evidente. Además, <mark>«Abandonado» y «Escalado» compartían el mismo amarillo</mark>, lo que reducía su diferenciación. Replanteé el color para darle una función consistente: verde para los resultados positivos de FCR y resolución por IA, una escala para el NPS, colores distintos a los dos estados que se confundían, y color e icono en cada etiqueta de canal.',
        en: 'In the original table, different outcomes used several colours whose meaning was not always obvious. On top of that, <mark>“Abandoned” and “Escalated” shared the same yellow</mark>, which made them harder to tell apart. I rethought colour to give it a consistent job: green for positive FCR and AI-resolution outcomes, a scale for NPS, distinct colours for the two statuses that were being confused, and colour plus an icon on every channel label.',
      },
      antes: {
        pie: { es: 'En la primera versión, todos los canales compartían la misma etiqueta gris; había que leer cada fila para diferenciarlos.', en: 'In the first version, every channel shared the same grey label; each row had to be read to tell them apart.' },
        alt: { es: 'Columna de canal anterior: seis etiquetas grises iguales.', en: 'Earlier channel column: six identical grey labels.' },
      },
      despues: {
        pie: { es: 'En el rediseño, cada canal combina color e icono para que la columna se reconozca de un vistazo.', en: 'In the redesign, every channel combines colour and an icon so the column can be recognised at a glance.' },
        alt: { es: 'Columna de canal rediseñada: cada canal con su color y su icono.', en: 'Redesigned channel column: each channel with its own colour and icon.' },
      },
      lado: {
        es: 'Cada canal lleva ahora su color y su icono, así que la columna se lee de un vistazo sin tener que leer cada fila.',
        en: 'Each channel now has its own colour and icon, so the column reads at a glance without reading every row.',
      },
      lista: [
        { es: 'Verde para los resultados positivos de FCR y resolución por IA.', en: 'Green for positive FCR and AI-resolution outcomes.' },
        { es: 'Una escala para el NPS, que distingue promotores de detractores.', en: 'A scale for NPS that tells promoters from detractors.' },
        { es: '«Abandonado» y «Escalado» dejaron de compartir el amarillo.', en: '“Abandoned” and “Escalated” no longer share the yellow.' },
      ],
      cierre: {
        es: 'La intención era que el color sirviera como señal informativa, no como preferencia estética.',
        en: 'The intent was for colour to work as an informative signal, not an aesthetic preference.',
      },
    },
    jerarquia: {
      corto: { es: 'Jerarquía de KPIs', en: 'KPI hierarchy' },
      titulo: { es: 'Dar más jerarquía a los indicadores principales', en: 'Giving the main indicators more hierarchy' },
      parrafo: {
        es: 'Las tarjetas de KPI usaban distintos colores y títulos pequeños: los indicadores estaban, pero la variedad cromática no establecía jerarquía. Mantuve una paleta más consistente, con títulos más visibles e iconos por indicador, y amplié el espacio del score global usando el color primario para separarlo de sus dimensiones. Tomé como referencia la identidad visual de Schaman, <mark>diferenciando los colores de la interfaz de los que cumplen una función informativa en los datos</mark>.',
        en: 'The KPI cards used different colours and small titles: the indicators were there, but the colour variety set no hierarchy. I kept a more consistent palette, with more visible titles and an icon per indicator, and gave the overall score more room, using the primary colour to set it apart from its dimensions. I took Schaman’s visual identity as a reference, <mark>separating interface colours from the ones that carry information in the data</mark>.',
      },
      antes: {
        pie: { es: 'La primera versión daba un color a cada KPI, pero los títulos pequeños y la variedad visual no indicaban cuáles debían leerse primero.', en: 'The first version gave each KPI a colour, but small labels and visual variety did not signal which ones should be read first.' },
        altScore: { es: 'El score global de la versión original: el 295 en naranja junto a sus cinco dimensiones, todo en la misma caja.', en: 'The overall score in the original version: 295 in orange beside its five dimensions, all in the same box.' },
        alt: { es: 'Fila anterior de cinco tarjetas de indicadores, cada una de un color.', en: 'Earlier row of five indicator cards, each in a different colour.' },
      },
      despues: {
        pie: { es: 'La tira rediseñada usa una paleta consistente y títulos más legibles; el score global gana un espacio propio para diferenciarse de sus dimensiones.', en: 'The redesigned row uses a consistent palette and more legible labels; the overall score gets its own space to stand apart from its dimensions.' },
        alt: { es: 'Fila rediseñada de tarjetas de indicadores, con icono, título legible y una sola paleta.', en: 'Redesigned row of indicator cards, with an icon, a readable title and a single palette.' },
        altScore: { es: 'El score global sobre fondo azul, separado de sus cinco dimensiones.', en: 'The overall score on a blue background, set apart from its five dimensions.' },
      },
    },
    tooltips: {
      corto: { es: 'Tooltips', en: 'Tooltips' },
      titulo: { es: 'Proporcionar contexto sin sacar al usuario de la vista', en: 'Giving context without taking the user out of the view' },
      parrafo: {
        es: 'Algunos indicadores, gráficos y encabezados necesitaban una explicación para interpretarse bien. Incorporé tooltips en las visualizaciones del dashboard, en la sección de fallos y en los encabezados de columna: <mark>las definiciones quedan dentro de la propia interfaz</mark>, sin abandonar la vista que se está consultando.',
        en: 'Some indicators, charts and headers needed an explanation to be read correctly. I added tooltips to the dashboard charts, the failure section and the column headers: <mark>the definitions live inside the interface itself</mark>, without leaving the view being consulted.',
      },
      indicador: {
        rotulo: { es: 'En un indicador', en: 'On an indicator' },
        pie: { es: 'El tooltip explica qué mide el indicador, cómo interpretarlo y qué sesiones entran en su cálculo sin sacar a la persona de la vista.', en: 'The tooltip explains what the indicator measures, how to interpret it and which sessions it includes without taking the person out of the view.' },
        alt: { es: 'Tooltip sobre una tarjeta de indicador, con su definición.', en: 'Tooltip over an indicator card, with its definition.' },
      },
      columna: {
        rotulo: { es: 'En una columna', en: 'On a column' },
        pie: { es: 'El tooltip del encabezado define el valor de la columna dentro de la propia tabla, justo donde hace falta consultarlo.', en: 'The header tooltip defines the column value inside the table itself, right where it needs to be checked.' },
        alt: { es: 'Tooltip sobre un encabezado de la tabla de sesiones.', en: 'Tooltip over a session table header.' },
      },
    },
  },

  /* ══ 06 · EL RESULTADO ══ */
  resultado: {
    antetitulo: { es: '06 / El resultado', en: '06 / The result' },
    titulo: {
      es: 'Una interfaz funcional, construida a partir de decisiones concretas',
      en: 'A working interface, built from concrete decisions',
    },
    parrafo: {
      es: 'Las mejoras se implementaron en el frontend de la aplicación con <b>React y Supabase</b>. El resultado va más allá de una propuesta visual estática: <mark>incluye funcionalidades implementadas que pueden demostrarse en la interfaz</mark>.',
      en: 'The improvements were implemented in the application’s front end with <b>React and Supabase</b>. The result goes beyond a static visual proposal: <mark>it includes working features that can be shown in the interface</mark>.',
    },
    pantallas: [
      {
        titulo: { es: 'Panel general', en: 'Overview' },
        pie: { es: 'Una lectura general con score global, cinco indicadores y filtros compartidos.', en: 'An overview with the overall score, five indicators and shared filters.' },
        alt: { es: 'Panel general rediseñado.', en: 'Redesigned overview.' },
      },
      {
        titulo: { es: 'Sesiones', en: 'Sessions' },
        pie: { es: 'Una vista para localizar y revisar registros con búsqueda, orden por columna y paginación.', en: 'A view for finding and reviewing records through search, column sorting and pagination.' },
        alt: { es: 'Página de sesiones con buscador y tabla paginada.', en: 'Sessions page with search box and paginated table.' },
      },
      {
        titulo: { es: 'Mapa', en: 'Map' },
        pie: { es: 'Una lectura territorial de las sesiones por región y zona, acompañada de un ranking para comparar concentraciones.', en: 'A territorial reading of sessions by region and area, paired with a ranking to compare concentrations.' },
        alt: { es: 'Página de mapa con España coloreada por provincia.', en: 'Map page with Spain shaded by province.' },
      },
    ],
    resumen: [
      { rotulo: { es: 'Organizar', en: 'Organise' }, texto: { es: 'Separé el dashboard de la vista de sesiones para distinguir la lectura general de la exploración de registros.', en: 'I separated the dashboard from the sessions view to tell the overview apart from exploring records.' } },
      { rotulo: { es: 'Consultar', en: 'Query' }, texto: { es: 'Búsqueda, ordenamiento, paginación, filtros temporales y una vista geográfica nueva.', en: 'Search, sorting, pagination, date filters and a new geographic view.' } },
      { rotulo: { es: 'Interpretar', en: 'Interpret' }, texto: { es: 'Revisé la jerarquía de los indicadores, el uso del color y el contexto disponible en la propia interfaz.', en: 'I reworked the indicator hierarchy, the use of colour and the context available in the interface itself.' } },
    ],
  },

  /* ══ 07 · LO QUE APRENDÍ ══ */
  aprendizaje: {
    antetitulo: { es: '07 / Lo que aprendí', en: '07 / What I learned' },
    titulo: {
      es: 'Diseñar un dashboard también implica decidir cómo se interpreta la información',
      en: 'Designing a dashboard also means deciding how information gets interpreted',
    },
    parrafo: {
      es: 'Una de las principales lecciones fue que <mark>la claridad de una interfaz no depende únicamente de mostrar la información correcta</mark>. También importa cómo se organiza, qué herramientas se ofrecen para explorarla y cuánto contexto proporciona la propia interfaz para interpretarla.',
      en: 'One of the main lessons was that <mark>an interface’s clarity does not depend only on showing the right information</mark>. It also matters how it is organised, what tools are offered to explore it and how much context the interface itself provides to interpret it.',
    },
    aviso: {
      rotulo: { es: 'Lo que este caso todavía no demuestra', en: 'What this case doesn’t show yet' },
      texto: {
        es: 'El trabajo documenta las decisiones tomadas y las funcionalidades implementadas, pero no mide su impacto en el comportamiento de los usuarios. El siguiente paso sería contrastarlas con tareas reales y personas usuarias.',
        en: 'The work documents the decisions made and the features implemented, but does not measure their impact on user behaviour. The next step would be to test them against real tasks and real users.',
      },
    },
  },

  /* el cierre de siempre: volver, el repositorio y los otros proyectos */
  cierre: {
    volver: { es: '← volver a proyectos', en: '← back to projects' },
    verRepositorio: { es: 'ver repositorio', en: 'view repository' },
    otrosProyectos: { es: '// otros proyectos', en: '// other projects' },
  },
} as const;
