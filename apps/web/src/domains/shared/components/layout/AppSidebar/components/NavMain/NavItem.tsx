import type { AppSidebarNavItem } from "@/domains/shared/components/layout/AppSidebar/data/nav-data";
import { Link } from "@tanstack/react-router";
import {
  SidebarGroup,
  SidebarGroupContent,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem
} from "@workspace/ui/components/Sidebar";

export const NavMain = ({ items }: { items: AppSidebarNavItem[] }) => {
  return (
    <SidebarGroup>
      <SidebarGroupContent className="flex flex-col gap-2">
        <SidebarMenu>
          {items.map(item => {
            return (
              <SidebarMenuItem key={item.title}>
                {"to" in item ? (
                  <SidebarMenuButton
                    asChild
                    tooltip={item.title}
                    className="hover:bg-primary/80 hover:text-primary-foreground min-w-8 duration-300 ease-linear transition-all"
                  >
                    <Link
                      to={item.to}
                      activeProps={{
                        className: "bg-neutral-100 text-neutral-900"
                      }}
                    >
                      <item.icon />
                      <span className="mr-auto">{item.title}</span>
                    </Link>
                  </SidebarMenuButton>
                ) : (
                  <SidebarMenuButton
                    tooltip={`${item.title} (coming soon)`}
                    disabled
                    className="min-w-8 opacity-50"
                  >
                    <item.icon />
                    <span className="mr-auto">{item.title}</span>
                  </SidebarMenuButton>
                )}
              </SidebarMenuItem>
            );
          })}
        </SidebarMenu>
      </SidebarGroupContent>
    </SidebarGroup>
  );
};
