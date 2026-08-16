import * as React from "react";
import { NavLink, useLocation } from "react-router-dom";
import { useTranslation } from "react-i18next";
import {
  IconCalendar,
  IconChartBar,
  IconDashboard,
  IconSettings,
  IconTemplate,
  IconBook,
  IconUsersGroup,
  type Icon,
} from "@tabler/icons-react";

import { NavUser } from "@/components/nav-user";
import { WorkspaceSwitcher } from "@/components/workspace-switcher";
import { useAuthStore } from "@/store/authStore";
import { useAppMode } from "@/hooks/use-app-mode";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarGroup,
  SidebarGroupLabel,
  SidebarSeparator,
} from "@/components/ui/sidebar";

interface NavItem {
  title: string;
  url: string;
  icon: Icon;
}

/**
 * The app rail.
 *
 * It collapses to icons by default: the destinations are few and always the
 * same, so the labels are worth trading for width. Every entry keeps its
 * tooltip, which is what the collapsed state reads from.
 */
export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const user = useAuthStore((state) => state.user);
  const { labels, icons, isCompany } = useAppMode();
  const { t } = useTranslation();
  const location = useLocation();

  const navMain: NavItem[] = [
    { title: t("nav.overview"), url: "/app/dashboard", icon: IconDashboard },
  ];

  const navCore: NavItem[] = [
    {
      title: isCompany ? "Schedules" : t("nav.timetables"),
      url: "/app/schedule",
      icon: IconCalendar,
    },
    { title: labels.courses, url: "/app/items", icon: icons.courses },
    { title: labels.tutors, url: "/app/members", icon: icons.tutors },
    { title: labels.sessions, url: "/app/groups", icon: icons.sessions },
  ];

  const navManagement: NavItem[] = [
    { title: t("nav.templates"), url: "/app/templates", icon: IconTemplate },
    { title: t("nav.analytics"), url: "/app/analytics", icon: IconChartBar },
    // Only teams have anyone to share a workspace with.
    ...(isCompany
      ? [
          {
            title: t("workspace.title"),
            url: "/app/workspace",
            icon: IconUsersGroup,
          },
        ]
      : []),
  ];

  const navSecondary: NavItem[] = [
    { title: t("nav.howToUse"), url: "/app/how-to-use", icon: IconBook },
    { title: t("nav.settings"), url: "/app/settings", icon: IconSettings },
  ];

  const userData = user
    ? {
        name:
          user.firstname && user.lastname
            ? `${user.firstname} ${user.lastname}`
            : user.username,
        email: user.email,
        avatar: user.avatar || "",
      }
    : { name: "Guest", email: "", avatar: "" };

  const renderMenu = (items: NavItem[]) => (
    <SidebarMenu className="gap-1">
      {items.map((item) => (
        <SidebarMenuItem key={item.title}>
          <SidebarMenuButton
            asChild
            tooltip={item.title}
            isActive={location.pathname.startsWith(item.url)}
            className="h-10 gap-3 rounded-none transition-colors data-[active=true]:bg-primary/15 data-[active=true]:text-primary data-[active=true]:font-semibold"
          >
            <NavLink to={item.url} className="flex items-center gap-3">
              <item.icon className="size-5" />
              <span className="text-sm">{item.title}</span>
            </NavLink>
          </SidebarMenuButton>
        </SidebarMenuItem>
      ))}
    </SidebarMenu>
  );

  return (
    <Sidebar
      collapsible="icon"
      className="bg-linear-to-b from-sidebar to-sidebar/95"
      {...props}
    >
      <SidebarHeader className="p-2">
        <WorkspaceSwitcher />
      </SidebarHeader>

      <SidebarContent className="gap-1 px-2">
        <SidebarGroup className="mt-1">{renderMenu(navMain)}</SidebarGroup>

        <SidebarSeparator className="my-2" />

        <SidebarGroup>
          <SidebarGroupLabel className="text-muted-foreground/70 mb-2 text-[11px] font-semibold uppercase tracking-wider">
            {t("nav.core")}
          </SidebarGroupLabel>
          {renderMenu(navCore)}
        </SidebarGroup>

        <SidebarSeparator className="my-2" />

        <SidebarGroup>
          <SidebarGroupLabel className="text-muted-foreground/70 mb-2 text-[11px] font-semibold uppercase tracking-wider">
            {t("nav.management")}
          </SidebarGroupLabel>
          {renderMenu(navManagement)}
        </SidebarGroup>

        <div className="flex-1" />

        <SidebarGroup className="mt-auto pb-2">
          {renderMenu(navSecondary)}
        </SidebarGroup>
      </SidebarContent>

      <SidebarFooter className="border-sidebar-border/50 border-t p-2">
        <NavUser user={userData} />
      </SidebarFooter>
    </Sidebar>
  );
}
