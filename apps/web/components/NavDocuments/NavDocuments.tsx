"use client";

import { useMemo, useState } from "react";
import { Button } from "@workspace/ui/components/Button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@workspace/ui/components/DropdownMenu";
import {
  SidebarGroup,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuAction,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from "@workspace/ui/components/Sidebar";
import { Avatar } from "../Avatar";
import {
  IconDots,
  IconFolder,
  IconShare3,
  IconTrash,
} from "@tabler/icons-react";
import type { Project } from "@workspace/db";
import { ChevronDown, ChevronUp, PlusCircle } from "lucide-react";

export function NavDocuments({ items }: { items: Project[] }) {
  const { isMobile } = useSidebar();
  const [isExpanded, setIsExpanded] = useState(false);

  const projects = useMemo(() => {
    if (isExpanded) return items;

    return items.slice(0, 3);
  }, [isExpanded, items]);

  return (
    <SidebarGroup className="group-data-[collapsible=icon]:hidden">
      <SidebarGroupLabel asChild>
        <Button
          variant="link"
          className="hover:no-underline justify-between cursor-pointer !pl-2"
        >
          Projects
          <PlusCircle className="size-4" />
        </Button>
      </SidebarGroupLabel>
      <SidebarMenu>
        {projects.length > 0 ? (
          projects.map((item) => (
            <SidebarMenuItem key={item.id}>
              <SidebarMenuButton asChild>
                <a href={item.id}>
                  <Avatar
                    size="sm"
                    shape="square"
                    image={item.logo}
                    fallback={item.name}
                  />
                  <span>{item.name}</span>
                </a>
              </SidebarMenuButton>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <SidebarMenuAction
                    showOnHover
                    className="data-[state=open]:bg-accent rounded-sm"
                  >
                    <IconDots />
                    <span className="sr-only">More</span>
                  </SidebarMenuAction>
                </DropdownMenuTrigger>
                <DropdownMenuContent
                  className="w-24 rounded-lg"
                  side={isMobile ? "bottom" : "right"}
                  align={isMobile ? "end" : "start"}
                >
                  <DropdownMenuItem>
                    <IconFolder />
                    <span>Open</span>
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    <IconShare3 />
                    <span>Share</span>
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem variant="destructive">
                    <IconTrash />
                    <span>Delete</span>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </SidebarMenuItem>
          ))
        ) : (
          <SidebarMenuItem className="text-xs p-2">
            No projects. Create one, now!
          </SidebarMenuItem>
        )}
        {projects.length > 0 && (
          <SidebarMenuItem>
            <SidebarMenuButton
              className="text-sidebar-foreground/70 justify-center bg-stone-100 cursor-pointer"
              onClick={() => setIsExpanded((prev) => !prev)}
            >
              <span>{isExpanded ? "Show less" : "Show all"}</span>
              {isExpanded ? (
                <ChevronUp className="text-sidebar-foreground/70" />
              ) : (
                <ChevronDown className="text-sidebar-foreground/70" />
              )}
            </SidebarMenuButton>
          </SidebarMenuItem>
        )}
      </SidebarMenu>
    </SidebarGroup>
  );
}
