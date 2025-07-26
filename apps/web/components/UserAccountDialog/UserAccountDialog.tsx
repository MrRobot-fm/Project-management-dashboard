import { useActionState, useEffect, type ComponentProps } from "react";
import { Button } from "@workspace/ui/components/Button";
import { Input } from "@workspace/ui/components/Input";
import { Label } from "@workspace/ui/components/Label";
import { Spinner } from "@workspace/ui/components/Spinner";
import { Dropzone } from "../Dropzone";
import { CustomDialog } from "@/components/CustomDialog";
import { updateUser } from "@/services/users/update-user";
import type { User } from "@workspace/db";
import { PencilLine } from "lucide-react";

interface UserAccountDialogProps extends Omit<ComponentProps<typeof CustomDialog>, "contentSlot"> {
  user: User | undefined;
}

export const UserAccountDialog = ({
  user,
  triggerSlot,
  isOpen,
  setIsOpen,
  ...props
}: UserAccountDialogProps) => {
  return (
    <CustomDialog
      triggerSlot={triggerSlot}
      isOpen={isOpen}
      setIsOpen={setIsOpen}
      contentSlot={<UserAccountContent user={user} setIsDialogOpen={setIsOpen} />}
      {...props}
    />
  );
};

type ActionStateType = {
  action: Awaited<ReturnType<typeof updateUser>>;
  payload: FormData;
};

interface UserAccountContentProps {
  user: User | undefined;
  setIsDialogOpen?: (isOpen: boolean) => void;
}

const UserAccountContent = ({ user, setIsDialogOpen }: UserAccountContentProps) => {
  const [state, formAction, isPending] = useActionState<
    ActionStateType["action"],
    ActionStateType["payload"]
  >(
    async (_state, formData) => {
      return await updateUser(formData);
    },
    { success: false },
  );

  useEffect(() => {
    if (state.success && !isPending && setIsDialogOpen) {
      setIsDialogOpen(false);
    }
  }, [state, isPending, setIsDialogOpen]);

  return (
    <form action={formAction} className="flex flex-col gap-3">
      <input type="hidden" name="userId" value={user?.id} />
      <div className="flex flex-col gap-4">
        <Label htmlFor="name">Name</Label>
        <div className="flex flex-col gap-1">
          <Input
            id="name"
            name="name"
            defaultValue={user?.name}
            placeholder="Your name"
            disabled={isPending}
            className="focus-visible:ring-0 focus-visible:border-neutral-300 shadow-none border-none p-0 h-6 rounded-none"
          />
          <div className="h-4">
            {state.zodErrors?.fieldErrors.name && (
              <p className="text-xs text-red-400">{state.zodErrors.fieldErrors.name}</p>
            )}
          </div>
        </div>
      </div>
      <div className="flex flex-col gap-4">
        <Label htmlFor="email">Email</Label>
        <div className="flex flex-col gap-1">
          <Input
            id="email"
            name="email"
            defaultValue={user?.email}
            placeholder="Your email"
            disabled={isPending}
            className="focus-visible:ring-0 focus-visible:border-neutral-300 shadow-none border-none p-0 h-6 rounded-none"
          />
          <div className="h-4">
            {state.zodErrors?.fieldErrors.email && (
              <p className="text-xs text-red-400">{state.zodErrors.fieldErrors.email}</p>
            )}
          </div>
        </div>
      </div>
      <div className="flex flex-col gap-4">
        <Label htmlFor="logo" className="text-right">
          Logo
        </Label>
        <div className="flex flex-col gap-1">
          <Dropzone
            id={user?.id}
            type="user"
            mode="edit"
            image={user?.logo ?? ""}
            disabled={isPending}
          />
        </div>
      </div>
      <div className="flex justify-end mt-8">
        <Button
          variant="outline"
          disabled={isPending}
          className="max-w-[126px] text-xs font-normal rounded cursor-pointer border-neutral-400"
        >
          {isPending ? <Spinner className="text-black size-4" /> : <PencilLine />}
          Save changes
        </Button>
      </div>
    </form>
  );
};
