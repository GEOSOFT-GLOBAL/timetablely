const fr = {
  // ── Sidebar / Navigation ──────────────────────────────────────────────────
  nav: {
    overview: "Vue d'ensemble",
    core: "Principal",
    management: "Gestion",
    timetables: "Emplois du temps",
    templates: "Modèles",
    analytics: "Analyses",
    howToUse: "Comment utiliser",
    settings: "Paramètres",
    search: "Rechercher",
    notifications: "Notifications",
  },

  // ── Layout page titles ────────────────────────────────────────────────────
  pageTitles: {
    dashboard: "Tableau de bord",
    timetables: "Emplois du temps",
    courses: "Cours",
    tutors: "Tuteurs",
    sessions: "Séances",
    templates: "Modèles",
    analytics: "Analyses",
    howToUse: "Comment utiliser",
    settings: "Paramètres",
    account: "Compte",
    billing: "Facturation",
    notifications: "Notifications",
  },

  // ── Common actions & labels ───────────────────────────────────────────────
  common: {
    save: "Enregistrer",
    cancel: "Annuler",
    saveChanges: "Enregistrer les modifications",
    add: "Ajouter",
    edit: "Modifier",
    remove: "Supprimer",
    refresh: "Actualiser",
    name: "Nom",
    description: "Description",
    priority: "Priorité",
    low: "Basse",
    medium: "Moyenne",
    high: "Haute",
    noData: "Aucune donnée",
    loading: "Chargement…",
    success: "Succès",
    error: "Erreur",
    information: "Information",
  },

  // ── Section Header ────────────────────────────────────────────────────────
  sectionHeader: {
    title: "Tableau de bord",
    subtitle: "Bienvenue sur votre tableau de bord !",
    autoGenerate: "Générer automatiquement",
    loadSampleData: "Charger des données d'exemple",
  },

  // ── Dashboard ─────────────────────────────────────────────────────────────
  dashboard: {
    title: "Tableau de bord",
    subtitle: "Bon retour ! Voici un aperçu de votre emploi du temps.",
  },

  // ── Database Manager ──────────────────────────────────────────────────────
  databaseManager: {
    title: "Aperçu de la base de données",
    loadSampleData: "Charger des données d'exemple",
    generateTimetable: "Générer un emploi du temps",
    generateDesc: "Créer des emplois du temps à partir de votre base de données",
    generate: "Générer",
    aiGenerate: "Générer par IA",
  },

  // ── Tutors ────────────────────────────────────────────────────────────────
  tutors: {
    maxPeriodsPerDay: "Nb max de périodes par jour",
    noTutorPlaceholder: "ex. : Dr Dupont",
    noPersonPlaceholder: "ex. : Jean Martin",
    editTitle: "Modifier {{tutor}}",
    editDesc: "Apportez des modifications aux détails de {{tutor}} ci-dessous.",
    emptyTitle: "Aucun {{tutor}}",
    emptyDesc: "Aucun {{tutors}} trouvé. Les {{tutors}} créés et disponibles apparaîtront ici",
  },

  // ── Courses ───────────────────────────────────────────────────────────────
  courses: {
    courseName: "Nom du {{course}}",
    assignTutor: "Assigner {{tutor}}",
    periodsPerWeek: "Périodes par semaine",
    avoidConsecutive: "Éviter les périodes consécutives",
    selectPriority: "Sélectionner la priorité",
    noCoursesYet: "Aucun {{courses}} ajouté pour l'instant",
    editTitle: "Modifier {{course}}",
    editDesc: "Apportez des modifications aux détails de {{course}} ci-dessous.",
    educationPlaceholder: "ex. : Mathématiques",
    individualPlaceholder: "ex. : Yoga matinal",
  },

  // ── Sessions ──────────────────────────────────────────────────────────────
  sessions: {
    sessionName: "Nom de la {{session}}",
    assignCourses: "Assigner {{courses}}",
    noSessionsYet: "Aucune {{sessions}} ajoutée pour l'instant",
    editTitle: "Modifier {{session}}",
    editDesc: "Apportez des modifications aux détails de {{session}} ci-dessous.",
    educationPlaceholder: "ex. : Classe 1A",
    individualPlaceholder: "ex. : Routine matinale",
  },

  // ── Blocks ────────────────────────────────────────────────────────────────
  blocks: {
    blockType: "Type de blocage",
    selectBlockType: "Sélectionner le type de blocage",
    blockedText: "Texte bloqué",
    blockedSlot: "Créneau bloqué",
    slotIdentifier: "Identifiant du créneau",
    textToBlock: "Texte à bloquer",
    slotPlaceholder: "ex. : 1-3 (ligne-col)",
    textPlaceholder: "ex. : Pause, Dévotion, Déjeuner",
    slotHint: "Les créneaux bloqués sont des intervalles de temps spécifiques à éviter (ex. : pauses, déjeuner). Format : ligne-col (ex. : 1-3)",
    textHint: "Les textes bloqués sont des étiquettes à éviter lors de la génération automatique (ex. : Pause, Dévotion, Déjeuner)",
    addBlock: "Ajouter un blocage",
    blockedTextsTitle: "Textes bloqués",
    blockedSlotsTitle: "Créneaux bloqués",
    noBlockedTexts: "Aucun texte bloqué",
    noBlockedSlots: "Aucun créneau bloqué",
    noBlocksYet: "Aucun blocage ajouté pour l'instant",
  },

  // ── Templates ─────────────────────────────────────────────────────────────
  templates: {
    templateName: "Nom du modèle",
    namePlaceholder: "ex. : Planning hebdomadaire",
    descPlaceholder: "Description facultative",
    columnCount: "Nombre de colonnes",
    slotDuration: "Durée par défaut des créneaux (minutes)",
    editTitle: "Modifier le modèle",
    editDesc: "Apportez des modifications aux détails du modèle ci-dessous.",
    created: "Créé le :",
    noTemplatesYet: "Aucun modèle pour l'instant",
  },

  // ── Timetables ────────────────────────────────────────────────────────────
  timetables: {
    cleared: "Emploi du temps effacé avec succès !",
    noSubjectsError: "Veuillez d'abord ajouter des matières à la base de données.",
    aiGenerated: "Emploi du temps généré par IA",
    aiGeneratedDesc: "L'IA a généré un emploi du temps avec succès !",
    aiGenerationFailed: "Échec de la génération par IA",
    aiFailedDesc: "Impossible de générer l'emploi du temps par IA. Vérifiez votre clé API et réessayez.",
    invalidApiKey: "Veuillez entrer une clé API valide.",
    copied: "Données de l'emploi du temps copiées dans le presse-papiers et consignées dans la console !",
    copiedConsole: "Données consignées dans la console (échec de la copie dans le presse-papiers)",
    exportedPdf: "Emploi du temps exporté en PDF avec succès !",
    exportedProPdf: "Emploi du temps exporté en PDF Pro avec succès !",
    exportFailed: "Échec de l'export en PDF. Veuillez réessayer.",
    exportProFailed: "Échec de l'export en PDF Pro. Veuillez réessayer.",
    templateApplied: "Modèle appliqué",
    templateAppliedDesc: "Modèle appliqué avec succès ! Le nombre de colonnes et les durées peuvent nécessiter un ajustement manuel.",
    generated: "Emploi du temps généré",
    generatedDesc: "L'emploi du temps a été généré avec succès !",
    getApiKey: "Obtenez votre clé API sur",
    enterApiKey: "Entrez votre clé API Gemini",
    monday: "Lundi",
    tuesday: "Mardi",
    wednesday: "Mercredi",
    thursday: "Jeudi",
    friday: "Vendredi",
  },

  // ── Settings ──────────────────────────────────────────────────────────────
  settings: {
    title: "Paramètres",
    subtitle: "Gérez les préférences de votre application",
    tabs: {
      appearance: "Apparence",
      general: "Général",
      accessibility: "Accessibilité",
    },
    theme: {
      title: "Thème",
      desc: "Sélectionnez votre mode de couleur préféré",
      colorMode: "Mode de couleur",
      light: "Clair",
      dark: "Sombre",
      system: "Système",
      hint: "Choisissez l'apparence de l'application. Système suivra les paramètres de votre appareil.",
    },
    typography: {
      title: "Typographie",
      desc: "Personnalisez les paramètres de police de l'application",
      fontFamily: "Famille de police",
      fontSize: "Taille de police",
      selectFont: "Sélectionner une police",
      selectSize: "Sélectionner une taille",
    },
    display: {
      title: "Affichage",
      desc: "Ajustez les préférences d'affichage et de mise en page",
      compactMode: "Mode compact",
      compactHint: "Réduire l'espacement pour une mise en page plus dense",
      on: "Activé",
      off: "Désactivé",
    },
    appMode: {
      title: "Mode d'application",
      desc: "Choisissez entre le mode de planification Éducatif, Individuel ou Entreprise",
      label: "Mode d'utilisation",
      education: "Éducation",
      individual: "Individuel",
      company: "Entreprise",
      hint: "<strong>Éducation</strong> — Tuteurs, Cours &amp; Classes. <strong>Individuel</strong> — Personnes, Activités &amp; Groupes. <strong>Entreprise</strong> — Membres, Tâches &amp; Projets.",
    },
    language: {
      title: "Langue et région",
      desc: "Définissez votre langue et vos paramètres régionaux préférés",
      label: "Langue",
      selectLang: "Sélectionner une langue",
      hint: "Sélectionnez votre langue préférée pour l'interface",
    },
    accessibility: {
      title: "Accessibilité",
      desc: "Configurez les fonctionnalités d'accessibilité pour une meilleure ergonomie",
      highContrast: "Contraste élevé",
      highContrastHint: "Augmenter le contraste pour une meilleure visibilité",
      animations: "Animations",
      animationsHint: "Activer les transitions et animations fluides",
    },
    fontSizes: {
      small: "Petit",
      medium: "Moyen",
      large: "Grand",
    },
    languages: {
      en: "Anglais",
      es: "Espagnol",
      fr: "Français",
      de: "Allemand",
      zh: "Chinois",
    },
  },

  // ── Select helpers ────────────────────────────────────────────────────────
  select: {
    selectA: "Sélectionner un {{item}}",
    noAvailable: "Aucun {{items}} disponible",
  },
} as const;

export default fr;
