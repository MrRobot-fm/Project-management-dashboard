"use client";

import { Button } from "@workspace/ui/components/Button";
import { Input } from "@workspace/ui/components/Input";
import { Label } from "@workspace/ui/components/Label";
import { Spinner } from "@workspace/ui/components/Spinner";
import { Textarea } from "@workspace/ui/components/Textarea";
import { cn } from "@workspace/ui/lib/utils";
import {
  type FormActionPayload,
  useWorkspaceProjectFormValidation,
} from "./WorkspaceProjectForm.utils";
import { CustomSelect } from "@/components/CustomSelect";
import { Dropzone } from "@/components/Dropzone";
import { PriorityBadge } from "@/components/badges/PriorityBadge";
import { StatusBadge } from "@/components/badges/StatusBadge";
import { FieldInfo } from "@/components/forms/FieldInfo";
import { priorityBadgeData, statusBadgeData } from "@/constants/badges";
import type { Project } from "@/types/models/api-get-project-by-id";
import type { Workspace } from "@workspace/db";
import { CirclePlus, PencilLine } from "lucide-react";

interface WorkspaceProjectFormProps<T extends Project | Workspace> {
  data?: T;
  action: (payload: FormActionPayload) => void;
  id?: string;
  workspaceId?: string;
  mode?: "create" | "edit";
  type: "workspace" | "project";
}

export const WorkspaceProjectForm = <T extends Project | Workspace>({
  data,
  action,
  id,
  workspaceId,
  mode = "create",
  type,
}: WorkspaceProjectFormProps<T>) => {
  const isEditMode = mode === "edit";
  const isCreateMode = mode === "create";

  const { form, isPending } = useWorkspaceProjectFormValidation({
    data,
    workspaceId,
    action,
    isEditMode,
    type,
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
        {type === "project" && mode === "edit" && (
          <div className="flex gap-8 w-full">
            <form.Field name="status">
              {(field) => (
                <div className="flex flex-col gap-4">
                  <Label className="text-right">Status</Label>
                  <div className="flex flex-col gap-1">
                    <CustomSelect
                      data={statusBadgeData}
                      value={field.state.value}
                      onValueChange={(value) => field.handleChange(value)}
                      disabled={isPending}
                      triggerProps={{
                        className:
                          "w-full w-full justify-between focus:border-neutral-300 bg-white border-none shadow-none p-0  data-[size=default]:h-fit",
                      }}
                      contentProps={{ className: "w-[180px]" }}
                      renderItem={({ value }) => <StatusBadge status={value} className="mx-px" />}
                    />
                    <FieldInfo field={field} />
                  </div>
                </div>
              )}
            </form.Field>
            <form.Field name="priority">
              {(field) => (
                <div className="flex flex-col gap-4">
                  <Label className="text-right">Priority</Label>
                  <div className="flex flex-col gap-1">
                    <CustomSelect
                      data={priorityBadgeData}
                      value={field.state.value}
                      onValueChange={(value) => field.handleChange(value)}
                      disabled={isPending}
                      triggerProps={{
                        className:
                          "w-full justify-between focus:border-neutral-300 bg-white border-none shadow-none p-0 data-[size=default]:h-fit",
                      }}
                      contentProps={{ className: "w-[180px]" }}
                      renderItem={({ value }) => (
                        <PriorityBadge priority={value} className="mx-px" />
                      )}
                    />
                    <FieldInfo field={field} />
                  </div>
                </div>
              )}
            </form.Field>
          </div>
        )}
        <form.Field name="name">
          {(field) => (
            <div className="flex flex-col gap-4">
              <Label htmlFor={field.name}>Name</Label>
              <div className="flex flex-col gap-1">
                <Input
                  id={field.name}
                  name={field.name}
                  value={field.state.value}
                  placeholder="Let’s give it a name"
                  onChange={(e) => field.handleChange(e.target.value)}
                  disabled={isPending}
                  className="focus-visible:ring-0 focus-visible:border-neutral-300 shadow-none border-none p-0 h-6 rounded-none"
                />
                <FieldInfo field={field} />
              </div>
            </div>
          )}
        </form.Field>
        {type === "project" && (
          <form.Field name="description">
            {(field) => (
              <div className="flex flex-col gap-4">
                <Label htmlFor={field.name}>Description</Label>
                <div className="flex flex-col gap-1">
                  <Textarea
                    id={field.name}
                    name={field.name}
                    value={field.state.value}
                    placeholder="Add a short description of the project"
                    onChange={(e) => field.handleChange(e.target.value)}
                    disabled={isPending}
                    className="focus-visible:ring-0 focus-visible:border-neutral-300 shadow-none border-none p-0 py-0 h-auto min-h-6 max-h-48 resize-none rounded-none"
                  />
                  <FieldInfo field={field} />
                </div>
              </div>
            )}
          </form.Field>
        )}
        <form.Field name="logo">
          {(field) => (
            <div className="flex flex-col gap-4">
              <Label htmlFor={field.name} className="text-right">
                Logo
              </Label>
              <div className="flex flex-col gap-1">
                <Dropzone
                  id={id}
                  type={type}
                  mode={mode}
                  image={data?.logo ? data.logo : null}
                  disabled={isPending}
                  field={field}
                />
                <FieldInfo field={field} />
              </div>
            </div>
          )}
        </form.Field>
        <div className="flex flex-col gap-1 ml-auto">
          <form.Subscribe selector={(state) => [state.canSubmit, state.values.name]}>
            {([canSubmit, name]) => (
              <Button
                type="submit"
                variant="outline"
                disabled={
                  !canSubmit || isPending || !name || (typeof name === "string" && name.length < 2)
                }
                className={cn(
                  "cursor-pointer w-fit rounded font-normal border-neutral-400 text-xs max-w-[126px]",
                  type === "workspace" && "max-w-[150px]",
                )}
              >
                {isPending ? (
                  <Spinner size="xs" className="text-black" />
                ) : isCreateMode ? (
                  <CirclePlus className="size-4" />
                ) : (
                  <PencilLine className="size-4" />
                )}
                {isCreateMode
                  ? `Create ${type === "project" ? "project" : "workspace"}`
                  : " Save changes"}
              </Button>
            )}
          </form.Subscribe>
        </div>
      </div>
    </form>
  );
};
