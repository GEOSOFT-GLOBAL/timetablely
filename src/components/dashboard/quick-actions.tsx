import * as React from "react";
import { NavLink } from "react-router-dom";
import { useTranslation } from "react-i18next";
import {
  IconCalendar,
  IconClockPause,
  IconTemplate,
  type Icon,
} from "@tabler/icons-react";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useAppMode } from "@/hooks/use-app-mode";
import { ROUTES } from "@/lib/dashboard";

interface QuickAction {
  key: string;
  label: string;
  to: string;
  icon: Icon;
}

/**
 * The four places a user goes after reading the overview. The first is the
 * schedule itself — every mode's dashboard is ultimately a run-up to it.
 */
export const QuickActions: React.FC = () => {
  const { t } = useTranslation();
  const { labels, icons, mode } = useAppMode();

  const actions: QuickAction[] = [
    {
      key: "schedule",
      label: t(`dashboard.actions.schedule.${mode}`),
      to: ROUTES.schedule,
      icon: IconCalendar,
    },
    {
      key: "items",
      label: t("dashboard.actions.manage", { section: labels.courses }),
      to: ROUTES.items,
      icon: icons.courses,
    },
    {
      key: "people",
      label: t("dashboard.actions.manage", { section: labels.tutors }),
      to: ROUTES.people,
      icon: icons.tutors,
    },
    {
      key: "groups",
      label: t("dashboard.actions.manage", { section: labels.sessions }),
      to: ROUTES.groups,
      icon: icons.sessions,
    },
    mode === "individual"
      ? {
          key: "blocks",
          label: t("dashboard.actions.fixedHours"),
          to: ROUTES.blocks,
          icon: IconClockPause,
        }
      : {
          key: "templates",
          label: t("dashboard.actions.templates"),
          to: ROUTES.templates,
          icon: IconTemplate,
        },
  ];

  return (
    <Card className="gap-4">
      <CardHeader>
        <CardTitle>{t("dashboard.actions.title")}</CardTitle>
      </CardHeader>
      <CardContent className="grid grid-cols-2 gap-3 md:grid-cols-3 lg:grid-cols-5">
        {actions.map((action) => (
          <Button
            key={action.key}
            asChild
            variant="outline"
            className="h-auto flex-col gap-2 py-4"
          >
            <NavLink to={action.to}>
              <action.icon className="h-5 w-5" />
              <span className="text-center text-xs leading-tight">
                {action.label}
              </span>
            </NavLink>
          </Button>
        ))}
      </CardContent>
    </Card>
  );
};

export default QuickActions;
