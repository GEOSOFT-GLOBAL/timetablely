import { type Icon } from "@tabler/icons-react";
import { NavLink } from "react-router-dom";

import {
  SidebarGroup,
  SidebarGroupContent,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";

export function NavMain({
  items,
}: {
  items: {
    title: string;
    url: string;
    icon?: Icon;
  }[];
}) {
  return (
    <SidebarGroup className="px-0">
      <SidebarGroupContent className="flex flex-col gap-1">
        <SidebarMenu>
          {items.map((item) => (
            <SidebarMenuItem key={item.title}>
              <SidebarMenuButton
                asChild
                tooltip={item.title}
                className="h-10 gap-3 rounded-lg transition-all hover:bg-sidebar-accent/70 hover:translate-x-0.5"
              >
                <NavLink
                  to={item.url}
                  className={({ isActive }) =>
                    `flex items-center gap-3 ${
                      isActive
                        ? "bg-primary/15 text-primary font-semibold border-l-2 border-primary"
                        : "text-muted-foreground hover:text-foreground"
                    }`
                  }
                >
                  {item.icon && <item.icon className="h-5 w-5" />}
                  <span className="text-sm">{item.title}</span>
                </NavLink>
              </SidebarMenuButton>
            </SidebarMenuItem>
          ))}
        </SidebarMenu>
      </SidebarGroupContent>
    </SidebarGroup>
  );
}
