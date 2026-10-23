/* ═══════════════════════════════════════════════════════════
   CONTENIDO DEL CASO · SCHAMAN ANALYTICS BI
   página: src/pages/casos/schaman-analytics-bi.astro

   Esto NO es interfaz: es el texto del proyecto. Cada texto es una
   cadena (si es igual en los dos idiomas) o { es, en }.

   Este caso tenía las claves más difíciles de todo el sitio. Lo que
   era sch.dec.4.3 ahora es decisiones.bloques[1].decisiones[1].decision,
   y sch.f.rol.2
   es miRol.puntos[1]. Es el ejemplo exacto que pediste resolver.
   ═══════════════════════════════════════════════════════════ */
import type { TextoBilingue } from '../../lib/texto-bilingue';


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
      es: 'El diagnóstico salió de revisar las interfaces del proyecto y las tareas analíticas que tenían que resolver, sobre todo las vistas de gráficos. No hubo investigación con personas usuarias: la guía fue leer sobre cómo se construyen los dashboards financieros.',
      en: 'The diagnosis came from reviewing the project’s interfaces and the analytical tasks they had to support, especially the chart views. There was no research with users: my guide was reading about how financial dashboards are built.',
    },
    observaciones: [
      {
        es: '<b>Información concentrada en una sola vista:</b> el panel anterior reunía en la misma pantalla el resumen, los gráficos y la tabla de sesiones.',
        en: '<b>Information concentrated in a single view:</b> the earlier dashboard put the summary, the charts and the session table on the same screen.',
      },
      {
        es: '<b>Dos necesidades distintas:</b> consultar el estado del periodo es una lectura rápida; investigar fallos pide comparar problemas, categorías, prioridades y dispositivos.',
        en: '<b>Two different needs:</b> checking the state of the period is a quick read; investigating failures means comparing problems, categories, priorities and devices.',
      },
      {
        es: '<b>Indicadores que se pueden confundir:</b> resolver al primer contacto y resolver una sesión miden cosas distintas; con etiquetas poco explícitas se leen como la misma cifra.',
        en: '<b>Metrics that can be confused:</b> resolving on first contact and resolving a session measure different things; with labels that are not explicit they read as the same figure.',
      },
      {
        es: '<b>Filtros compartidos entre vistas:</b> el periodo y el canal condicionan varias vistas a la vez, así que su sitio en la pantalla no se puede decidir vista por vista.',
        en: '<b>Filters shared across views:</b> period and channel condition several views at once, so where they sit cannot be decided view by view.',
      },
    ],
  },

  /* 03 · de la necesidad a la interfaz.

     ESTA SECCIÓN ERA DOS. Había una de decisiones (cuatro tarjetas con
     necesidad, cambio, impacto y un sello "por validar") y otra de
     rediseño (los dos pares antes/después, más cinco tarjetas de
     resumen). Entre las tres cosas, cada cambio se explicaba hasta
     tres veces y había que subir y bajar para conectar una decisión
     con la captura que la enseña.

     Ahora es UNA, con dos bloques, y el criterio para agrupar es la
     VISTA en la que se ve el cambio:

       bloques[0]  el panel general   → navegación y jerarquía
       bloques[1]  análisis de fallos → sesiones y métricas

     Cada bloque lleva sus dos decisiones, y cada decisión enseña una
     de las dos capturas de esa vista: la primera el antes, la segunda
     el después. Por eso los pies y los alt viven aquí dentro y ya no
     en una sección aparte.

     `antes` y `despues` siguen llamándose así porque es lo que son:
     los dos estados de la vista. Qué decisión enseña cuál lo decide la
     página, no este archivo.

     CADA DECISIÓN son dos campos y nada más: de dónde salió
     (necesidad) y qué cambió (decision). Había un tercer texto por
     bloque, `proposito`, que decía para qué servían las dos juntas;
     se retiró porque repetía las decisiones con otras palabras y era
     lo único que obligaba a un bloque de cita dentro de la ventana.

     NO SE AFIRMA NINGÚN RESULTADO. No hay cifras de mejora porque no
     se han medido; la nota del final dice qué son las capturas y qué
     no se puede concluir de ellas.

     El icono y el tono pastel de cada decisión NO están aquí: son
     interfaz, no texto del proyecto, y los pone la página.

     Este caso tenía las claves más opacas del sitio. Lo que era
     sch.dec.4.3 es hoy decisiones.bloques[1].decisiones[1].decision. */
  decisiones: {
    numero: {
      es: '03 / de la necesidad a la interfaz',
      en: '03 / from need to interface',
    },
    titulo: {
      es: 'De la necesidad a la interfaz',
      en: 'From need to interface',
    },
    parrafo: {
      es: 'Organicé el rediseño alrededor de cuatro decisiones, agrupadas por la vista en la que se ven. Cada bloque lleva al lado las capturas de antes y después de esa misma vista, para no tener que ir a buscarlas.',
      en: 'I organised the redesign around four decisions, grouped by the view where each one shows. Every block carries the before and after captures of that same view, so there is nothing to go looking for.',
    },
    etiquetas: {
      bloque: {
        es: 'Bloque',
        en: 'Block',
      },
      necesidad: {
        es: 'Necesidad',
        en: 'Need',
      },
      decision: {
        es: 'Decisión',
        en: 'Decision',
      },
      antes: {
        es: 'Antes',
        en: 'Before',
      },
      despues: {
        es: 'Después',
        en: 'After',
      },
    },
    bloques: [
      {
        titulo: {
          es: 'Panel general',
          en: 'Overview panel',
        },
        decisiones: [
          {
            titulo: {
              es: 'Navegación y estructura',
              en: 'Navigation and structure',
            },
            necesidad: {
              es: 'Encontrar una vista sin tener que buscarla entre varias secciones.',
              en: 'Find a view without having to hunt for it across several sections.',
            },
            decision: {
              es: 'Organizar las secciones en una navegación lateral y separar las vistas por tarea.',
              en: 'Organise the sections in a side navigation and separate the views by task.',
            },
          },
          {
            titulo: {
              es: 'Jerarquía de información',
              en: 'Information hierarchy',
            },
            necesidad: {
              es: 'Entender rápido el estado del periodo.',
              en: 'Understand the state of the period quickly.',
            },
            decision: {
              es: 'Colocar el score y los KPI al inicio, con los filtros comunes en una posición coherente.',
              en: 'Put the score and the KPIs first, with the shared filters in a consistent position.',
            },
          },
        ],
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
        decisiones: [
          {
            titulo: {
              es: 'Exploración de sesiones',
              en: 'Exploring sessions',
            },
            necesidad: {
              es: 'Investigar sesiones fallidas y entender el contexto de los problemas.',
              en: 'Investigate failed sessions and understand the context of the problems.',
            },
            decision: {
              es: 'Crear una vista dedicada con problemas, categorías, prioridades y dispositivos.',
              en: 'Create a dedicated view with problems, categories, priorities and devices.',
            },
          },
          {
            titulo: {
              es: 'Interpretación de métricas',
              en: 'Reading the metrics',
            },
            necesidad: {
              es: 'Interpretar correctamente las medidas del panel.',
              en: 'Read the dashboard’s measures correctly.',
            },
            decision: {
              es: 'Revisar etiquetas, colores y explicaciones metodológicas.',
              en: 'Revise labels, colours and methodological explanations.',
            },
          },
        ],
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
    nota: {
      es: 'Las comparaciones muestran la evolución visual de dos vistas. Son capturas de estados y períodos distintos: ayudan a revisar estructura y legibilidad, no a atribuir cambios en las cifras al rediseño.',
      en: 'The comparisons show the visual evolution of two views. They capture different states and periods, so they help review structure and legibility, not attribute changes in figures to the redesign.',
    },
  },

  /* 04 · contexto técnico: el modelo dimensional.

     Aquí había dos cosas más que contaban el mismo recorrido de los
     datos: una lista de cinco pasos (OLTP → ETL → almacén → funciones
     → dashboard) y un diagrama de arquitectura con ese mismo
     recorrido dibujado. Se retiraron las dos; queda el modelo
     dimensional, que es lo único que esta sección enseña y no se
     cuenta en ningún otro sitio del caso. */
  contextoTecnico: {
    numero: {
      es: '04 / contexto técnico',
      en: '04 / technical context',
    },
    titulo: {
      es: 'Cómo llega la información al panel',
      en: 'How information reaches the dashboard',
    },
    parrafo: {
      es: 'La interfaz consume un flujo de datos preparado por el equipo para explorar sesiones de atención. Este contexto explica de dónde vienen las vistas; el foco del caso sigue siendo cómo las organicé para su lectura.',
      en: 'The interface consumes a data flow the team prepared to explore support sessions. This context explains where the views come from; the case focuses on how I organised them for reading.',
    },
    diagramas: [
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

  /* 05 · qué significa cada indicador */
  metricas: {
    numero: {
      es: '05 / métricas',
      en: '05 / metrics',
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

  /* 06 · la galería de pantallas. Salta el 5 a propósito: ese hueco
     era el diagrama del modelo, que ahora vive en Contexto técnico. */
  pantallas: {
    numero: {
      es: '06 / las pantallas',
      en: '06 / the screens',
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
