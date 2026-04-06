const en = {
  // ── Sidebar / Navigation ──────────────────────────────────────────────────
  nav: {
    overview: "Overview",
    core: "Core",
    management: "Management",
    timetables: "Timetables",
    templates: "Templates",
    analytics: "Analytics",
    howToUse: "How to Use",
    settings: "Settings",
    search: "Search",
    notifications: "Notifications",
  },

  // ── Layout page titles ────────────────────────────────────────────────────
  pageTitles: {
    dashboard: "Dashboard",
    timetables: "Timetables",
    courses: "Courses",
    tutors: "Tutors",
    sessions: "Sessions",
    templates: "Templates",
    analytics: "Analytics",
    howToUse: "How to Use",
    settings: "Settings",
    account: "Account",
    billing: "Billing",
    notifications: "Notifications",
  },

  // ── Common actions & labels ───────────────────────────────────────────────
  common: {
    save: "Save",
    cancel: "Cancel",
    saveChanges: "Save Changes",
    add: "Add",
    edit: "Edit",
    remove: "Delete",
    refresh: "Refresh",
    name: "Name",
    description: "Description",
    priority: "Priority",
    low: "Low",
    medium: "Medium",
    high: "High",
    noData: "No data",
    loading: "Loading...",
    success: "Success",
    error: "Error",
    information: "Information",
  },

  // ── Section Header (shared across Tutors / Courses / Sessions / Blocks) ──
  sectionHeader: {
    title: "Dashboard",
    subtitle: "Welcome to your dashboard!",
    autoGenerate: "Auto Generate",
    loadSampleData: "Load Sample Data",
  },

  // ── Dashboard ─────────────────────────────────────────────────────────────
  dashboard: {
    title: "Dashboard",
    subtitle: "Welcome back! Here's an overview of your schedule.",
  },

  // ── Database Manager ──────────────────────────────────────────────────────
  databaseManager: {
    title: "Database Overview",
    loadSampleData: "Load Sample Data",
    generateTimetable: "Generate Timetable",
    generateDesc: "Create timetables based on your database",
    generate: "Generate",
    aiGenerate: "AI Generate",
  },

  // ── Tutors ────────────────────────────────────────────────────────────────
  tutors: {
    maxPeriodsPerDay: "Max Periods Per Day",
    noTutorPlaceholder: "e.g., Dr. Smith",
    noPersonPlaceholder: "e.g., John Doe",
    editTitle: "Edit {{tutor}}",
    editDesc: "Make changes to the {{tutor}} details below.",
    emptyTitle: "No {{tutor}}",
    emptyDesc: "No {{tutors}} found, created and available {{tutors}} will appear here",
  },

  // ── Courses ───────────────────────────────────────────────────────────────
  courses: {
    courseName: "{{course}} Name",
    assignTutor: "Assign {{tutor}}",
    periodsPerWeek: "Periods Per Week",
    avoidConsecutive: "Avoid consecutive periods",
    selectPriority: "Select priority",
    noCoursesYet: "No {{courses}} added yet",
    editTitle: "Edit {{course}}",
    editDesc: "Make changes to the {{course}} details below.",
    educationPlaceholder: "e.g., Mathematics",
    individualPlaceholder: "e.g., Morning Yoga",
  },

  // ── Sessions ──────────────────────────────────────────────────────────────
  sessions: {
    sessionName: "{{session}} Name",
    assignCourses: "Assign {{courses}}",
    noSessionsYet: "No {{sessions}} added yet",
    editTitle: "Edit {{session}}",
    editDesc: "Make changes to the {{session}} details below.",
    educationPlaceholder: "e.g., Class 1A",
    individualPlaceholder: "e.g., Morning Routine",
  },

  // ── Blocks ────────────────────────────────────────────────────────────────
  blocks: {
    blockType: "Block Type",
    selectBlockType: "Select block type",
    blockedText: "Blocked Text",
    blockedSlot: "Blocked Slot",
    slotIdentifier: "Slot Identifier",
    textToBlock: "Text to Block",
    slotPlaceholder: "e.g., 1-3 (row-col)",
    textPlaceholder: "e.g., Break, Devotion, Lunch",
    slotHint: "Blocked slots are specific time slots that should be avoided (e.g., breaks, lunch). Use format: row-col (e.g., 1-3)",
    textHint: "Blocked texts are labels to avoid when auto-generating timetables (e.g., Break, Devotion, Lunch)",
    addBlock: "Add Block",
    blockedTextsTitle: "Blocked Texts",
    blockedSlotsTitle: "Blocked Slots",
    noBlockedTexts: "No blocked texts",
    noBlockedSlots: "No blocked slots",
    noBlocksYet: "No blocks added yet",
  },

  // ── Templates ─────────────────────────────────────────────────────────────
  templates: {
    templateName: "Template Name",
    namePlaceholder: "e.g., Weekly Schedule",
    descPlaceholder: "Optional description",
    columnCount: "Number of Columns",
    slotDuration: "Default Slot Duration (minutes)",
    editTitle: "Edit Template",
    editDesc: "Make changes to the template details below.",
    created: "Created:",
    noTemplatesYet: "No templates yet",
  },

  // ── Timetables ────────────────────────────────────────────────────────────
  timetables: {
    cleared: "Timetable cleared successfully!",
    noSubjectsError: "Please add subjects to the database first.",
    aiGenerated: "AI Timetable Generated",
    aiGeneratedDesc: "AI has successfully generated a timetable!",
    aiGenerationFailed: "AI Generation Failed",
    aiFailedDesc: "Failed to generate timetable with AI. Please check your API key and try again.",
    invalidApiKey: "Please enter a valid API key.",
    copied: "Timetable data copied to clipboard and logged to console!",
    copiedConsole: "Timetable data logged to console (clipboard copy failed)",
    exportedPdf: "Timetable exported as PDF successfully!",
    exportedProPdf: "Timetable exported as Pro PDF successfully!",
    exportFailed: "Failed to export PDF. Please try again.",
    exportProFailed: "Failed to export Pro PDF. Please try again.",
    templateApplied: "Template Applied",
    templateAppliedDesc: "Template applied successfully! Note that column count and durations may need manual adjustment.",
    generated: "Timetable Generated",
    generatedDesc: "Timetable has been generated successfully!",
    getApiKey: "Get your API key from",
    enterApiKey: "Enter your Gemini API key",
    monday: "Monday",
    tuesday: "Tuesday",
    wednesday: "Wednesday",
    thursday: "Thursday",
    friday: "Friday",
  },

  // ── Settings ──────────────────────────────────────────────────────────────
  settings: {
    title: "Settings",
    subtitle: "Manage your application preferences",
    tabs: {
      appearance: "Appearance",
      general: "General",
      accessibility: "Accessibility",
    },
    theme: {
      title: "Theme",
      desc: "Select your preferred color mode",
      colorMode: "Color Mode",
      light: "Light",
      dark: "Dark",
      system: "System",
      hint: "Choose how the app looks. System will match your device settings.",
    },
    typography: {
      title: "Typography",
      desc: "Customize font settings for the application",
      fontFamily: "Font Family",
      fontSize: "Font Size",
      selectFont: "Select font",
      selectSize: "Select size",
    },
    display: {
      title: "Display",
      desc: "Adjust display and layout preferences",
      compactMode: "Compact Mode",
      compactHint: "Reduce spacing for a denser layout",
      on: "On",
      off: "Off",
    },
    appMode: {
      title: "App Mode",
      desc: "Choose between Educational, Individual, or Company scheduling mode",
      label: "Usage Mode",
      education: "Education",
      individual: "Individual",
      company: "Company",
      hint: "<strong>Education</strong> — Tutors, Courses & Classes. <strong>Individual</strong> — People, Activities & Groups. <strong>Company</strong> — Members, Tasks & Projects.",
    },
    language: {
      title: "Language & Region",
      desc: "Set your preferred language and regional settings",
      label: "Language",
      selectLang: "Select language",
      hint: "Select your preferred language for the interface",
    },
    accessibility: {
      title: "Accessibility",
      desc: "Configure accessibility features for better usability",
      highContrast: "High Contrast",
      highContrastHint: "Increase contrast for better visibility",
      animations: "Animations",
      animationsHint: "Enable smooth transitions and animations",
    },
    fontSizes: {
      small: "Small",
      medium: "Medium",
      large: "Large",
    },
    languages: {
      en: "English",
      es: "Spanish",
      fr: "French",
      de: "German",
      zh: "Chinese",
    },
  },

  // ── Select helpers ────────────────────────────────────────────────────────
  select: {
    selectA: "Select a {{item}}",
    noAvailable: "No {{items}} available",
  },
} as const;

export default en;
export type TranslationKeys = typeof en;
