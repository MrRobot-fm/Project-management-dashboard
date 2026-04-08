import { type ComponentProps } from "react";
import { Button } from "@workspace/ui/components/Button";
import { CustomDialog } from "@/domains/shared/components/CustomDialog";
// import { deleteUser } from "@/services/users/delete-user";

interface UserAccountDialogProps
  extends Omit<ComponentProps<typeof CustomDialog>, "children"> {
  userId: string | undefined;
}

export const DeleteAccountDialog = ({
  trigger,
  open,
  onOpenChange,
  userId,
  ...props
}: UserAccountDialogProps) => {
  return (
    <CustomDialog
      {...props}
      trigger={trigger}
      open={open}
      onOpenChange={onOpenChange}
    >
      <DeleteAccountActions userId={userId} setIsOpen={onOpenChange} />
    </CustomDialog>
  );
};

const DeleteAccountActions = ({
  setIsOpen,
  userId: _userId
}: {
  setIsOpen?: (isOpen: boolean) => void;
  userId: string | undefined;
}) => {
  // const [, action, isActionPending] = useActionState<DeleteActionState, string | undefined>(
  //   async (_state, userId) => {
  //     return await deleteUser(userId);
  //   },
  //   { success: false, error: undefined },
  // );

  // const deleteAction = () => {
  //   if (!userId) return;

  //   startTransition(() => {
  //     action(userId);
  //   });
  // };

  // const isLoading = isPending || isActionPending;1

  return (
    <div className="flex justify-end gap-3">
      <Button
        variant="outline"
        onClick={() => setIsOpen?.(false)}
        // disabled={isLoading}
        className="rounded text-xs cursor-pointer focus-visible:ring-0"
      >
        Cancel
      </Button>
      <Button
        variant="outline"
        // onClick={deleteAction}
        // disabled={isLoading}
        className="rounded text-xs  border-red-300 text-red-400 cursor-pointer hover:text-red-400 hover:bg-red-50 max-w-[133px]"
      >
        {/* {isLoading ? <Spinner className="text-red-400" /> : <Trash2 className="size-3.5" />} */}
        Delete account
      </Button>
    </div>
  );
};
