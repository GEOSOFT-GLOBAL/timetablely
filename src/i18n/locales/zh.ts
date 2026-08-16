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
    viewAll: "查看全部 {{count}} 项",
    periods: "{{count}} 个课时",

    modes: {
      education: {
        title: "本学期概览",
        subtitle: "生成课表之前，先看看目前的情况。",
        groupsTitle: "各班级课时",
        groupsDesc: "本周每个班级所需的课时。",
        capacityTitle: "教学周",
        capacityDesc: "可用时段与待排课时的对比。",
        priorityDesc: "排课时优先安排哪些课程。",
        readinessDesc: "生成课表之前还需要完成的步骤。",
        allClear: "一切就绪，可以生成课表了。",
      },
      company: {
        title: "工作区概览",
        subtitle: "团队本周承诺完成的工作。",
        groupsTitle: "项目",
        groupsDesc: "本周投入到每个项目的工作量。",
        capacityTitle: "团队容量",
        capacityDesc: "可用工作时段与已承诺工作量的对比。",
        priorityDesc: "优先安排哪些任务。",
        readinessDesc: "安排本周工作之前还需要完成的步骤。",
        allClear: "计划排得下，可以安排本周工作了。",
      },
      individual: {
        title: "你的一周",
        subtitle: "把你答应过的事都放在一处。",
        groupsTitle: "你的分组",
        groupsDesc: "你的活动是怎么分组的。",
        capacityTitle: "这一周有多满",
        capacityDesc: "空闲时段与你已承担事项的对比。",
        priorityDesc: "时间紧张时，先给什么留位置。",
        readinessDesc: "安排这一周之前还需要完成的步骤。",
        allClear: "这一周排得下，可以开始安排了。",
      },
    },

    stats: {
      weeklyPeriods: "每周课时",
      committed: "已承诺工作量",
      weekLoad: "本周负载",
      openSlots: "共 {{count}} 个空闲时段",
      slotsUsed: "已占用 {{total}} 个时段中的 {{used}} 个",
      peopleOver: "{{count}} 人超出容量",
      peopleIdle: "{{count}} 人没有分配任务",
      peopleOk: "所有人都在每周容量之内",
      peopleNone: "尚未添加任何人",
      itemsUnowned: "{{count}} 项未指派{{person}}",
      itemsOk: "每周 {{count}} 个课时",
      itemsNone: "尚未添加任何内容",
      groupsEmpty: "{{count}} 个为空",
      groupsUngrouped: "{{count}} 个{{items}}不属于任何{{group}}",
      groupsOk: "每个{{item}}都已分组",
      groupsNone: "尚未创建",
    },

    workload: {
      title: "{{people}}负载",
      desc: "所需课时与每周容量的对比。",
      capacity: "{{used}} / {{capacity}}",
      items: "{{count}} 个{{items}}",
      unavailable: "{{count}} 个时段不可用",
      empty: "添加{{people}}后即可在此查看负载。",
      state: {
        idle: "没有分配",
        light: "还有余量",
        healthy: "进度正常",
        full: "已满",
        over: "超出容量",
      },
    },

    groups: {
      items: "{{count}} 个{{items}}",
      unowned: "{{count}} 项未指派",
      empty: "这里还没有内容。",
    },

    capacity: {
      ofSlots: "{{total}} 个时段中的 {{used}} 个",
      remaining: "还有 {{count}} 个时段空闲",
      over: "比这一周能容纳的多出 {{count}} 个课时",
      gridSlots: "每周时段",
      blocked: "已屏蔽",
      requested: "所需",
      heaviest: "占用最多的{{items}}",
    },

    priority: {
      title: "优先级分布",
      row: "{{count}} 个{{items}}",
      empty: "添加{{items}}后即可查看分布。",
    },

    attention: {
      title: "需要处理",
      desc: "生成之前有 {{count}} 处需要查看。",
      allClear: "没有任何问题会阻碍生成。",
      unownedItems: "{{count}} 个{{items}}未指派{{person}}，生成时会被跳过。",
      overloadedPeople: "{{count}} 位{{people}}被安排的课时超出了其一周的容量。",
      weekOversubscribed:
        "计划需要 {{demand}} 个课时，但只有 {{capacity}} 个时段可用。",
      zeroPeriodItems: "{{count}} 个{{items}}的每周课时为零。",
      emptyGroups: "{{count}} 个{{groups}}中没有任何{{items}}。",
      ungroupedItems: "{{count}} 个{{items}}不属于任何{{group}}。",
      idlePeople: "{{count}} 位{{people}}没有分配任何内容。",
    },

    readiness: {
      title: "设置",
      progress: "已完成 {{total}} 个步骤中的 {{done}} 个",
      steps: {
        people: "添加{{people}}",
        items: "添加{{items}}",
        owners: "为每个{{item}}指派{{person}}",
        groups: "创建{{groups}}",
        schedule: "保存第一份日程",
      },
    },

    actions: {
      title: "快捷操作",
      manage: "管理{{section}}",
      templates: "模板",
      fixedHours: "固定时间",
      schedule: {
        education: "打开课表",
        company: "打开日程",
        individual: "打开我的一周",
      },
    },
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
  // ── Workspace (company mode) ──────────────────────────────────────────────
  workspace: {
    title: "工作空间",
    inviteMembers: "邀请成员",
    pendingInvitations: "待处理邀请",
    emailPlaceholder: "colleague@example.com",
    selectRole: "选择角色",
    roles: { admin: "管理员", member: "成员", viewer: "查看者" },
    inviteSent: "邀请已发送至 {{email}}",
    inviteRevoked: "邀请已撤销",
    copyLink: "复制邀请链接",
    linkCopied: "链接已复制!",
    memberSince: "成员于 {{date}} 加入",
    removeFromWorkspace: "从工作空间移除",
  },

  // ── Tasks (company mode) ──────────────────────────────────────────────────
  tasks: {
    newTask: "新任务",
    effort: "工作量 (周期/周)",
    unassigned: "未分配",
  },
  // ── Select helpers ────────────────────────────────────────────────────────
  select: {
    selectA: "选择{{item}}",
    noAvailable: "无可用{{items}}",
  },
} as const;

export default zh;
