import { v4 as uuidv4 } from "uuid";

import type { AppMode } from "@/context/app-mode-context";
import type { ITimetableDatabase } from "@/interface/database";
import { PRIORITY } from "@/interface/enums";
import { defaultBlockedTexts } from "@/lib/timetable";

/**
 * Mode-aware copy and starter data for the onboarding flow.
 *
 * The three modes share one data model — people, work items and groups — so
 * everything here is keyed by mode and differs only in wording and examples.
 */
export interface ModeCopy {
  /** Label for the workspace name field. */
  workspaceLabel: string;
  workspacePlaceholder: string;
  workspaceHint: string;
  /** Plural nouns for the three record types, matching useAppMode's labels. */
  people: string;
  workItems: string;
  groups: string;
  /** Framing for the schedule step. */
  scheduleHint: string;
  /** What the sample data contains, described in one line. */
  sampleSummary: string;
}

export const modeCopy: Record<AppMode, ModeCopy> = {
  education: {
    workspaceLabel: "What is your institution called?",
    workspacePlaceholder: "Springfield High School",
    workspaceHint: "This appears on exported timetables.",
    people: "Tutors",
    workItems: "Courses",
    groups: "Classes",
    scheduleHint:
      "Set the teaching day. You can still change any individual period later.",
    sampleSummary: "3 tutors, 3 courses and one class to explore",
  },
  company: {
    workspaceLabel: "What is your organisation called?",
    workspacePlaceholder: "Northwind Studio",
    workspaceHint: "This appears on exported plans and shared views.",
    people: "Members",
    workItems: "Tasks",
    groups: "Projects",
    scheduleHint:
      "Set your team's working day. Individual members can have their own availability.",
    sampleSummary: "3 members, 3 tasks and one project to explore",
  },
  individual: {
    workspaceLabel: "What should we call your workspace?",
    workspacePlaceholder: "My week",
    workspaceHint: "Only you will see this.",
    people: "People",
    workItems: "Activities",
    groups: "Groups",
    scheduleHint:
      "Set the hours you actually want scheduled. Everything else stays free.",
    sampleSummary: "3 activities and one group to explore",
  },
};

/** Slot lengths offered in the schedule step. */
export const slotDurationOptions = [30, 45, 60, 90];

export const weekdayOptions = [
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
  "Sunday",
];

/**
 * Builds a starter database for the chosen mode.
 *
 * IDs are generated per call so seeding twice cannot collide, and courses are
 * wired to real tutor IDs so the scheduler can run immediately.
 */
export function buildSampleDatabase(mode: AppMode): ITimetableDatabase {
  const empty: ITimetableDatabase = {
    tutors: [],
    courses: [],
    sessions: [],
    blockedSlots: [],
    blockedTexts: defaultBlockedTexts,
    templates: [],
  };

  if (mode === "education") {
    const tutors = [
      { id: uuidv4(), name: "A. Adeyemi", subjects: ["Mathematics"] },
      { id: uuidv4(), name: "C. Okafor", subjects: ["English"] },
      { id: uuidv4(), name: "T. Bello", subjects: ["Physics"] },
    ];
    const courses = [
      {
        id: uuidv4(),
        name: "Mathematics",
        teacherId: tutors[0].id,
        periodsPerWeek: 5,
        priority: PRIORITY.HIGH,
      },
      {
        id: uuidv4(),
        name: "English",
        teacherId: tutors[1].id,
        periodsPerWeek: 4,
        priority: PRIORITY.MEDIUM,
      },
      {
        id: uuidv4(),
        name: "Physics",
        teacherId: tutors[2].id,
        periodsPerWeek: 3,
        priority: PRIORITY.MEDIUM,
      },
    ];
    return {
      ...empty,
      tutors,
      courses,
      sessions: [
        {
          id: uuidv4(),
          name: "Grade 10A",
          subjects: courses.map((course) => course.id),
        },
      ],
    };
  }

  if (mode === "company") {
    const members = [
      { id: uuidv4(), name: "Design lead", subjects: ["Design"] },
      { id: uuidv4(), name: "Engineer", subjects: ["Engineering"] },
      { id: uuidv4(), name: "Project manager", subjects: ["Delivery"] },
    ];
    const tasks = [
      {
        id: uuidv4(),
        name: "Design review",
        teacherId: members[0].id,
        periodsPerWeek: 2,
        priority: PRIORITY.HIGH,
      },
      {
        id: uuidv4(),
        name: "Build and ship",
        teacherId: members[1].id,
        periodsPerWeek: 5,
        priority: PRIORITY.HIGH,
      },
      {
        id: uuidv4(),
        name: "Weekly planning",
        teacherId: members[2].id,
        periodsPerWeek: 1,
        priority: PRIORITY.MEDIUM,
      },
    ];
    return {
      ...empty,
      tutors: members,
      courses: tasks,
      sessions: [
        {
          id: uuidv4(),
          name: "Website revamp",
          subjects: tasks.map((task) => task.id),
        },
      ],
    };
  }

  // individual
  const self = { id: uuidv4(), name: "Me", subjects: ["Personal"] };
  const activities = [
    {
      id: uuidv4(),
      name: "Deep work",
      teacherId: self.id,
      periodsPerWeek: 5,
      priority: PRIORITY.HIGH,
    },
    {
      id: uuidv4(),
      name: "Exercise",
      teacherId: self.id,
      periodsPerWeek: 3,
      priority: PRIORITY.MEDIUM,
    },
    {
      id: uuidv4(),
      name: "Reading",
      teacherId: self.id,
      periodsPerWeek: 2,
      priority: PRIORITY.LOW,
    },
  ];
  return {
    ...empty,
    tutors: [self],
    courses: activities,
    sessions: [
      {
        id: uuidv4(),
        name: "My week",
        subjects: activities.map((activity) => activity.id),
      },
    ],
  };
}
