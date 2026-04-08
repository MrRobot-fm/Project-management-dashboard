// import { useRouter } from "next/navigation";
import { Button } from "@workspace/ui/components/Button";
import { AlertDialog } from "../../../../shared/components/AlertDialog/AlertDialog";
// import { deleteWorkspaceAction } from "@/services/workspaces/delete-workspaces";
import { Pencil, PlusCircle, Trash2 } from "lucide-react";

interface WorkspaceSelectorActionsProps {
  canManageWorkspace: boolean;
  onCreate: () => void;
  onEdit: () => void;
  onDeleteDialogOpenChange: (isOpen: boolean) => void;
  isDeleteDialogOpen: boolean;
  currentWorkspaceName: string | undefined;
}

export const WorkspaceSelectorActions = ({
  canManageWorkspace,
  onCreate,
  onEdit,
  isDeleteDialogOpen,
  onDeleteDialogOpenChange,
  currentWorkspaceName,
}: WorkspaceSelectorActionsProps) => {
  return (
    <div>
      <Button
        variant="ghost"
        className="flex gap-2 items-center cursor-pointer w-full justify-start"
        onClick={onCreate}
      >
        <PlusCircle className="size-4 text-gray-600" />
        <span className="text-xs text-stone-600">Create workspace</span>
      </Button>
      {canManageWorkspace && (
        <>
          <Button
            variant="ghost"
            className="flex gap-2 items-center cursor-pointer w-full justify-start"
            onClick={onEdit}
          >
            <Pencil className="size-4 text-gray-600" />
            <span className="text-xs text-stone-600">Edit workspace</span>
          </Button>
          <AlertDialog
            open={isDeleteDialogOpen}
            onOpenChange={onDeleteDialogOpenChange}
            title={`Are you sure to delete "${currentWorkspaceName?.toUpperCase()}"?`}
            description="This action will delete the workspace and all its data. This action cannot be undone."
            trigger={
              <Button
                data_test-id="delete-workspace-btn"
                variant="transparent"
                className="flex gap-2 items-center cursor-pointer w-full justify-start text-red-500 hover:text-red-500 hover:bg-red-50"
              >
                <Trash2 className="size-4 " />
                <span className="text-xs ">Delete workspace</span>
              </Button>
            }
          >
            <DeleteAction />
          </AlertDialog>
        </>
      )}
    </div>
  );
};

const DeleteAction = () => {
  // const router = useRouter();
  // const [isPending, startTransition] = useTransition();

  return (
    <Button
      variant="destructive"
      className="flex gap-2 items-center cursor-pointer bg-red-500"
    >
      <span className="text-sm">Delete</span>
    </Button>
  );
};
