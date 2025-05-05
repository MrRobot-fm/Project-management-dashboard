"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
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
import { URL_PROJECTS } from "@/constants/urls";
import { deleteProject } from "@/services/projects/delete-project";
import {
  IconDots,
  IconFolder,
  IconShare3,
  IconTrash,
} from "@tabler/icons-react";
import { useQueryClient } from "@tanstack/react-query";
import type { Project } from "@workspace/db";
import { ChevronDown, ChevronUp, PlusCircle } from "lucide-react";

export const NavProjects = ({ projects }: { projects: Project[] }) => {
  const queryClient = useQueryClient();
  const { isMobile } = useSidebar();
  const [isExpanded, setIsExpanded] = useState(false);

  const projectsData = useMemo(() => {
    if (isExpanded) return projects;

    return projects.slice(0, 3);
  }, [isExpanded, projects]);

  const handleDeleteProject = async (projectId: string) => {
    await deleteProject(projectId);

    await queryClient.invalidateQueries({
      queryKey: ["ws-projects"],
    });
  };

  return (
    <SidebarGroup className="group-data-[collapsible=icon]:hidden">
      <SidebarGroupLabel asChild>
        <Button
          variant="link"
          className="hover:no-underline justify-between cursor-pointer !pl-2 uppercase font-semibold"
        >
          Projects
          <PlusCircle className="size-4" />
        </Button>
      </SidebarGroupLabel>
      <SidebarMenu>
        {projects.length > 0 ? (
          projectsData.map((project) => (
            <SidebarMenuItem key={project.id}>
              <SidebarMenuButton asChild>
                <a href={`${URL_PROJECTS}/${project.id}`}>
                  <Avatar
                    shape="square"
                    image={project.logo}
                    fallback={project.name}
                    className="size-5"
                  />
                  <span className="text-sm">{project.name}</span>
                </a>
              </SidebarMenuButton>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <SidebarMenuAction
                    showOnHover
                    className="data-[state=open]:bg-accent rounded-sm"
                  >
                    <IconDots className="!size-3" />
                    <span className="sr-only">More</span>
                  </SidebarMenuAction>
                </DropdownMenuTrigger>
                <DropdownMenuContent
                  className="w-24 rounded-lg"
                  side={isMobile ? "bottom" : "right"}
                  align={isMobile ? "end" : "start"}
                >
                  <DropdownMenuItem asChild>
                    <Link
                      href={`${URL_PROJECTS}/${project.id}`}
                      className="cursor-pointer"
                    >
                      <IconFolder />
                      <span>Open</span>
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    <IconShare3 />
                    <span>Share</span>
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem asChild variant="destructive">
                    <Button
                      variant="transparent"
                      className="w-full justify-start font-normal cursor-pointer"
                      onClick={() => handleDeleteProject(project.id)}
                    >
                      <IconTrash />
                      <span>Delete</span>
                    </Button>
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
        {projects.length > 3 && (
          <SidebarMenuItem className="mt-2">
            <SidebarMenuButton
              className="text-sidebar-foreground/70 bg-stone-100 dark:bg-transparent justify-center cursor-pointer dark:border dark:border-muted-foreground"
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
};
