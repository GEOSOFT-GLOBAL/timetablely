import * as React from "react";
import { NavLink } from "react-router-dom";
import { useTranslation } from "react-i18next";
import {
  IconAlertTriangle,
  IconArrowRight,
  IconCircleCheck,
  IconInfoCircle,
} from "@tabler/icons-react";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useAppMode } from "@/hooks/use-app-mode";
import type { DashboardIssue, IssueSeverity } from "@/lib/dashboard";
import { cn } from "@/lib/utils";

const severityStyle: Record<
  IssueSeverity,
  { icon: typeof IconAlertTriangle; text: string; border: string }
> = {
  critical: {
    icon: IconAlertTriangle,
    text: "text-destructive",
    border: "border-l-destructive",
  },
  warning: {
    icon: IconAlertTriangle,
    text: "text-amber-600 dark:text-amber-400",
    border: "border-l-amber-500",
  },
  info: {
    icon: IconInfoCircle,
    text: "text-muted-foreground",
    border: "border-l-muted-foreground/40",
  },
};

interface AttentionPanelProps {
  issues: DashboardIssue[];
  /** Shown in the all-clear state — usually "you're ready to generate". */
  allClearHint: string;
}

/**
 * The reason the dashboard exists: everything that will quietly go wrong at
 * generation time, said plainly, each row linking to the page that fixes it.
 */
export const AttentionPanel: React.FC<AttentionPanelProps> = ({
  issues,
  allClearHint,
}) => {
  const { t } = useTranslation();
  const { labels } = useAppMode();

  const describe = (issue: DashboardIssue) => {
    // One record reads better with the singular noun — "1 course has no tutor"
    // rather than "1 courses have no tutor" — so the label follows the count
    // the same way the sentence around it does.
    const one = issue.count === 1;

    return t(`dashboard.attention.${issue.kind}`, {
      count: issue.count,
      demand: issue.demand,
      capacity: issue.capacity,
      person: labels.tutor.toLowerCase(),
      people: (one ? labels.tutor : labels.tutors).toLowerCase(),
      item: labels.course.toLowerCase(),
      items: (one ? labels.course : labels.courses).toLowerCase(),
      group: labels.session.toLowerCase(),
      groups: (one ? labels.session : labels.sessions).toLowerCase(),
    });
  };

  return (
    <Card className="gap-4">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          {issues.length === 0 ? (
            <IconCircleCheck className="h-5 w-5 text-emerald-500" />
          ) : (
            <IconAlertTriangle className="text-muted-foreground h-5 w-5" />
          )}
          {t("dashboard.attention.title")}
        </CardTitle>
        <CardDescription>
          {issues.length === 0
            ? t("dashboard.attention.allClear")
            : t("dashboard.attention.desc", { count: issues.length })}
        </CardDescription>
      </CardHeader>
      <CardContent className="flex flex-col gap-2">
        {issues.length === 0 && (
          <p className="text-muted-foreground text-sm">{allClearHint}</p>
        )}

        {issues.map((issue) => {
          const style = severityStyle[issue.severity];
          const Icon = style.icon;

          return (
            <NavLink
              key={issue.kind}
              to={issue.route}
              className={cn(
                "hover:bg-muted/60 group flex items-start gap-3 border-l-2 p-3 transition-colors",
                style.border
              )}
            >
              <Icon className={cn("mt-0.5 h-4 w-4 shrink-0", style.text)} />
              <div className="min-w-0 flex-1">
                <p className="text-sm">{describe(issue)}</p>
                {issue.names.length > 0 && (
                  <p className="text-muted-foreground mt-1 truncate text-xs">
                    {issue.names.join(", ")}
                    {issue.count > issue.names.length &&
                      ` +${issue.count - issue.names.length}`}
                  </p>
                )}
              </div>
              <IconArrowRight className="text-muted-foreground mt-0.5 h-4 w-4 shrink-0 opacity-0 transition-opacity group-hover:opacity-100" />
            </NavLink>
          );
        })}
      </CardContent>
    </Card>
  );
};

export default AttentionPanel;
