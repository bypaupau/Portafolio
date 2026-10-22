/* ═══════════════════════════════════════════════════════════
   CONTENIDO DEL CASO · SCHAMAN ANALYTICS BI
   página: src/pages/casos/schaman-analytics-bi.astro

   Esto NO es interfaz: es el texto del proyecto. Cada texto es una
   cadena (si es igual en los dos idiomas) o { es, en }.

   Este caso tenía las claves más difíciles de todo el sitio. Lo que
   era sch.dec.4.3 ahora es decisiones.lista[3].seEspera, y sch.f.rol.2
   es miRol.puntos[1]. Es el ejemplo exacto que pediste resolver.
   ═══════════════════════════════════════════════════════════ */
import type { TextoBilingue } from '../../lib/texto-bilingue';

export interface ParAntesDespues {
  titulo: TextoBilingue;
  antes: { pie: TextoBilingue; alt: TextoBilingue };
  despues: { pie: TextoBilingue; alt: TextoBilingue };
}

export const schamanAnalyticsBi = {

  /* el <title>, la <meta description> y el nombre que sale en la
     taskbar. Van aquí y no en los diccionarios: son del proyecto,
     no de la interfaz, así que agregar un caso no obliga a tocar
     src/i18n/. */
  documento: {
    nombreDeVentana: 'schaman_analytics_bi.md',
    titulo: 'pau.proyectos · Schaman Analytics BI',
    descripcion: {
      es: 'Caso académico de rediseño UI/UX para una aplicación analítica omnicanal, con un Data Warehouse y KPI de demostración como contexto.',
      en: 'Academic UI/UX redesign of an omnichannel analytics app, with a Data Warehouse and demonstration KPIs as context.',
    },
  },

  /* la portada del caso */
  portada: {
    antetitulo: {
      es: 'Proyecto académico · Rediseño UI/UX · 2026',
      en: 'University project · UI/UX redesign · 2026',
    },
    subtitulo: {
      es: 'Repensar cómo se exploran los datos de atención omnicanal.',
      en: 'Rethinking how people explore omnichannel support data.',
    },
    introduccion: {
      es: 'Schaman es una empresa real que publica soluciones de autoatención digital y atención omnicanal. En este proyecto académico, mi trabajo fue diseñar la interfaz del dashboard para explorar un modelo de datos, análisis y KPIs de demostración.',
      en: 'Schaman is a real company that publishes digital self-service and omnichannel support solutions. In this academic project, my contribution was redesigning the dashboard interface the team built to explore a data model and demonstration KPIs.',
    },
    avisoEnCurso: {
      es: 'Caso académico - datos de demostración',
      en: 'Academic case study · demonstration data',
    },
    imagen: {
      pie: {
        es: 'Vista general rediseñada. Los valores visibles son de demostración.',
        en: 'Redesigned overview. Values shown are for demonstration and do not represent actual Schaman results.',
      },
      alt: {
        es: 'Panel general rediseñado con score, filtros y tarjetas KPI.',
        en: 'Redesigned overview with score, filters and KPI cards.',
      },
    },
  },

  /* "// el terreno": las cuatro etiquetas del proyecto */
  terreno: {
    etiqueta: {
      es: '// el terreno',
      en: '// the ground',
    },
    campos: [
      {
        es: 'Diseño UI/UX',
        en: 'UI/UX design',
      },
      'Figma',
      {
        es: 'Ingeniería de datos',
        en: 'Data engineering',
      },
      'Business Intelligence',
    ],
  },

  /* lo que hizo y con qué */
  miRol: {
    etiqueta: {
      es: 'Mi rol',
      en: 'My role',
    },
    puntos: [
      {
        es: 'Diseñé la interfaz de la aplicación',
        en: 'I designed and implemented the consumer app interface: overview, failure analysis, session table, and Data and methodology page.',
      },
      {
        es: 'Apliqué mis conocimientos de UI/UX para replantear la jerarquía visual, navegación, filtros y la lectura de las métricas.',
        en: 'I applied my UI/UX knowledge to rethink visual hierarchy, navigation, filters and how people read the metrics.',
      },
    ],
  },
  herramientas: {
    etiqueta: {
      es: 'Herramientas',
      en: 'Tools',
    },
    puntos: [
      {
        es: 'Figma',
        en: 'Figma — design exploration and decisions for the interface redesign.',
      },
      {
        es: 'React, Vite y Recharts',
        en: 'React, Vite and Recharts — application structure and KPI visualisation.',
      },
      {
        es: 'Supabase / PostgreSQL',
        en: 'Supabase / PostgreSQL— the team’s Data Warehouse and analytical queries.',
      },
      {
        es: 'Pentaho PDI',
        en: '<b>Pentaho PDI</b> — the ETL tool used by Daniel.',
      },
    ],
  },

  /* la ficha: equipo, estado y datos */
  ficha: {
    equipo: {
      etiqueta: {
        es: 'Equipo',
        en: 'Team',
      },
      integrantes: [
        {
          es: 'Paula Martillo Quintana - diseño e implementación de la interfaz.',
          en: 'Paula Alejandra Martillo Quintana — interface design and implementation.',
        },
        {
          es: 'Daniel Vaca Velastegui - proceso ETL con Pentaho PDI.',
          en: 'Daniel Andrés Vaca Velastegui — ETL process with Pentaho PDI.',
        },
        {
          es: 'Leonor Molina Zapata - funciones SQL/RPC.',
          en: 'Leonor Molina Zapata — SQL/RPC functions.',
        },
        {
          es: 'Raúl Garay Vinueza - proceso ETL con Penaho PDI.',
          en: 'Raúl Alejandro Garay Vinueza — listed as a team member in the final presentation; his specific role is not documented.',
        },
      ],
    },
    estado: {
      etiqueta: {
        es: 'Estado',
        en: 'Status',
      },
      valor: {
        es: 'Proyecto académico de dos parciales. La interfaz fue rediseñada; el almacén y las consultas se presentan con datos de demostración.',
        en: 'Two-part academic project. The interface was redesigned; the warehouse and queries are shown with demonstration data.',
      },
    },
    datos: {
      etiqueta: {
        es: 'Datos',
        en: 'Data',
      },
      valor: {
        es: 'La presentación describe una carga histórica ficticia desde CSV. Las cifras visibles son de demostración, no datos operativos de Schaman.',
        en: 'The presentation describes a fictional historical CSV load. Figures shown are for demonstration, not Schaman operational data.',
      },
    },
  },

  /* el riel lateral. Este caso NO lleva enlace externo en el riel:
     el sitio anterior lo tenía comentado, esperando que el proyecto
     tuviera repositorio público. Ya lo tiene, y está en el cierre. */
  riel: {
    portada: {
      es: 'Portada',
      en: 'Cover',
    },
    paradas: [
      {
        es: 'El reto',
        en: 'The challenge',
      },
      {
        es: 'Análisis UX',
        en: 'UX analysis',
      },
      {
        es: 'Decisiones',
        en: 'Decisions',
      },
      {
        es: 'El rediseño',
        en: 'The redesign',
      },
      {
        es: 'Datos y modelo',
        en: 'Data and model',
      },
      {
        es: 'Métricas',
        en: 'Metrics',
      },
      {
        es: 'Las pantallas',
        en: 'The screens',
      },
    ],
  },

  /* 01 · el reto */
  reto: {
    numero: {
      es: '01 / el reto',
      en: '01 / the challenge',
    },
    titulo: {
      es: 'De los datos de atención a una experiencia de análisis',
      en: 'From support data to an analytics experience',
    },
    parrafos: [
      {
        es: 'Schaman publica soluciones de autoatención digital y atención omnicanal. Ese contexto público inspiró el escenario académico; no tuvimos acceso a sistemas internos ni trabajamos para la empresa.',
        en: 'Schaman publishes digital self-service and omnichannel support solutions. This public context inspired the academic scenario; we had no access to internal systems and did not work for the company.',
      },
      {
        es: 'El proyecto se desarrolló en dos parciales: primero se estudió el caso asignado y se planteó el modelo de datos; después, el equipo construyó un almacén dimensional, un ETL y un dashboard de demostración. Mi caso se centra en esa última capa: cómo hacer que la información analítica sea más fácil de recorrer e interpretar.',
        en: 'The project was developed across two course assignments: first, the team studied the assigned case and proposed a data model; then it built a dimensional warehouse, an ETL and a demonstration dashboard. My case focuses on that final layer: making analytical information easier to navigate and interpret.',
      },
    ],
    contexto: {
      es: '<b>Contexto de referencia:</b> <a href="https://www.schaman.com/es/use-case-digital-absorption" target="_blank" rel="noopener noreferrer">caso público de absorción digital de Schaman ↗</a>.',
      en: '<b>Reference context:</b> <a href="https://www.schaman.com/es/use-case-digital-absorption" target="_blank" rel="noopener noreferrer">Schaman’s public digital absorption use case ↗</a>.',
    },
    pregunta: {
      es: '¿Cómo organizar un dashboard para pasar de una vista general de atención a investigar problemas recurrentes y resolución por canal, sin confundir indicadores ni perder los filtros?',
      en: 'How might a dashboard help someone move from an overview of support activity to investigating recurring problems and resolution by channel, without confusing metrics or losing filter context?',
    },
    nota: {
      es: 'Este es un <b>proyecto académico</b>, no un encargo de Schaman. El equipo construyó un escenario de telco y datos ficticios/de demostración; no son registros de clientes ni resultados de negocio de la empresa.',
      en: 'This is an <b>academic project</b>, not a commission from Schaman. The team created a telco scenario and fictional/demo data; these are not customer records or business results from the company.',
    },
  },

  /* 02 · análisis de la interfaz */
  analisis: {
    numero: {
      es: '02 / análisis UX',
      en: '02 / UX analysis',
    },
    titulo: {
      es: 'Lo que la interfaz pedía resolver',
      en: 'What the interface needed to address',
    },
    parrafo: {
      es: 'Para entender qué debía mejorar, el diseño se concentró en las vistas analíticas del proyecto; especialmente en los gráficos. A pesar de no haberse realizado ninguna investigación de usuarios, leí sobre cómo elaborar correctamente dashboards de finanzas, lo cual fue la mayor guía durante este proceso. ',
      en: 'I reviewed captures of the earlier and redesigned versions to understand what the dashboard should help people read. This analysis is based on the interface and the project’s analytical tasks; we did not conduct interviews or usability tests.',
    },
    observaciones: [
      {
        es: '<b>Información en una sola vista:</b> el panel anterior reunía resumen, gráficos y sesiones; el rediseño separa el resumen de la exploración de registros.',
        en: '<b>Information in one view:</b> the earlier dashboard combined summary, charts and sessions; the redesign separates the overview from record exploration.',
      },
      {
        es: '<b>Dos preguntas distintas:</b> el resumen permite ver el periodo; el análisis de fallos requiere comparar problemas, categorías, prioridades y dispositivos.',
        en: '<b>Two different questions:</b> the overview shows the period at a glance; failure analysis requires comparing problems, categories, priorities and devices.',
      },
      {
        es: '<b>Indicadores que se pueden confundir:</b> resolver al primer contacto y resolver una sesión miden cosas diferentes; sus etiquetas deben explicarlo.',
        en: '<b>Metrics that can be confused:</b> resolving on first contact and resolving a session measure different things; their labels should make that clear.',
      },
      {
        es: '<b>Filtros compartidos:</b> periodo y canal guían distintas vistas, así que conviene mantenerlos en una posición coherente.',
        en: '<b>Shared filters:</b> period and channel guide multiple views, so their position should stay consistent.',
      },
    ],
    nota: {
      es: '<b>Alcance:</b> son observaciones de capturas y tareas del proyecto, no hallazgos de investigación con personas usuarias.',
      en: '<b>Scope:</b> these are observations from screenshots and project tasks, not findings from research with users.',
    },
  },

  /* 03 · las cuatro decisiones de diseño. Las cuatro etiquetas
     (Necesidad / Decisión / Se espera / Validación pendiente) se
     repiten en cada una, así que van una sola vez. */
  decisiones: {
    numero: {
      es: '03 / decisiones de diseño',
      en: '03 / design decisions',
    },
    titulo: {
      es: 'De la necesidad a la interfaz',
      en: 'From need to interface',
    },
    parrafo: {
      es: 'Organicé el rediseño alrededor de cuatro decisiones. El beneficio descrito es esperado; queda por validar con personas que usarían el panel.',
      en: 'I organised the redesign around four decisions. The benefits described are expected; they still need validation with people who would use the dashboard.',
    },
    etiquetas: {
      necesidad: {
        es: 'Necesidad:',
        en: 'Need:',
      },
      decision: {
        es: 'Decisión:',
        en: 'Decision:',
      },
      seEspera: {
        es: 'Se espera:',
        en: 'Expected:',
      },
      validacion: {
        es: 'Validación pendiente:',
        en: 'To validate:',
      },
    },
    lista: [
      {
        necesidad: {
          es: 'orientarse rápido',
          en: 'find your way quickly',
        },
        decision: {
          es: 'navegación lateral y vistas separadas',
          en: 'side navigation and separate views',
        },
        seEspera: {
          es: 'encontrar cada tarea con menos búsqueda',
          en: 'find each task with less searching',
        },
        validacion: {
          es: 'pedir a una persona localizar una vista',
          en: 'ask someone to locate a view',
        },
      },
      {
        necesidad: {
          es: 'entender el estado del periodo',
          en: 'understand the period',
        },
        decision: {
          es: 'score y KPI al inicio, filtros comunes arriba',
          en: 'score and KPIs first, shared filters above',
        },
        seEspera: {
          es: 'leer primero los indicadores clave',
          en: 'read key indicators first',
        },
        validacion: {
          es: 'comprobar comprensión y uso de filtros',
          en: 'check comprehension and filter use',
        },
      },
      {
        necesidad: {
          es: 'investigar sesiones fallidas',
          en: 'investigate failed sessions',
        },
        decision: {
          es: 'vista dedicada con problemas, categorías, prioridades y dispositivos',
          en: 'dedicated view for problems, categories, priorities and devices',
        },
        seEspera: {
          es: 'pasar del resumen al detalle con contexto',
          en: 'move from summary to detail with context',
        },
        validacion: {
          es: 'tarea de localizar problema/dispositivo',
          en: 'task to find a problem/device',
        },
      },
      {
        necesidad: {
          es: 'interpretar medidas correctamente',
          en: 'interpret measures correctly',
        },
        decision: {
          es: 'etiquetas, colores y página de metodología',
          en: 'clearer labels, colours and methodology page',
        },
        seEspera: {
          es: 'distinguir FCR de tasa de resolución',
          en: 'distinguish FCR from resolution rate',
        },
        validacion: {
          es: 'pedir que expliquen cada cifra',
          en: 'ask someone to explain each figure',
        },
      },
    ],
    nota: {
      es: 'Las comparaciones visuales muestran decisiones implementadas; los beneficios y la facilidad de uso todavía no se han comprobado con pruebas.',
      en: 'The visual comparisons show implemented decisions; benefits and ease of use have not yet been checked through testing.',
    },
  },

  /* 04 · el rediseño, con los dos pares antes/después */
  redisenio: {
    numero: {
      es: '04 / el rediseño',
      en: '04 / the redesign',
    },
    titulo: {
      es: 'Rediseñé la forma de leer el panel',
      en: 'I redesigned how the dashboard reads',
    },
    parrafos: [
      {
        es: 'Partí de la aplicación de escritorio existente y reorganicé su presentación para priorizar el análisis: filtros juntos, score y KPI en el resumen, fallos y sesiones en vistas propias, y una página para explicar el modelo y sus indicadores.',
        en: 'I started from the existing desktop app and reorganised its presentation around analysis: filters together, score and KPIs in the summary, failures and sessions in dedicated views, and a page explaining the model and indicators.',
      },
      {
        es: 'Las comparaciones muestran la evolución visual de dos vistas. Son capturas de estados y períodos distintos: ayudan a revisar estructura y legibilidad, no a atribuir cambios en las cifras al rediseño.',
        en: 'The comparisons show the visual evolution of two views. They capture different states and periods, so they help review structure and legibility, not attribute changes in figures to the redesign.',
      },
    ],
    etiquetaAntes: {
      es: 'Antes',
      en: 'Before',
    },
    etiquetaDespues: {
      es: 'Después',
      en: 'After',
    },
    comparaciones: [
      {
        titulo: {
          es: 'Panel general',
          en: 'Overview panel',
        },
        antes: {
          pie: {
            es: 'Versión previa: navegación compacta y paleta azul; resumen y contenido comparten una sola vista.',
            en: 'Earlier version: compact navigation and blue palette; summary and content share one view.',
          },
          alt: {
            es: 'Versión anterior del panel general de Schaman Analytics BI.',
            en: 'Earlier Schaman Analytics BI overview.',
          },
        },
        despues: {
          pie: {
            es: 'Rediseño: navegación lateral, perfil de analista, filtros comunes y jerarquía más clara para score y KPI.',
            en: 'Redesign: side navigation, analyst profile, shared filters and clearer score and KPI hierarchy.',
          },
          alt: {
            es: 'Panel general rediseñado con navegación, filtros, perfil de analista y tarjetas KPI.',
            en: 'Redesigned overview with navigation, filters, analyst profile and KPI cards.',
          },
        },
      },
      {
        titulo: {
          es: 'Análisis de fallos',
          en: 'Failure analysis',
        },
        antes: {
          pie: {
            es: 'Vista previa de análisis de fallos, con áreas amplias para gráficos y paleta azul.',
            en: 'Earlier failure analysis view, with large chart areas and a blue palette.',
          },
          alt: {
            es: 'Versión anterior de análisis de fallos.',
            en: 'Earlier failure analysis view.',
          },
        },
        despues: {
          pie: {
            es: 'La nueva vista organiza métricas del período, problemas, categorías, prioridades y dispositivos.',
            en: 'The new view groups period metrics, problems, categories, priorities and devices.',
          },
          alt: {
            es: 'Análisis de fallos rediseñado con tarjetas, gráficos y tabla de prioridades.',
            en: 'Redesigned failure analysis with cards, charts and a priority table.',
          },
        },
      },
    ],
    cambios: {
      titulo: {
        es: 'Lo que cambia entre una y otra',
        en: 'What changes between the two',
      },
      lista: [
        {
          nombre: {
            es: 'Jerarquía',
            en: 'Hierarchy',
          },
          texto: {
            es: 'Score e indicadores antes de los gráficos de detalle.',
            en: 'Score and indicators before detailed charts.',
          },
        },
        {
          nombre: {
            es: 'Navegación',
            en: 'Navigation',
          },
          texto: {
            es: 'Menú lateral con panel, fallos, sesiones y datos y metodología.',
            en: 'Side menu for overview, failures, sessions, and data and methodology.',
          },
        },
        {
          nombre: {
            es: 'Filtros',
            en: 'Filters',
          },
          texto: {
            es: 'Controles alineados y compartidos entre vistas de análisis.',
            en: 'Aligned controls shared across analysis views.',
          },
        },
        {
          nombre: {
            es: 'Sesiones',
            en: 'Sessions',
          },
          texto: {
            es: 'Tabla en una vista independiente, sin alargar el resumen.',
            en: 'A dedicated table view keeps records out of the overview.',
          },
        },
        {
          nombre: {
            es: 'Lectura',
            en: 'Reading',
          },
          texto: {
            es: 'Etiquetas, colores y explicaciones revisados para diferenciar canales e interpretar KPI.',
            en: 'Labels, colours and explanations revised to distinguish channels and interpret KPIs.',
          },
        },
      ],
    },
    nota: {
      es: 'Las capturas corresponden a versiones y períodos de datos distintos. La comparación documenta decisiones de interfaz; no mide una mejora de negocio.',
      en: 'Screenshots show different versions and data periods. The comparison documents interface decisions; it does not measure business improvement.',
    },
  },

  /* 05 · contexto técnico: el flujo y los dos diagramas */
  contextoTecnico: {
    numero: {
      es: '05 / contexto técnico',
      en: '05 / technical context',
    },
    titulo: {
      es: 'Cómo llega la información al panel',
      en: 'How information reaches the dashboard',
    },
    parrafo: {
      es: 'La interfaz consume un flujo de datos preparado por el equipo para explorar sesiones de atención. Este contexto explica de dónde vienen las vistas; el foco del caso sigue siendo cómo las organicé para su lectura.',
      en: 'The interface consumes a data flow the team prepared to explore support sessions. This context explains where the views come from; the case focuses on how I organised them for reading.',
    },
    flujo: [
      {
        nombre: {
          es: 'Base OLTP',
          en: 'OLTP database',
        },
        texto: {
          es: 'El registro operativo de las sesiones, normalizado.',
          en: 'The normalised operational record of the sessions.',
        },
      },
      {
        nombre: 'ETL · Pentaho PDI',
        texto: {
          es: 'Extracción, limpieza y carga hacia el Data Warehouse.',
          en: 'Extraction, cleaning and loading into the Data Warehouse.',
        },
      },
      {
        nombre: {
          es: 'Data Warehouse en estrella',
          en: 'Star-schema Data Warehouse',
        },
        texto: {
          es: 'Un hecho de sesiones rodeado de sus dimensiones.',
          en: 'A session fact table surrounded by its dimensions.',
        },
      },
      {
        nombre: {
          es: 'Funciones SQL / RPC',
          en: 'SQL / RPC functions',
        },
        texto: {
          es: 'En Supabase: cada indicador y cada gráfico se pide con una llamada.',
          en: 'In Supabase: every indicator and chart is requested with one call.',
        },
      },
      {
        nombre: 'Dashboard',
        texto: {
          es: 'React, Vite y Recharts: la aplicación que lo consume y lo pone en pantalla.',
          en: 'React, Vite and Recharts: the app that consumes it and puts it on screen.',
        },
      },
    ],
    diagramas: [
      {
        titulo: {
          es: 'Flujo de datos',
          en: 'Data flow',
        },
        parrafo: {
          es: 'OLTP → ETL con Pentaho PDI → almacén dimensional en Supabase/PostgreSQL → funciones SQL/RPC → interfaz en React y Recharts.',
          en: 'OLTP → ETL with Pentaho PDI → dimensional warehouse in Supabase/PostgreSQL → SQL/RPC functions → React and Recharts interface.',
        },
        alt: {
          es: 'Flujo de datos desde la base OLTP y Pentaho PDI hasta Supabase, las funciones SQL/RPC y el dashboard.',
          en: 'Data flow from the OLTP database and Pentaho PDI to Supabase, SQL/RPC functions and the dashboard.',
        },
      },
      {
        titulo: {
          es: 'Modelo dimensional',
          en: 'Dimensional model',
        },
        parrafo: {
          es: 'El objetivo es una fila por sesión omnicanal. La tabla de hechos enlaza ocho dimensiones: fecha, cliente, canal, geografía, problema, contrato, dispositivo y usuario.',
          en: 'The objective is one row per omnichannel session. The fact table links to eight dimensions: date, customer, channel, geography, problem, contract, device and user.',
        },
        alt: {
          es: 'Modelo estrella: HECHO_SESION_OMNICANAL y sus ocho dimensiones relacionadas.',
          en: 'Star schema: HECHO_SESION_OMNICANAL and its eight related dimensions.',
        },
      },
    ],
    nota: {
      es: 'La arquitectura resume los materiales del proyecto. El diagrama reproduce el modelo dimensional documentado; no implica que todo el flujo esté desplegado en producción.',
      en: 'The architecture summarises project materials. The diagram reproduces the documented dimensional model; it does not imply the full flow runs in production.',
    },
  },

  /* 06 · qué significa cada indicador */
  metricas: {
    numero: {
      es: '06 / métricas',
      en: '06 / metrics',
    },
    titulo: {
      es: 'Qué significa cada indicador',
      en: 'What each indicator means',
    },
    parrafo: {
      es: 'Las fórmulas se aplican a las sesiones que corresponden a los filtros elegidos. En palabras sencillas:',
      en: 'The formulas apply to sessions included by the selected filters. In plain language:',
    },
    lista: [
      {
        nombre: 'FCR',
        texto: {
          es: 'De las sesiones que tienen este dato informado, qué porcentaje se resolvió en el primer contacto. Un “No” no dice cuántos contactos posteriores hicieron falta.',
          en: 'Among sessions with this field filled in, the percentage resolved on first contact. “No” does not say how many later contacts were needed.',
        },
      },
      {
        nombre: {
          es: 'TMO',
          en: 'AHT',
        },
        texto: {
          es: 'Promedio de duración de las sesiones filtradas, mostrado en segundos y minutos.',
          en: 'Average duration of filtered sessions, shown in seconds and minutes.',
        },
      },
      {
        nombre: 'T-NPS',
        texto: {
          es: 'Promotores (9–10) menos detractores (0–6), como porcentaje de las calificaciones registradas. Las notas 7–8 son pasivas; el resultado va de −100 a +100.',
          en: 'Promoters (9–10) minus detractors (0–6), as a percentage of recorded ratings. Scores 7–8 are passives; the result ranges from −100 to +100.',
        },
      },
      {
        nombre: {
          es: 'Tasa de éxito',
          en: 'Success rate',
        },
        texto: {
          es: 'Sesiones con resultado “Resuelto” ÷ total de sesiones filtradas × 100. No equivale a resolución en el primer contacto.',
          en: 'Sessions with outcome “Resolved” ÷ all filtered sessions × 100. This is not the same as first contact resolution.',
        },
      },
      {
        nombre: {
          es: 'Resolución por IA',
          en: 'AI resolution',
        },
        texto: {
          es: 'Sesiones marcadas como resueltas por IA ÷ total de sesiones filtradas × 100. La marca no demuestra por sí sola que no interviniera una persona.',
          en: 'Sessions marked as resolved by AI ÷ all filtered sessions × 100. The flag alone does not prove no person was involved.',
        },
      },
      {
        nombre: {
          es: 'Score global',
          en: 'Overall score',
        },
        texto: {
          es: 'Suma cinco porcentajes redondeados: FCR, sesiones resueltas, sesiones de hasta 300 s, promotores sobre el total de sesiones y sesiones resueltas por IA. Máximo: 500 puntos; es una métrica propia del proyecto.',
          en: 'Sum of five rounded percentages: FCR, resolved sessions, sessions up to 300 s, promoters as a share of all sessions, and sessions resolved by AI. Maximum: 500 points; this is a project-specific metric.',
        },
      },
    ],
    notas: [
      {
        es: '<b>FCR:</b> el campo solo registra si la sesión se resolvió en el primer contacto. No guarda el número de intento ni enlaza contactos sucesivos, así que no permite saber si se resolvió al segundo o tercer contacto.',
        en: '<b>FCR:</b> the field only records whether the session was resolved on first contact. It stores no attempt number and does not link successive contacts, so it cannot tell whether resolution happened on the second or third contact.',
      },
      {
        es: '<b>Datos de demostración:</b> las cifras ilustran la interfaz y las consultas del proyecto. No son KPI reales de Schaman ni evidencia de impacto empresarial.',
        en: '<b>Demonstration data:</b> values illustrate the project interface and queries. They are not actual Schaman KPIs or evidence of business impact.',
      },
    ],
  },

  /* 07 · la galería de pantallas. Salta el 5 a propósito: ese hueco
     era el diagrama del modelo, que ahora vive en Contexto técnico. */
  pantallas: {
    numero: {
      es: '07 / las pantallas',
      en: '07 / the screens',
    },
    titulo: {
      es: 'La interfaz en detalle',
      en: 'The interface in detail',
    },
    parrafo: {
      es: 'Estas vistas muestran cómo las decisiones de navegación y jerarquía se concretan en el panel, el análisis de fallos, las sesiones y la metodología.',
      en: 'These views show how the navigation and hierarchy decisions take shape across the overview, failure analysis, sessions and methodology.',
    },
    galeria: [
      {
        titulo: {
          es: 'Resumen general',
          en: 'Dashboard overview',
        },
        pie: {
          es: 'Score global, cinco KPI y filtros reunidos.',
          en: 'Global score, five KPIs and filters brought together.',
        },
        alt: {
          es: 'Panel general rediseñado con score, KPI y filtros.',
          en: 'Redesigned overview with score, KPIs and filters.',
        },
      },
      {
        titulo: {
          es: 'Tendencias y canales',
          en: 'Trends and channels',
        },
        pie: {
          es: 'Gráficos mensuales, distribución por canal y éxito por zona.',
          en: 'Monthly charts, channel distribution and resolution by area.',
        },
        alt: {
          es: 'Tendencia mensual, distribución de canal y tasa de éxito por zona.',
          en: 'Monthly trend, channel distribution and resolution rate by area.',
        },
      },
      {
        titulo: {
          es: 'Análisis de problemas',
          en: 'Problem analysis',
        },
        pie: {
          es: 'Fallos frecuentes, categorías y métricas del período.',
          en: 'Common failures, categories and period metrics.',
        },
        alt: {
          es: 'Análisis de fallos rediseñado con tarjetas resumen y gráficos.',
          en: 'Redesigned failure analysis with summary cards and charts.',
        },
      },
      {
        titulo: {
          es: 'Prioridad y dispositivos',
          en: 'Priority and devices',
        },
        pie: {
          es: 'Tasa de resolución por prioridad y fallos por modelo de dispositivo.',
          en: 'Resolution by priority and failures by device model.',
        },
        alt: {
          es: 'Resolución por prioridad y fallos por modelo de dispositivo.',
          en: 'Resolution by priority and failures by device model.',
        },
      },
      {
        titulo: {
          es: 'Registros de sesiones',
          en: 'Session records',
        },
        pie: {
          es: 'Tabla independiente con canal, zona, duración, primer contacto, IA y NPS.',
          en: 'Separate table with channel, area, duration, first contact, AI and NPS.',
        },
        alt: {
          es: 'Página de sesiones rediseñada con registros tabulares y filtros.',
          en: 'Redesigned sessions page with tabular records and filters.',
        },
      },
      {
        titulo: {
          es: 'Datos y metodología',
          en: 'Data and methodology',
        },
        pie: {
          es: 'Definiciones y fórmulas de los KPI, con sus límites de interpretación.',
          en: 'KPI definitions and formulas, with interpretation limits.',
        },
        alt: {
          es: 'Sección Datos y metodología con definiciones de los KPI.',
          en: 'Data and methodology section with KPI definitions.',
        },
      },
    ],
    nota: {
      es: 'Las capturas muestran el prototipo académico. Los valores visibles son ilustrativos y no permiten inferir resultados reales de Schaman.',
      en: 'The captures show the academic prototype. Values are illustrative and do not support inferences about Schaman’s real performance.',
    },
  },

  /* el cierre */
  cierre: {
    volver: {
      es: '← volver a proyectos',
      en: '← back to projects',
    },
    verRepositorio: {
      es: 'ver repositorio',
      en: 'view repository',
    },
    otrosProyectos: {
      es: '// otros proyectos',
      en: '// other projects',
    },
  },
} as const;
