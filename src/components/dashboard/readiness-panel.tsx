import * as React from "react";
import { NavLink } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { IconCircleCheckFilled, IconCircleDashed } from "@tabler/icons-react";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Meter } from "@/components/dashboard/meter";
import { useAppMode } from "@/hooks/use-app-mode";
import type { ReadinessStep } from "@/lib/dashboard";
import { cn } from "@/lib/utils";

interface ReadinessPanelProps {
  steps: ReadinessStep[];
  description: string;
}

/**
 * The path from an empty workspace to a schedule that can be generated.
 * Steps stay visible after they are done so a workspace that regresses — the
 * last owner deleted, say — shows it rather than silently failing later.
 */
export const ReadinessPanel: React.FC<ReadinessPanelProps> = ({
  steps,
  description,
}) => {
  const { t } = useTranslation();
  const { labels } = useAppMode();
  const done = steps.filter((step) => step.done).length;

  return (
    <Card className="gap-4">
      <CardHeader>
        <CardTitle>{t("dashboard.readiness.title")}</CardTitle>
        <CardDescription>{description}</CardDescription>
      </CardHeader>
      <CardContent className="flex flex-col gap-4">
        <div className="flex flex-col gap-2">
          <div className="flex items-baseline justify-between gap-3">
            <span className="text-sm font-medium">
              {t("dashboard.readiness.progress", {
                done,
                total: steps.length,
              })}
            </span>
          </div>
          <Meter
            value={done}
            max={steps.length}
            tone={done === steps.length ? "positive" : "neutral"}
          />
        </div>

        <div className="flex flex-col">
          {steps.map((step) => (
            <NavLink
              key={step.key}
              to={step.route}
              className="hover:bg-muted/60 flex items-center gap-3 px-1 py-2 transition-colors"
            >
              {step.done ? (
                <IconCircleCheckFilled className="h-4 w-4 shrink-0 text-emerald-500" />
              ) : (
                <IconCircleDashed className="text-muted-foreground h-4 w-4 shrink-0" />
              )}
              <span
                className={cn(
                  "text-sm",
                  step.done && "text-muted-foreground line-through"
                )}
              >
                {t(`dashboard.readiness.steps.${step.key}`, {
                  person: labels.tutor.toLowerCase(),
                  people: labels.tutors,
                  item: labels.course.toLowerCase(),
                  items: labels.courses,
                  groups: labels.sessions,
                })}
              </span>
            </NavLink>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default ReadinessPanel;
