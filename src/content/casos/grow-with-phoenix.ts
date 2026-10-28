/* ═══════════════════════════════════════════════════════════
   CONTENIDO DEL CASO · GROW WITH PHOENIX
   página: src/pages/casos/grow-with-phoenix.astro

   Esto NO es interfaz: es el texto del proyecto, y por eso vive en
   src/content/ y no en src/i18n/. Cada texto es una cadena (si es igual
   en los dos idiomas) o { es, en }.

   ── EL ORDEN DE LA HISTORIA · SEIS SECCIONES ───────────────
   00 portada        qué es, el prototipo, la ficha y mi parte
   01 problema       por qué no bastaba con saber qué plantar
   02 investigacion  cinco sub-bloques: acceso, ambiente, clima,
                     plantas y las fuentes
   03 propuesta      Discover · Grow · Cook, y la gamificación
   04 pantallas      cinco grupos de dos pantallas
   05 loQueViene     la nueva versión

   Es el mismo layout que el caso de Schaman (barra con índice,
   bloques fijos, apariciones). Los textos son los de siempre: se
   reorganizaron para ese layout, no se reescribieron.

   ── EL RESALTE ─────────────────────────────────────────────
   Los textos con <mark> se dibujan con <Texto html>. Uno por párrafo y
   dos por sección como mucho.

   Los nombres de archivo de las imágenes están en la página, no aquí:
   aquí va lo que se traduce, allí lo que se dibuja.
   ═══════════════════════════════════════════════════════════ */


export const growWithPhoenix = {

  /* el <title>, la <meta description> y el nombre de la ventana (que
     sale en el pie). Van aquí y no en los diccionarios: son del
     proyecto, no de la interfaz. */
  documento: {
    nombreDeVentana: 'grow_with_phoenix.md',
    titulo: 'pau.proyectos · Grow With Phoenix',
    descripcion: {
      es: 'Grow With Phoenix: conectar el cultivo doméstico con la alimentación cotidiana en el clima extremo de Phoenix. SpaceHack for Sustainability 2025.',
      en: 'Grow With Phoenix: connecting home growing with everyday food in the extreme climate of Phoenix. SpaceHack for Sustainability 2025.',
    },
  },

  /* ══ EL ÍNDICE · una parada por sección ══ */
  indice: [
    { nombre: { es: 'Portada', en: 'Cover' }, papel: { es: 'Presentación', en: 'Introduction' } },
    { nombre: { es: 'El problema', en: 'The problem' }, papel: { es: 'Punto de partida', en: 'Starting point' } },
    { nombre: { es: 'La investigación', en: 'The research' }, papel: { es: 'Lo que miramos', en: 'What we looked at' } },
    { nombre: { es: 'Del entorno al plato', en: 'From the land to the plate' }, papel: { es: 'La propuesta', en: 'The proposal' } },
    { nombre: { es: 'Las pantallas', en: 'The screens' }, papel: { es: 'El prototipo', en: 'The prototype' } },
    { nombre: { es: 'Lo que viene', en: 'What comes next' }, papel: { es: 'Próximos pasos', en: 'Next steps' } },
  ],

  /* ══ 00 · PORTADA ══ */
  portada: {
    antetitulo: {
      es: 'SpaceHack for Sustainability 2025 - Universidad de Arizona',
      en: 'SpaceHack for Sustainability 2025 - University of Arizona',
    },
    subtitulo: {
      es: 'Una propuesta para conectar el cultivo doméstico con la alimentación cotidiana en el clima extremo de Phoenix.',
      en: 'A proposal connecting home growing with everyday food in the extreme climate of Phoenix.',
    },
    introduccion: {
      es: 'La idea nació en SpaceHack for Sustainability 2025, a partir de una pregunta: ¿cómo ayudar a las personas de Phoenix a <mark>descubrir qué pueden cultivar en casa y qué preparar con lo que cosechen</mark>? Para responderla exploré datos ambientales y el acceso a supermercados, y empecé a convertir esa investigación en una propuesta de producto.',
      en: 'The idea began at SpaceHack for Sustainability 2025, from a question: how do we help people in Phoenix <mark>discover what they can grow at home and what to make with what they harvest</mark>? To answer it I explored environmental data and access to grocery stores, and started turning that research into a product proposal.',
    },
    /* el saludo de la mascota de la barra, el mismo en todos los casos */
    saludo: {
      es: 'Entraste en modo minimalista para leer mejor el caso.',
      en: 'You’re in minimalist mode, to read the case more easily.',
    },
    /* LA ÚNICA VENTANA DE LA PÁGINA */
    ventana: {
      nombre: 'grow_with_phoenix · prototipo',
      pie: {
        es: 'Vista general del prototipo presentado en 2025.',
        en: 'Overview of the prototype presented in 2025.',
      },
      alt: {
        es: 'Cuatro pantallas del prototipo: pantalla de bloqueo con una notificación, pantalla de inicio con un widget, un recorrido de niveles y una pantalla de recompensas.',
        en: 'Four screens from the prototype: a lock screen with a notification, a home screen with a widget, a path of levels, and a rewards screen.',
      },
    },
    /* LA FICHA, al lado de la ventana: cuatro rótulos cortos */
    ficha: [
      { rotulo: { es: 'Reconocimiento', en: 'Recognition' }, valor: { es: 'Primer lugar entre más de 80 equipos internacionales', en: 'First place among more than 80 international teams' } },
      { rotulo: { es: 'Mi rol', en: 'My role' }, valor: { es: 'Concepto, investigación con datos satelitales y primeras pantallas', en: 'Concept, satellite-data research and the first screens' } },
      { rotulo: { es: 'Herramientas', en: 'Tools' }, valor: { es: 'Google Earth Engine · Colab y Python · Figma', en: 'Google Earth Engine · Colab and Python · Figma' } },
      { rotulo: { es: 'Estado', en: 'Status' }, valor: { es: 'Prototipo de 2025 · nueva versión en desarrollo', en: '2025 prototype · new version in development' } },
    ],
    /* MI PARTE, en tres columnas: qué hice y con qué */
    miRol: [
      {
        rotulo: { es: 'El concepto', en: 'The concept' },
        texto: {
          es: 'Propuse el concepto de conectar las condiciones ambientales de Phoenix con el cultivo doméstico y el aprovechamiento de alimentos.',
          en: 'I proposed the concept of connecting the environmental conditions of Phoenix with home growing and making use of the food grown.',
        },
      },
      {
        rotulo: { es: 'La investigación', en: 'The research' },
        texto: {
          es: 'Seleccioné conjuntos de datos satelitales en Google Earth Engine y redacté la investigación ambiental y socioeconómica que fundamentó la propuesta.',
          en: 'I selected satellite datasets in Google Earth Engine and wrote the environmental and socioeconomic research the proposal was built on.',
        },
      },
      {
        rotulo: { es: 'El prototipo', en: 'The prototype' },
        texto: {
          es: 'Inicié el prototipado en Figma y diseñé las primeras pantallas de inicio, dashboard, recetas, notificación en pantalla de bloqueo y widget.',
          en: 'I started the prototype in Figma and designed the first home, dashboard, recipe, lock-screen notification and widget screens.',
        },
      },
    ],
    equipo: {
      es: '<b>Proyecto realizado en equipo:</b> las demás pantallas y otras partes de la propuesta fueron desarrolladas por mis compañeros. La composición exacta y el reparto de tareas están pendientes de documentar.',
      en: '<b>A team project:</b> the other screens and other parts of the proposal were built by my teammates. The exact line-up and the split of tasks are still to be documented.',
    },
  },

  /* ══ 01 · EL PROBLEMA ══ */
  problema: {
    antetitulo: { es: '01 / El problema', en: '01 / The problem' },
    titulo: {
      es: 'No bastaba con saber qué plantar',
      en: 'Knowing what to plant was not enough',
    },
    parrafos: [
      {
        es: 'Phoenix tiene un clima exigente para el cultivo doméstico: elegir qué plantar implica tener en cuenta las condiciones del entorno. Al mismo tiempo, el proyecto partió de la preocupación por la inseguridad alimentaria y los desiertos alimentarios de la zona.',
        en: 'Phoenix has a demanding climate for home growing: choosing what to plant means taking the conditions of the place into account. At the same time, the project started from a concern about food insecurity and the food deserts of the area.',
      },
      {
        es: 'Quise explorar cómo conectar esas dos dimensiones. La propuesta no debía quedarse en identificar plantas que pudieran crecer bajo determinadas condiciones, sino <mark>ayudar a las personas a cuidarlas y encontrar formas de aprovechar lo cosechado en sus comidas</mark>.',
        en: 'I wanted to explore how to connect those two dimensions. The proposal should not stop at identifying plants that could grow under certain conditions, but <mark>help people care for them and find ways to use the harvest in their meals</mark>.',
      },
    ],
    pregunta: {
      rotulo: { es: 'La pregunta que orientó el proyecto', en: 'The question that guided the project' },
      texto: {
        es: '¿Cómo podríamos ayudar a las personas de Phoenix a descubrir qué cultivar en casa, acompañar el crecimiento de sus plantas y aprovechar la cosecha para preparar alimentos?',
        en: 'How might we help people in Phoenix discover what to grow at home, support their plants as they grow, and use the harvest to prepare food?',
      },
    },
  },

  /* ══ 02 · LA INVESTIGACIÓN · cinco sub-bloques ══
     `corto` es el nombre de cada uno en el sub-índice de la barra. Los
     gráficos de cada sub-bloque van FIJOS: la columna se queda quieta y
     cada llamada trae su gráfico. */
  investigacion: {
    antetitulo: { es: '02 / La investigación', en: '02 / The research' },
    titulo: {
      es: 'Primero, entender el entorno',
      en: 'First, understand the place',
    },
    entrada: {
      es: 'Empecé por explorar el territorio de Phoenix desde dos perspectivas: <mark>el acceso a tiendas de alimentos y las condiciones ambientales</mark> que podían influir en el cultivo doméstico. Seleccioné conjuntos de datos satelitales en Google Earth Engine y preparé visualizaciones para estudiar esas variables.',
      en: 'I started by exploring the territory of Phoenix from two angles: <mark>access to food stores, and the environmental conditions</mark> that could affect home growing. I selected satellite datasets in Google Earth Engine and prepared visualisations to study those variables.',
    },
    acceso: {
      corto: { es: 'Acceso a alimentos', en: 'Food access' },
      titulo: {
        es: 'Acceso a alimentos y posibles desiertos alimentarios',
        en: 'Food access and possible food deserts',
      },
      parrafo: {
        es: 'Una parte central de la investigación fue explorar dónde se encontraban las tiendas de alimentos y cómo se relacionaban con las zonas socioeconómicas de Phoenix. Los mapas buscaban ayudarme a estudiar posibles desiertos alimentarios y comprender el contexto en el que tendría sentido plantear alternativas de cultivo doméstico.',
        en: 'A central part of the research was exploring where food stores were and how they related to the socioeconomic areas of Phoenix. The maps were meant to help me study possible food deserts and understand the context in which home-growing alternatives would make sense.',
      },
      mapas: [
        {
          titulo: { es: 'Posibles desiertos alimentarios', en: 'Possible food deserts' },
          pie: {
            es: 'Mapa exploratorio que relaciona zonas con acceso limitado a alimentos y ubicaciones de tiendas. Las capas originales identifican estas zonas como posibles desiertos alimentarios.',
            en: 'Exploratory map relating areas with limited food access to store locations. The original layers identify these areas as possible food deserts.',
          },
          alt: {
            es: 'Mapa de Phoenix con un círculo rojo que marca posibles desiertos alimentarios y una leyenda con seis capas.',
            en: 'Map of Phoenix with a red circle marking possible food deserts and a six-layer legend.',
          },
        },
        {
          titulo: { es: 'Zonas de bajos ingresos', en: 'Low-income areas' },
          pie: {
            es: 'Capa socioeconómica utilizada en la exploración espacial original para estudiar su relación con el acceso a tiendas de alimentos.',
            en: 'Socioeconomic layer used in the original spatial exploration to study its relationship with access to food stores.',
          },
          alt: {
            es: 'El mismo mapa de Phoenix con marcas amarillas sobre las zonas de bajos ingresos.',
            en: 'The same map of Phoenix with yellow marks over the low-income areas.',
          },
        },
      ],
      nota: { es: 'Exploración espacial de 2025.', en: '2025 spatial exploration.' },
    },
    ambiente: {
      corto: { es: 'El ambiente', en: 'The environment' },
      titulo: {
        es: 'Condiciones ambientales: vegetación, temperatura y evapotranspiración',
        en: 'Environmental conditions: vegetation, temperature and evapotranspiration',
      },
      parrafo: {
        es: 'También exploré las condiciones ambientales que podían influir en el cultivo. Los mapas de vegetación, temperatura superficial y evapotranspiración me permitían observar distintas variables del entorno, más allá de la cercanía a supermercados.',
        en: 'I also explored the environmental conditions that could affect growing. The vegetation, land surface temperature and evapotranspiration maps let me look at different variables of the place, beyond proximity to a grocery store.',
      },
      mapas: [
        {
          titulo: { es: 'Panel de análisis agrícola', en: 'Agricultural analysis panel' },
          pie: {
            es: 'Vista de Google Earth Engine con las cuatro capas cargadas: evapotranspiración (mm), temperatura superficial (°C), precipitación anual (mm) e índice de vegetación. El panel indica «NDVI Promedio: 0.119».',
            en: 'A Google Earth Engine view with four layers loaded: evapotranspiration (mm), land surface temperature (°C), annual precipitation (mm) and vegetation index. The panel reads “NDVI Promedio: 0.119”.',
          },
          alt: {
            es: 'Mapa de Google Earth Engine sobre Phoenix con cuatro leyendas y un panel de análisis agrícola.',
            en: 'Google Earth Engine map over Phoenix with four legends and an agricultural analysis panel.',
          },
        },
        {
          titulo: { es: 'Vegetación (NDVI)', en: 'Vegetation (NDVI)' },
          pie: {
            es: 'Mapa del índice de vegetación utilizado para explorar su distribución espacial alrededor de Phoenix. En la presentación, las zonas verdes señalan los niveles de vegetación.',
            en: 'Vegetation index map used to explore its spatial distribution around Phoenix. In the deck, the green areas mark vegetation levels.',
          },
          alt: {
            es: 'Detalle del mapa con el área de estudio en rojo y puntos verdes dispersos.',
            en: 'Detail of the map with the study area in red and scattered green points.',
          },
        },
        {
          titulo: { es: 'Evapotranspiración', en: 'Evapotranspiration' },
          pie: {
            es: 'Mapa de la distribución espacial de la evapotranspiración, una de las variables ambientales exploradas. En la presentación, el amarillo claro indica que no hay evapotranspiración.',
            en: 'Map of the spatial distribution of evapotranspiration, one of the environmental variables explored. In the deck, light yellow means there is no evapotranspiration.',
          },
          alt: {
            es: 'Detalle del mapa con el área de estudio en tonos amarillos y naranjas.',
            en: 'Detail of the map with the study area in yellow and orange tones.',
          },
        },
      ],
      nota: {
        es: 'Podemos observar que, a pesar de haber poca vegetación, es una zona de alta evapotranspiración, lo cual da paso al cultivo.',
        en: 'We can see that, despite there being little vegetation, this is an area of high evapotranspiration, which makes growing possible.',
      },
    },
    clima: {
      corto: { es: 'Lluvia y temperatura', en: 'Rain and temperature' },
      titulo: {
        es: 'Lluvia y temperatura a lo largo del tiempo',
        en: 'Rain and temperature over time',
      },
      parrafo: {
        es: 'Para entender mejor las condiciones climáticas, también analicé series temporales de precipitación y temperatura. Los gráficos originales comparaban los cambios por año, por mes y entre estaciones. Todos cubren el periodo 2020-2024.',
        en: 'To understand the climate better I also looked at time series of precipitation and temperature. The original charts compared changes by year, by month and between seasons. All of them cover 2020-2024.',
      },
      graficos: [
        {
          titulo: { es: 'Precipitación total anual', en: 'Total annual precipitation' },
          pie: {
            es: '«Total Annual Precipitation in Phoenix (2020-2024)», en pulgadas. 2021 es el año más lluvioso de la serie y desde ahí la precipitación baja cada año hasta el mínimo en 2024; 2020, el primer año, queda por debajo de 2021.',
            en: '“Total Annual Precipitation in Phoenix (2020-2024)”, in inches. 2021 is the wettest year of the series, and from there precipitation falls every year to its low in 2024; 2020, the first year, sits below 2021.',
          },
          alt: {
            es: 'Gráfico de barras de la precipitación total anual en Phoenix entre 2020 y 2024, en pulgadas.',
            en: 'Bar chart of total annual precipitation in Phoenix between 2020 and 2024, in inches.',
          },
        },
        {
          titulo: { es: 'Meses por categoría de lluvia', en: 'Months by rain category' },
          pie: {
            es: '«Distribution of Precipitation Categories by Year (2020-2024)». El eje vertical cuenta meses. En 2024 la categoría «No rain» suma 7 meses, el valor más alto de todo el gráfico.',
            en: '“Distribution of Precipitation Categories by Year (2020-2024)”. The vertical axis counts months. In 2024 the “No rain” category adds up to 7 months, the highest value in the whole chart.',
          },
          alt: {
            es: 'Gráfico de barras que cuenta cuántos meses de cada año caen en cada categoría de lluvia.',
            en: 'Bar chart counting how many months of each year fall into each rain category.',
          },
        },
        {
          titulo: { es: 'Precipitación mensual por año', en: 'Monthly precipitation by year' },
          pie: {
            es: '«Monthly Precipitation in Phoenix (2020-2024)», en pulgadas, de enero a diciembre, con una barra por año.',
            en: '“Monthly Precipitation in Phoenix (2020-2024)”, in inches, from January to December, one bar per year.',
          },
          alt: {
            es: 'Gráfico de barras agrupadas de la precipitación mensual entre 2020 y 2024.',
            en: 'Grouped bar chart of monthly precipitation between 2020 and 2024.',
          },
        },
        {
          titulo: { es: 'Temperaturas máximas por mes', en: 'Monthly maximum temperatures' },
          pie: {
            es: '«Monthly Maximum Temperatures in Phoenix (2020-2024)», en grados Fahrenheit, con una barra por año.',
            en: '“Monthly Maximum Temperatures in Phoenix (2020-2024)”, in degrees Fahrenheit, one bar per year.',
          },
          alt: {
            es: 'Gráfico de barras agrupadas de las temperaturas máximas mensuales entre 2020 y 2024.',
            en: 'Grouped bar chart of monthly maximum temperatures between 2020 and 2024.',
          },
        },
        {
          titulo: { es: 'Invierno frente a verano', en: 'Winter against summer' },
          pie: {
            es: '«Average Seasonal Maximum Temperatures in Phoenix (2020-2024)», en grados Fahrenheit. Invierno: diciembre, enero y febrero. Verano: junio, julio y agosto.',
            en: '“Average Seasonal Maximum Temperatures in Phoenix (2020-2024)”, in degrees Fahrenheit. Winter: December, January, February. Summer: June, July, August.',
          },
          alt: {
            es: 'Gráfico de dos barras que compara la temperatura máxima media de invierno y de verano.',
            en: 'Two-bar chart comparing average maximum temperature in winter and in summer.',
          },
        },
      ],
      /* la ficha del último gráfico, el de invierno y verano */
      fichaDeVariable: [
        { rotulo: 'Variable', valor: { es: 'Temperatura máxima media por estación.', en: 'Average maximum temperature by season.' } },
        { rotulo: { es: 'Qué exploraba', en: 'What it explored' }, valor: { es: 'El contraste térmico entre el invierno y el verano de Phoenix.', en: 'The thermal contrast between winter and summer in Phoenix.' } },
        { rotulo: { es: 'Lectura preliminar', en: 'Preliminary reading' }, valor: { es: 'El verano ronda los 116 °F y el invierno los 82 °F: tampoco el invierno es frío.', en: 'Summer sits around 116 °F and winter around 82 °F: winter is not cold either.' } },
        { rotulo: { es: 'Estado', en: 'Status' }, valor: { es: 'Pendiente de reproducir los cálculos.', en: 'Calculations still to be reproduced.' } },
      ],
      nota: { es: 'Lecturas de los gráficos originales de 2024.', en: 'Readings of the original 2024 charts.' },
    },
    plantas: {
      corto: { es: 'Las plantas', en: 'The plants' },
      titulo: {
        es: 'De las condiciones ambientales a las plantas',
        en: 'From environmental conditions to plants',
      },
      parrafo: {
        es: 'Conocer el entorno era solo el primer paso. Después necesitaba investigar qué plantas y frutos podían crecer bajo esas condiciones. Para ello consulté literatura científica sobre especies capaces de desarrollarse en entornos exigentes.',
        en: 'Knowing the place was only the first step. Next I needed to research which plants and fruits could grow under those conditions, so I looked into scientific literature on species able to develop in demanding environments.',
      },
      aviso: {
        rotulo: { es: 'Pendiente de recuperar', en: 'Still to be recovered' },
        texto: {
          es: 'Las referencias bibliográficas y las especies concretas están pendientes de recuperar. Hasta tenerlas, el caso no atribuye ninguna conclusión a esa revisión.',
          en: 'The bibliographic references and the specific species are still to be recovered. Until I have them, this case study attributes no conclusion to that review.',
        },
      },
    },
    fuentes: {
      corto: { es: 'Las fuentes', en: 'The sources' },
      titulo: {
        es: 'Las fuentes que documenta la presentación',
        en: 'The sources the deck documents',
      },
      parrafo: {
        es: 'Las páginas finales de la presentación listan las colecciones usadas. Son las mismas que aparecen en los dos archivos de Google Earth Engine que conservo.',
        en: 'The closing pages of the deck list the collections used. They are the same ones that appear in the two Google Earth Engine files I still have.',
      },
    },
  },

  /* ══ 03 · DEL ENTORNO AL PLATO ══ */
  propuesta: {
    antetitulo: { es: '03 / Del entorno al plato', en: '03 / From the land to the plate' },
    titulo: {
      es: 'Del entorno al plato',
      en: 'From the land to the plate',
    },
    parrafo: {
      es: 'La investigación fue el punto de partida de una propuesta que conectaba <mark>tres momentos: Discover, Grow y Cook</mark>.',
      en: 'The research was the starting point of a proposal that connected <mark>three moments: Discover, Grow and Cook</mark>.',
    },
    momentos: [
      {
        rotulo: 'Discover',
        texto: {
          es: 'Ayudar a las personas a explorar qué plantas podían cultivar según su entorno.',
          en: 'Help people explore which plants they could grow given their surroundings.',
        },
      },
      {
        rotulo: 'Grow',
        texto: {
          es: 'Acompañar el cuidado de esas plantas con información sobre su estado y avisos relacionados con las condiciones del clima.',
          en: 'Support the care of those plants with information on their state and alerts tied to weather conditions.',
        },
      },
      {
        rotulo: 'Cook',
        texto: {
          es: 'Conectar el cultivo con recetas para aprovechar lo cosechado.',
          en: 'Connect growing with recipes that make use of the harvest.',
        },
      },
    ],
    gamificacion: {
      titulo: {
        es: 'Gamificación y motivación',
        en: 'Gamification and motivation',
      },
      parrafo: {
        es: 'Para incentivar la continuidad, una compañera del equipo propuso incorporar un componente social y de gamificación: ganar puntos al cultivar plantas y preparar comidas con lo cosechado, y usar esos puntos para desbloquear accesorios para la mascota de la aplicación.',
        en: 'To encourage people to keep going, a teammate proposed adding a social and gamification component: earning points by growing plants and cooking with the harvest, and spending those points on accessories for the app mascot.',
      },
    },
    nota: {
      es: 'Los tres momentos y la gamificación corresponden al concepto y al prototipo del proyecto. No son funcionalidades implementadas ni validadas.',
      en: 'The three moments and the gamification belong to the concept and the prototype of the project. They are not implemented or validated features.',
    },
  },

  /* ══ 04 · LAS PANTALLAS · cinco grupos, fijos ══
     La columna izquierda se queda quieta con las dos pantallas del grupo
     y a la derecha avanzan el título y los dos párrafos de cada uno. */
  pantallas: {
    antetitulo: { es: '04 / Las pantallas', en: '04 / The screens' },
    titulo: {
      es: 'La propuesta, pantalla por pantalla',
      en: 'The proposal, screen by screen',
    },
    parrafos: [
      {
        es: 'El prototipo exploraba cómo acompañar el recorrido <mark>desde elegir qué cultivar hasta cuidar las plantas y aprovechar lo cosechado</mark>. Las pantallas muestran distintas partes de esa experiencia, además de otras funcionalidades que el equipo exploró durante el desarrollo de la propuesta.',
        en: 'The prototype explored how to support the journey <mark>from choosing what to grow through caring for the plants and making use of the harvest</mark>. The screens show different parts of that experience, along with other features the team explored while developing the proposal.',
      },
      {
        es: 'A continuación les presento <strong>GrowWithPhoenix</strong>.',
        en: 'Now I will show you <strong>GrowWithPhoenix</strong>.',
      },
    ],
    grupos: [
      {
        titulo: { es: 'Al abrir la aplicación', en: 'Opening the app' },
        parrafos: [
          {
            es: 'La pantalla de carga da paso al inicio, donde la aplicación saluda a la persona, sitúa el lugar —Phoenix, Arizona— y muestra el estado del tiempo. Debajo, sus plantas aparecen como tarjetas con su propio estado, y una franja de avisos recuerda tareas pendientes como regar.',
            en: 'The loading screen gives way to the home screen, where the app greets the person, places them in Phoenix, Arizona, and shows the weather. Below that, their plants appear as cards with their own status, and a strip of notices recalls pending tasks such as watering.',
          },
          {
            es: 'La pantalla principal reúne en un sitio la información del entorno y el estado del huerto; la de carga solo la antecede.',
            en: 'The home screen gathers information about the place and the state of the garden in one view; the loading screen only precedes it.',
          },
        ],
        pantallas: [
          {
            pie: { es: 'Pantalla de carga', en: 'Loading screen' },
            alt: { es: 'Pantalla de carga con el personaje de la planta y la palabra Loading.', en: 'Loading screen with the plant character and the word Loading.' },
          },
          {
            pie: { es: 'Inicio de la aplicación', en: 'App home' },
            alt: { es: 'Pantalla de inicio con el saludo, el clima de Phoenix y tarjetas de plantas.', en: 'Home screen with a greeting, the Phoenix weather and plant cards.' },
          },
        ],
      },
      {
        titulo: { es: 'Del estado de la planta al plato', en: 'From the plant to the plate' },
        parrafos: [
          {
            es: 'La ficha de una planta muestra su ciclo de vida, su salud y la humedad, junto a métricas de cultivo como los días que faltan para la cosecha. La pantalla de receta presenta un plato con sus calorías, sus ingredientes y su descripción.',
            en: 'A plant page shows its life cycle, its health and humidity, alongside growing metrics such as the days left until harvest. The recipe screen presents a dish with its calories, ingredients and description.',
          },
          {
            es: 'Son las dos puntas de la idea del proyecto: cuidar lo que crece y aprovecharlo en la cocina.',
            en: 'They are the two ends of the project idea: caring for what grows and using it in the kitchen.',
          },
        ],
        pantallas: [
          {
            pie: { es: 'Estadísticas de la planta', en: 'Plant statistics' },
            alt: { es: 'Pantalla de una planta de tomate con anillos de estadísticas y métricas de cultivo.', en: 'Screen for a tomato plant with statistic rings and growing metrics.' },
          },
          {
            pie: { es: 'Receta', en: 'Recipe' },
            alt: { es: 'Pantalla de una receta de ensalada de pollo con ingredientes y descripción.', en: 'Screen for a chicken salad recipe with ingredients and a description.' },
          },
        ],
      },
      {
        titulo: { es: 'Escanear y registrar un producto', en: 'Scanning and logging a product' },
        parrafos: [
          {
            es: 'El menú de escaneo ofrece un área de cámara y, debajo, una lista de productos ya registrados con un comentario para cada uno: niveles de aceite, señales de contaminación o residuos del envase, con sugerencias de alternativas cercanas. La otra pantalla muestra la cámara apuntando a un envase real con las guías de escaneo.',
            en: 'The scanning menu offers a camera area and, below it, a list of already-registered products with a comment on each: oil levels, signs of contamination or packaging waste, with suggestions of nearby alternatives. The other screen shows the camera pointed at a real package with the scanning guides.',
          },
          {
            es: 'Es una funcionalidad adicional que el equipo exploró. Describo el flujo que se observa: apuntar, registrar y recibir una valoración.',
            en: 'It is an additional feature the team explored. I describe the flow that is visible: point, register, get an assessment.',
          },
        ],
        pantallas: [
          {
            pie: { es: 'Menú de escaneo y registro', en: 'Scanning menu and log' },
            alt: { es: 'Pantalla con un área para escanear productos y una lista de productos registrados con recomendaciones.', en: 'Screen with an area to scan products and a list of registered products with recommendations.' },
          },
          {
            pie: { es: 'Cámara escaneando', en: 'Camera scanning' },
            alt: { es: 'Pantalla de cámara apuntando a un envase de alimento con guías de escaneo.', en: 'Camera screen pointed at a food package with scanning guides.' },
          },
        ],
      },
      {
        titulo: { es: 'El progreso, puntuado', en: 'Progress, scored' },
        parrafos: [
          {
            es: 'Una clasificación con pestañas semanal y de todos los tiempos ordena a las personas por puntos. El perfil resume las tareas completadas y las que quedan en la semana, con una valoración del desempeño.',
            en: 'A leaderboard with weekly and all-time tabs ranks people by points. The profile sums up the tasks completed and the ones left for the week, with a rating of performance.',
          },
          {
            es: 'Ahí se ve el componente de gamificación dentro del prototipo: puntos, clasificación y seguimiento de tareas.',
            en: 'That is where the gamification shows up inside the prototype: points, ranking and task tracking.',
          },
        ],
        pantallas: [
          {
            pie: { es: 'Clasificación', en: 'Leaderboard' },
            alt: { es: 'Pantalla de clasificación con un gráfico de barras y una lista de posiciones con puntos.', en: 'Leaderboard screen with a bar chart and a ranked list with points.' },
          },
          {
            pie: { es: 'Perfil y progreso', en: 'Profile and progress' },
            alt: { es: 'Pantalla de perfil con tareas completadas, tareas pendientes y una valoración.', en: 'Profile screen with completed tasks, remaining tasks and a rating.' },
          },
        ],
      },
      {
        titulo: { es: 'Notificaciones y widget', en: 'Notifications and widget' },
        parrafos: [
          {
            es: 'Una notificación en la pantalla de bloqueo avisa de que las condiciones son buenas para regar la planta, y un widget en la pantalla de inicio del teléfono muestra el personaje junto al estado del tiempo.',
            en: 'A lock-screen notification says conditions are good for watering the plant, and a home-screen widget shows the character alongside the weather.',
          },
          {
            es: 'La propuesta buscaba presentar información contextual sobre el clima y el cuidado de las plantas sin exigir que la persona abriera la aplicación.',
            en: 'The proposal set out to surface contextual information about the weather and plant care without requiring the person to open the app.',
          },
        ],
        pantallas: [
          {
            pie: { es: 'Notificación en bloqueo', en: 'Lock-screen notification' },
            alt: { es: 'Pantalla de bloqueo de un iPhone con una notificación sobre regar la planta.', en: 'iPhone lock screen with a notification about watering the plant.' },
          },
          {
            pie: { es: 'Widget en el inicio', en: 'Home-screen widget' },
            alt: { es: 'Pantalla de inicio de un iPhone con un widget de la planta y datos del clima.', en: 'iPhone home screen with a plant widget and weather data.' },
          },
        ],
      },
    ],
  },

  /* ══ 05 · LO QUE VIENE ══ */
  loQueViene: {
    antetitulo: { es: '05 / Lo que viene', en: '05 / What comes next' },
    titulo: {
      es: 'Phoenix sigue creciendo',
      en: 'Phoenix keeps growing',
    },
    parrafos: [
      {
        es: 'Estoy revisando la investigación original y replanteando la experiencia para desarrollar una nueva versión del proyecto, <mark>con una mirada más crítica sobre los datos, las decisiones de diseño y las necesidades</mark> que buscábamos atender.',
        en: 'I am reviewing the original research and rethinking the experience to build a new version of the project, <mark>with a more critical eye on the data, the design decisions, and the needs</mark> we set out to address.',
      },
      {
        es: 'Esta página cuenta el proyecto de 2025 con lo que puedo respaldar hoy. Cuando la nueva versión tenga algo que mostrar, vivirá aquí también.',
        en: 'This page tells the 2025 project with what I can support today. When the new version has something to show, it will live here too.',
      },
    ],
  },

  /* el cierre de siempre: volver, el proyecto y los otros proyectos */
  cierre: {
    volver: { es: '← volver a proyectos', en: '← back to projects' },
    verProyecto: { es: 'ver el proyecto ↗', en: 'view the project ↗' },
    otrosProyectos: { es: '// otros proyectos', en: '// other projects' },
  },
} as const;
