const de = {
  // ── Sidebar / Navigation ──────────────────────────────────────────────────
  nav: {
    overview: "Übersicht",
    core: "Kern",
    management: "Verwaltung",
    timetables: "Stundenpläne",
    templates: "Vorlagen",
    analytics: "Analytik",
    howToUse: "Anleitung",
    settings: "Einstellungen",
    search: "Suche",
    notifications: "Benachrichtigungen",
  },

  // ── Layout page titles ────────────────────────────────────────────────────
  pageTitles: {
    dashboard: "Dashboard",
    timetables: "Stundenpläne",
    courses: "Kurse",
    tutors: "Tutoren",
    sessions: "Sitzungen",
    templates: "Vorlagen",
    analytics: "Analytik",
    howToUse: "Anleitung",
    settings: "Einstellungen",
    account: "Konto",
    billing: "Abrechnung",
    notifications: "Benachrichtigungen",
  },

  // ── Common actions & labels ───────────────────────────────────────────────
  common: {
    save: "Speichern",
    cancel: "Abbrechen",
    saveChanges: "Änderungen speichern",
    add: "Hinzufügen",
    edit: "Bearbeiten",
    remove: "Löschen",
    refresh: "Aktualisieren",
    name: "Name",
    description: "Beschreibung",
    priority: "Priorität",
    low: "Niedrig",
    medium: "Mittel",
    high: "Hoch",
    noData: "Keine Daten",
    loading: "Laden...",
    success: "Erfolg",
    error: "Fehler",
    information: "Information",
  },

  // ── Section Header (shared across Tutors / Courses / Sessions / Blocks) ──
  sectionHeader: {
    title: "Dashboard",
    subtitle: "Willkommen in Ihrem Dashboard!",
    autoGenerate: "Automatisch generieren",
    loadSampleData: "Beispieldaten laden",
  },

  // ── Dashboard ─────────────────────────────────────────────────────────────
  dashboard: {
    title: "Dashboard",
    subtitle: "Willkommen zurück! Hier ist eine Übersicht Ihres Zeitplans.",
  },

  // ── Database Manager ──────────────────────────────────────────────────────
  databaseManager: {
    title: "Datenbankübersicht",
    loadSampleData: "Beispieldaten laden",
    generateTimetable: "Stundenplan erstellen",
    generateDesc: "Stundenpläne basierend auf Ihrer Datenbank erstellen",
    generate: "Erstellen",
    aiGenerate: "KI-Erstellung",
  },

  // ── Tutors ────────────────────────────────────────────────────────────────
  tutors: {
    maxPeriodsPerDay: "Max. Stunden pro Tag",
    noTutorPlaceholder: "z. B. Dr. Müller",
    noPersonPlaceholder: "z. B. Max Mustermann",
    editTitle: "{{tutor}} bearbeiten",
    editDesc: "Änderungen an den Details von {{tutor}} vornehmen.",
    emptyTitle: "Keine {{tutor}}",
    emptyDesc: "Keine {{tutors}} gefunden, erstellte und verfügbare {{tutors}} werden hier angezeigt",
  },

  // ── Courses ───────────────────────────────────────────────────────────────
  courses: {
    courseName: "{{course}}-Name",
    assignTutor: "{{tutor}} zuweisen",
    periodsPerWeek: "Stunden pro Woche",
    avoidConsecutive: "Aufeinanderfolgende Stunden vermeiden",
    selectPriority: "Priorität auswählen",
    noCoursesYet: "Noch keine {{courses}} hinzugefügt",
    editTitle: "{{course}} bearbeiten",
    editDesc: "Änderungen an den Details von {{course}} vornehmen.",
    educationPlaceholder: "z. B. Mathematik",
    individualPlaceholder: "z. B. Morgen-Yoga",
  },

  // ── Sessions ──────────────────────────────────────────────────────────────
  sessions: {
    sessionName: "{{session}}-Name",
    assignCourses: "{{courses}} zuweisen",
    noSessionsYet: "Noch keine {{sessions}} hinzugefügt",
    editTitle: "{{session}} bearbeiten",
    editDesc: "Änderungen an den Details von {{session}} vornehmen.",
    educationPlaceholder: "z. B. Klasse 1A",
    individualPlaceholder: "z. B. Morgenroutine",
  },

  // ── Blocks ────────────────────────────────────────────────────────────────
  blocks: {
    blockType: "Blocktyp",
    selectBlockType: "Blocktyp auswählen",
    blockedText: "Gesperrter Text",
    blockedSlot: "Gesperrter Slot",
    slotIdentifier: "Slot-Kennung",
    textToBlock: "Zu sperrender Text",
    slotPlaceholder: "z. B. 1-3 (Zeile-Spalte)",
    textPlaceholder: "z. B. Pause, Andacht, Mittagessen",
    slotHint: "Gesperrte Slots sind spezifische Zeitfenster, die vermieden werden sollen (z. B. Pausen, Mittagessen). Format: Zeile-Spalte (z. B. 1-3)",
    textHint: "Gesperrte Texte sind Bezeichnungen, die bei der automatischen Generierung von Stundenplänen vermieden werden sollen (z. B. Pause, Andacht, Mittagessen)",
    addBlock: "Block hinzufügen",
    blockedTextsTitle: "Gesperrte Texte",
    blockedSlotsTitle: "Gesperrte Slots",
    noBlockedTexts: "Keine gesperrten Texte",
    noBlockedSlots: "Keine gesperrten Slots",
    noBlocksYet: "Noch keine Blöcke hinzugefügt",
  },

  // ── Templates ─────────────────────────────────────────────────────────────
  templates: {
    templateName: "Vorlagenname",
    namePlaceholder: "z. B. Wochenplan",
    descPlaceholder: "Optionale Beschreibung",
    columnCount: "Anzahl der Spalten",
    slotDuration: "Standard-Slot-Dauer (Minuten)",
    editTitle: "Vorlage bearbeiten",
    editDesc: "Änderungen an den Vorlagendetails vornehmen.",
    created: "Erstellt:",
    noTemplatesYet: "Noch keine Vorlagen",
  },

  // ── Timetables ────────────────────────────────────────────────────────────
  timetables: {
    cleared: "Stundenplan erfolgreich geleert!",
    noSubjectsError: "Bitte fügen Sie zuerst Fächer zur Datenbank hinzu.",
    aiGenerated: "KI-Stundenplan erstellt",
    aiGeneratedDesc: "KI hat erfolgreich einen Stundenplan erstellt!",
    aiGenerationFailed: "KI-Erstellung fehlgeschlagen",
    aiFailedDesc: "Stundenplan konnte nicht mit KI erstellt werden. Bitte API-Schlüssel überprüfen und erneut versuchen.",
    invalidApiKey: "Bitte geben Sie einen gültigen API-Schlüssel ein.",
    copied: "Stundenplandaten in die Zwischenablage kopiert und in der Konsole protokolliert!",
    copiedConsole: "Stundenplandaten in der Konsole protokolliert (Kopieren in Zwischenablage fehlgeschlagen)",
    exportedPdf: "Stundenplan erfolgreich als PDF exportiert!",
    exportedProPdf: "Stundenplan erfolgreich als Pro-PDF exportiert!",
    exportFailed: "PDF-Export fehlgeschlagen. Bitte erneut versuchen.",
    exportProFailed: "Pro-PDF-Export fehlgeschlagen. Bitte erneut versuchen.",
    templateApplied: "Vorlage angewendet",
    templateAppliedDesc: "Vorlage erfolgreich angewendet! Beachten Sie, dass Spaltenanzahl und Dauern möglicherweise manuell angepasst werden müssen.",
    generated: "Stundenplan erstellt",
    generatedDesc: "Stundenplan wurde erfolgreich erstellt!",
    getApiKey: "API-Schlüssel erhalten von",
    enterApiKey: "Gemini-API-Schlüssel eingeben",
    monday: "Montag",
    tuesday: "Dienstag",
    wednesday: "Mittwoch",
    thursday: "Donnerstag",
    friday: "Freitag",
  },

  // ── Settings ──────────────────────────────────────────────────────────────
  settings: {
    title: "Einstellungen",
    subtitle: "Anwendungseinstellungen verwalten",
    tabs: {
      appearance: "Erscheinungsbild",
      general: "Allgemein",
      accessibility: "Barrierefreiheit",
    },
    theme: {
      title: "Design",
      desc: "Bevorzugten Farbmodus auswählen",
      colorMode: "Farbmodus",
      light: "Hell",
      dark: "Dunkel",
      system: "System",
      hint: "Wählen Sie, wie die App aussehen soll. System passt sich Ihren Geräteeinstellungen an.",
    },
    typography: {
      title: "Typografie",
      desc: "Schrifteinstellungen für die Anwendung anpassen",
      fontFamily: "Schriftfamilie",
      fontSize: "Schriftgröße",
      selectFont: "Schrift auswählen",
      selectSize: "Größe auswählen",
    },
    display: {
      title: "Anzeige",
      desc: "Anzeige- und Layouteinstellungen anpassen",
      compactMode: "Kompaktmodus",
      compactHint: "Abstände reduzieren für ein dichteres Layout",
      on: "Ein",
      off: "Aus",
    },
    appMode: {
      title: "App-Modus",
      desc: "Zwischen Bildungs-, Einzel- oder Unternehmensplanungsmodus wählen",
      label: "Verwendungsmodus",
      education: "Bildung",
      individual: "Individuell",
      company: "Unternehmen",
      hint: "<strong>Bildung</strong> — Tutoren, Kurse & Klassen. <strong>Individuell</strong> — Personen, Aktivitäten & Gruppen. <strong>Unternehmen</strong> — Mitglieder, Aufgaben & Projekte.",
    },
    language: {
      title: "Sprache & Region",
      desc: "Bevorzugte Sprache und regionale Einstellungen festlegen",
      label: "Sprache",
      selectLang: "Sprache auswählen",
      hint: "Wählen Sie Ihre bevorzugte Sprache für die Benutzeroberfläche",
    },
    accessibility: {
      title: "Barrierefreiheit",
      desc: "Barrierefreiheitsfunktionen für bessere Benutzerfreundlichkeit konfigurieren",
      highContrast: "Hoher Kontrast",
      highContrastHint: "Kontrast für bessere Sichtbarkeit erhöhen",
      animations: "Animationen",
      animationsHint: "Sanfte Übergänge und Animationen aktivieren",
    },
    fontSizes: {
      small: "Klein",
      medium: "Mittel",
      large: "Groß",
    },
    languages: {
      en: "Englisch",
      es: "Spanisch",
      fr: "Französisch",
      de: "Deutsch",
      zh: "Chinesisch",
    },
  },

  // ── Select helpers ────────────────────────────────────────────────────────
  select: {
    selectA: "{{item}} auswählen",
    noAvailable: "Keine {{items}} verfügbar",
  },
} as const;

export default de;
