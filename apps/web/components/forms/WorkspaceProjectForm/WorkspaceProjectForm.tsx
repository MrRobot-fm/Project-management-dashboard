import { Button } from "@workspace/ui/components/Button";
import { Input } from "@workspace/ui/components/Input";
import { Label } from "@workspace/ui/components/Label";
import { useWorkspaceProjectFormValidation } from "./WorkspaceProjectForm.utils";
import { Dropzone } from "@/components/Dropzone";
import { Spinner } from "@/components/Spinner";
import { FieldInfo } from "@/components/forms/FieldInfo";
import type { CreateActionPayload } from "@/hooks/use-update-project";
import type { Project, Workspace } from "@workspace/db";

interface WorkspaceProjectFormProps {
  data?: Partial<Project & Workspace>;
  action: (payload: CreateActionPayload) => void;
  workspaceId?: string;
  mode?: "create" | "edit";
}

export const WorkspaceProjectForm = ({
  data,
  action,
  workspaceId,
  mode,
}: WorkspaceProjectFormProps) => {
  const isEditMode = mode === "edit";
  const isCreateMode = mode === "create";

  const { form, isPending } = useWorkspaceProjectFormValidation({
    data,
    workspaceId,
    action,
    isEditMode,
  });

  return (
    <form
      onSubmit={async (e) => {
        e.preventDefault();
        e.stopPropagation();
        await form.handleSubmit();
      }}
    >
      <div className="flex flex-col gap-4">
        <form.Field name="name">
          {(field) => (
            <div className="flex flex-col gap-4">
              <Label htmlFor={field.name} className="text-right">
                Name
              </Label>
              <div className="flex flex-col gap-1">
                <Input
                  id={field.name}
                  name={field.name}
                  value={field.state.value}
                  onChange={(e) => field.handleChange(e.target.value)}
                  disabled={isPending}
                />
                <FieldInfo field={field} />
              </div>
            </div>
          )}
        </form.Field>
        <form.Field name="description">
          {(field) => (
            <div className="flex flex-col gap-4">
              <Label htmlFor={field.name} className="text-right">
                Description
              </Label>
              <div className="flex flex-col gap-1">
                <Input
                  id={field.name}
                  name={field.name}
                  value={field.state.value}
                  onChange={(e) => field.handleChange(e.target.value)}
                  disabled={isPending}
                />
                <FieldInfo field={field} />
              </div>
            </div>
          )}
        </form.Field>
        <form.Field name="logo">
          {(field) => (
            <div className="flex flex-col gap-4">
              <Label htmlFor={field.name} className="text-right">
                Logo
              </Label>
              <div className="flex flex-col gap-1">
                <Dropzone
                  image={data?.logo ? data.logo : null}
                  disabled={isPending}
                  field={field}
                />
                <FieldInfo field={field} />
              </div>
            </div>
          )}
        </form.Field>
        <div className="flex flex-col gap-1">
          <form.Subscribe selector={(state) => [state.canSubmit, state.values.name]}>
            {([canSubmit, name]) => (
              <Button
                type="submit"
                size="lg"
                disabled={
                  !canSubmit || isPending || !name || (typeof name === "string" && name.length < 2)
                }
                className="cursor-pointer w-full"
              >
                {isCreateMode ? "Create project" : " Save changes"}
                {isPending && <Spinner />}
              </Button>
            )}
          </form.Subscribe>
        </div>
      </div>
    </form>
  );
};
