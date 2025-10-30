import type { ITimetableDatabase } from "@/interface/database";
import { PRIORITY } from "@/interface/enums";
import { defaultBlockedTexts } from "@/lib/timetable";

export const loadSampleData = () => {
  const sampleDatabase: ITimetableDatabase = {
    tutors: [
      {
        id: "teacher-math",
        name: "Ms. Johnson",
        subjects: ["Mathematics", "Statistics"],
        maxPeriodsPerDay: 4,
        unavailableSlots: ["0-0"], // Not available Monday first period
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
    classes: [
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

  setDatabase(sampleDatabase);
};
