import { useState } from "react";
import { CustomDialog } from "@/domains/shared/components/CustomDialog";
import { WorkspaceProjectForm } from "@/domains/shared/components/forms/WorkspaceProjectForm";
import { WorkspaceSelector } from "@/domains/workspaces/components/WorkspaceSelector";
import { workspacesQueries } from "@/domains/workspaces/api/queries";
import { useQuery } from "@tanstack/react-query";
import { SidebarFooter } from "@workspace/ui/components/Sidebar/Sidebar";

interface AppSidebarWorkspaceSectionProps {
  workspaceId?: string;
}

export const AppSidebarWorkspaceSection = ({
  workspaceId
}: AppSidebarWorkspaceSectionProps) => {
  const [isWorkspaceDialogOpen, setIsWorkspaceDialogOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [sheetMode, setSheetMode] = useState<"create" | "edit">("create");

  const { data: workspaces = [] } = useQuery(workspacesQueries.getWorkspaces);

  const selectedWorkspace = workspaces.find(
    workspace => workspace.id === workspaceId
  );

  const dialogText = {
    create: {
      title: "Create your workspace",
      description: "This is where your ideas take shape"
    },
    edit: {
      title: "Edit your workspace",
      description: "Edit details and keep your workspace up to date"
    }
  }[sheetMode];

  if (!workspaceId) {
    return null;
  }

  return (
    <SidebarFooter className="bg-background">
      <WorkspaceSelector
        currentWorkspaceId={workspaceId}
        workspaces={workspaces}
        currentWorkspaceName={selectedWorkspace?.name}
        isDeleteDialogOpen={isDeleteDialogOpen}
        onDeleteDialogOpenChange={setIsDeleteDialogOpen}
        onCreateWorkspace={() => {
          setSheetMode("create");
          setIsWorkspaceDialogOpen(true);
        }}
        onEditWorkspace={() => {
          setSheetMode("edit");
          setIsWorkspaceDialogOpen(true);
        }}
      />
      <CustomDialog
        title={dialogText.title}
        description={dialogText.description}
        open={isWorkspaceDialogOpen}
        onOpenChange={setIsWorkspaceDialogOpen}
      >
        <WorkspaceProjectForm
          id={workspaceId}
          data={
            selectedWorkspace && sheetMode === "edit"
              ? selectedWorkspace
              : undefined
          }
          action={() => {}}
          mode={sheetMode}
          type="workspace"
          workspaceId={workspaceId}
        />
      </CustomDialog>
    </SidebarFooter>
  );
};
