import type { AppMode } from "@/context/app-mode-context";
import {
  BriefcaseIcon,
  GraduationCapIcon,
  UserIcon,
  type LucideIcon,
} from "lucide-react";

/**
 * Single source of truth for the three ways Timetablely is used.
 *
 * The marketing site, the solutions pages, the feature grid and the pricing
 * page all read from here, so the positioning only ever has to change in one
 * place. `mode` maps each solution onto the in-app AppMode so a visitor who
 * picks "Teams" on the website lands in the matching workspace vocabulary.
 */
export interface Solution {
  /** URL segment: /solutions/<slug> */
  slug: string;
  /** In-app workspace mode this solution maps to. */
  mode: AppMode;
  /** Short label used in nav and tabs. */
  name: string;
  /** One-line positioning used on cards. */
  tagline: string;
  /** Who this is for, shown under the tagline. */
  audience: string;
  icon: LucideIcon;
  /**
   * Tailwind classes for the solution's accent. Kept as explicit strings so
   * Tailwind's scanner can see them.
   */
  accent: {
    text: string;
    bg: string;
    border: string;
    dot: string;
  };
  /** Page headline for /solutions/<slug>. */
  headline: string;
  /** Page sub-headline. */
  description: string;
  /** The in-app vocabulary for this mode, shown as a "what things are called" table. */
  terminology: { concept: string; label: string }[];
  /** Three to four capabilities that matter most to this audience. */
  capabilities: { title: string; description: string }[];
  /** How a new user gets to value, in order. */
  workflow: { title: string; description: string }[];
  /** Concrete outcomes, used as the proof strip. */
  outcomes: string[];
}

export const solutions: Solution[] = [
  {
    slug: "institutions",
    mode: "education",
    name: "Institutions",
    tagline: "Timetable scheduling for schools and universities",
    audience: "Schools, universities, training centres",
    icon: GraduationCapIcon,
    accent: {
      text: "text-blue-600 dark:text-blue-400",
      bg: "bg-blue-500/10",
      border: "border-blue-500/30",
      dot: "bg-blue-500",
    },
    headline: "Build a full term timetable in an afternoon",
    description:
      "Generate conflict-free schedules across every class, tutor and room. Set the constraints once, and let Timetablely do the placement — then adjust anything by hand.",
    terminology: [
      { concept: "People", label: "Tutors" },
      { concept: "Work items", label: "Courses" },
      { concept: "Groups", label: "Classes" },
    ],
    capabilities: [
      {
        title: "Constraint-aware generation",
        description:
          "Tutor availability, periods per week, course priority and room limits are respected before a single cell is filled.",
      },
      {
        title: "Conflict detection",
        description:
          "Double-booked tutors and overlapping classes surface as you edit, not after you have printed 40 copies.",
      },
      {
        title: "Blocked periods",
        description:
          "Assemblies, breaks and lunch are carved out of the grid and stay excluded from every regeneration.",
      },
      {
        title: "Print-ready export",
        description:
          "Export a whole term as PDF, per class or per tutor, with headers your registrar will accept.",
      },
    ],
    workflow: [
      {
        title: "Add your tutors and courses",
        description:
          "Import from CSV or enter them directly. Set availability and periods per week as you go.",
      },
      {
        title: "Define classes and blocked periods",
        description:
          "Group courses into classes, then mark the periods that can never be scheduled.",
      },
      {
        title: "Generate and refine",
        description:
          "Produce a full grid in seconds, then drag any session to a different slot.",
      },
      {
        title: "Publish and export",
        description: "Share the live timetable or export a PDF per class.",
      },
    ],
    outcomes: [
      "A full term scheduled in one sitting",
      "No double-booked tutors",
      "One grid every department reads from",
    ],
  },
  {
    slug: "teams",
    mode: "company",
    name: "Teams",
    tagline: "Project management for organisations",
    audience: "Startups, agencies, internal teams",
    icon: BriefcaseIcon,
    accent: {
      text: "text-violet-600 dark:text-violet-400",
      bg: "bg-violet-500/10",
      border: "border-violet-500/30",
      dot: "bg-violet-500",
    },
    headline: "Plan the work, then see where it actually lands",
    description:
      "Projects, tasks and members in one workspace — with the scheduling engine underneath, so a plan is a calendar rather than a wish list.",
    terminology: [
      { concept: "People", label: "Members" },
      { concept: "Work items", label: "Tasks" },
      { concept: "Groups", label: "Projects" },
    ],
    capabilities: [
      {
        title: "Projects and tasks",
        description:
          "Group work into projects, assign owners, set priority, and track it through to done.",
      },
      {
        title: "Capacity-aware planning",
        description:
          "Members have real availability. Timetablely places work against it instead of over it.",
      },
      {
        title: "Shared team view",
        description:
          "One board every member reads from, so nobody is guessing what this week looks like.",
      },
      {
        title: "Reporting",
        description:
          "See workload distribution and where the plan is over-committed before the week starts.",
      },
    ],
    workflow: [
      {
        title: "Invite your members",
        description: "Add the team and set each person's working availability.",
      },
      {
        title: "Create projects",
        description: "Group related work, set priority and deadlines.",
      },
      {
        title: "Break work into tasks",
        description:
          "Add tasks with estimated effort, then assign or let the scheduler distribute them.",
      },
      {
        title: "Schedule and track",
        description:
          "Generate the week, adjust by hand, and watch progress as tasks complete.",
      },
    ],
    outcomes: [
      "Plans that fit real capacity",
      "One source of truth per project",
      "Overload visible before it happens",
    ],
  },
  {
    slug: "personal",
    mode: "individual",
    name: "Personal",
    tagline: "A task tracker that respects your week",
    audience: "Students, freelancers, anyone with a full week",
    icon: UserIcon,
    accent: {
      text: "text-emerald-600 dark:text-emerald-400",
      bg: "bg-emerald-500/10",
      border: "border-emerald-500/30",
      dot: "bg-emerald-500",
    },
    headline: "Every commitment in one week, laid out honestly",
    description:
      "Track activities, group them how you like, and let Timetablely lay them across the week — so you find out on Monday that Thursday is full, not on Thursday.",
    terminology: [
      { concept: "People", label: "People" },
      { concept: "Work items", label: "Activities" },
      { concept: "Groups", label: "Groups" },
    ],
    capabilities: [
      {
        title: "Activity tracking",
        description:
          "Capture everything you have committed to, with priority and how long it actually takes.",
      },
      {
        title: "Automatic week layout",
        description:
          "Your activities are placed across the week around the hours you are genuinely free.",
      },
      {
        title: "Groups",
        description:
          "Bundle activities by course, client or life area, and see each one on its own.",
      },
      {
        title: "Works offline",
        description:
          "Plan on the train. Everything syncs when you are back online.",
      },
    ],
    workflow: [
      {
        title: "Block out your fixed hours",
        description:
          "Lectures, shifts, standing commitments — anything that cannot move.",
      },
      {
        title: "Add your activities",
        description: "What you need to do, how long it takes, how urgent it is.",
      },
      {
        title: "Generate your week",
        description:
          "Timetablely fills the gaps around what is already fixed.",
      },
      {
        title: "Adjust as life happens",
        description: "Drag anything, regenerate the rest.",
      },
    ],
    outcomes: [
      "A week you can actually keep",
      "Overcommitment visible on Monday",
      "Nothing tracked in three different apps",
    ],
  },
];

export const getSolution = (slug?: string): Solution | undefined =>
  solutions.find((solution) => solution.slug === slug);

export const getSolutionByMode = (mode?: AppMode | null): Solution | undefined =>
  solutions.find((solution) => solution.mode === mode);
