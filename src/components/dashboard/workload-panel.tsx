import * as React from "react";
import { NavLink } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { IconArrowRight } from "@tabler/icons-react";

import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Meter, type MeterTone } from "@/components/dashboard/meter";
import { useAppMode } from "@/hooks/use-app-mode";
import { ROUTES, type LoadState, type PersonLoad } from "@/lib/dashboard";
import { cn } from "@/lib/utils";

const stateTone: Record<LoadState, MeterTone> = {
  idle: "neutral",
  light: "neutral",
  healthy: "positive",
  full: "caution",
  over: "critical",
};

const stateText: Record<LoadState, string> = {
  idle: "text-muted-foreground",
  light: "text-muted-foreground",
  healthy: "text-emerald-600 dark:text-emerald-400",
  full: "text-amber-600 dark:text-amber-400",
  over: "text-destructive",
};

interface WorkloadPanelProps {
  loads: PersonLoad[];
  /** How many rows to show before linking out to the full list. */
  limit?: number;
}

/**
 * Who is asked for how much, against what their week can hold. This is the
 * panel that answers "can this plan actually run?" before generation does.
 */
export const WorkloadPanel: React.FC<WorkloadPanelProps> = ({
  loads,
  limit = 6,
}) => {
  const { t } = useTranslation();
  const { labels } = useAppMode();
  const visible = loads.slice(0, limit);

  return (
    <Card className="gap-4">
      <CardHeader>
        <CardTitle>
          {t("dashboard.workload.title", { people: labels.tutors })}
        </CardTitle>
        <CardDescription>{t("dashboard.workload.desc")}</CardDescription>
        {loads.length > limit && (
          <CardAction>
            <NavLink
              to={ROUTES.people}
              className="text-muted-foreground hover:text-foreground flex items-center gap-1 text-xs"
            >
              {t("dashboard.viewAll", { count: loads.length })}
              <IconArrowRight className="h-3 w-3" />
            </NavLink>
          </CardAction>
        )}
      </CardHeader>
      <CardContent className="flex flex-col gap-4">
        {visible.length === 0 && (
          <p className="text-muted-foreground text-sm">
            {t("dashboard.workload.empty", {
              people: labels.tutors.toLowerCase(),
            })}
          </p>
        )}

        {visible.map((load) => (
          <div key={load.id} className="flex flex-col gap-1.5">
            <div className="flex items-baseline justify-between gap-3">
              <span className="truncate text-sm font-medium">{load.name}</span>
              <span
                className={cn("shrink-0 text-xs tabular-nums", stateText[load.state])}
              >
                {t("dashboard.workload.capacity", {
                  used: load.periods,
                  capacity: load.capacity,
                })}
              </span>
            </div>
            <Meter
              value={load.periods}
              max={load.capacity}
              tone={stateTone[load.state]}
            />
            <div className="text-muted-foreground flex items-center justify-between gap-3 text-xs">
              <span className="truncate">
                {t("dashboard.workload.items", {
                  count: load.itemCount,
                  items:
                    load.itemCount === 1
                      ? labels.course.toLowerCase()
                      : labels.courses.toLowerCase(),
                })}
                {load.unavailable > 0 &&
                  ` · ${t("dashboard.workload.unavailable", {
                    count: load.unavailable,
                  })}`}
              </span>
              <span className={cn("shrink-0", stateText[load.state])}>
                {t(`dashboard.workload.state.${load.state}`)}
              </span>
            </div>
          </div>
        ))}
      </CardContent>
    </Card>
  );
};

export default WorkloadPanel;
