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
    all: "All",
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
    viewAll: "View all {{count}}",
    // Keys ending in _one carry the singular; i18next falls back to the base
    // key for every other count, so only the singular has to be spelled out.
    periods_one: "{{count}} period",
    periods: "{{count}} periods",

    // Per-mode framing. The three workspaces share one data model, so only
    // the questions the overview answers differ.
    modes: {
      education: {
        title: "Term overview",
        subtitle: "Where your timetable stands before you generate it.",
        groupsTitle: "Class coverage",
        groupsDesc: "Periods each class is asking for this week.",
        capacityTitle: "The teaching week",
        capacityDesc: "Slots available against periods to place.",
        priorityDesc: "Which courses the scheduler places first.",
        readinessDesc: "What is left before a timetable can be generated.",
        allClear: "Everything checks out — you can generate a timetable.",
      },
      company: {
        title: "Workspace overview",
        subtitle: "What the team has committed to this week.",
        groupsTitle: "Projects",
        groupsDesc: "Effort committed to each project this week.",
        capacityTitle: "Team capacity",
        capacityDesc: "Working slots available against effort committed.",
        priorityDesc: "Which tasks get scheduled first.",
        readinessDesc: "What is left before the week can be scheduled.",
        allClear: "The plan fits — you can schedule the week.",
      },
      individual: {
        title: "Your week",
        subtitle: "Everything you have committed to, in one place.",
        groupsTitle: "Your groups",
        groupsDesc: "How your activities are split up.",
        capacityTitle: "How full your week is",
        capacityDesc: "Free slots against what you have taken on.",
        priorityDesc: "What gets a place first when the week is tight.",
        readinessDesc: "What is left before your week can be laid out.",
        allClear: "Your week fits — you can lay it out.",
      },
    },

    stats: {
      weeklyPeriods: "Weekly periods",
      committed: "Committed effort",
      weekLoad: "Week load",
      openSlots_one: "of {{count}} open slot",
      openSlots: "of {{count}} open slots",
      slotsUsed: "{{used}} of {{total}} slots claimed",
      peopleOver: "{{count}} over capacity",
      peopleIdle: "{{count}} with nothing assigned",
      peopleOk: "All within weekly capacity",
      peopleNone: "Nobody added yet",
      itemsUnowned: "{{count}} with no {{person}} assigned",
      itemsOk_one: "{{count}} period per week",
      itemsOk: "{{count}} periods per week",
      itemsNone: "Nothing added yet",
      groupsEmpty_one: "{{count}} with nothing in it",
      groupsEmpty: "{{count}} with nothing in them",
      groupsUngrouped: "{{count}} {{items}} not in a {{group}}",
      groupsOk: "Every {{item}} is grouped",
      groupsNone: "None created yet",
    },

    workload: {
      title: "{{people}} workload",
      desc: "Periods requested against weekly capacity.",
      capacity: "{{used}} / {{capacity}}",
      items: "{{count}} {{items}}",
      unavailable_one: "{{count}} slot unavailable",
      unavailable: "{{count}} slots unavailable",
      empty: "Add {{people}} to see workload here.",
      state: {
        idle: "Nothing assigned",
        light: "Room to spare",
        healthy: "On track",
        full: "At capacity",
        over: "Over capacity",
      },
    },

    groups: {
      items: "{{count}} {{items}}",
      unowned: "{{count}} unassigned",
      empty: "Nothing here yet.",
    },

    capacity: {
      ofSlots: "{{used}} of {{total}} slots",
      remaining_one: "{{count}} slot still free",
      remaining: "{{count}} slots still free",
      over_one: "{{count}} period more than the week can hold",
      over: "{{count}} periods more than the week can hold",
      gridSlots: "Slots in a week",
      blocked: "Blocked",
      requested: "Requested",
      heaviest: "Heaviest {{items}}",
    },

    priority: {
      title: "Priority mix",
      row: "{{count}} {{items}}",
      empty: "Add {{items}} to see the mix.",
    },

    attention: {
      title: "Needs attention",
      desc_one: "{{count}} thing to look at before generating.",
      desc: "{{count}} things to look at before generating.",
      allClear: "Nothing is blocking generation.",
      unownedItems_one:
        "{{count}} {{items}} has no {{person}} assigned and will be skipped when generating.",
      unownedItems:
        "{{count}} {{items}} have no {{person}} assigned and will be skipped when generating.",
      overloadedPeople_one:
        "{{count}} {{people}} is asked for more periods than their week can hold.",
      overloadedPeople:
        "{{count}} {{people}} are asked for more periods than their week can hold.",
      weekOversubscribed:
        "The plan asks for {{demand}} periods but only {{capacity}} slots are open.",
      zeroPeriodItems_one: "{{count}} {{items}} is set to zero periods per week.",
      zeroPeriodItems: "{{count}} {{items}} are set to zero periods per week.",
      emptyGroups_one: "{{count}} {{groups}} has nothing in it.",
      emptyGroups: "{{count}} {{groups}} have no {{items}} in them.",
      ungroupedItems_one: "{{count}} {{items}} belongs to no {{group}}.",
      ungroupedItems: "{{count}} {{items}} belong to no {{group}}.",
      idlePeople_one: "{{count}} {{people}} has nothing assigned.",
      idlePeople: "{{count}} {{people}} have nothing assigned.",
    },

    readiness: {
      title: "Setup",
      progress: "{{done}} of {{total}} steps done",
      steps: {
        people: "Add your {{people}}",
        items: "Add your {{items}}",
        owners: "Give every {{item}} a {{person}}",
        groups: "Create your {{groups}}",
        schedule: "Save your first schedule",
      },
    },

    actions: {
      title: "Quick actions",
      manage: "Manage {{section}}",
      templates: "Templates",
      fixedHours: "Fixed hours",
      schedule: {
        education: "Open timetable",
        company: "Open schedule",
        individual: "Open my week",
      },
    },
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
    addDesc: "Create a new {{course}}.",
    noneMatchFilter: "No {{courses}} match this filter",
    unassigned: "Unassigned",
    perWeek_one: "{{count}} period/week",
    perWeek: "{{count}} periods/week",
    noBackToBack: "No back-to-back",
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

  // ── Workspace (company mode) ──────────────────────────────────────────────
  workspace: {
    title: "Workspace",
    inviteMembers: "Invite Members",
    pendingInvitations: "Pending Invitations",
    emailPlaceholder: "colleague@example.com",
    selectRole: "Select role",
    roles: { admin: "Admin", member: "Member", viewer: "Viewer" },
    inviteSent: "Invitation sent to {{email}}",
    inviteRevoked: "Invitation revoked",
    copyLink: "Copy invite link",
    linkCopied: "Link copied!",
    memberSince: "Member since {{date}}",
    removeFromWorkspace: "Remove from workspace",
    none: "You are not in a workspace yet. Create one, or join your team with an invite code.",
    name: "Workspace name",
    create: "Create workspace",
    createDesc: "Start a workspace and invite your team once you are set up.",
    join: "Join workspace",
    joinDesc: "Enter the code an admin shared with you.",
    created: "{{name}} is ready",
    joined: "You joined {{name}}",
    code: "Invite code",
    copyCode: "Copy code",
    codeCopied: "Code copied!",
    copyFailed: "Could not copy — select the code and copy it manually.",
    createInvite: "Create invite",
    inviteDesc: "Send a code, or share the link. Either gets them into this workspace.",
    openInvite: "Open invite (anyone with the link)",
    noInvites: "No invites waiting.",
    adminOnly: "Only admins can invite people.",
    members: "Members",
    membersDesc: "Everyone with access to this workspace.",
    memberCount: "{{count}} {{members}} in this workspace",
    switch: "Switch",
    you: "(you)",
  },

  // ── Tasks (company mode) ──────────────────────────────────────────────────
  tasks: {
    newTask: "New Task",
    effort: "Effort (periods/week)",
    unassigned: "Unassigned",
  },

  // ── Select helpers ────────────────────────────────────────────────────────
  select: {
    selectA: "Select a {{item}}",
    noAvailable: "No {{items}} available",
  },
} as const;

export default en;
export type TranslationKeys = typeof en;
