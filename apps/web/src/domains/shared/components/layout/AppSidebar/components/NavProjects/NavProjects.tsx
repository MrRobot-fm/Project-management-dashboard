import { useDeleteProject } from "@/domains/projects/api/hooks/use-delete-project";
import { ProjectSheet } from "@/domains/projects/components/ProjectSheet/ProjectSheet";
import { DeleteAlert } from "@/domains/shared/components/DeleteAlert";
import type { Project } from "@/domains/shared/types/api-get-project-by-id";
import { Button } from "@workspace/ui/components/Button";
import {
  SidebarGroup,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuItem,
  useSidebar
} from "@workspace/ui/components/Sidebar";
import { cn } from "@workspace/ui/lib/utils";
import { PlusCircle } from "lucide-react";
import { NavProjectsEmpty } from "./components/NavProjectsEmpty";
import { NavProjectsItem } from "./components/NavProjectsItem";
import { ShowProjectsButton } from "./components/ShowProjectsButton";
import { useNavProjects } from "./hooks/use-nav-projects";
import { getProjectDropdownItems } from "./utils/get-dropdown-items";

interface NavProjectsProps {
  projects: Project[];
  currentWorkspaceId: string | undefined;
}

export const NavProjects = ({
  projects,
  currentWorkspaceId
}: NavProjectsProps) => {
  const { isMobile, open } = useSidebar();

  const {
    isExpanded,
    setIsExpanded,
    isProjectDialogOpen,
    editingProject,
    projectPendingDelete,
    visibleProjects,
    handleOpenCreate,
    handleOpenEdit,
    handleProjectSheetOpenChange,
    handleOpenDelete,
    isDeleteProjectDialogOpen,
    handleDeleteDialogOpenChange
  } = useNavProjects({ projects, open });

  const { mutate: deleteProjectMutation } =
    useDeleteProject(currentWorkspaceId);

  const deleteProject = () => {
    if (projectPendingDelete?.id) {
      deleteProjectMutation(projectPendingDelete.id);
    }
  };

  const hasProjects = projects.length > 0;
  const showToggle = projects.length > 3;

  return (
    <SidebarGroup
      className={cn(
        projects.length === 0 && "group-data-[collapsible=icon]:hidden"
      )}
    >
      <DeleteAlert
        open={isDeleteProjectDialogOpen}
        onOpenChange={handleDeleteDialogOpenChange}
        title="Are you absolutely sure?"
        description="This action cannot be undone. This will permanently delete your project from our servers."
        action={deleteProject}
      />
      <ProjectSheet
        isOpen={isProjectDialogOpen}
        setIsOpen={handleProjectSheetOpenChange}
        workspaceId={currentWorkspaceId ?? ""}
        project={editingProject}
      />
      <SidebarGroupLabel asChild>
        <Button
          variant="link"
          className="hover:no-underline justify-between cursor-pointer pl-2! uppercase font-semibold"
          onClick={handleOpenCreate}
        >
          Projects
          <PlusCircle className="size-4" />
        </Button>
      </SidebarGroupLabel>
      <SidebarMenu>
        {!hasProjects ? (
          <NavProjectsEmpty />
        ) : (
          visibleProjects.map(project => {
            const dropdownItems = getProjectDropdownItems(project, {
              onEdit: handleOpenEdit,
              onDelete: handleOpenDelete
            });

            return (
              <NavProjectsItem
                key={project.id}
                isMobile={isMobile}
                project={project}
                dropdownItems={dropdownItems}
              />
            );
          })
        )}
        {showToggle && (
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
