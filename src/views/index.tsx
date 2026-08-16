import * as React from "react";
import { useTranslation } from "react-i18next";
import { IconCalendarStats, IconLayoutGrid } from "@tabler/icons-react";

import AttentionPanel from "@/components/dashboard/attention-panel";
import CapacityPanel from "@/components/dashboard/capacity-panel";
import GroupPanel from "@/components/dashboard/group-panel";
import PriorityPanel from "@/components/dashboard/priority-panel";
import QuickActions from "@/components/dashboard/quick-actions";
import ReadinessPanel from "@/components/dashboard/readiness-panel";
import StatTile from "@/components/dashboard/stat-tile";
import WorkloadPanel from "@/components/dashboard/workload-panel";
import { Badge } from "@/components/ui/badge";
import { getSolutionByMode } from "@/config/solutions";
import { useAppMode } from "@/hooks/use-app-mode";
import { ROUTES, buildDashboardMetrics } from "@/lib/dashboard";
import { useDatabaseStore } from "@/store/databaseStore";
import { useOnboardingStore } from "@/store/onboardingStore";

/**
 * The overview each workspace mode actually needs.
 *
 * All three read the same records, but they are asking different questions:
 * an institution wants to know whether a term can be generated, a team wants
 * to know whether the plan fits the people, and one person wants to know
 * whether their week is already full. The metrics are shared; the emphasis,
 * the ordering and the vocabulary are not.
 */
const Dashboard = () => {
  const { t } = useTranslation();
  const { mode, labels, icons } = useAppMode();
  const { database } = useDatabaseStore();
  const schedule = useOnboardingStore((state) => state.schedule);
  const workspaceName = useOnboardingStore((state) => state.workspaceName);

  const metrics = React.useMemo(
    () => buildDashboardMetrics(database, schedule),
    [database, schedule]
  );

  const solution = getSolutionByMode(mode);
  const copy = {
    title: t(`dashboard.modes.${mode}.title`),
    subtitle: t(`dashboard.modes.${mode}.subtitle`),
    groupsTitle: t(`dashboard.modes.${mode}.groupsTitle`),
    groupsDesc: t(`dashboard.modes.${mode}.groupsDesc`),
    capacityTitle: t(`dashboard.modes.${mode}.capacityTitle`),
    capacityDesc: t(`dashboard.modes.${mode}.capacityDesc`),
    priorityDesc: t(`dashboard.modes.${mode}.priorityDesc`),
    readinessDesc: t(`dashboard.modes.${mode}.readinessDesc`),
    allClear: t(`dashboard.modes.${mode}.allClear`),
  };

  const peopleHint = () => {
    if (metrics.peopleCount === 0) return t("dashboard.stats.peopleNone");
    if (metrics.overloadedPeople.length > 0)
      return t("dashboard.stats.peopleOver", {
        count: metrics.overloadedPeople.length,
      });
    if (metrics.idlePeople.length > 0)
      return t("dashboard.stats.peopleIdle", {
        count: metrics.idlePeople.length,
      });
    return t("dashboard.stats.peopleOk");
  };

  const itemHint = () => {
    if (metrics.itemCount === 0) return t("dashboard.stats.itemsNone");
    if (metrics.unownedItems.length > 0)
      return t("dashboard.stats.itemsUnowned", {
        count: metrics.unownedItems.length,
        person: labels.tutor.toLowerCase(),
      });
    return t("dashboard.stats.itemsOk", { count: metrics.demand });
  };

  const groupHint = () => {
    if (metrics.groupCount === 0) return t("dashboard.stats.groupsNone");
    if (metrics.emptyGroups.length > 0)
      return t("dashboard.stats.groupsEmpty", {
        count: metrics.emptyGroups.length,
      });
    if (metrics.ungroupedItems.length > 0)
      return t("dashboard.stats.groupsUngrouped", {
        count: metrics.ungroupedItems.length,
        items: (metrics.ungroupedItems.length === 1
          ? labels.course
          : labels.courses
        ).toLowerCase(),
        group: labels.session.toLowerCase(),
      });
    return t("dashboard.stats.groupsOk", { item: labels.course.toLowerCase() });
  };

  const attention = (
    <AttentionPanel issues={metrics.issues} allClearHint={copy.allClear} />
  );
  const readiness = (
    <ReadinessPanel steps={metrics.readiness} description={copy.readinessDesc} />
  );
  const workload = <WorkloadPanel loads={metrics.peopleLoads} />;
  const groups = (
    <GroupPanel
      groups={metrics.groupLoads}
      openSlots={metrics.openSlots}
      title={copy.groupsTitle}
      description={copy.groupsDesc}
    />
  );
  const priority = (
    <PriorityPanel metrics={metrics} description={copy.priorityDesc} />
  );
  const capacity = (
    <CapacityPanel
      metrics={metrics}
      title={copy.capacityTitle}
      description={copy.capacityDesc}
      showTopItems={mode === "individual"}
    />
  );

  return (
    <div className="flex w-full flex-col gap-6 px-4 py-4 md:py-6 lg:px-6">
      {/* Header */}
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div>
          <div className="flex items-center gap-3">
            <h1 className="text-3xl font-bold">{copy.title}</h1>
            {solution && (
              <Badge
                variant="outline"
                className={`${solution.accent.text} ${solution.accent.border}`}
              >
                {solution.name}
              </Badge>
            )}
          </div>
          <p className="text-muted-foreground mt-1">
            {workspaceName ? `${workspaceName} — ${copy.subtitle}` : copy.subtitle}
          </p>
        </div>
      </div>

      {/* The three record sections, plus the number that matters most here */}
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4">
        <StatTile
          label={labels.courses}
          value={metrics.itemCount}
          hint={itemHint()}
          icon={icons.courses}
          to={ROUTES.items}
          accent={solution?.accent}
        />
        <StatTile
          label={labels.tutors}
          value={metrics.peopleCount}
          hint={peopleHint()}
          icon={icons.tutors}
          to={ROUTES.people}
          accent={solution?.accent}
        />
        <StatTile
          label={labels.sessions}
          value={metrics.groupCount}
          hint={groupHint()}
          icon={icons.sessions}
          to={ROUTES.groups}
          accent={solution?.accent}
        />
        {mode === "individual" ? (
          <StatTile
            label={t("dashboard.stats.weekLoad")}
            value={`${Math.round(metrics.weekLoad * 100)}%`}
            hint={t("dashboard.stats.slotsUsed", {
              used: metrics.demand,
              total: metrics.openSlots,
            })}
            icon={IconLayoutGrid}
            to={ROUTES.schedule}
            accent={solution?.accent}
          />
        ) : (
          <StatTile
            label={
              mode === "company"
                ? t("dashboard.stats.committed")
                : t("dashboard.stats.weeklyPeriods")
            }
            value={metrics.demand}
            hint={t("dashboard.stats.openSlots", { count: metrics.openSlots })}
            icon={IconCalendarStats}
            to={ROUTES.schedule}
            accent={solution?.accent}
          />
        )}
      </div>

      {metrics.isEmpty ? (
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
          {readiness}
          {capacity}
        </div>
      ) : (
        <>
          {/* What needs fixing, and what is left to set up */}
          <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
            <div className="lg:col-span-2">{attention}</div>
            {readiness}
          </div>

          {/* Mode-specific body */}
          {mode === "education" && (
            <>
              <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
                {workload}
                {groups}
              </div>
              <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
                {capacity}
                {priority}
              </div>
            </>
          )}

          {mode === "company" && (
            <>
              <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
                {capacity}
                {workload}
              </div>
              <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
                {groups}
                {priority}
              </div>
            </>
          )}

          {mode === "individual" && (
            <>
              <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
                {capacity}
                {priority}
              </div>
              <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
                {groups}
                {/* With a workspace of one, a workload breakdown is just the
                    same number twice — only show it once there are others. */}
                {metrics.peopleCount > 1 ? workload : null}
              </div>
            </>
          )}
        </>
      )}

      <QuickActions />
    </div>
  );
};

export default Dashboard;
