import * as React from "react";
import { NavLink } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { IconArrowRight } from "@tabler/icons-react";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Meter, type MeterTone } from "@/components/dashboard/meter";
import { useAppMode } from "@/hooks/use-app-mode";
import { ROUTES, type DashboardMetrics } from "@/lib/dashboard";
import { cn } from "@/lib/utils";

interface CapacityPanelProps {
  metrics: DashboardMetrics;
  title: string;
  description: string;
  /** Lists the heaviest work items under the meter. */
  showTopItems?: boolean;
}

const loadTone = (load: number): MeterTone => {
  if (load > 1) return "critical";
  if (load >= 0.85) return "caution";
  if (load === 0) return "neutral";
  return "positive";
};

const loadText: Record<MeterTone, string> = {
  neutral: "text-muted-foreground",
  positive: "text-emerald-600 dark:text-emerald-400",
  caution: "text-amber-600 dark:text-amber-400",
  critical: "text-destructive",
};

/**
 * The week as a container: how many slots it has, how many are blocked, and
 * how much of what is left the current plan already claims.
 */
export const CapacityPanel: React.FC<CapacityPanelProps> = ({
  metrics,
  title,
  description,
  showTopItems = false,
}) => {
  const { t } = useTranslation();
  const { labels } = useAppMode();
  const tone = loadTone(metrics.weekLoad);
  const remaining = metrics.openSlots - metrics.demand;

  return (
    <Card className="gap-4">
      <CardHeader>
        <CardTitle>{title}</CardTitle>
        <CardDescription>{description}</CardDescription>
      </CardHeader>
      <CardContent className="flex flex-col gap-5">
        <div className="flex flex-col gap-2">
          <div className="flex items-end justify-between gap-3">
            <p className={cn("text-3xl font-bold tabular-nums", loadText[tone])}>
              {Math.round(metrics.weekLoad * 100)}%
            </p>
            <p className="text-muted-foreground text-sm tabular-nums">
              {t("dashboard.capacity.ofSlots", {
                used: metrics.demand,
                total: metrics.openSlots,
              })}
            </p>
          </div>
          <Meter value={metrics.demand} max={metrics.openSlots} tone={tone} />
          <p className={cn("text-xs", loadText[tone])}>
            {remaining >= 0
              ? t("dashboard.capacity.remaining", { count: remaining })
              : t("dashboard.capacity.over", { count: Math.abs(remaining) })}
          </p>
        </div>

        <div className="grid grid-cols-3 gap-3 border-t pt-4">
          <div>
            <p className="text-muted-foreground text-xs">
              {t("dashboard.capacity.gridSlots")}
            </p>
            <p className="mt-1 text-lg font-semibold tabular-nums">
              {metrics.gridSlots}
            </p>
          </div>
          <div>
            <p className="text-muted-foreground text-xs">
              {t("dashboard.capacity.blocked")}
            </p>
            <p className="mt-1 text-lg font-semibold tabular-nums">
              {metrics.blockedSlots}
            </p>
          </div>
          <div>
            <p className="text-muted-foreground text-xs">
              {t("dashboard.capacity.requested")}
            </p>
            <p className="mt-1 text-lg font-semibold tabular-nums">
              {metrics.demand}
            </p>
          </div>
        </div>

        {showTopItems && metrics.topItems.length > 0 && (
          <div className="flex flex-col gap-2 border-t pt-4">
            <p className="text-muted-foreground text-xs">
              {t("dashboard.capacity.heaviest", {
                items: labels.courses.toLowerCase(),
              })}
            </p>
            {metrics.topItems.map((item) => (
              <div
                key={item.id}
                className="flex items-baseline justify-between gap-3 text-sm"
              >
                <span className="truncate">{item.name}</span>
                <span className="text-muted-foreground shrink-0 tabular-nums">
                  {t("dashboard.periods", { count: item.periodsPerWeek || 0 })}
                </span>
              </div>
            ))}
            <NavLink
              to={ROUTES.items}
              className="text-muted-foreground hover:text-foreground mt-1 flex items-center gap-1 text-xs"
            >
              {t("dashboard.actions.manage", { section: labels.courses })}
              <IconArrowRight className="h-3 w-3" />
            </NavLink>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default CapacityPanel;
