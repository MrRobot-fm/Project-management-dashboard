import { useActionState, useTransition, type ComponentProps } from "react";
import { Button } from "@workspace/ui/components/Button";
import { Spinner } from "@workspace/ui/components/Spinner";
import { CustomDialog } from "@/components/CustomDialog";
import { deleteUser } from "@/services/users/delete-user";
import { Trash2 } from "lucide-react";

interface UserAccountDialogProps extends Omit<ComponentProps<typeof CustomDialog>, "contentSlot"> {
  userId: string | undefined;
}

export const DeleteAccountDialog = ({
  triggerSlot,
  isOpen,
  setIsOpen,
  userId,
  ...props
}: UserAccountDialogProps) => {
  return (
    <CustomDialog
      triggerSlot={triggerSlot}
      isOpen={isOpen}
      setIsOpen={setIsOpen}
      contentSlot={<DeleteAccountActions userId={userId} setIsOpen={setIsOpen} />}
      {...props}
    />
  );
};

interface DeleteActionState {
  success: boolean;
  error?: unknown;
}

const DeleteAccountActions = ({
  setIsOpen,
  userId,
}: {
  setIsOpen?: (isOpen: boolean) => void;
  userId: string | undefined;
}) => {
  const [isPending, startTransition] = useTransition();

  const [, action, isActionPending] = useActionState<DeleteActionState, string | undefined>(
    async (_state, userId) => {
      return await deleteUser(userId);
    },
    { success: false, error: undefined },
  );

  const deleteAction = () => {
    if (!userId) return;

    startTransition(() => {
      action(userId);
    });
  };

  const isLoading = isPending || isActionPending;

  return (
    <div className="flex justify-end gap-3">
      <Button
        variant="outline"
        onClick={() => setIsOpen?.(false)}
        disabled={isLoading}
        className="rounded text-xs cursor-pointer focus-visible:ring-0"
      >
        Cancel
      </Button>
      <Button
        variant="outline"
        onClick={deleteAction}
        disabled={isLoading}
        className="rounded text-xs  border-red-300 text-red-400 cursor-pointer hover:text-red-400 hover:bg-red-50 max-w-[133px]"
      >
        {isLoading ? <Spinner className="text-red-400" /> : <Trash2 className="size-3.5" />}
        Delete account
      </Button>
    </div>
  );
};
