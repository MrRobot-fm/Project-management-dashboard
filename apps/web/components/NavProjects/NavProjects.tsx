"use client";

import { useEffect, useMemo, useState } from "react";
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
import { NavProjectsItems } from "./NavProjectsItems";
import { ShowProjectsButton } from "./ShowProjectsButton";
import { Avatar } from "@/components/Avatar";
import { CustomDropdown } from "@/components/CustomDropdown";
import { CustomSheet } from "@/components/CustomSheet";
import { LinkLoadingIndicator } from "@/components/LinkLoadingIndicator";
import { WorkspaceProjectForm } from "@/components/forms/WorkspaceProjectForm";
import { URL_PROJECTS } from "@/constants/urls";
import { useUpdateProject } from "@/hooks/use-update-project";
import { IconDots, IconFolder, IconTrash } from "@tabler/icons-react";
import type { Project } from "@workspace/db";
import { Edit, PlusCircle } from "lucide-react";

interface NavProjectsProps {
  projects: Project[];
  currentWorkspaceId: string | undefined;
}

export const NavProjects = ({ projects, currentWorkspaceId }: NavProjectsProps) => {
  const { id } = useParams();
  const { isMobile } = useSidebar();

  const [isExpanded, setIsExpanded] = useState(false);
  const [isProjectSheetOpen, setIsProjectSheetOpen] = useState(false);
  const [sheetMode, setSheetMode] = useState<"create" | "edit">("create");
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  const { optimisticProjects, handleDeleteProject, createProjectState, createAction } =
    useUpdateProject({
      projects,
    });

  const visibleProjects = useMemo(
    () => (isExpanded ? optimisticProjects : optimisticProjects.slice(0, 3)),
    [isExpanded, optimisticProjects],
  );

  const dropdownItems = (project: Project) => [
    {
      icon: <IconFolder />,
      label: "Open",
      href: `${URL_PROJECTS}/${project.id}`,
      isLink: true,
    },
    {
      icon: <Edit />,
      label: "Edit",
      action: () => {
        setSheetMode("edit");
        setSelectedProject(project);
        setIsProjectSheetOpen(true);
      },
      isLink: false,
    },
    {
      icon: <IconTrash />,
      label: "Delete",
      action: () => handleDeleteProject(project),
      isDestructive: true,
      isLink: false,
    },
  ];

  useEffect(() => {
    if (createProjectState?.success) {
      setIsProjectSheetOpen(false);
    }
  }, [createProjectState]);

  const isCreateMode = sheetMode === "create";

  const title = isCreateMode ? "Create Project" : "Edit Project";
  const descriptions = isCreateMode
    ? "Create a new project and start to collaborate with other people."
    : `Edit ${selectedProject?.name} project and save the changes!`;

  return (
    <SidebarGroup className="group-data-[collapsible=icon]:hidden">
      <CustomSheet
        title={title}
        description={descriptions}
        isOpen={isProjectSheetOpen}
        setIsOpen={setIsProjectSheetOpen}
        contentSlot={
          <WorkspaceProjectForm
            action={createAction}
            mode={sheetMode}
            data={selectedProject && sheetMode === "edit" ? selectedProject : undefined}
            workspaceId={currentWorkspaceId}
          />
        }
      />

      <SidebarGroupLabel asChild>
        <Button
          variant="link"
          className="hover:no-underline justify-between cursor-pointer !pl-2 uppercase font-semibold"
          onClick={() => {
            setSheetMode("create");
            setIsProjectSheetOpen(true);
          }}
        >
          Projects
          <PlusCircle className="size-4" />
        </Button>
      </SidebarGroupLabel>
      <SidebarMenu>
        {visibleProjects.length > 0 ? (
          visibleProjects.map((project) => {
            const isActive = project.id === id;

            return (
              <SidebarMenuItem key={project.id}>
                <SidebarMenuButton asChild isActive={isActive}>
                  <Link href={`${URL_PROJECTS}/${project.id}`}>
                    <Avatar size="md" shape="square" image={project.logo} fallback={project.name} />
                    <span className="text-sm">{project.name}</span>
                    <LinkLoadingIndicator />
                  </Link>
                </SidebarMenuButton>
                <CustomDropdown
                  data={dropdownItems(project)}
                  side="bottom"
                  align={isMobile ? "end" : "start"}
                  triggerSlot={
                    <SidebarMenuAction
                      showOnHover
                      className="data-[state=open]:bg-accent rounded-sm cursor-pointer focus-within:ring-0"
                    >
                      <IconDots className="!size-3" />
                      <span className="sr-only">More</span>
                    </SidebarMenuAction>
                  }
                  items={(item) => <NavProjectsItems key={item.label} item={item} />}
                  className="rounded-lg"
                />
              </SidebarMenuItem>
            );
          })
        ) : (
          <SidebarMenuItem className="text-xs p-2">No projects. Create one, now!</SidebarMenuItem>
        )}
        {optimisticProjects.length > 3 && (
          <SidebarMenuItem className="mt-2">
            <ShowProjectsButton isExpanded={isExpanded} setIsExpanded={setIsExpanded} />
          </SidebarMenuItem>
        )}
      </SidebarMenu>
    </SidebarGroup>
  );
};
