"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  SidebarGroup,
  SidebarGroupContent,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@workspace/ui/components/Sidebar";
import { LinkLoadingIndicator } from "../LinkLoadingIndicator";
import { type Icon } from "@tabler/icons-react";

export function NavMain({
  items,
}: {
  items: {
    title: string;
    url: string;
    icon?: Icon;
  }[];
}) {
  const pathname = usePathname();

  return (
    <SidebarGroup>
      <SidebarGroupContent className="flex flex-col gap-2">
        <SidebarMenu>
          {items.map((item) => {
            const isActive =
              item.url === "/"
                ? pathname === "/"
                : pathname.startsWith(item.url);

            return (
              <SidebarMenuItem key={item.title}>
                <SidebarMenuButton
                  asChild
                  tooltip={item.title}
                  className="hover:bg-primary/80 hover:text-primary-foreground data-[active=true]:bg-primary/90 data-[active=true]:text-primary-foreground min-w-8 duration-300 ease-linear transition-all"
                  isActive={isActive}
                >
                  <Link href={item.url}>
                    {item.icon && <item.icon />}
                    <span className="mr-auto">{item.title}</span>
                    <LinkLoadingIndicator className="stroke-primary-foreground" />
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
            );
          })}
        </SidebarMenu>
      </SidebarGroupContent>
    </SidebarGroup>
  );
}
