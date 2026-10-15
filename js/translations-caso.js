/* ═══════════════════════════════════════════════════════════
   Textos de las páginas de caso · se FUSIONAN en TRANSLATIONS
   Va DESPUÉS de translations.js y ANTES de i18n.js.
   Solo lo cargan las páginas de pages/caso/.

   Los pies de las figuras citan la leyenda ORIGINAL de la
   presentación de 2025 entre comillas. Cuando el texto hace una
   lectura del gráfico, es una lectura del gráfico, no del dato
   que hay detrás: los cálculos no se han reproducido todavía.
   ═══════════════════════════════════════════════════════════ */
(function () {
  'use strict';
  var T = window.TRANSLATIONS = window.TRANSLATIONS || {};
  T.es = T.es || {}; T.en = T.en || {};

  T.es.phx = {
    'doc.title': 'pau.proyectos · Grow With Phoenix',
    'doc.desc': 'Grow With Phoenix: conectar el cultivo doméstico con la alimentación cotidiana en el clima extremo de Phoenix. SpaceHack for Sustainability 2025.',

    kicker: 'SpaceHack for Sustainability 2025 · Universidad de Arizona',
    sub: 'Una propuesta para conectar el cultivo doméstico con la alimentación cotidiana en el clima extremo de Phoenix.',
    intro: 'La idea nació en SpaceHack for Sustainability 2025, a partir de una pregunta: ¿cómo ayudar a las personas de Phoenix a descubrir qué pueden cultivar en casa y qué preparar con lo que cosechen? Para responderla exploré datos ambientales y el acceso a supermercados, y empecé a convertir esa investigación en una propuesta de producto.',
    wip: 'Rediseño en curso · 2026',
    'hero.cap': 'Vista general del prototipo presentado en 2025.',
    'hero.alt': 'Cuatro pantallas del prototipo: pantalla de bloqueo con una notificación, pantalla de inicio con un widget, un recorrido de niveles y una pantalla de recompensas.',

    'f.rol': 'Mi rol',
    'f.rol.1': 'Propuse el concepto de conectar las condiciones ambientales de Phoenix con el cultivo doméstico y el aprovechamiento de alimentos.',
    'f.rol.2': 'Seleccioné conjuntos de datos satelitales en Google Earth Engine y redacté la investigación ambiental y socioeconómica que fundamentó la propuesta.',
    'f.rol.3': 'Inicié el prototipado en Figma y diseñé las primeras pantallas de inicio, dashboard, recetas, notificación en pantalla de bloqueo y widget.',

    'f.too': 'Herramientas',
    'f.too.1': '<b>Google Earth Engine</b> — exploración de datos satelitales y análisis geoespacial.',
    'f.too.2': '<b>Google Colab y Python</b> — análisis de datos y elaboración de gráficos.',
    'f.too.3': '<b>Figma</b> — concepto visual y prototipado inicial.',

    'f.ctx': 'Contexto',
    'f.ctx.v': 'SpaceHack for Sustainability 2025, organizado por la Universidad de Arizona.',
    'f.win': 'Reconocimiento',
    'f.win.v': 'Primer lugar entre más de 80 equipos internacionales.',
    'f.equ': 'Equipo',
    'f.equ.v': 'Proyecto realizado en equipo: las demás pantallas y otras partes de la propuesta fueron desarrolladas por mis compañeros. La composición exacta y el reparto de tareas están pendientes de documentar.',
    'f.est': 'Estado',
    'f.est.v': 'Prototipo presentado en 2025; investigación en revisión y nueva versión en desarrollo.',

    'r.hero': 'Portada', 'r.1': 'El problema', 'r.2': 'La investigación',
    'r.3': 'Del entorno al plato', 'r.4': 'Las pantallas', 'r.5': 'Lo que viene',
    'r.out': 'ver el proyecto ↗',

    's1.num': '01 / el problema',
    's1.h': 'No bastaba con saber qué plantar',
    's1.p1': 'Phoenix tiene un clima exigente para el cultivo doméstico: elegir qué plantar implica tener en cuenta las condiciones del entorno. Al mismo tiempo, el proyecto partió de la preocupación por la inseguridad alimentaria y los desiertos alimentarios de la zona.',
    's1.p2': 'Quise explorar cómo conectar esas dos dimensiones. La propuesta no debía quedarse en identificar plantas que pudieran crecer bajo determinadas condiciones, sino ayudar a las personas a cuidarlas y encontrar formas de aprovechar lo cosechado en sus comidas.',
    's1.lead': '¿Cómo podríamos ayudar a las personas de Phoenix a descubrir qué cultivar en casa, acompañar el crecimiento de sus plantas y aprovechar la cosecha para preparar alimentos?',
    's1.nota': 'Es la pregunta que orientó el concepto original del proyecto. <b>No surge de entrevistas ni de investigación con personas usuarias</b>: en los materiales que conservo no hay ninguna.',

    's2.num': '02 / lo que miramos',
    's2.h': 'Primero, entender el entorno',
    's2.p1': 'Empecé por explorar el territorio de Phoenix desde dos perspectivas: el acceso a tiendas de alimentos y las condiciones ambientales que podían influir en el cultivo doméstico. Seleccioné conjuntos de datos satelitales en Google Earth Engine y preparé visualizaciones para estudiar esas variables.',

    's2.a.h': 'Acceso a alimentos y posibles desiertos alimentarios',
    's2.a.p': 'Una parte central de la investigación fue explorar dónde se encontraban las tiendas de alimentos y cómo se relacionaban con las zonas socioeconómicas de Phoenix. Los mapas buscaban ayudarme a estudiar posibles desiertos alimentarios y comprender el contexto en el que tendría sentido plantear alternativas de cultivo doméstico.',
    's2.a.f1': 'Posibles desiertos alimentarios',
    's2.a.f1.p': 'Mapa exploratorio que relaciona zonas con acceso limitado a alimentos y ubicaciones de tiendas. Las capas originales identifican estas zonas como posibles desiertos alimentarios.',
    's2.a.f1.alt': 'Mapa de Phoenix con un círculo rojo que marca posibles desiertos alimentarios y una leyenda con seis capas.',
    's2.a.f2': 'Zonas de bajos ingresos',
    's2.a.f2.p': 'Capa socioeconómica utilizada en la exploración espacial original para estudiar su relación con el acceso a tiendas de alimentos.',
    's2.a.f2.alt': 'El mismo mapa de Phoenix con marcas amarillas sobre las zonas de bajos ingresos.',
    's2.a.nota': 'Exploración espacial de 2025. <b>Las ubicaciones de tiendas y las zonas socioeconómicas requieren validación</b>; los scripts conservados utilizan aproximaciones y áreas simuladas.',

    's2.b.h': 'Condiciones ambientales: vegetación, temperatura y evapotranspiración',
    's2.b.p': 'También exploré las condiciones ambientales que podían influir en el cultivo. Los mapas de vegetación, temperatura superficial y evapotranspiración me permitían observar distintas variables del entorno, más allá de la cercanía a supermercados.',
    's2.b.f1': 'Panel de análisis agrícola',
    's2.b.f1.p': 'Vista de Google Earth Engine con las cuatro capas cargadas: evapotranspiración (mm), temperatura superficial (°C), precipitación anual (mm) e índice de vegetación. El panel indica «NDVI Promedio: 0.119».',
    's2.b.f1.alt': 'Mapa de Google Earth Engine sobre Phoenix con cuatro leyendas y un panel de análisis agrícola.',
    's2.b.f2': 'Vegetación (NDVI)',
    's2.b.f2.p': 'Mapa del índice de vegetación utilizado para explorar su distribución espacial alrededor de Phoenix. En la presentación, las zonas verdes señalan los niveles de vegetación.',
    's2.b.f2.alt': 'Detalle del mapa con el área de estudio en rojo y puntos verdes dispersos.',
    's2.b.f3': 'Evapotranspiración',
    's2.b.f3.p': 'Mapa de la distribución espacial de la evapotranspiración, una de las variables ambientales exploradas. En la presentación, el amarillo claro indica que no hay evapotranspiración.',
    's2.b.f3.alt': 'Detalle del mapa con el área de estudio en tonos amarillos y naranjas.',
    's2.b.nota': 'Las páginas 7, 8 y 10 de la presentación <b>reutilizan la misma captura del mapa</b> con distintas capas activas; lo comprobé comparando las imágenes incrustadas del PDF.',

    's2.c.h': 'Lluvia y temperatura a lo largo del tiempo',
    's2.c.p': 'Para entender mejor las condiciones climáticas, también analicé series temporales de precipitación y temperatura. Los gráficos originales comparaban los cambios por año, por mes y entre estaciones. Todos cubren el periodo 2020-2024.',
    's2.c.f1': 'Precipitación total anual',
    's2.c.f1.p': '«Total Annual Precipitation in Phoenix (2020-2024)», en pulgadas. 2021 es el año más lluvioso de la serie y desde ahí la precipitación baja cada año hasta el mínimo en 2024; 2020, el primer año, queda por debajo de 2021.',
    's2.c.f1.alt': 'Gráfico de barras de la precipitación total anual en Phoenix entre 2020 y 2024, en pulgadas.',
    's2.c.f2': 'Precipitación mensual por año',
    's2.c.f2.p': '«Monthly Precipitation in Phoenix (2020-2024)», en pulgadas, de enero a diciembre, con una barra por año.',
    's2.c.f2.alt': 'Gráfico de barras agrupadas de la precipitación mensual entre 2020 y 2024.',
    's2.c.f3': 'Meses por categoría de lluvia',
    's2.c.f3.p': '«Distribution of Precipitation Categories by Year (2020-2024)». El eje vertical cuenta meses. En 2024 la categoría «No rain» suma 7 meses, el valor más alto de todo el gráfico.',
    's2.c.f3.alt': 'Gráfico de barras que cuenta cuántos meses de cada año caen en cada categoría de lluvia.',
    's2.c.f4': 'Temperaturas máximas por mes',
    's2.c.f4.p': '«Monthly Maximum Temperatures in Phoenix (2020-2024)», en grados Fahrenheit, con una barra por año.',
    's2.c.f4.alt': 'Gráfico de barras agrupadas de las temperaturas máximas mensuales entre 2020 y 2024.',
    's2.c.f5': 'Invierno frente a verano',
    's2.c.f5.p': '«Average Seasonal Maximum Temperatures in Phoenix (2020-2024)», en grados Fahrenheit. Invierno: diciembre, enero y febrero. Verano: junio, julio y agosto.',
    's2.c.f5.alt': 'Gráfico de dos barras que compara la temperatura máxima media de invierno y de verano.',
    's2.c.nota': 'Son lecturas de los gráficos originales de 2025, no resultados verificados: <b>los cálculos que hay detrás no se han reproducido todavía</b>.',

    'fi.var': 'Variable', 'fi.exp': 'Qué exploraba',
    'fi.lec': 'Lectura preliminar', 'fi.est': 'Estado',
    'fi.c5.var': 'Temperatura máxima media por estación.',
    'fi.c5.exp': 'El contraste térmico entre el invierno y el verano de Phoenix.',
    'fi.c5.lec': 'El verano ronda los 116 °F y el invierno los 82 °F: tampoco el invierno es frío.',
    'fi.c5.est': 'Pendiente de reproducir los cálculos.',

    's2.d.h': 'De las condiciones ambientales a las plantas',
    's2.d.p': 'Conocer el entorno era solo el primer paso. Después necesitaba investigar qué plantas y frutos podían crecer bajo esas condiciones. Para ello consulté literatura científica sobre especies capaces de desarrollarse en entornos exigentes.',
    's2.d.nota': '<b>Las referencias bibliográficas y las especies concretas están pendientes de recuperar.</b> Hasta tenerlas, el caso no atribuye ninguna conclusión a esa revisión.',

    's2.src.h': 'Las fuentes que documenta la presentación',
    's2.src.p': 'Las páginas finales de la presentación listan las colecciones usadas. Son las mismas que aparecen en los dos archivos de Google Earth Engine que conservo.',

    's3.num': '03 / del entorno al plato',
    's3.h': 'Del entorno al plato',
    's3.p1': 'La investigación fue el punto de partida de una propuesta que conectaba tres momentos: Discover, Grow y Cook.',
    's3.t1': 'Discover', 's3.t1.p': 'Ayudar a las personas a explorar qué plantas podían cultivar según su entorno.',
    's3.t2': 'Grow', 's3.t2.p': 'Acompañar el cuidado de esas plantas con información sobre su estado y avisos relacionados con las condiciones del clima.',
    's3.t3': 'Cook', 's3.t3.p': 'Conectar el cultivo con recetas para aprovechar lo cosechado.',
    's3.gam.h': 'Gamificación y motivación',
    's3.gam.p': 'Para incentivar la continuidad, una compañera del equipo propuso incorporar un componente social y de gamificación: ganar puntos al cultivar plantas y preparar comidas con lo cosechado, y usar esos puntos para desbloquear accesorios para la mascota de la aplicación.',
    's3.nota': 'Los tres momentos y la gamificación corresponden <b>al concepto y al prototipo</b> del proyecto. No son funcionalidades implementadas ni validadas.',

    's4.num': '04 / las pantallas',
    's4.h': 'La propuesta, pantalla por pantalla',
    's4.p1': 'El prototipo exploraba cómo acompañar el recorrido desde elegir qué cultivar hasta cuidar las plantas y aprovechar lo cosechado. Las pantallas muestran distintas partes de esa experiencia, además de otras funcionalidades que el equipo exploró durante el desarrollo de la propuesta.',
    's4.p2': 'En ellas la aplicación aparece con el nombre <strong>PhoenixCultive</strong>.',

    'gA.h': 'Al abrir la aplicación',
    'gA.p1': 'La pantalla de carga da paso al inicio, donde la aplicación saluda a la persona, sitúa el lugar —Phoenix, Arizona— y muestra el estado del tiempo. Debajo, sus plantas aparecen como tarjetas con su propio estado, y una franja de avisos recuerda tareas pendientes como regar.',
    'gA.p2': 'La pantalla principal reúne en un sitio la información del entorno y el estado del huerto; la de carga solo la antecede.',
    'gA.c1': 'Pantalla de carga', 'gA.c2': 'Inicio de la aplicación',
    'gA.a1': 'Pantalla de carga con el personaje de la planta y la palabra Loading.',
    'gA.a2': 'Pantalla de inicio con el saludo, el clima de Phoenix y tarjetas de plantas.',

    'gB.h': 'Del estado de la planta al plato',
    'gB.p1': 'La ficha de una planta muestra su ciclo de vida, su salud y la humedad, junto a métricas de cultivo como los días que faltan para la cosecha. La pantalla de receta presenta un plato con sus calorías, sus ingredientes y su descripción.',
    'gB.p2': 'Son las dos puntas de la idea del proyecto: cuidar lo que crece y aprovecharlo en la cocina.',
    'gB.c1': 'Estadísticas de la planta', 'gB.c2': 'Receta',
    'gB.a1': 'Pantalla de una planta de tomate con anillos de estadísticas y métricas de cultivo.',
    'gB.a2': 'Pantalla de una receta de ensalada de pollo con ingredientes y descripción.',

    'gC.h': 'Escanear y registrar un producto',
    'gC.p1': 'El menú de escaneo ofrece un área de cámara y, debajo, una lista de productos ya registrados con un comentario para cada uno: niveles de aceite, señales de contaminación o residuos del envase, con sugerencias de alternativas cercanas. La otra pantalla muestra la cámara apuntando a un envase real con las guías de escaneo.',
    'gC.p2': 'Es una funcionalidad adicional que el equipo exploró. Describo el flujo que se observa: apuntar, registrar y recibir una valoración.',
    'gC.c1': 'Menú de escaneo y registro', 'gC.c2': 'Cámara escaneando',
    'gC.a1': 'Pantalla con un área para escanear productos y una lista de productos registrados con recomendaciones.',
    'gC.a2': 'Pantalla de cámara apuntando a un envase de alimento con guías de escaneo.',

    'gD.h': 'El progreso, puntuado',
    'gD.p1': 'Una clasificación con pestañas semanal y de todos los tiempos ordena a las personas por puntos. El perfil resume las tareas completadas y las que quedan en la semana, con una valoración del desempeño.',
    'gD.p2': 'Ahí se ve el componente de gamificación dentro del prototipo: puntos, clasificación y seguimiento de tareas.',
    'gD.c1': 'Clasificación', 'gD.c2': 'Perfil y progreso',
    'gD.a1': 'Pantalla de clasificación con un gráfico de barras y una lista de posiciones con puntos.',
    'gD.a2': 'Pantalla de perfil con tareas completadas, tareas pendientes y una valoración.',

    'gE.h': 'Notificaciones y widget',
    'gE.p1': 'Una notificación en la pantalla de bloqueo avisa de que las condiciones son buenas para regar la planta, y un widget en la pantalla de inicio del teléfono muestra el personaje junto al estado del tiempo.',
    'gE.p2': 'La propuesta buscaba presentar información contextual sobre el clima y el cuidado de las plantas sin exigir que la persona abriera la aplicación.',
    'gE.c1': 'Notificación en bloqueo', 'gE.c2': 'Widget en el inicio',
    'gE.a1': 'Pantalla de bloqueo de un iPhone con una notificación sobre regar la planta.',
    'gE.a2': 'Pantalla de inicio de un iPhone con un widget de la planta y datos del clima.',

    's5.num': '05 / lo que viene',
    's5.h': 'Phoenix sigue creciendo',
    's5.p1': 'Estoy revisando la investigación original y replanteando la experiencia para desarrollar una nueva versión del proyecto, con una mirada más crítica sobre los datos, las decisiones de diseño y las necesidades que buscábamos atender.',
    's5.p2': 'Esta página cuenta el proyecto de 2025 con lo que puedo respaldar hoy. Cuando la nueva versión tenga algo que mostrar, vivirá aquí también.',

    'out.back': '← volver a proyectos',
    'out.link': 'ver el proyecto ↗',
    'out.rel': '// otros proyectos'
  };

  T.en.phx = {
    'doc.title': 'pau.proyectos · Grow With Phoenix',
    'doc.desc': 'Grow With Phoenix: connecting home growing with everyday food in the extreme climate of Phoenix. SpaceHack for Sustainability 2025.',

    kicker: 'SpaceHack for Sustainability 2025 · University of Arizona',
    sub: 'A proposal connecting home growing with everyday food in the extreme climate of Phoenix.',
    intro: 'The idea began at SpaceHack for Sustainability 2025, from a question: how do we help people in Phoenix discover what they can grow at home and what to make with what they harvest? To answer it I explored environmental data and access to grocery stores, and started turning that research into a product proposal.',
    wip: 'Redesign in progress · 2026',
    'hero.cap': 'Overview of the prototype presented in 2025.',
    'hero.alt': 'Four screens from the prototype: a lock screen with a notification, a home screen with a widget, a path of levels, and a rewards screen.',

    'f.rol': 'My role',
    'f.rol.1': 'I proposed the concept of connecting the environmental conditions of Phoenix with home growing and making use of the food grown.',
    'f.rol.2': 'I selected satellite datasets in Google Earth Engine and wrote the environmental and socioeconomic research the proposal was built on.',
    'f.rol.3': 'I started the prototype in Figma and designed the first home, dashboard, recipe, lock-screen notification and widget screens.',

    'f.too': 'Tools',
    'f.too.1': '<b>Google Earth Engine</b> — satellite data exploration and geospatial analysis.',
    'f.too.2': '<b>Google Colab and Python</b> — data analysis and charts.',
    'f.too.3': '<b>Figma</b> — visual concept and initial prototype.',

    'f.ctx': 'Context',
    'f.ctx.v': 'SpaceHack for Sustainability 2025, hosted by the University of Arizona.',
    'f.win': 'Recognition',
    'f.win.v': 'First place among more than 80 international teams.',
    'f.equ': 'Team',
    'f.equ.v': 'A team project: the other screens and other parts of the proposal were built by my teammates. The exact line-up and the split of tasks are still to be documented.',
    'f.est': 'Status',
    'f.est.v': 'Prototype presented in 2025; research under review and a new version in development.',

    'r.hero': 'Cover', 'r.1': 'The problem', 'r.2': 'The research',
    'r.3': 'From the land to the plate', 'r.4': 'The screens', 'r.5': 'What comes next',
    'r.out': 'view the project ↗',

    's1.num': '01 / the problem',
    's1.h': 'Knowing what to plant was not enough',
    's1.p1': 'Phoenix has a demanding climate for home growing: choosing what to plant means taking the conditions of the place into account. At the same time, the project started from a concern about food insecurity and the food deserts of the area.',
    's1.p2': 'I wanted to explore how to connect those two dimensions. The proposal should not stop at identifying plants that could grow under certain conditions, but help people care for them and find ways to use the harvest in their meals.',
    's1.lead': 'How might we help people in Phoenix discover what to grow at home, support their plants as they grow, and use the harvest to prepare food?',
    's1.nota': 'This is the question that guided the original concept. <b>It does not come from interviews or user research</b>: there is none in the materials I still have.',

    's2.num': '02 / what we looked at',
    's2.h': 'First, understand the place',
    's2.p1': 'I started by exploring the territory of Phoenix from two angles: access to food stores, and the environmental conditions that could affect home growing. I selected satellite datasets in Google Earth Engine and prepared visualisations to study those variables.',

    's2.a.h': 'Food access and possible food deserts',
    's2.a.p': 'A central part of the research was exploring where food stores were and how they related to the socioeconomic areas of Phoenix. The maps were meant to help me study possible food deserts and understand the context in which home-growing alternatives would make sense.',
    's2.a.f1': 'Possible food deserts',
    's2.a.f1.p': 'Exploratory map relating areas with limited food access to store locations. The original layers identify these areas as possible food deserts.',
    's2.a.f1.alt': 'Map of Phoenix with a red circle marking possible food deserts and a six-layer legend.',
    's2.a.f2': 'Low-income areas',
    's2.a.f2.p': 'Socioeconomic layer used in the original spatial exploration to study its relationship with access to food stores.',
    's2.a.f2.alt': 'The same map of Phoenix with yellow marks over the low-income areas.',
    's2.a.nota': '2025 spatial exploration. <b>The store locations and socioeconomic areas need validation</b>; the surviving scripts use approximations and simulated areas.',

    's2.b.h': 'Environmental conditions: vegetation, temperature and evapotranspiration',
    's2.b.p': 'I also explored the environmental conditions that could affect growing. The vegetation, land surface temperature and evapotranspiration maps let me look at different variables of the place, beyond proximity to a grocery store.',
    's2.b.f1': 'Agricultural analysis panel',
    's2.b.f1.p': 'A Google Earth Engine view with four layers loaded: evapotranspiration (mm), land surface temperature (°C), annual precipitation (mm) and vegetation index. The panel reads “NDVI Promedio: 0.119”.',
    's2.b.f1.alt': 'Google Earth Engine map over Phoenix with four legends and an agricultural analysis panel.',
    's2.b.f2': 'Vegetation (NDVI)',
    's2.b.f2.p': 'Vegetation index map used to explore its spatial distribution around Phoenix. In the deck, the green areas mark vegetation levels.',
    's2.b.f2.alt': 'Detail of the map with the study area in red and scattered green points.',
    's2.b.f3': 'Evapotranspiration',
    's2.b.f3.p': 'Map of the spatial distribution of evapotranspiration, one of the environmental variables explored. In the deck, light yellow means there is no evapotranspiration.',
    's2.b.f3.alt': 'Detail of the map with the study area in yellow and orange tones.',
    's2.b.nota': 'Pages 7, 8 and 10 of the deck <b>reuse the same map screenshot</b> with different layers switched on; I checked by comparing the embedded images in the PDF.',

    's2.c.h': 'Rain and temperature over time',
    's2.c.p': 'To understand the climate better I also looked at time series of precipitation and temperature. The original charts compared changes by year, by month and between seasons. All of them cover 2020-2024.',
    's2.c.f1': 'Total annual precipitation',
    's2.c.f1.p': '“Total Annual Precipitation in Phoenix (2020-2024)”, in inches. 2021 is the wettest year of the series, and from there precipitation falls every year to its low in 2024; 2020, the first year, sits below 2021.',
    's2.c.f1.alt': 'Bar chart of total annual precipitation in Phoenix between 2020 and 2024, in inches.',
    's2.c.f2': 'Monthly precipitation by year',
    's2.c.f2.p': '“Monthly Precipitation in Phoenix (2020-2024)”, in inches, from January to December, one bar per year.',
    's2.c.f2.alt': 'Grouped bar chart of monthly precipitation between 2020 and 2024.',
    's2.c.f3': 'Months by rain category',
    's2.c.f3.p': '“Distribution of Precipitation Categories by Year (2020-2024)”. The vertical axis counts months. In 2024 the “No rain” category adds up to 7 months, the highest value in the whole chart.',
    's2.c.f3.alt': 'Bar chart counting how many months of each year fall into each rain category.',
    's2.c.f4': 'Monthly maximum temperatures',
    's2.c.f4.p': '“Monthly Maximum Temperatures in Phoenix (2020-2024)”, in degrees Fahrenheit, one bar per year.',
    's2.c.f4.alt': 'Grouped bar chart of monthly maximum temperatures between 2020 and 2024.',
    's2.c.f5': 'Winter against summer',
    's2.c.f5.p': '“Average Seasonal Maximum Temperatures in Phoenix (2020-2024)”, in degrees Fahrenheit. Winter: December, January, February. Summer: June, July, August.',
    's2.c.f5.alt': 'Two-bar chart comparing average maximum temperature in winter and in summer.',
    's2.c.nota': 'These are readings of the original 2025 charts, not verified results: <b>the calculations behind them have not been reproduced yet</b>.',

    'fi.var': 'Variable', 'fi.exp': 'What it explored',
    'fi.lec': 'Preliminary reading', 'fi.est': 'Status',
    'fi.c5.var': 'Average maximum temperature by season.',
    'fi.c5.exp': 'The thermal contrast between winter and summer in Phoenix.',
    'fi.c5.lec': 'Summer sits around 116 °F and winter around 82 °F: winter is not cold either.',
    'fi.c5.est': 'Calculations still to be reproduced.',

    's2.d.h': 'From environmental conditions to plants',
    's2.d.p': 'Knowing the place was only the first step. Next I needed to research which plants and fruits could grow under those conditions, so I looked into scientific literature on species able to develop in demanding environments.',
    's2.d.nota': '<b>The references and the specific species are still to be recovered.</b> Until I have them, this case attributes no conclusion to that review.',

    's2.src.h': 'The sources the deck documents',
    's2.src.p': 'The closing pages of the deck list the collections used. They are the same ones that appear in the two Google Earth Engine files I still have.',

    's3.num': '03 / from the land to the plate',
    's3.h': 'From the land to the plate',
    's3.p1': 'The research was the starting point of a proposal that connected three moments: Discover, Grow and Cook.',
    's3.t1': 'Discover', 's3.t1.p': 'Help people explore which plants they could grow given their surroundings.',
    's3.t2': 'Grow', 's3.t2.p': 'Support the care of those plants with information on their state and alerts tied to weather conditions.',
    's3.t3': 'Cook', 's3.t3.p': 'Connect growing with recipes that make use of the harvest.',
    's3.gam.h': 'Gamification and motivation',
    's3.gam.p': 'To encourage people to keep going, a teammate proposed adding a social and gamification component: earning points by growing plants and cooking with the harvest, and spending those points on accessories for the app mascot.',
    's3.nota': 'The three moments and the gamification belong <b>to the concept and the prototype</b>. They are not implemented or validated features.',

    's4.num': '04 / the screens',
    's4.h': 'The proposal, screen by screen',
    's4.p1': 'The prototype explored how to support the journey from choosing what to grow through caring for the plants and making use of the harvest. The screens show different parts of that experience, along with other features the team explored while developing the proposal.',
    's4.p2': 'In them the app appears under the name <strong>PhoenixCultive</strong>.',

    'gA.h': 'Opening the app',
    'gA.p1': 'The loading screen gives way to the home screen, where the app greets the person, places them in Phoenix, Arizona, and shows the weather. Below that, their plants appear as cards with their own status, and a strip of notices recalls pending tasks such as watering.',
    'gA.p2': 'The home screen gathers information about the place and the state of the garden in one view; the loading screen only precedes it.',
    'gA.c1': 'Loading screen', 'gA.c2': 'App home',
    'gA.a1': 'Loading screen with the plant character and the word Loading.',
    'gA.a2': 'Home screen with a greeting, the Phoenix weather and plant cards.',

    'gB.h': 'From the plant to the plate',
    'gB.p1': 'A plant page shows its life cycle, its health and humidity, alongside growing metrics such as the days left until harvest. The recipe screen presents a dish with its calories, ingredients and description.',
    'gB.p2': 'They are the two ends of the project idea: caring for what grows and using it in the kitchen. Whether the prototype linked one screen to the other automatically is not documented.',
    'gB.c1': 'Plant statistics', 'gB.c2': 'Recipe',
    'gB.a1': 'Screen for a tomato plant with statistic rings and growing metrics.',
    'gB.a2': 'Screen for a chicken salad recipe with ingredients and a description.',

    'gC.h': 'Scanning and logging a product',
    'gC.p1': 'The scanning menu offers a camera area and, below it, a list of already-registered products with a comment on each: oil levels, signs of contamination or packaging waste, with suggestions of nearby alternatives. The other screen shows the camera pointed at a real package with the scanning guides.',
    'gC.p2': 'It is an additional feature the team explored. I describe the flow that is visible: point, register, get an assessment. How the recognition worked underneath is not documented.',
    'gC.c1': 'Scanning menu and log', 'gC.c2': 'Camera scanning',
    'gC.a1': 'Screen with an area to scan products and a list of registered products with recommendations.',
    'gC.a2': 'Camera screen pointed at a food package with scanning guides.',

    'gD.h': 'Progress, scored',
    'gD.p1': 'A leaderboard with weekly and all-time tabs ranks people by points. The profile sums up the tasks completed and the ones left for the week, with a rating of performance.',
    'gD.p2': 'That is where the gamification shows up inside the prototype: points, ranking and task tracking. Its effect on anyone staying consistent was never measured.',
    'gD.c1': 'Leaderboard', 'gD.c2': 'Profile and progress',
    'gD.a1': 'Leaderboard screen with a bar chart and a ranked list with points.',
    'gD.a2': 'Profile screen with completed tasks, remaining tasks and a rating.',

    'gE.h': 'Notifications and widget',
    'gE.p1': 'A lock-screen notification says conditions are good for watering the plant, and a home-screen widget shows the character alongside the weather.',
    'gE.p2': 'The proposal set out to surface contextual information about the weather and plant care without requiring the person to open the app.',
    'gE.c1': 'Lock-screen notification', 'gE.c2': 'Home-screen widget',
    'gE.a1': 'iPhone lock screen with a notification about watering the plant.',
    'gE.a2': 'iPhone home screen with a plant widget and weather data.',

    's5.num': '05 / what comes next',
    's5.h': 'Phoenix keeps growing',
    's5.p1': 'I am reviewing the original research and rethinking the experience to build a new version of the project, with a more critical eye on the data, the design decisions, and the needs we set out to address.',
    's5.p2': 'This page tells the 2025 project with what I can support today. When the new version has something to show, it will live here too.',

    'out.back': '← back to projects',
    'out.link': 'view the project ↗',
    'out.rel': '// other projects'
  };

  T.es.meta = T.es.meta || {}; T.en.meta = T.en.meta || {};
  T.es.task = T.es.task || {}; T.en.task = T.en.task || {};
  T.es.meta['title.caso'] = T.es.phx['doc.title'];
  T.es.meta['desc.caso']  = T.es.phx['doc.desc'];
  T.en.meta['title.caso'] = T.en.phx['doc.title'];
  T.en.meta['desc.caso']  = T.en.phx['doc.desc'];
  T.es.task['app.caso'] = 'grow_with_phoenix.md';
  T.en.task['app.caso'] = 'grow_with_phoenix.md';
})();
