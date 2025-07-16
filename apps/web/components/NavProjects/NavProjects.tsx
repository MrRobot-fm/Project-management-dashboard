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
import { cn } from "@workspace/ui/lib/utils";
import { NavProjectsItems } from "./NavProjectsItems";
import { ShowProjectsButton } from "./ShowProjectsButton";
import { Avatar } from "@/components/Avatar";
import { CustomDialog } from "@/components/CustomDialog";
import { CustomDropdown } from "@/components/CustomDropdown";
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
  const { isMobile, open } = useSidebar();

  const [isExpanded, setIsExpanded] = useState(false);
  const [isProjectDialogOpen, setIsProjectDialogOpen] = useState(false);
  const [sheetMode, setSheetMode] = useState<"create" | "edit">("create");
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  const { optimisticProjects, handleDeleteProject, createProjectState, createAction } =
    useUpdateProject({
      projects,
    });

  const visibleProjects = useMemo(
    () => (isExpanded || !open ? optimisticProjects : optimisticProjects.slice(0, 3)),
    [isExpanded, open, optimisticProjects],
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
        setIsProjectDialogOpen(true);
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
      setIsProjectDialogOpen(false);
    }
  }, [createProjectState]);

  const isCreateMode = sheetMode === "create";

  const title = isCreateMode ? "Create Project" : "Edit Project";
  const descriptions = isCreateMode
    ? "What’s your project about? Add a few details."
    : `Make quick edits to keep your project on track`;

  return (
    <SidebarGroup className={cn(projects.length === 0 && "group-data-[collapsible=icon]:hidden")}>
      <CustomDialog
        title={title}
        description={descriptions}
        isOpen={isProjectDialogOpen}
        setIsOpen={setIsProjectDialogOpen}
        contentSlot={
          <WorkspaceProjectForm
            action={createAction}
            mode={sheetMode}
            data={selectedProject && sheetMode === "edit" ? selectedProject : undefined}
            workspaceId={currentWorkspaceId}
            type="project"
          />
        }
      />

      <SidebarGroupLabel asChild>
        <Button
          variant="link"
          className="hover:no-underline justify-between cursor-pointer !pl-2 uppercase font-semibold"
          onClick={() => {
            setSheetMode("create");
            setIsProjectDialogOpen(true);
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
                <SidebarMenuButton
                  asChild
                  isActive={isActive}
                  data-test-id="project-item"
                  className="group-data-[collapsible=icon]:p-1.5!"
                >
                  <Link href={`${URL_PROJECTS}/${project.id}`} prefetch>
                    <Avatar size="md" shape="square" image={project.logo} fallback={project.name} />
                    <span className="text-sm mr-auto">{project.name}</span>
                    <LinkLoadingIndicator className="stroke-muted-foreground" />
                  </Link>
                </SidebarMenuButton>
                <CustomDropdown
                  data={dropdownItems(project)}
                  side="bottom"
                  align={isMobile ? "end" : "start"}
                  triggerSlot={
                    <SidebarMenuAction
                      aria-label="More"
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
          <SidebarMenuItem data-test-id="project-empty-state" className="text-xs p-2">
            No projects. Create one, now!
          </SidebarMenuItem>
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
