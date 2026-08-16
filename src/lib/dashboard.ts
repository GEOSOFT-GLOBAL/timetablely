import type { AppMode } from "@/context/app-mode-context";
import type {
  ICourse,
  ISession,
  ITimetableDatabase,
  ITutor,
} from "@/interface/database";
import { PRIORITY } from "@/interface/enums";
import {
  defaultSchedulePreferences,
  type SchedulePreferences,
} from "@/store/onboardingStore";

/**
 * Everything the dashboard shows is derived here, from the same three records
 * the scheduler reads — people, work items and groups. Keeping it pure means
 * the numbers on the overview and the behaviour of
 * `generateAutomatedTimetable` can never drift: both answer "what will this
 * week actually look like?" from one source.
 */

/** How a person's requested periods compare to what their week can hold. */
export type LoadState = "idle" | "light" | "healthy" | "full" | "over";

export interface PersonLoad {
  id: string;
  name: string;
  /** Work items assigned to this person. */
  itemCount: number;
  /** Periods per week those items add up to. */
  periods: number;
  /** Periods this person's week can hold, capped by the length of a day. */
  capacity: number;
  /** periods / capacity, 0 when there is no capacity to speak of. */
  utilisation: number;
  /** Slots the person marked as unavailable. */
  unavailable: number;
  state: LoadState;
}

export interface GroupLoad {
  id: string;
  name: string;
  itemCount: number;
  periods: number;
  /** Items in this group that have no valid owner, so generation skips them. */
  unownedCount: number;
}

export type IssueKind =
  | "unownedItems"
  | "overloadedPeople"
  | "weekOversubscribed"
  | "zeroPeriodItems"
  | "emptyGroups"
  | "ungroupedItems"
  | "idlePeople";

export type IssueSeverity = "critical" | "warning" | "info";

export interface DashboardIssue {
  kind: IssueKind;
  severity: IssueSeverity;
  /** How many records the issue covers, or the demand when it is week-wide. */
  count: number;
  /** Up to three record names, so the user knows where to look. */
  names: string[];
  /** Page that fixes it. */
  route: string;
  /** Extra numbers for week-wide issues. */
  demand?: number;
  capacity?: number;
}

export interface ReadinessStep {
  key: "people" | "items" | "owners" | "groups" | "schedule";
  done: boolean;
  route: string;
}

export interface DashboardMetrics {
  peopleCount: number;
  itemCount: number;
  groupCount: number;
  templateCount: number;

  /** Periods per week every work item asks for, added up. */
  demand: number;
  /** Slots in one week of the grid. */
  gridSlots: number;
  /** Slots blocked out for breaks, assemblies and the like. */
  blockedSlots: number;
  /** Slots left for the scheduler to place work into. */
  openSlots: number;
  /** demand / openSlots — above 1 the week cannot hold the plan. */
  weekLoad: number;

  peopleLoads: PersonLoad[];
  groupLoads: GroupLoad[];
  /** How many work items sit at each priority. */
  priority: { high: number; medium: number; low: number };
  /** How many periods per week each priority is asking for. */
  priorityPeriods: { high: number; medium: number; low: number };
  /** The heaviest work items, most periods first. */
  topItems: ICourse[];

  unownedItems: ICourse[];
  ungroupedItems: ICourse[];
  emptyGroups: ISession[];
  idlePeople: ITutor[];
  overloadedPeople: PersonLoad[];

  issues: DashboardIssue[];
  readiness: ReadinessStep[];
  /** True once every readiness step is done. */
  isReady: boolean;
  /** True for a workspace with nothing in it yet. */
  isEmpty: boolean;
}

export const ROUTES = {
  people: "/app/members",
  items: "/app/items",
  groups: "/app/groups",
  schedule: "/app/schedule",
  templates: "/app/templates",
  blocks: "/app/special-blocks",
} as const;

/** Falls back to the scheduler's own default when a tutor sets no limit. */
const DEFAULT_MAX_PERIODS_PER_DAY = 3;

const clampUtilisation = (periods: number, capacity: number) =>
  capacity > 0 ? periods / capacity : periods > 0 ? Infinity : 0;

const toLoadState = (periods: number, utilisation: number): LoadState => {
  if (periods === 0) return "idle";
  if (utilisation > 1) return "over";
  if (utilisation === 1) return "full";
  if (utilisation < 0.4) return "light";
  return "healthy";
};

const sampleNames = <T extends { name: string }>(records: T[]) =>
  records.slice(0, 3).map((record) => record.name);

const periodsOf = (items: ICourse[]) =>
  items.reduce((sum, item) => sum + (item.periodsPerWeek || 0), 0);

/**
 * Records reach the dashboard from three places — the server, IndexedDB and
 * an older persisted store — and not all of them guarantee every array is
 * present. Everything below reads through this, so one missing collection
 * cannot take the whole overview down.
 */
const asArray = <T,>(value: T[] | undefined | null): T[] =>
  Array.isArray(value) ? value : [];

export const buildDashboardMetrics = (
  database: ITimetableDatabase | undefined | null,
  schedule: SchedulePreferences | undefined | null
): DashboardMetrics => {
  const tutors = asArray(database?.tutors);
  const courses = asArray(database?.courses);
  const sessions = asArray(database?.sessions);
  const blockedSlots = asArray(database?.blockedSlots);
  const templates = asArray(database?.templates);

  const days = asArray(schedule?.days);
  const dayCount = Math.max(1, days.length || defaultSchedulePreferences.days.length);
  const columnCount = Math.max(
    1,
    schedule?.columnCount || defaultSchedulePreferences.columnCount
  );

  const ownerIds = new Set(tutors.map((tutor) => tutor.id));

  // A work item whose owner no longer exists is silently dropped by the
  // generator, so it is worth surfacing as its own class of problem.
  const unownedItems = courses.filter(
    (course) => !course.teacherId || !ownerIds.has(course.teacherId)
  );

  const groupedItemIds = new Set(
    sessions.flatMap((session) => asArray(session.subjects))
  );
  const ungroupedItems = courses.filter(
    (course) => !groupedItemIds.has(course.id)
  );

  const peopleLoads: PersonLoad[] = tutors
    .map((tutor) => {
      const owned = courses.filter((course) => course.teacherId === tutor.id);
      const periods = periodsOf(owned);
      // A person cannot be booked more often per day than the day has slots,
      // however generous their own limit is.
      const perDay = Math.min(
        tutor.maxPeriodsPerDay || DEFAULT_MAX_PERIODS_PER_DAY,
        columnCount
      );
      const capacity = perDay * dayCount;
      const utilisation = clampUtilisation(periods, capacity);

      return {
        id: tutor.id,
        name: tutor.name,
        itemCount: owned.length,
        periods,
        capacity,
        utilisation,
        unavailable: tutor.unavailableSlots?.length ?? 0,
        state: toLoadState(periods, utilisation),
      };
    })
    .sort((a, b) => b.utilisation - a.utilisation || b.periods - a.periods);

  const groupLoads: GroupLoad[] = sessions
    .map((session) => {
      const items = asArray(session.subjects)
        .map((id) => courses.find((course) => course.id === id))
        .filter((course): course is ICourse => Boolean(course));

      return {
        id: session.id,
        name: session.name,
        itemCount: items.length,
        periods: periodsOf(items),
        unownedCount: items.filter(
          (course) => !course.teacherId || !ownerIds.has(course.teacherId)
        ).length,
      };
    })
    .sort((a, b) => b.periods - a.periods);

  const demand = periodsOf(courses);
  const byPriority = (priority: PRIORITY) =>
    courses.filter((course) => course.priority === priority);
  const gridSlots = dayCount * columnCount;
  const blocked = blockedSlots.length;
  const openSlots = Math.max(0, gridSlots - blocked);

  const overloadedPeople = peopleLoads.filter((load) => load.state === "over");
  const idlePeople = tutors.filter((tutor) =>
    peopleLoads.some((load) => load.id === tutor.id && load.state === "idle")
  );
  const emptyGroups = sessions.filter(
    (session) => asArray(session.subjects).length === 0
  );
  const zeroPeriodItems = courses.filter(
    (course) => !course.periodsPerWeek || course.periodsPerWeek <= 0
  );

  const issues: DashboardIssue[] = [];

  if (unownedItems.length > 0) {
    issues.push({
      kind: "unownedItems",
      severity: "critical",
      count: unownedItems.length,
      names: sampleNames(unownedItems),
      route: ROUTES.items,
    });
  }

  if (overloadedPeople.length > 0) {
    issues.push({
      kind: "overloadedPeople",
      severity: "critical",
      count: overloadedPeople.length,
      names: sampleNames(overloadedPeople),
      route: ROUTES.people,
    });
  }

  if (demand > openSlots && courses.length > 0) {
    issues.push({
      kind: "weekOversubscribed",
      severity: "critical",
      count: demand - openSlots,
      names: [],
      route: ROUTES.items,
      demand,
      capacity: openSlots,
    });
  }

  if (zeroPeriodItems.length > 0) {
    issues.push({
      kind: "zeroPeriodItems",
      severity: "warning",
      count: zeroPeriodItems.length,
      names: sampleNames(zeroPeriodItems),
      route: ROUTES.items,
    });
  }

  if (emptyGroups.length > 0) {
    issues.push({
      kind: "emptyGroups",
      severity: "warning",
      count: emptyGroups.length,
      names: sampleNames(emptyGroups),
      route: ROUTES.groups,
    });
  }

  // Only worth flagging once there is at least one group: with none at all the
  // readiness checklist already says so, and every item would be listed here.
  if (ungroupedItems.length > 0 && sessions.length > 0) {
    issues.push({
      kind: "ungroupedItems",
      severity: "warning",
      count: ungroupedItems.length,
      names: sampleNames(ungroupedItems),
      route: ROUTES.groups,
    });
  }

  if (idlePeople.length > 0 && courses.length > 0) {
    issues.push({
      kind: "idlePeople",
      severity: "info",
      count: idlePeople.length,
      names: sampleNames(idlePeople),
      route: ROUTES.items,
    });
  }

  const readiness: ReadinessStep[] = [
    { key: "people", done: tutors.length > 0, route: ROUTES.people },
    { key: "items", done: courses.length > 0, route: ROUTES.items },
    {
      key: "owners",
      done: courses.length > 0 && unownedItems.length === 0,
      route: ROUTES.items,
    },
    { key: "groups", done: sessions.length > 0, route: ROUTES.groups },
    {
      key: "schedule",
      done: templates.length > 0,
      route: ROUTES.schedule,
    },
  ];

  return {
    peopleCount: tutors.length,
    itemCount: courses.length,
    groupCount: sessions.length,
    templateCount: templates.length,

    demand,
    gridSlots,
    blockedSlots: blocked,
    openSlots,
    weekLoad: openSlots > 0 ? demand / openSlots : 0,

    peopleLoads,
    groupLoads,
    priority: {
      high: byPriority(PRIORITY.HIGH).length,
      medium: byPriority(PRIORITY.MEDIUM).length,
      low: byPriority(PRIORITY.LOW).length,
    },
    priorityPeriods: {
      high: periodsOf(byPriority(PRIORITY.HIGH)),
      medium: periodsOf(byPriority(PRIORITY.MEDIUM)),
      low: periodsOf(byPriority(PRIORITY.LOW)),
    },
    topItems: [...courses]
      .sort((a, b) => (b.periodsPerWeek || 0) - (a.periodsPerWeek || 0))
      .slice(0, 5),

    unownedItems,
    ungroupedItems,
    emptyGroups,
    idlePeople,
    overloadedPeople,

    issues,
    readiness,
    isReady: readiness.every((step) => step.done) && issues.every(
      (issue) => issue.severity !== "critical"
    ),
    isEmpty:
      tutors.length === 0 && courses.length === 0 && sessions.length === 0,
  };
};

/**
 * The fourth stat tile differs per mode: an institution counts periods it has
 * to place, a team counts effort it has committed, and one person mostly wants
 * to know how full their week already is.
 */
export const headlineStatForMode = (
  mode: AppMode,
  metrics: DashboardMetrics
): { kind: "periods" | "effort" | "weekLoad"; value: number } => {
  if (mode === "company") return { kind: "effort", value: metrics.demand };
  if (mode === "individual")
    return { kind: "weekLoad", value: Math.round(metrics.weekLoad * 100) };
  return { kind: "periods", value: metrics.demand };
};
