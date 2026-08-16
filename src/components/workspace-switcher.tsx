import * as React from "react";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { IconCalendar, IconChevronDown, IconPlus } from "@tabler/icons-react";
import { CheckIcon, SettingsIcon } from "lucide-react";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import { getSolutionByMode } from "@/config/solutions";
import { useAppMode } from "@/hooks/use-app-mode";
import { useOnboardingStore } from "@/store/onboardingStore";
import { useWorkspaceStore } from "@/store/workspaceStore";
import { cn } from "@/lib/utils";

/**
 * Which workspace the app is acting inside, at the top of the sidebar.
 *
 * Company users can belong to several and switch between them; education and
 * individual workspaces are single-user, so for them this is an identity
 * badge with a route into settings rather than a switcher.
 */
export function WorkspaceSwitcher() {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { mode, isCompany } = useAppMode();
  const solution = getSolutionByMode(mode);
  const onboardingName = useOnboardingStore((state) => state.workspaceName);
  const { workspaces, activeWorkspaceId, setActiveWorkspace } =
    useWorkspaceStore();

  const active = workspaces.find(
    (workspace) => workspace.id === activeWorkspaceId
  );

  const title = isCompany
    ? (active?.name ?? onboardingName ?? "").trim() || t("workspace.none")
    : onboardingName.trim() || "Timetablely";

  return (
    <SidebarMenu>
      <SidebarMenuItem>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <SidebarMenuButton
              size="lg"
              tooltip={title}
              className="data-[state=open]:bg-sidebar-accent gap-3 rounded-none"
            >
              <div
                className={cn(
                  "flex aspect-square size-8 shrink-0 items-center justify-center",
                  solution?.accent.bg ?? "bg-primary/10",
                  solution?.accent.text ?? "text-primary"
                )}
              >
                <IconCalendar className="size-4" />
              </div>
              <div className="flex min-w-0 flex-1 flex-col text-left">
                <span className="truncate text-sm font-semibold">{title}</span>
                <span className="text-muted-foreground truncate text-[10px] uppercase tracking-[0.14em]">
                  {solution?.name ?? "Timetablely"}
                </span>
              </div>
              <IconChevronDown className="size-4 shrink-0 opacity-60" />
            </SidebarMenuButton>
          </DropdownMenuTrigger>

          <DropdownMenuContent
            align="start"
            side="right"
            sideOffset={8}
            className="w-64 rounded-none"
          >
            {isCompany ? (
              <>
                <DropdownMenuLabel className="text-muted-foreground text-xs uppercase tracking-[0.14em]">
                  {t("workspace.title")}
                </DropdownMenuLabel>

                {workspaces.length === 0 ? (
                  <p className="text-muted-foreground px-2 py-1.5 text-xs">
                    {t("workspace.none")}
                  </p>
                ) : (
                  workspaces.map((workspace) => (
                    <DropdownMenuItem
                      key={workspace.id}
                      onClick={() => setActiveWorkspace(workspace.id)}
                      className="gap-2 rounded-none"
                    >
                      <span className="flex-1 truncate">{workspace.name}</span>
                      {workspace.id === activeWorkspaceId && (
                        <CheckIcon className="size-4" />
                      )}
                    </DropdownMenuItem>
                  ))
                )}

                <DropdownMenuSeparator />
                <DropdownMenuItem
                  onClick={() => navigate("/app/workspace")}
                  className="gap-2 rounded-none"
                >
                  <IconPlus className="size-4" />
                  {workspaces.length === 0
                    ? t("workspace.create")
                    : t("workspace.inviteMembers")}
                </DropdownMenuItem>
              </>
            ) : (
              <DropdownMenuLabel className="text-muted-foreground text-xs font-normal">
                {solution?.tagline ?? t("dashboard.title")}
              </DropdownMenuLabel>
            )}

            <DropdownMenuSeparator />
            <DropdownMenuItem
              onClick={() => navigate("/app/settings")}
              className="gap-2 rounded-none"
            >
              <SettingsIcon className="size-4" />
              {t("nav.settings")}
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </SidebarMenuItem>
    </SidebarMenu>
  );
}

export default WorkspaceSwitcher;
