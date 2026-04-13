const zh = {
  // ── Sidebar / Navigation ──────────────────────────────────────────────────
  nav: {
    overview: "概览",
    core: "核心",
    management: "管理",
    timetables: "课程表",
    templates: "模板",
    analytics: "分析",
    howToUse: "使用说明",
    settings: "设置",
    search: "搜索",
    notifications: "通知",
  },

  // ── Layout page titles ────────────────────────────────────────────────────
  pageTitles: {
    dashboard: "仪表板",
    timetables: "课程表",
    courses: "课程",
    tutors: "教师",
    sessions: "班级",
    templates: "模板",
    analytics: "分析",
    howToUse: "使用说明",
    settings: "设置",
    account: "账户",
    billing: "账单",
    notifications: "通知",
  },

  // ── Common actions & labels ───────────────────────────────────────────────
  common: {
    save: "保存",
    cancel: "取消",
    saveChanges: "保存更改",
    add: "添加",
    edit: "编辑",
    remove: "删除",
    refresh: "刷新",
    name: "名称",
    description: "描述",
    priority: "优先级",
    low: "低",
    medium: "中",
    high: "高",
    noData: "无数据",
    loading: "加载中...",
    success: "成功",
    error: "错误",
    information: "信息",
  },

  // ── Section Header (shared across Tutors / Courses / Sessions / Blocks) ──
  sectionHeader: {
    title: "仪表板",
    subtitle: "欢迎来到您的仪表板！",
    autoGenerate: "自动生成",
    loadSampleData: "加载示例数据",
  },

  // ── Dashboard ─────────────────────────────────────────────────────────────
  dashboard: {
    title: "仪表板",
    subtitle: "欢迎回来！以下是您的日程概览。",
  },

  // ── Database Manager ──────────────────────────────────────────────────────
  databaseManager: {
    title: "数据库概览",
    loadSampleData: "加载示例数据",
    generateTimetable: "生成课程表",
    generateDesc: "根据您的数据库创建课程表",
    generate: "生成",
    aiGenerate: "AI 生成",
  },

  // ── Tutors ────────────────────────────────────────────────────────────────
  tutors: {
    maxPeriodsPerDay: "每天最大课时数",
    noTutorPlaceholder: "例如：王老师",
    noPersonPlaceholder: "例如：张三",
    editTitle: "编辑 {{tutor}}",
    editDesc: "在下方修改 {{tutor}} 的详细信息。",
    emptyTitle: "暂无{{tutor}}",
    emptyDesc: "未找到{{tutors}}，已创建和可用的{{tutors}}将显示在此处",
  },

  // ── Courses ───────────────────────────────────────────────────────────────
  courses: {
    courseName: "{{course}}名称",
    assignTutor: "分配{{tutor}}",
    periodsPerWeek: "每周课时数",
    avoidConsecutive: "避免连续课时",
    selectPriority: "选择优先级",
    noCoursesYet: "尚未添加{{courses}}",
    editTitle: "编辑{{course}}",
    editDesc: "在下方修改{{course}}的详细信息。",
    educationPlaceholder: "例如：数学",
    individualPlaceholder: "例如：晨间瑜伽",
  },

  // ── Sessions ──────────────────────────────────────────────────────────────
  sessions: {
    sessionName: "{{session}}名称",
    assignCourses: "分配{{courses}}",
    noSessionsYet: "尚未添加{{sessions}}",
    editTitle: "编辑{{session}}",
    editDesc: "在下方修改{{session}}的详细信息。",
    educationPlaceholder: "例如：一年级甲班",
    individualPlaceholder: "例如：晨间日程",
  },

  // ── Blocks ────────────────────────────────────────────────────────────────
  blocks: {
    blockType: "块类型",
    selectBlockType: "选择块类型",
    blockedText: "屏蔽文本",
    blockedSlot: "屏蔽时段",
    slotIdentifier: "时段标识符",
    textToBlock: "要屏蔽的文本",
    slotPlaceholder: "例如：1-3（行-列）",
    textPlaceholder: "例如：休息、早读、午餐",
    slotHint: "屏蔽时段是应避免的特定时间段（例如：休息、午餐）。格式：行-列（例如：1-3）",
    textHint: "屏蔽文本是自动生成课程表时应避免的标签（例如：休息、早读、午餐）",
    addBlock: "添加块",
    blockedTextsTitle: "屏蔽文本",
    blockedSlotsTitle: "屏蔽时段",
    noBlockedTexts: "无屏蔽文本",
    noBlockedSlots: "无屏蔽时段",
    noBlocksYet: "尚未添加块",
  },

  // ── Templates ─────────────────────────────────────────────────────────────
  templates: {
    templateName: "模板名称",
    namePlaceholder: "例如：周计划",
    descPlaceholder: "可选描述",
    columnCount: "列数",
    slotDuration: "默认时段时长（分钟）",
    editTitle: "编辑模板",
    editDesc: "在下方修改模板详细信息。",
    created: "创建时间：",
    noTemplatesYet: "暂无模板",
  },

  // ── Timetables ────────────────────────────────────────────────────────────
  timetables: {
    cleared: "课程表已成功清除！",
    noSubjectsError: "请先向数据库添加科目。",
    aiGenerated: "AI 课程表已生成",
    aiGeneratedDesc: "AI 已成功生成课程表！",
    aiGenerationFailed: "AI 生成失败",
    aiFailedDesc: "使用 AI 生成课程表失败。请检查您的 API 密钥后重试。",
    invalidApiKey: "请输入有效的 API 密钥。",
    copied: "课程表数据已复制到剪贴板并记录到控制台！",
    copiedConsole: "课程表数据已记录到控制台（复制到剪贴板失败）",
    exportedPdf: "课程表已成功导出为 PDF！",
    exportedProPdf: "课程表已成功导出为专业版 PDF！",
    exportFailed: "PDF 导出失败。请重试。",
    exportProFailed: "专业版 PDF 导出失败。请重试。",
    templateApplied: "模板已应用",
    templateAppliedDesc: "模板已成功应用！请注意，列数和时长可能需要手动调整。",
    generated: "课程表已生成",
    generatedDesc: "课程表已成功生成！",
    getApiKey: "获取 API 密钥，请访问",
    enterApiKey: "输入您的 Gemini API 密钥",
    monday: "星期一",
    tuesday: "星期二",
    wednesday: "星期三",
    thursday: "星期四",
    friday: "星期五",
  },

  // ── Settings ──────────────────────────────────────────────────────────────
  settings: {
    title: "设置",
    subtitle: "管理您的应用程序偏好",
    tabs: {
      appearance: "外观",
      general: "常规",
      accessibility: "无障碍",
    },
    theme: {
      title: "主题",
      desc: "选择您偏好的颜色模式",
      colorMode: "颜色模式",
      light: "浅色",
      dark: "深色",
      system: "系统",
      hint: "选择应用程序的外观。系统将匹配您的设备设置。",
    },
    typography: {
      title: "字体排版",
      desc: "自定义应用程序的字体设置",
      fontFamily: "字体系列",
      fontSize: "字体大小",
      selectFont: "选择字体",
      selectSize: "选择大小",
    },
    display: {
      title: "显示",
      desc: "调整显示和布局偏好",
      compactMode: "紧凑模式",
      compactHint: "减少间距以实现更密集的布局",
      on: "开",
      off: "关",
    },
    appMode: {
      title: "应用模式",
      desc: "在教育、个人或企业排课模式之间选择",
      label: "使用模式",
      education: "教育",
      individual: "个人",
      company: "企业",
      hint: "<strong>教育</strong> — 教师、课程与班级。<strong>个人</strong> — 人员、活动与群组。<strong>企业</strong> — 成员、任务与项目。",
    },
    language: {
      title: "语言与地区",
      desc: "设置您偏好的语言和地区设置",
      label: "语言",
      selectLang: "选择语言",
      hint: "选择您偏好的界面语言",
    },
    accessibility: {
      title: "无障碍",
      desc: "配置无障碍功能以提升可用性",
      highContrast: "高对比度",
      highContrastHint: "增加对比度以提高可见性",
      animations: "动画",
      animationsHint: "启用平滑过渡和动画效果",
    },
    fontSizes: {
      small: "小",
      medium: "中",
      large: "大",
    },
    languages: {
      en: "英语",
      es: "西班牙语",
      fr: "法语",
      de: "德语",
      zh: "中文",
    },
  },

  // ── Select helpers ────────────────────────────────────────────────────────
  select: {
    selectA: "选择{{item}}",
    noAvailable: "无可用{{items}}",
  },
} as const;

export default zh;
