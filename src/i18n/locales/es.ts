const es = {
  // ── Sidebar / Navigation ──────────────────────────────────────────────────
  nav: {
    overview: "Resumen",
    core: "Principal",
    management: "Gestión",
    timetables: "Horarios",
    templates: "Plantillas",
    analytics: "Análisis",
    howToUse: "Cómo usar",
    settings: "Configuración",
    search: "Buscar",
    notifications: "Notificaciones",
  },

  // ── Layout page titles ────────────────────────────────────────────────────
  pageTitles: {
    dashboard: "Panel",
    timetables: "Horarios",
    courses: "Cursos",
    tutors: "Tutores",
    sessions: "Sesiones",
    templates: "Plantillas",
    analytics: "Análisis",
    howToUse: "Cómo usar",
    settings: "Configuración",
    account: "Cuenta",
    billing: "Facturación",
    notifications: "Notificaciones",
  },

  // ── Common actions & labels ───────────────────────────────────────────────
  common: {
    save: "Guardar",
    cancel: "Cancelar",
    saveChanges: "Guardar cambios",
    add: "Añadir",
    edit: "Editar",
    remove: "Eliminar",
    refresh: "Actualizar",
    name: "Nombre",
    description: "Descripción",
    priority: "Prioridad",
    low: "Baja",
    medium: "Media",
    high: "Alta",
    noData: "Sin datos",
    loading: "Cargando...",
    success: "Éxito",
    error: "Error",
    information: "Información",
  },

  // ── Section Header (shared across Tutors / Courses / Sessions / Blocks) ──
  sectionHeader: {
    title: "Panel",
    subtitle: "¡Bienvenido a tu panel!",
    autoGenerate: "Generar automáticamente",
    loadSampleData: "Cargar datos de ejemplo",
  },

  // ── Dashboard ─────────────────────────────────────────────────────────────
  dashboard: {
    title: "Panel",
    subtitle: "¡Bienvenido de nuevo! Aquí tienes un resumen de tu horario.",
  },

  // ── Database Manager ──────────────────────────────────────────────────────
  databaseManager: {
    title: "Resumen de la base de datos",
    loadSampleData: "Cargar datos de ejemplo",
    generateTimetable: "Generar horario",
    generateDesc: "Crea horarios basados en tu base de datos",
    generate: "Generar",
    aiGenerate: "Generar con IA",
  },

  // ── Tutors ────────────────────────────────────────────────────────────────
  tutors: {
    maxPeriodsPerDay: "Máx. períodos por día",
    noTutorPlaceholder: "ej., Dr. García",
    noPersonPlaceholder: "ej., Juan Pérez",
    editTitle: "Editar {{tutor}}",
    editDesc: "Realiza cambios en los detalles del {{tutor}} a continuación.",
    emptyTitle: "Sin {{tutor}}",
    emptyDesc: "No se encontraron {{tutors}}. Los {{tutors}} creados y disponibles aparecerán aquí",
  },

  // ── Courses ───────────────────────────────────────────────────────────────
  courses: {
    courseName: "Nombre del {{course}}",
    assignTutor: "Asignar {{tutor}}",
    periodsPerWeek: "Períodos por semana",
    avoidConsecutive: "Evitar períodos consecutivos",
    selectPriority: "Seleccionar prioridad",
    noCoursesYet: "Aún no hay {{courses}}",
    editTitle: "Editar {{course}}",
    editDesc: "Realiza cambios en los detalles del {{course}} a continuación.",
    educationPlaceholder: "ej., Matemáticas",
    individualPlaceholder: "ej., Yoga matutino",
  },

  // ── Sessions ──────────────────────────────────────────────────────────────
  sessions: {
    sessionName: "Nombre de la {{session}}",
    assignCourses: "Asignar {{courses}}",
    noSessionsYet: "Aún no hay {{sessions}}",
    editTitle: "Editar {{session}}",
    editDesc: "Realiza cambios en los detalles de la {{session}} a continuación.",
    educationPlaceholder: "ej., Clase 1A",
    individualPlaceholder: "ej., Rutina matutina",
  },

  // ── Blocks ────────────────────────────────────────────────────────────────
  blocks: {
    blockType: "Tipo de bloqueo",
    selectBlockType: "Seleccionar tipo de bloqueo",
    blockedText: "Texto bloqueado",
    blockedSlot: "Ranura bloqueada",
    slotIdentifier: "Identificador de ranura",
    textToBlock: "Texto a bloquear",
    slotPlaceholder: "ej., 1-3 (fila-col)",
    textPlaceholder: "ej., Descanso, Devoción, Almuerzo",
    slotHint: "Las ranuras bloqueadas son intervalos de tiempo específicos que deben evitarse (ej., descansos, almuerzo). Formato: fila-col (ej., 1-3)",
    textHint: "Los textos bloqueados son etiquetas a evitar al generar horarios automáticamente (ej., Descanso, Devoción, Almuerzo)",
    addBlock: "Añadir bloqueo",
    blockedTextsTitle: "Textos bloqueados",
    blockedSlotsTitle: "Ranuras bloqueadas",
    noBlockedTexts: "No hay textos bloqueados",
    noBlockedSlots: "No hay ranuras bloqueadas",
    noBlocksYet: "Aún no hay bloqueos",
  },

  // ── Templates ─────────────────────────────────────────────────────────────
  templates: {
    templateName: "Nombre de la plantilla",
    namePlaceholder: "ej., Horario semanal",
    descPlaceholder: "Descripción opcional",
    columnCount: "Número de columnas",
    slotDuration: "Duración predeterminada de ranura (minutos)",
    editTitle: "Editar plantilla",
    editDesc: "Realiza cambios en los detalles de la plantilla a continuación.",
    created: "Creada:",
    noTemplatesYet: "Aún no hay plantillas",
  },

  // ── Timetables ────────────────────────────────────────────────────────────
  timetables: {
    cleared: "¡Horario borrado correctamente!",
    noSubjectsError: "Por favor, añade materias a la base de datos primero.",
    aiGenerated: "Horario generado por IA",
    aiGeneratedDesc: "¡La IA ha generado un horario correctamente!",
    aiGenerationFailed: "Error en la generación por IA",
    aiFailedDesc: "No se pudo generar el horario con IA. Por favor, verifica tu clave API e inténtalo de nuevo.",
    invalidApiKey: "Por favor, introduce una clave API válida.",
    copied: "¡Datos del horario copiados al portapapeles y registrados en consola!",
    copiedConsole: "Datos del horario registrados en consola (fallo al copiar al portapapeles)",
    exportedPdf: "¡Horario exportado como PDF correctamente!",
    exportedProPdf: "¡Horario exportado como PDF Pro correctamente!",
    exportFailed: "Error al exportar PDF. Por favor, inténtalo de nuevo.",
    exportProFailed: "Error al exportar PDF Pro. Por favor, inténtalo de nuevo.",
    templateApplied: "Plantilla aplicada",
    templateAppliedDesc: "¡Plantilla aplicada correctamente! Ten en cuenta que el número de columnas y las duraciones pueden necesitar ajuste manual.",
    generated: "Horario generado",
    generatedDesc: "¡El horario ha sido generado correctamente!",
    getApiKey: "Obtén tu clave API en",
    enterApiKey: "Introduce tu clave API de Gemini",
    monday: "Lunes",
    tuesday: "Martes",
    wednesday: "Miércoles",
    thursday: "Jueves",
    friday: "Viernes",
  },

  // ── Settings ──────────────────────────────────────────────────────────────
  settings: {
    title: "Configuración",
    subtitle: "Gestiona las preferencias de tu aplicación",
    tabs: {
      appearance: "Apariencia",
      general: "General",
      accessibility: "Accesibilidad",
    },
    theme: {
      title: "Tema",
      desc: "Selecciona tu modo de color preferido",
      colorMode: "Modo de color",
      light: "Claro",
      dark: "Oscuro",
      system: "Sistema",
      hint: "Elige cómo se ve la aplicación. Sistema seguirá la configuración de tu dispositivo.",
    },
    typography: {
      title: "Tipografía",
      desc: "Personaliza la configuración de fuentes de la aplicación",
      fontFamily: "Familia de fuente",
      fontSize: "Tamaño de fuente",
      selectFont: "Seleccionar fuente",
      selectSize: "Seleccionar tamaño",
    },
    display: {
      title: "Pantalla",
      desc: "Ajusta las preferencias de visualización y diseño",
      compactMode: "Modo compacto",
      compactHint: "Reducir el espaciado para un diseño más denso",
      on: "Activado",
      off: "Desactivado",
    },
    appMode: {
      title: "Modo de aplicación",
      desc: "Elige entre el modo de programación Educativo, Individual o Empresarial",
      label: "Modo de uso",
      education: "Educación",
      individual: "Individual",
      company: "Empresa",
      hint: "<strong>Educación</strong> — Tutores, Cursos y Clases. <strong>Individual</strong> — Personas, Actividades y Grupos. <strong>Empresa</strong> — Miembros, Tareas y Proyectos.",
    },
    language: {
      title: "Idioma y región",
      desc: "Establece tu idioma y configuración regional preferidos",
      label: "Idioma",
      selectLang: "Seleccionar idioma",
      hint: "Selecciona tu idioma preferido para la interfaz",
    },
    accessibility: {
      title: "Accesibilidad",
      desc: "Configura funciones de accesibilidad para una mejor usabilidad",
      highContrast: "Alto contraste",
      highContrastHint: "Aumentar el contraste para una mejor visibilidad",
      animations: "Animaciones",
      animationsHint: "Habilitar transiciones y animaciones suaves",
    },
    fontSizes: {
      small: "Pequeño",
      medium: "Mediano",
      large: "Grande",
    },
    languages: {
      en: "Inglés",
      es: "Español",
      fr: "Francés",
      de: "Alemán",
      zh: "Chino",
    },
  },

  // ── Select helpers ────────────────────────────────────────────────────────
  select: {
    selectA: "Seleccionar un {{item}}",
    noAvailable: "No hay {{items}} disponibles",
  },
} as const;

export default es;
