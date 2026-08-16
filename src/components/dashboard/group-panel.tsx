import * as React from "react";
import { NavLink } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { IconArrowRight, IconAlertTriangle } from "@tabler/icons-react";

import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Meter } from "@/components/dashboard/meter";
import { Button } from "@/components/ui/button";
import { useAppMode } from "@/hooks/use-app-mode";
import { ROUTES, type GroupLoad } from "@/lib/dashboard";

interface GroupPanelProps {
  groups: GroupLoad[];
  /** Slots a single week of the grid has left, used to scale each bar. */
  openSlots: number;
  title: string;
  description: string;
  limit?: number;
}

/**
 * How the week is divided between classes, projects or personal groups —
 * each one measured against the slots a week actually has.
 */
export const GroupPanel: React.FC<GroupPanelProps> = ({
  groups,
  openSlots,
  title,
  description,
  limit = 6,
}) => {
  const { t } = useTranslation();
  const { labels } = useAppMode();
  const visible = groups.slice(0, limit);
  const scale = Math.max(openSlots, ...groups.map((group) => group.periods), 1);

  return (
    <Card className="gap-4">
      <CardHeader>
        <CardTitle>{title}</CardTitle>
        <CardDescription>{description}</CardDescription>
        {groups.length > limit && (
          <CardAction>
            <NavLink
              to={ROUTES.groups}
              className="text-muted-foreground hover:text-foreground flex items-center gap-1 text-xs"
            >
              {t("dashboard.viewAll", { count: groups.length })}
              <IconArrowRight className="h-3 w-3" />
            </NavLink>
          </CardAction>
        )}
      </CardHeader>
      <CardContent className="flex flex-col gap-4">
        {visible.length === 0 && (
          <div className="flex flex-col items-start gap-3">
            <p className="text-muted-foreground text-sm">
              {t("dashboard.groups.empty", {
                groups: labels.sessions.toLowerCase(),
              })}
            </p>
            <Button asChild variant="outline" size="sm">
              <NavLink to={ROUTES.groups}>
                {t("dashboard.actions.manage", { section: labels.sessions })}
              </NavLink>
            </Button>
          </div>
        )}

        {visible.map((group) => (
          <div key={group.id} className="flex flex-col gap-1.5">
            <div className="flex items-baseline justify-between gap-3">
              <span className="truncate text-sm font-medium">{group.name}</span>
              <span className="text-muted-foreground shrink-0 text-xs tabular-nums">
                {t("dashboard.periods", { count: group.periods })}
              </span>
            </div>
            <Meter
              value={group.periods}
              max={scale}
              tone={group.periods > openSlots ? "critical" : "neutral"}
              showOverflow={false}
            />
            <div className="text-muted-foreground flex items-center justify-between gap-3 text-xs">
              <span className="truncate">
                {t("dashboard.groups.items", {
                  count: group.itemCount,
                  items:
                    group.itemCount === 1
                      ? labels.course.toLowerCase()
                      : labels.courses.toLowerCase(),
                })}
              </span>
              {group.unownedCount > 0 && (
                <span className="text-destructive flex shrink-0 items-center gap-1">
                  <IconAlertTriangle className="h-3 w-3" />
                  {t("dashboard.groups.unowned", { count: group.unownedCount })}
                </span>
              )}
            </div>
          </div>
        ))}
      </CardContent>
    </Card>
  );
};

export default GroupPanel;
