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
    viewAll: "Ver los {{count}}",
    periods_one: "{{count}} periodo",
    periods: "{{count}} periodos",

    modes: {
      education: {
        title: "Resumen del trimestre",
        subtitle: "Cómo está tu horario antes de generarlo.",
        groupsTitle: "Cobertura por clase",
        groupsDesc: "Periodos que pide cada clase esta semana.",
        capacityTitle: "La semana lectiva",
        capacityDesc: "Espacios disponibles frente a periodos por colocar.",
        priorityDesc: "Qué cursos coloca primero el generador.",
        readinessDesc: "Lo que falta para poder generar un horario.",
        allClear: "Todo está en orden: ya puedes generar un horario.",
      },
      company: {
        title: "Resumen del espacio de trabajo",
        subtitle: "A qué se ha comprometido el equipo esta semana.",
        groupsTitle: "Proyectos",
        groupsDesc: "Esfuerzo comprometido en cada proyecto esta semana.",
        capacityTitle: "Capacidad del equipo",
        capacityDesc:
          "Espacios de trabajo disponibles frente al esfuerzo comprometido.",
        priorityDesc: "Qué tareas se programan primero.",
        readinessDesc: "Lo que falta para poder programar la semana.",
        allClear: "El plan cabe: ya puedes programar la semana.",
      },
      individual: {
        title: "Tu semana",
        subtitle: "Todo lo que te has comprometido a hacer, en un solo lugar.",
        groupsTitle: "Tus grupos",
        groupsDesc: "Cómo se reparten tus actividades.",
        capacityTitle: "Qué tan llena está tu semana",
        capacityDesc: "Espacios libres frente a lo que has asumido.",
        priorityDesc: "Qué tiene sitio primero cuando la semana aprieta.",
        readinessDesc: "Lo que falta para organizar tu semana.",
        allClear: "Tu semana cabe: ya puedes organizarla.",
      },
    },

    stats: {
      weeklyPeriods: "Periodos semanales",
      committed: "Esfuerzo comprometido",
      weekLoad: "Carga semanal",
      openSlots_one: "de {{count}} espacio libre",
      openSlots: "de {{count}} espacios libres",
      slotsUsed: "{{used}} de {{total}} espacios ocupados",
      peopleOver: "{{count}} por encima de su capacidad",
      peopleIdle: "{{count}} sin nada asignado",
      peopleOk: "Todos dentro de su capacidad semanal",
      peopleNone: "Aún no has añadido a nadie",
      itemsUnowned: "{{count}} sin {{person}} asignado",
      itemsOk_one: "{{count}} periodo por semana",
      itemsOk: "{{count}} periodos por semana",
      itemsNone: "Aún no has añadido nada",
      groupsEmpty: "{{count}} sin contenido",
      groupsUngrouped: "{{count}} {{items}} sin {{group}}",
      groupsOk: "Cada {{item}} está agrupado",
      groupsNone: "Aún no has creado ninguno",
    },

    workload: {
      title: "Carga de {{people}}",
      desc: "Periodos solicitados frente a la capacidad semanal.",
      capacity: "{{used}} / {{capacity}}",
      items: "{{count}} {{items}}",
      unavailable_one: "{{count}} espacio no disponible",
      unavailable: "{{count}} espacios no disponibles",
      empty: "Añade {{people}} para ver la carga aquí.",
      state: {
        idle: "Sin nada asignado",
        light: "Con margen",
        healthy: "En buen ritmo",
        full: "Al límite",
        over: "Por encima de su capacidad",
      },
    },

    groups: {
      items: "{{count}} {{items}}",
      unowned: "{{count}} sin asignar",
      empty: "Aquí todavía no hay nada.",
    },

    capacity: {
      ofSlots: "{{used}} de {{total}} espacios",
      remaining_one: "{{count}} espacio aún libre",
      remaining: "{{count}} espacios aún libres",
      over_one: "{{count}} periodo más del que cabe en la semana",
      over: "{{count}} periodos más de los que caben en la semana",
      gridSlots: "Espacios por semana",
      blocked: "Bloqueados",
      requested: "Solicitados",
      heaviest: "{{items}} con más carga",
    },

    priority: {
      title: "Reparto por prioridad",
      row: "{{count}} {{items}}",
      empty: "Añade {{items}} para ver el reparto.",
    },

    attention: {
      title: "Requiere atención",
      desc_one: "{{count}} cosa que revisar antes de generar.",
      desc: "{{count}} cosas que revisar antes de generar.",
      allClear: "Nada impide generar el horario.",
      unownedItems_one:
        "{{count}} {{items}} no tiene {{person}} asignado y se omitirá al generar.",
      unownedItems:
        "{{count}} {{items}} no tienen {{person}} asignado y se omitirán al generar.",
      overloadedPeople_one:
        "A {{count}} {{people}} se le piden más periodos de los que caben en su semana.",
      overloadedPeople:
        "A {{count}} {{people}} se les piden más periodos de los que caben en su semana.",
      weekOversubscribed:
        "El plan pide {{demand}} periodos pero solo hay {{capacity}} espacios libres.",
      zeroPeriodItems_one: "{{count}} {{items}} tiene cero periodos por semana.",
      zeroPeriodItems: "{{count}} {{items}} tienen cero periodos por semana.",
      emptyGroups_one: "{{count}} {{groups}} no tiene contenido.",
      emptyGroups: "{{count}} {{groups}} no tienen {{items}}.",
      ungroupedItems_one: "{{count}} {{items}} no pertenece a ningún {{group}}.",
      ungroupedItems: "{{count}} {{items}} no pertenecen a ningún {{group}}.",
      idlePeople_one: "{{count}} {{people}} no tiene nada asignado.",
      idlePeople: "{{count}} {{people}} no tienen nada asignado.",
    },

    readiness: {
      title: "Configuración",
      progress: "{{done}} de {{total}} pasos completados",
      steps: {
        people: "Añade tus {{people}}",
        items: "Añade tus {{items}}",
        owners: "Asigna un {{person}} a cada {{item}}",
        groups: "Crea tus {{groups}}",
        schedule: "Guarda tu primer horario",
      },
    },

    actions: {
      title: "Acciones rápidas",
      manage: "Gestionar {{section}}",
      templates: "Plantillas",
      fixedHours: "Horas fijas",
      schedule: {
        education: "Abrir horario",
        company: "Abrir planificación",
        individual: "Abrir mi semana",
      },
    },
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

  // ── Workspace (company mode) ──────────────────────────────────────────────
  workspace: {
    title: "Espacio de Trabajo",
    inviteMembers: "Invitar Miembros",
    pendingInvitations: "Invitaciones Pendientes",
    emailPlaceholder: "colega@ejemplo.com",
    selectRole: "Seleccionar rol",
    roles: { admin: "Administrador", member: "Miembro", viewer: "Visualizador" },
    inviteSent: "Invitación enviada a {{email}}",
    inviteRevoked: "Invitación revocada",
    copyLink: "Copiar enlace de invitación",
    linkCopied: "¡Enlace copiado!",
    memberSince: "Miembro desde {{date}}",
    removeFromWorkspace: "Remover del espacio de trabajo",
  },

  // ── Tasks (company mode) ──────────────────────────────────────────────────
  tasks: {
    newTask: "Nueva Tarea",
    effort: "Esfuerzo (períodos/semana)",
    unassigned: "Sin Asignar",
  },
} as const;

export default es;
