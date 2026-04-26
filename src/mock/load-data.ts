import type { ITimetableDatabase } from "@/interface/database";
import { PRIORITY } from "@/interface/enums";
import { defaultBlockedTexts } from "@/lib/timetable";

// ───── Education Mode Sample Data ─────
export const sampleDatabase: ITimetableDatabase = {
  tutors: [
    {
      id: "teacher-math",
      name: "Ms. Johnson",
      subjects: ["Mathematics", "Statistics"],
      maxPeriodsPerDay: 4,
      unavailableSlots: ["0-0"],
    },
    {
      id: "teacher-english",
      name: "Mr. Smith",
      subjects: ["English", "Literature"],
      maxPeriodsPerDay: 3,
      unavailableSlots: [],
    },
    {
      id: "teacher-science",
      name: "Dr. Brown",
      subjects: ["Physics", "Chemistry", "Biology"],
      maxPeriodsPerDay: 4,
      unavailableSlots: [],
    },
    {
      id: "teacher-history",
      name: "Ms. Davis",
      subjects: ["History", "Geography"],
      maxPeriodsPerDay: 3,
      unavailableSlots: [],
    },
    {
      id: "teacher-pe",
      name: "Coach Wilson",
      subjects: ["Physical Education", "Health"],
      maxPeriodsPerDay: 2,
      unavailableSlots: [],
    },
  ],
  courses: [
    {
      id: "math",
      name: "Mathematics",
      teacherId: "teacher-math",
      periodsPerWeek: 5,
      priority: PRIORITY.HIGH,
      avoidConsecutive: false,
    },
    {
      id: "english",
      name: "English",
      teacherId: "teacher-english",
      periodsPerWeek: 4,
      priority: PRIORITY.HIGH,
      avoidConsecutive: false,
    },
    {
      id: "physics",
      name: "Physics",
      teacherId: "teacher-science",
      periodsPerWeek: 3,
      priority: PRIORITY.MEDIUM,
      avoidConsecutive: true,
    },
    {
      id: "chemistry",
      name: "Chemistry",
      teacherId: "teacher-science",
      periodsPerWeek: 3,
      priority: PRIORITY.MEDIUM,
      avoidConsecutive: true,
    },
    {
      id: "biology",
      name: "Biology",
      teacherId: "teacher-science",
      periodsPerWeek: 2,
      priority: PRIORITY.MEDIUM,
      avoidConsecutive: false,
    },
    {
      id: "history",
      name: "History",
      teacherId: "teacher-history",
      periodsPerWeek: 3,
      priority: PRIORITY.MEDIUM,
      avoidConsecutive: false,
    },
    {
      id: "geography",
      name: "Geography",
      teacherId: "teacher-history",
      periodsPerWeek: 2,
      priority: PRIORITY.LOW,
      avoidConsecutive: false,
    },
    {
      id: "pe",
      name: "Physical Education",
      teacherId: "teacher-pe",
      periodsPerWeek: 2,
      priority: PRIORITY.LOW,
      avoidConsecutive: true,
    },
  ],
  sessions: [
    {
      id: "class-1a",
      name: "Class 1A",
      subjects: ["math", "english", "physics", "history", "pe"],
    },
    {
      id: "class-1b",
      name: "Class 1B",
      subjects: ["math", "english", "chemistry", "geography", "pe"],
    },
    {
      id: "class-1c",
      name: "Class 1C",
      subjects: ["math", "english", "biology", "history", "pe"],
    },
  ],
  blockedSlots: [],
  blockedTexts: defaultBlockedTexts,
  templates: [],
};

// ───── Individual Mode Sample Data ─────
export const sampleDatabaseIndividual: ITimetableDatabase = {
  tutors: [
    {
      id: "person-alex",
      name: "Alex",
      subjects: ["Yoga", "Meditation"],
      maxPeriodsPerDay: 2,
      unavailableSlots: [],
    },
    {
      id: "person-casey",
      name: "Casey",
      subjects: ["Running", "Strength Training"],
      maxPeriodsPerDay: 3,
      unavailableSlots: [],
    },
  ],
  courses: [
    {
      id: "yoga",
      name: "Morning Yoga",
      teacherId: "person-alex",
      periodsPerWeek: 3,
      priority: PRIORITY.HIGH,
      avoidConsecutive: false,
    },
    {
      id: "meditation",
      name: "Meditation",
      teacherId: "person-alex",
      periodsPerWeek: 4,
      priority: PRIORITY.HIGH,
      avoidConsecutive: false,
    },
    {
      id: "running",
      name: "Evening Run",
      teacherId: "person-casey",
      periodsPerWeek: 3,
      priority: PRIORITY.MEDIUM,
      avoidConsecutive: true,
    },
    {
      id: "strength",
      name: "Strength Training",
      teacherId: "person-casey",
      periodsPerWeek: 2,
      priority: PRIORITY.MEDIUM,
      avoidConsecutive: false,
    },
  ],
  sessions: [
    {
      id: "group-wellness",
      name: "Wellness Routine",
      subjects: ["yoga", "meditation", "running"],
    },
    {
      id: "group-fitness",
      name: "Fitness Plan",
      subjects: ["running", "strength"],
    },
  ],
  blockedSlots: [],
  blockedTexts: defaultBlockedTexts,
  templates: [],
};

// ───── Company Mode Sample Data ─────
export const sampleDatabaseCompany: ITimetableDatabase = {
  tutors: [
    {
      id: "member-alice",
      name: "Alice Johnson",
      subjects: ["Frontend Development", "UI/UX Design"],
      maxPeriodsPerDay: 4,
      unavailableSlots: [],
    },
    {
      id: "member-bob",
      name: "Bob Smith",
      subjects: ["Backend Development", "DevOps"],
      maxPeriodsPerDay: 4,
      unavailableSlots: [],
    },
    {
      id: "member-carol",
      name: "Carol Davis",
      subjects: ["Project Management", "QA Testing"],
      maxPeriodsPerDay: 3,
      unavailableSlots: [],
    },
  ],
  courses: [
    {
      id: "task-api",
      name: "Build REST API",
      teacherId: "member-bob",
      periodsPerWeek: 5,
      priority: PRIORITY.HIGH,
      avoidConsecutive: false,
    },
    {
      id: "task-ui",
      name: "Design Dashboard",
      teacherId: "member-alice",
      periodsPerWeek: 4,
      priority: PRIORITY.HIGH,
      avoidConsecutive: false,
    },
    {
      id: "task-testing",
      name: "QA Testing Sprint",
      teacherId: "member-carol",
      periodsPerWeek: 3,
      priority: PRIORITY.MEDIUM,
      avoidConsecutive: true,
    },
    {
      id: "task-devops",
      name: "Setup CI/CD Pipeline",
      teacherId: "member-bob",
      periodsPerWeek: 2,
      priority: PRIORITY.MEDIUM,
      avoidConsecutive: false,
    },
    {
      id: "task-review",
      name: "Code Review Session",
      teacherId: "member-alice",
      periodsPerWeek: 2,
      priority: PRIORITY.LOW,
      avoidConsecutive: true,
    },
  ],
  sessions: [
    {
      id: "project-webapp",
      name: "Web App Project",
      subjects: ["task-api", "task-ui", "task-testing"],
    },
    {
      id: "project-infra",
      name: "Infrastructure Project",
      subjects: ["task-devops", "task-testing"],
    },
  ],
  blockedSlots: [],
  blockedTexts: defaultBlockedTexts,
  templates: [],
};

// ───── Helper function to get sample data by mode ─────
export const getSampleDatabaseForMode = (
  mode: "education" | "individual" | "company"
): ITimetableDatabase => {
  switch (mode) {
    case "individual":
      return sampleDatabaseIndividual;
    case "company":
      return sampleDatabaseCompany;
    case "education":
    default:
      return sampleDatabase;
  }
};
