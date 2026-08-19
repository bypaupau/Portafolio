// materias y proyectos del portafolio
// estados: "completado" | "en-progreso" | "pronto"

// ── MATERIAS (para la página "Materias") ──
const MATERIAS = [

  {
    periodo: "Base de Datos I · 2025",
    nombre:  "Base de Datos I",
    color:   "sky",
    proyectos: [
      {
        nombre: "Simulación de Proceso de Adopción",
        repo:   "https://github.com/DanielV-13/BASE-DE-DATOS-ADOPCION-NI-O",
        estado: "completado"
      }
    ]
  },

  {
    periodo: "Lenguajes de Programación · 2026",
    nombre:  "Lenguajes de Programación",
    color:   "lav",
    proyectos: [
      {
        nombre: "App Web de Tracking de Libros",
        repo:   "https://github.com/bypaupau/Biblioteca-Personal",
        estado: "completado"
      },
      {
        nombre: "Simulación de Videojuego (Laravel + Prolog)",
        repo:   "https://github.com/bypaupau/RPG-Game",
        estado: "completado"
      }
    ]
  },

  {
    periodo: "Extraordinario I · 2026",
    nombre:  "Base de Datos II",
    color:   "pink",
    proyectos: [
      {
        nombre: "Dashboard BI",
        repo:   "https://github.com/bypaupau/BI-Webpage-Base-De-Datos-Proyecto-II-Parcial",
        estado: "completado"
      }
    ]
  },

  {
    periodo: "Sistemas Distribuidos · 2026",
    nombre:  "Sistemas Distribuidos",
    color:   "mint",
    proyectos: [
      {
        nombre: "Inventario + Reportes con Docker",
        repo:   "https://github.com/bypaupau/proyectoSistemasDistribuidosP1",
        estado: "completado"
      }
    ]
  },

];

// ── PROYECTOS (para la página con filtros) ──
// tipo: "academico" | "personal" | "hackathon"  ·  estado: "completado" | "en-progreso" | "pronto"
// habilidades: lista libre de etiquetas (alimentan el filtro por habilidad)
// img: ruta de la captura/thumbnail (ej: "img/peaknews.png"). Déjalo "" para mostrar un placeholder.
const PROYECTOS = [
  {
    nombre: "Peak News - Alpine Fact-Checker",
    tipo: "hackathon",
    materia: "Spacehack 2026",
    periodo: "Abril 2026",
    descripcion: "Plataforma de fact-checking climático sobre los Alpes: cruza noticias con datos satelitales (Sentinel-2, Landsat) y literatura científica para dar un veredicto de verdad.",
    habilidades: ["React", "FastAPI", "Python", "TypeScript", "Google Earth Engine"],
    repo: "https://github.com/bypaupau/Spacehack-2026-PeakNews",
    img: "img/peaknews.png",
    estado: "completado"
  },
  {
    nombre: "Rutas de Incendio · WiDS Datathon",
    tipo: "hackathon",
    materia: "WiDS Datathon ESPOL 2026",
    periodo: "Junio 2026",
    descripcion: "Notebook de ciencia de datos para analizar y predecir rutas de incendios. 3er lugar en el WiDS Datathon ESPOL 2026.",
    habilidades: ["Python", "Data Science", "Pandas", "Matplot Lib"],
    repo: "https://github.com/DATATHON-WIDS/wids-datathon-2026-artemis-4",
    img: "img/rutasincendio.png",
    estado: "completado"
  },
  {
    nombre: "App Web de Tracking de Libros",
    tipo: "academico",
    materia: "Lenguajes de Programación",
    periodo: "Junio 2026",
    descripcion: "Aplicación web para llevar el seguimiento de los libros que lees y los que quieres leer.",
    habilidades: ["Laravel", "PHP", "SQLite"],
    repo: "https://github.com/bypaupau/Biblioteca-Personal",
    img: "img/trackinglibros.png",
    estado: "completado"
  },
  {
    nombre: "Catventures - Unity 2D",
    tipo: "academico, personal",
    periodo: "Agosto 2026",
    descripcion: "Creacion de un pixel videogame en Unity para aprender C#",
    habilidades: ["Diseño", "C#", "Unity", "Ilustración"],
    repo: "https://github.com/bypaupau/JuegoGrupal-ProyectoIIParcial",
    img: "img/catventures.png",
    estado: "completado"
  },
    {
    nombre: "Grow With Phoenix",
    tipo: "hackathon",
    materia: "SpaceHACK for Sustainability 2025",
    periodo: "2025",
    descripcion: "Primer lugar internacional. Analizamos los desiertos alimentarios de Phoenix, Arizona con datos satelitales y diseñamos el prototipo de una app que acompaña a la gente a cultivar su propia comida.",
    habilidades: ["Figma", "UX/UI", "Python", "Google Earth Engine", "Google Colab", "Data Science"],
    repo: "https://drive.google.com/file/d/XXXXXXXX/view?usp=sharing",
    img: "img/phoenix-grow.png",
    estado: "completado"
  },
  {
    nombre: "Simulación de Videojuego · Laravel + Prolog",
    tipo: "academico",
    materia: "Lenguajes de Programación",
    periodo: "Junio 2026",
    descripcion: "Simulación de un videojuego que combina Laravel para la lógica web y Prolog para el razonamiento.",
    habilidades: ["Laravel", "Prolog", "PHP"],
    repo: "https://github.com/bypaupau/RPG-Game",
    img: "img/aventuraprolog.png",
    estado: "completado"
  },
  {
    nombre: "Dashboard BI",
    tipo: "academico",
    materia: "Base de Datos II",
    periodo: "Abril 2026",
    descripcion: "Tablero de inteligencia de negocios para analizar facturación, cobranza y servicios, con modelo de datos en SQL.",
    habilidades: ["SQL", "Data Science", "JavaScript"],
    repo: "https://github.com/bypaupau/BI-Webpage-Base-De-Datos-Proyecto-II-Parcial",
    img: "img/dashboardbi.png",
    estado: "completado"
  },
  {
    nombre: "Simulación de Proceso de Adopción",
    tipo: "academico",
    materia: "Base de Datos I",
    periodo: "Diciembre 2025",
    descripcion: "Simulación de un proceso de adopción con su modelo de base de datos, consultas y lógica del flujo.",
    habilidades: ["SQL", "Base de Datos", "Java"],
    repo: "https://github.com/DanielV-13/BASE-DE-DATOS-ADOPCION-NI-O",
    img: "img/agenciaadopcion.png",
    estado: "completado"
  },
  {
    nombre: "Inventario + Reportes con Docker",
    tipo: "academico",
    materia: "Sistemas Distribuidos",
    periodo: "Junio 2026",
    descripcion: "Sistema distribuido con Docker: mi app de inventario envía datos que se reflejan en la base y el sistema de reportes de un compañero, en tiempo real.",
    habilidades: ["Docker", "SQL", "Sistemas Distribuidos"],
    repo: "https://github.com/bypaupau/proyectoSistemasDistribuidosP1",
    img: "img/inventariodocker.png",
    estado: "completado"
  },
    {
    nombre: "Aplicación Pomodoro",
    tipo: "personal",
    materia: "-",
    periodo: "Enero 2026",
    descripcion: "Aplicación de Pomodoro en tiempo real con interfaz gráfica y Logs de records",
    habilidades: ["Python"],
    repo: "https://github.com/bypaupau/my-pomodoro",
    img: "img/pomodoro.png",
    estado: "en-progreso"
  }
];
