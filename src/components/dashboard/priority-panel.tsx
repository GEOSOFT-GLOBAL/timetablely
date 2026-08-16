import * as React from "react";
import { useTranslation } from "react-i18next";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useAppMode } from "@/hooks/use-app-mode";
import type { DashboardMetrics } from "@/lib/dashboard";
import { cn } from "@/lib/utils";

interface PriorityPanelProps {
  metrics: DashboardMetrics;
  description: string;
}

const rows = [
  { key: "high", label: "common.high", fill: "bg-destructive" },
  { key: "medium", label: "common.medium", fill: "bg-amber-500" },
  { key: "low", label: "common.low", fill: "bg-emerald-500" },
] as const;

/**
 * What the week is made of. Measured in periods rather than item counts,
 * because five one-period chores are not the same commitment as one course
 * that runs every day — and it is periods the scheduler has to place first.
 */
export const PriorityPanel: React.FC<PriorityPanelProps> = ({
  metrics,
  description,
}) => {
  const { t } = useTranslation();
  const { labels } = useAppMode();
  const totalPeriods = Math.max(metrics.demand, 1);

  return (
    <Card className="gap-4">
      <CardHeader>
        <CardTitle>{t("dashboard.priority.title")}</CardTitle>
        <CardDescription>{description}</CardDescription>
      </CardHeader>
      <CardContent className="flex flex-col gap-4">
        {metrics.itemCount === 0 && (
          <p className="text-muted-foreground text-sm">
            {t("dashboard.priority.empty", {
              items: labels.courses.toLowerCase(),
            })}
          </p>
        )}

        {metrics.itemCount > 0 &&
          rows.map((row) => {
            const count = metrics.priority[row.key];
            const periods = metrics.priorityPeriods[row.key];

            return (
              <div key={row.key} className="flex flex-col gap-1.5">
                <div className="flex items-baseline justify-between gap-3">
                  <span className="text-sm font-medium">{t(row.label)}</span>
                  <span className="text-muted-foreground text-xs tabular-nums">
                    {t("dashboard.priority.row", {
                      count,
                      items:
                        count === 1
                          ? labels.course.toLowerCase()
                          : labels.courses.toLowerCase(),
                    })}
                    {" · "}
                    {t("dashboard.periods", { count: periods })}
                  </span>
                </div>
                <div className="bg-muted flex h-2 w-full overflow-hidden">
                  <div
                    className={cn("h-full transition-[width] duration-500", row.fill)}
                    style={{ width: `${(periods / totalPeriods) * 100}%` }}
                  />
                </div>
              </div>
            );
          })}
      </CardContent>
    </Card>
  );
};

export default PriorityPanel;
