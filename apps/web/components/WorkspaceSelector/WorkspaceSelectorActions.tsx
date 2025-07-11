"use client";

import { useTransition } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@workspace/ui/components/Button";
import { Spinner } from "@workspace/ui/components/Spinner";
import { AlertDialog } from "../AlertDialog/AlertDialog";
import { deleteWorkspaceAction } from "@/services/workspaces/delete-workspaces";
import type { Workspace } from "@workspace/db";
import { Pencil, PlusCircle, Trash2 } from "lucide-react";

interface WorkspaceSelectorActionsProps {
  setIsCreateWorkspaceOpen: (value: boolean) => void;
  setSheetMode: (value: "create" | "edit") => void;
  workspaces: Workspace[];
  currentWorkspaceId: string | undefined;
  isDeleteDialogOpen: boolean;
  setIsDeleteDialogOpen: (isOpen: boolean) => void;
  currentWorkspaceName: string | undefined;
}

export const WorkspaceSelectorActions = ({
  workspaces,
  setIsCreateWorkspaceOpen,
  setSheetMode,
  currentWorkspaceId,
  isDeleteDialogOpen,
  setIsDeleteDialogOpen,
  currentWorkspaceName,
}: WorkspaceSelectorActionsProps) => {
  return (
    <div>
      <Button
        variant="ghost"
        className="flex gap-2 items-center cursor-pointer w-full justify-start"
        onClick={() => {
          setSheetMode("create");
          setIsCreateWorkspaceOpen(true);
        }}
      >
        <PlusCircle className="size-4 text-gray-600" />
        <span className="text-xs text-stone-600">Create workspace</span>
      </Button>
      {workspaces.length > 0 && (
        <>
          <Button
            variant="ghost"
            className="flex gap-2 items-center cursor-pointer w-full justify-start"
            onClick={() => {
              setSheetMode("edit");
              setIsCreateWorkspaceOpen(true);
            }}
          >
            <Pencil className="size-4 text-gray-600" />
            <span className="text-xs text-stone-600">Edit workspace</span>
          </Button>
          <AlertDialog
            isOpen={isDeleteDialogOpen}
            onOpenChange={setIsDeleteDialogOpen}
            title={`Are you sure to delete "${currentWorkspaceName?.toUpperCase()}"?`}
            description="This action will delete the workspace and all its data. This action cannot be undone."
            triggerSlot={
              <Button
                variant="transparent"
                className="flex gap-2 items-center cursor-pointer w-full justify-start text-red-500 hover:text-red-500 hover:bg-red-50"
                onClick={() => setIsDeleteDialogOpen(true)}
              >
                <Trash2 className="size-4 " />
                <span className="text-xs ">Delete workspace</span>
              </Button>
            }
            actionSlot={
              <DeleteAction
                workspaceId={currentWorkspaceId ?? ""}
                setIsDeleteDialogOpen={setIsDeleteDialogOpen}
              />
            }
          />
        </>
      )}
    </div>
  );
};

const DeleteAction = ({
  workspaceId,
  setIsDeleteDialogOpen,
}: {
  workspaceId: string;
  setIsDeleteDialogOpen: (isOpen: boolean) => void;
}) => {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();

  return (
    <Button
      variant="destructive"
      className="flex gap-2 items-center cursor-pointer bg-red-500"
      onClick={async () => {
        startTransition(async () => {
          const response = await deleteWorkspaceAction({
            workspaceId,
          });
          router.refresh();

          if (response.success) {
            setTimeout(() => {
              setIsDeleteDialogOpen(false);
            }, 1000);
          }
        });
      }}
      disabled={isPending}
    >
      {isPending ? <Spinner className="text-red-white" /> : <span className="text-sm">Delete</span>}
    </Button>
  );
};
