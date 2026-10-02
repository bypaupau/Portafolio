// proyectos del portafolio: UNA sola lista (inicio, proyectos y el índice académico salen de aquí)
// estados: "completado" | "en-progreso" | "pronto"
//
// IDIOMAS: cualquier texto puede ser
//   · un texto normal  → se muestra igual en español e inglés (nombres propios, tecnologías…)
//   · { es: "…", en: "…" } → cada idioma ve su versión (descripciones, fechas, materias…)
// Si falta "en", se muestra el "es". Los textos de la interfaz (botones, filtros…)
// están en js/translations.js.

// ── PROYECTOS ──
// materia: la asignatura (proyectos de la universidad) o el evento (hackathones).
//   Los académicos también aparecen en las carpetas "Año - Materia" del repositorio.
// tipo: "academico" | "personal" | "hackathon"  ·  estado: "completado" | "en-progreso" | "pronto"
// habilidades: lista libre de etiquetas (alimentan el filtro por habilidad)
// img: ruta de la captura/thumbnail (ej: "img/peaknews.png"). Déjalo "" para mostrar un placeholder.
const PROYECTOS = [
  {
    nombre: "Peak News - Alpine Fact-Checker",
    tipo: "hackathon",
    materia: "Spacehack 2026",
    periodo: { es: "Abril 2026", en: "April 2026" },
    descripcion: {
      es: "Plataforma de fact-checking climático sobre los Alpes: cruza noticias con datos satelitales (Sentinel-2, Landsat) y literatura científica para dar un veredicto de verdad.",
      en: "Climate fact-checking platform for the Alps: it cross-checks news against satellite data (Sentinel-2, Landsat) and scientific literature to give a truth verdict."
    },
    habilidades: ["React", "FastAPI", "Python", "TypeScript", "Google Earth Engine"],
    repo: "https://github.com/bypaupau/Spacehack-2026-PeakNews",
    img: "img/peaknews.png",
    estado: "completado"
  },
  {
    nombre: { es: "Rutas de Incendio · WiDS Datathon", en: "Wildfire Routes · WiDS Datathon" },
    tipo: "hackathon",
    materia: "WiDS Datathon ESPOL 2026",
    periodo: { es: "Junio 2026", en: "June 2026" },
    descripcion: {
      es: "Notebook de ciencia de datos para analizar y predecir rutas de incendios. 3er lugar en el WiDS Datathon ESPOL 2026.",
      en: "Data science notebook to analyze and predict wildfire routes. 3rd place at the WiDS Datathon ESPOL 2026."
    },
    habilidades: ["Python", "Data Science", "Pandas", "Matplotlib"],
    repo: "https://github.com/DATATHON-WIDS/wids-datathon-2026-artemis-4",
    img: "img/rutasincendio.png",
    estado: "completado"
  },
  {
    nombre: { es: "App Web de Tracking de Libros", en: "Book Tracking Web App" },
    tipo: "academico",
    materia: { es: "Lenguajes de Programación", en: "Programming Languages" },
    periodo: { es: "Junio 2026", en: "June 2026" },
    descripcion: {
      es: "Aplicación web para llevar el seguimiento de los libros que lees y los que quieres leer.",
      en: "Web app to keep track of the books you’ve read and the ones you want to read."
    },
    habilidades: ["Laravel", "PHP", "SQLite"],
    repo: "https://github.com/bypaupau/Biblioteca-Personal",
    img: "img/trackinglibros.png",
    estado: "completado"
  },
  {
    nombre: "Catventures - Unity 2D",
    tipo: "academico, personal",
    materia: { es: "Lenguajes de Programación", en: "Programming Languages" },
    periodo: { es: "Agosto 2026", en: "August 2026" },
    descripcion: {
      es: "Videojuego pixel art hecho en Unity para aprender C#; el diseño y la ilustración fueron parte del trabajo.",
      en: "A pixel art video game made in Unity to learn C#, where design and illustration were part of the work."
    },
    habilidades: [{ es: "Diseño", en: "Design" }, "C#", "Unity", { es: "Ilustración", en: "Illustration" }],
    repo: "https://github.com/bypaupau/JuegoGrupal-ProyectoIIParcial",
    img: "img/catventures.png",
    estado: "completado"
  },
    {
    nombre: "Grow With Phoenix",
    tipo: "hackathon",
    materia: "SpaceHACK for Sustainability 2025",
    periodo: "2025",
    descripcion: {
      es: "Primer lugar internacional. Analizamos los desiertos alimentarios de Phoenix, Arizona con datos satelitales y diseñamos el prototipo de una app que acompaña a la gente a cultivar su propia comida.",
      en: "1st place worldwide. We analyzed the food deserts of Phoenix, Arizona with satellite data and designed a prototype app that helps people grow their own food."
    },
    habilidades: ["Figma", "UX/UI", "Python", "Google Earth Engine", "Google Colab", "Data Science"],
    repo: "",
    // sin repo público: el enlace lleva al proyecto en Drive
    enlace: "https://drive.google.com/file/d/14QEug3cvbm_SLL2dG_udZX4H6NDujfX7/view?usp=sharing",
    enlaceTxt: { es: "ver proyecto →", en: "view project →" },
    img: "img/phoenix-grow.png",
    estado: "completado"
  },
  {
    nombre: { es: "Simulación de Videojuego · Laravel + Prolog", en: "Video Game Simulation · Laravel + Prolog" },
    tipo: "academico",
    materia: { es: "Lenguajes de Programación", en: "Programming Languages" },
    periodo: { es: "Junio 2026", en: "June 2026" },
    descripcion: {
      es: "Simulación de un videojuego que combina Laravel para la lógica web y Prolog para el razonamiento.",
      en: "Simulation of a video game that combines Laravel for the web logic and Prolog for the reasoning."
    },
    habilidades: ["Laravel", "Prolog", "PHP"],
    repo: "https://github.com/bypaupau/RPG-Game",
    img: "img/aventuraprolog.png",
    estado: "completado"
  },
  {
    nombre: { es: "Dashboard BI", en: "BI Dashboard" },
    tipo: "academico",
    materia: { es: "Base de Datos II", en: "Databases II" },
    periodo: { es: "Abril 2026", en: "April 2026" },
    descripcion: {
      es: "Tablero de inteligencia de negocios para analizar facturación, cobranza y servicios, con modelo de datos en SQL.",
      en: "Business intelligence dashboard to analyze billing, collections and services, built on a SQL data model."
    },
    habilidades: ["SQL", "Data Science", "JavaScript"],
    repo: "https://github.com/bypaupau/BI-Webpage-Base-De-Datos-Proyecto-II-Parcial",
    img: "img/dashboardbi.png",
    estado: "completado"
  },
  {
    nombre: { es: "Simulación de Proceso de Adopción", en: "Adoption Process Simulation" },
    tipo: "academico",
    materia: { es: "Base de Datos I", en: "Databases I" },
    periodo: { es: "Diciembre 2025", en: "December 2025" },
    descripcion: {
      es: "Simulación de un proceso de adopción con su modelo de base de datos, consultas y lógica del flujo.",
      en: "Simulation of an adoption process with its database model, queries and flow logic."
    },
    habilidades: ["SQL", { es: "Base de Datos", en: "Databases" }, "Java"],
    repo: "https://github.com/DanielV-13/BASE-DE-DATOS-ADOPCION-NI-O",
    img: "img/agenciaadopcion.png",
    estado: "completado"
  },
  {
    nombre: { es: "Inventario + Reportes con Docker", en: "Inventory + Reports with Docker" },
    tipo: "academico",
    materia: { es: "Sistemas Distribuidos", en: "Distributed Systems" },
    periodo: { es: "Junio 2026", en: "June 2026" },
    descripcion: {
      es: "Sistema distribuido con Docker: mi app de inventario envía datos que se reflejan en la base y el sistema de reportes de un compañero, en tiempo real.",
      en: "Distributed system with Docker: my inventory app sends data that shows up in a classmate’s database and reporting system, in real time."
    },
    habilidades: ["Docker", "SQL", { es: "Sistemas Distribuidos", en: "Distributed Systems" }],
    repo: "https://github.com/bypaupau/proyectoSistemasDistribuidosP1",
    img: "img/inventariodocker.png",
    estado: "completado"
  },
    {
    nombre: { es: "Aplicación Pomodoro", en: "Pomodoro App" },
    tipo: "personal",
    materia: "-",
    periodo: { es: "Enero 2026", en: "January 2026" },
    descripcion: {
      es: "Aplicación Pomodoro en tiempo real con interfaz gráfica y registro de sesiones.",
      en: "Real-time Pomodoro app with a graphical interface and a session log."
    },
    habilidades: ["Python"],
    repo: "https://github.com/bypaupau/my-pomodoro",
    img: "img/pomodoro.png",
    estado: "en-progreso"
  }
];
