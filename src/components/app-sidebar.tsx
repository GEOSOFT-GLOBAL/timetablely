import * as React from "react";
import {
  IconCalendar,
  IconChartBar,
  IconDashboard,
  IconFileText,
  IconHelpCircle,
  IconSearch,
  IconSettings,
  IconTemplate,
  IconUsersGroup,
  IconUsers,
} from "@tabler/icons-react";

import { NavMain } from "@/components/nav-main";
import { NavSecondary } from "@/components/nav-secondary";
import { NavUser } from "@/components/nav-user";
import { useAuthStore } from "@/store/authStore";
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

const data = {
  navMain: [
    {
      title: "Overview",
      url: "/app/dashboard",
      icon: IconDashboard,
    },
  ],
  navCore: [
    {
      title: "Timetables",
      url: "/app/timetables",
      icon: IconCalendar,
    },
    {
      title: "Courses",
      url: "/app/courses",
      icon: IconFileText,
    },
    {
      title: "Tutors",
      url: "/app/tutors",
      icon: IconUsersGroup,
    },
    {
      title: "Sessions",
      url: "/app/sessions",
      icon: IconUsers,
    },
  ],
  navManagement: [
    {
      title: "Templates",
      url: "/app/templates",
      icon: IconTemplate,
    },
    {
      title: "Analytics",
      url: "/app/analytics",
      icon: IconChartBar,
    },
  ],
  navSecondary: [
    {
      title: "Settings",
      url: "/app/settings",
      icon: IconSettings,
    },
    {
      title: "Help & Support",
      url: "#",
      icon: IconHelpCircle,
    },
    {
      title: "Search",
      url: "#",
      icon: IconSearch,
    },
  ],
};

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const user = useAuthStore((state) => state.user);

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
      className="bg-gradient-to-b from-sidebar to-sidebar/95"
      {...props}
    >
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton
              asChild
              className="data-[slot=sidebar-menu-button]:p-2 hover:bg-sidebar-accent/50 transition-colors"
            >
              <a href="/app/dashboard" className="flex items-center gap-3">
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
              </a>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>

      <SidebarContent className="gap-1 px-3">
        {/* Overview Section */}
        <SidebarGroup className="mt-2">
          <NavMain items={data.navMain} />
        </SidebarGroup>

        <SidebarSeparator className="my-3" />

        {/* Core Features Section */}
        <SidebarGroup>
          <SidebarGroupLabel className="text-[11px] font-semibold uppercase tracking-wider text-muted-foreground/70 mb-2">
            Core
          </SidebarGroupLabel>
          <SidebarMenu className="gap-1">
            {data.navCore.map((item) => (
              <SidebarMenuItem key={item.title}>
                <SidebarMenuButton
                  asChild
                  tooltip={item.title}
                  className="h-10 gap-3 rounded-lg transition-all hover:bg-sidebar-accent/70 hover:translate-x-0.5"
                >
                  <a href={item.url} className="flex items-center gap-3">
                    <item.icon className="h-4 w-4 text-muted-foreground" />
                    <span className="text-sm font-medium">{item.title}</span>
                  </a>
                </SidebarMenuButton>
              </SidebarMenuItem>
            ))}
          </SidebarMenu>
        </SidebarGroup>

        <SidebarSeparator className="my-3" />

        {/* Management Section */}
        <SidebarGroup>
          <SidebarGroupLabel className="text-[11px] font-semibold uppercase tracking-wider text-muted-foreground/70 mb-2">
            Management
          </SidebarGroupLabel>
          <SidebarMenu className="gap-1">
            {data.navManagement.map((item) => (
              <SidebarMenuItem key={item.title}>
                <SidebarMenuButton
                  asChild
                  tooltip={item.title}
                  className="h-10 gap-3 rounded-lg transition-all hover:bg-sidebar-accent/70 hover:translate-x-0.5"
                >
                  <a href={item.url} className="flex items-center gap-3">
                    <item.icon className="h-4 w-4 text-muted-foreground" />
                    <span className="text-sm font-medium">{item.title}</span>
                  </a>
                </SidebarMenuButton>
              </SidebarMenuItem>
            ))}
          </SidebarMenu>
        </SidebarGroup>

        {/* Spacer to push secondary nav to bottom */}
        <div className="flex-1" />

        {/* Secondary Navigation */}
        <SidebarGroup className="mt-auto pb-2">
          <NavSecondary items={data.navSecondary} className="gap-1" />
        </SidebarGroup>
      </SidebarContent>

      <SidebarFooter className="border-t border-sidebar-border/50 p-3">
        <NavUser user={userData} />
      </SidebarFooter>
    </Sidebar>
  );
}
