import { Fragment } from "react";
import { Avatar } from "@/domains/shared/components/Avatar";
import { WorkspaceSelectorActions } from "@/domains/workspaces/components/WorkspaceSelector/components/WorkspaceSelectorActions";
import { useNavigate } from "@tanstack/react-router";
import type { Workspace } from "@workspace/db";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@workspace/ui/components/Select";
import {
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@workspace/ui/components/Sidebar";
import { ChevronsUpDownIcon } from "lucide-react";

interface WorkspaceSelectorProps {
  workspaces: Workspace[];
  currentWorkspaceId?: string;
  onCreateWorkspace: () => void;
  onEditWorkspace: () => void;
  currentWorkspaceName?: string;
  isDeleteDialogOpen: boolean;
  onDeleteDialogOpenChange: (isOpen: boolean) => void;
}

export const WorkspaceSelector = ({
  workspaces,
  currentWorkspaceId,
  onCreateWorkspace,
  onEditWorkspace,
  currentWorkspaceName,
  isDeleteDialogOpen,
  onDeleteDialogOpenChange,
}: WorkspaceSelectorProps) => {
  const navigate = useNavigate();

  const handleSelect = (id: string) => {
    navigate({ to: "/workspaces/$workspaceId", params: { workspaceId: id } });
  };

  const selectedWorkspace = workspaces.find(
    (workspace) => workspace.id === currentWorkspaceId,
  );
  const canManageWorkspace =
    workspaces.length > 0 && Boolean(currentWorkspaceId);

  return (
    <SidebarMenu>
      <SidebarMenuItem>
        <div className="w-full max-w-xs">
          <Select onValueChange={handleSelect} value={currentWorkspaceId}>
            <SidebarMenuButton
              asChild
              size="lg"
              className="group-data-[collapsible=icon]:p-0! group-data-[collapsible=icon]:justify-center"
            >
              <SelectTrigger
                data-test-id="workspaces-select"
                className="w-full bg-white border-neutral-200 dark:border-stone-700 !h-11.5 px-2 py-1 *:data-[slot=select-icon]:hidden cursor-pointer focus-visible:ring-0 focus-visible:border-gray-200 data-[placeholder]:text-stone-700 dark:data-[placeholder]:text-foreground"
              >
                <SelectValue placeholder="No workspaces. Create one!">
                  {selectedWorkspace && (
                    <WorkspaceInfo workspace={selectedWorkspace} />
                  )}
                </SelectValue>
                <ChevronsUpDownIcon className="group-data-[collapsible=icon]:hidden" />
              </SelectTrigger>
            </SidebarMenuButton>
            <SelectContent className="min-w-64">
              {workspaces.map((workspace) => (
                <Fragment key={workspace.id}>
                  <SelectItem
                    value={workspace.id}
                    className="h-fit px-2 py-1 cursor-pointer"
                  >
                    <WorkspaceInfo workspace={workspace} />
                  </SelectItem>
                </Fragment>
              ))}
              <div className="my-1 h-px bg-gray-200 dark:bg-stone-700" />
              <WorkspaceSelectorActions
                canManageWorkspace={canManageWorkspace}
                onCreate={onCreateWorkspace}
                onEdit={onEditWorkspace}
                isDeleteDialogOpen={isDeleteDialogOpen}
                onDeleteDialogOpenChange={onDeleteDialogOpenChange}
                currentWorkspaceName={currentWorkspaceName}
              />
            </SelectContent>
          </Select>
        </div>
      </SidebarMenuItem>
    </SidebarMenu>
  );
};

const WorkspaceInfo = ({
  workspace,
}: {
  workspace: Workspace;
  haAction?: boolean;
}) => (
  <div className="flex items-center gap-3">
    <Avatar
      image={workspace.logo}
      fallback={workspace.name}
      size="xl"
      shape="square"
    />
    <div className="flex flex-col items-start">
      <span className="font-medium text-foreground">{workspace.name}</span>
      <span className="text-xs text-muted-foreground">Workspace</span>
    </div>
  </div>
);
