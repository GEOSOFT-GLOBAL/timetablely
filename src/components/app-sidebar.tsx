/* eslint-disable @typescript-eslint/no-explicit-any */
import * as React from "react";
import { NavLink } from "react-router-dom";
import { useTranslation } from "react-i18next";
import {
  IconCalendar,
  IconChartBar,
  IconDashboard,
  IconSearch,
  IconSettings,
  IconTemplate,
  IconBook,
} from "@tabler/icons-react";

import { NavMain } from "@/components/nav-main";
import { NavSecondary } from "@/components/nav-secondary";
import { NavUser } from "@/components/nav-user";
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

const getNavCore = (labels: any, icons: any, t: any, isCompany: boolean) => {
  return [
    {
      title: isCompany ? "Schedules" : t('nav.timetables'),
      url: "/app/schedule",
      icon: IconCalendar,
    },
    {
      title: labels.courses,
      url: "/app/items",
      icon: icons.courses,
    },
    {
      title: labels.tutors,
      url: "/app/members",
      icon: icons.tutors,
    },
    {
      title: labels.sessions,
      url: "/app/groups",
      icon: icons.sessions,
    },
  ];
};

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const user = useAuthStore((state) => state.user);
  const { labels, icons, isCompany } = useAppMode();
  const { t } = useTranslation();

  // Company mode uses "Workspace" label instead of "Overview"
  const navMain = isCompany
    ? [{ title: t('nav.overview'), url: "/app/dashboard", icon: IconDashboard, label: "Workspace" }]
    : [{ title: t('nav.overview'), url: "/app/dashboard", icon: IconDashboard }];

  const navCore = getNavCore(labels, icons, t, isCompany);
  const navManagement = [
    { title: t('nav.templates'), url: "/app/templates", icon: IconTemplate },
    { title: t('nav.analytics'), url: "/app/analytics", icon: IconChartBar },
  ];
  const navSecondary = [
    { title: t('nav.howToUse'), url: "/app/how-to-use", icon: IconBook },
    { title: t('nav.settings'), url: "/app/settings", icon: IconSettings },
    { title: t('nav.search'), url: "#", icon: IconSearch },
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
    : {
      name: "Guest",
      email: "",
      avatar: "",
    };

  return (
    <Sidebar
      collapsible="offcanvas"
      className="bg-linear-to-b from-sidebar to-sidebar/95"
      {...props}
    >
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton
              asChild
              className="data-[slot=sidebar-menu-button]:p-2 hover:bg-sidebar-accent/50 transition-colors"
            >
              <NavLink to="/app/dashboard" className="flex items-center gap-3">
                <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary/10 text-primary">
                  <IconCalendar className="h-5 w-5" />
                </div>
                <div className="flex flex-col">
                  <span className="text-sm font-bold tracking-tight">
                    Timetablely
                  </span>
                  <span className="text-[10px] text-muted-foreground">
                    Schedule Manager
                  </span>
                </div>
              </NavLink>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>

      <SidebarContent className="gap-1 px-3">
        {/* Overview / Workspace Section */}
        <SidebarGroup className="mt-2">
          {isCompany ? (
            <>
              <SidebarGroupLabel className="text-[11px] font-semibold uppercase tracking-wider text-muted-foreground/70 mb-2">
                Workspace
              </SidebarGroupLabel>
              <NavMain items={navMain} />
            </>
          ) : (
            <NavMain items={navMain} />
          )}
        </SidebarGroup>

        <SidebarSeparator className="my-3" />

        {/* Core Features Section */}
        <SidebarGroup>
          <SidebarGroupLabel className="text-[11px] font-semibold uppercase tracking-wider text-muted-foreground/70 mb-2">
            {t('nav.core')}
          </SidebarGroupLabel>
          <SidebarMenu className="gap-1">
            {navCore.map((item) => (
              <SidebarMenuItem key={item.title}>
                <SidebarMenuButton
                  asChild
                  tooltip={item.title}
                  className="h-10 gap-3 rounded-lg transition-all hover:bg-sidebar-accent/70 hover:translate-x-0.5"
                >
                  <NavLink
                    to={item.url}
                    className={({ isActive }) =>
                      `flex items-center gap-3 ${isActive
                        ? "bg-primary/15 text-primary font-semibold border-l-2 border-primary"
                        : "text-muted-foreground hover:text-foreground"
                      }`
                    }
                  >
                    <item.icon className="h-4 w-4" />
                    <span className="text-sm">{item.title}</span>
                  </NavLink>
                </SidebarMenuButton>
              </SidebarMenuItem>
            ))}
          </SidebarMenu>
        </SidebarGroup>

        <SidebarSeparator className="my-3" />

        {/* Management Section */}
        <SidebarGroup>
          <SidebarGroupLabel className="text-[11px] font-semibold uppercase tracking-wider text-muted-foreground/70 mb-2">
            {t('nav.management')}
          </SidebarGroupLabel>
          <SidebarMenu className="gap-1">
            {navManagement.map((item) => (
              <SidebarMenuItem key={item.title}>
                <SidebarMenuButton
                  asChild
                  tooltip={item.title}
                  className="h-10 gap-3 rounded-lg transition-all hover:bg-sidebar-accent/70 hover:translate-x-0.5"
                >
                  <NavLink
                    to={item.url}
                    className={({ isActive }) =>
                      `flex items-center gap-3 ${isActive
                        ? "bg-primary/15 text-primary font-semibold border-l-2 border-primary"
                        : "text-muted-foreground hover:text-foreground"
                      }`
                    }
                  >
                    <item.icon className="h-4 w-4" />
                    <span className="text-sm">{item.title}</span>
                  </NavLink>
                </SidebarMenuButton>
              </SidebarMenuItem>
            ))}
          </SidebarMenu>
        </SidebarGroup>

        {/* Spacer to push secondary nav to bottom */}
        <div className="flex-1" />

        {/* Settings & Help Section (renamed for company mode) */}
        <SidebarGroup className="mt-auto pb-2">
          {isCompany && (
            <SidebarGroupLabel className="text-[11px] font-semibold uppercase tracking-wider text-muted-foreground/70 mb-2">
              Settings & Help
            </SidebarGroupLabel>
          )}
          <NavSecondary items={navSecondary} className="gap-1" />
        </SidebarGroup>
      </SidebarContent>

      <SidebarFooter className="border-t border-sidebar-border/50 p-3">
        <NavUser user={userData} />
      </SidebarFooter>
    </Sidebar>
  );
}
