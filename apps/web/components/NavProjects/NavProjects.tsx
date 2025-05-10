"use client";

import { useCallback, useMemo, useOptimistic, useState } from "react";
import Link from "next/link";
import { useParams } from "next/navigation";
import { Button } from "@workspace/ui/components/Button";
import {
  SidebarGroup,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuAction,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from "@workspace/ui/components/Sidebar";
import { CustomDropdown } from "../CustomDropdown";
import { NavProjectsItems } from "./NavProjectsItems";
import { ShowProjectsButton } from "./ShowProjectsButton";
import { Avatar } from "@/components/Avatar";
import { LinkLoadingIndicator } from "@/components/LinkLoadingIndicator";
import { URL_PROJECTS } from "@/constants/urls";
import { deleteProjectAction } from "@/services/projects/delete-project";
import {
  IconDots,
  IconFolder,
  IconShare3,
  IconTrash,
} from "@tabler/icons-react";
import type { Project } from "@workspace/db";
import { PlusCircle } from "lucide-react";

export const NavProjects = ({ projects }: { projects: Project[] }) => {
  const { id } = useParams();
  const { isMobile } = useSidebar();

  const deleteProject = (projects: Project[], projectId: string) => {
    return projects.filter((project) => project.id !== projectId);
  };

  const [optimisticProjects, removeOptimisticProjects] = useOptimistic<
    Project[],
    string
  >(projects, deleteProject);

  const [isExpanded, setIsExpanded] = useState(false);

  const projectsData = useMemo(() => {
    if (isExpanded) return optimisticProjects;

    return optimisticProjects.slice(0, 3);
  }, [isExpanded, optimisticProjects]);

  const handleDeleteProject = useCallback(
    async (projectId: string) => {
      removeOptimisticProjects(projectId);

      await deleteProjectAction(projectId);
    },
    [removeOptimisticProjects],
  );

  const getDropdownItems = useCallback(
    (projectId: string) => [
      {
        icon: <IconFolder />,
        label: "Open",
        action: () => {},
        href: `${URL_PROJECTS}/${projectId}`,
        isLink: true,
      },
      {
        icon: <IconShare3 />,
        label: "Share",
        action: () => {},
        isLink: false,
      },
      {
        icon: <IconTrash />,
        label: "Delete",
        action: () => handleDeleteProject(projectId),
        isDestructive: true,
        isLink: false,
      },
    ],
    [handleDeleteProject],
  );

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
        {projectsData.length > 0 ? (
          projectsData.map((project) => {
            const isActive = project.id === id;
            const dropdownData = getDropdownItems(project.id);

            return (
              <SidebarMenuItem key={project.id}>
                <SidebarMenuButton asChild isActive={isActive}>
                  <Link href={`${URL_PROJECTS}/${project.id}`}>
                    <Avatar
                      size="md"
                      shape="square"
                      image={project.logo}
                      fallback={project.name}
                    />
                    <span className="text-sm">{project.name}</span>
                    <LinkLoadingIndicator />
                  </Link>
                </SidebarMenuButton>
                <CustomDropdown
                  data={dropdownData}
                  side={isMobile ? "bottom" : "bottom"}
                  align={isMobile ? "end" : "start"}
                  trigger={
                    <SidebarMenuAction
                      showOnHover
                      className="data-[state=open]:bg-accent rounded-sm"
                    >
                      <IconDots className="!size-3" />
                      <span className="sr-only">More</span>
                    </SidebarMenuAction>
                  }
                  items={(item) => (
                    <NavProjectsItems key={item.label} item={item} />
                  )}
                  className="rounded-lg"
                />
              </SidebarMenuItem>
            );
          })
        ) : (
          <SidebarMenuItem className="text-xs p-2">
            No projects. Create one, now!
          </SidebarMenuItem>
        )}
        {optimisticProjects.length > 3 && (
          <SidebarMenuItem className="mt-2">
            <ShowProjectsButton
              isExpanded={isExpanded}
              setIsExpanded={setIsExpanded}
            />
          </SidebarMenuItem>
        )}
      </SidebarMenu>
    </SidebarGroup>
  );
};
