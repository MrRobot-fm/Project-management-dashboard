import type { AppSidebarNavItem } from "@/domains/shared/components/layout/AppSidebar/data/nav-data";
import { Link } from "@tanstack/react-router";
import type { ComponentPropsWithoutRef } from "react";
import {
  SidebarGroup,
  SidebarGroupContent,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem
} from "@workspace/ui/components/Sidebar";

interface NavSecondaryProps
  extends ComponentPropsWithoutRef<typeof SidebarGroup> {
  items: AppSidebarNavItem[];
}

export const NavSecondary = ({ items, ...props }: NavSecondaryProps) => {
  return (
    <SidebarGroup {...props}>
      <SidebarGroupContent>
        <SidebarMenu>
          {items.map(item => (
            <SidebarMenuItem key={item.title}>
              {"to" in item ? (
                <SidebarMenuButton asChild>
                  <Link
                    to={item.to}
                    activeProps={{
                      className:
                        "bg-sidebar-accent text-sidebar-accent-foreground"
                    }}
                  >
                    <item.icon />
                    <span>{item.title}</span>
                  </Link>
                </SidebarMenuButton>
              ) : (
                <SidebarMenuButton disabled className="opacity-50">
                  <item.icon />
                  <span>{item.title}</span>
                </SidebarMenuButton>
              )}
            </SidebarMenuItem>
          ))}
        </SidebarMenu>
      </SidebarGroupContent>
    </SidebarGroup>
  );
};
