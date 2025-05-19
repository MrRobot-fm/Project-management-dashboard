import { useTransition } from "react";
import type { CreateActionPayload } from "@/hooks/use-update-project";
import { useForm } from "@tanstack/react-form";
import type { Project, Workspace } from "@workspace/db";
import { CreateProjectsSchema, type CreateProjectType } from "@workspace/schemas";

const getDefaultValues = (
  data?: Partial<Project & Workspace>,
  isEdit = false,
): CreateProjectType => {
  return {
    name: isEdit ? (data?.name ?? "") : "",
    description: isEdit ? (data?.description ?? "") : "",
    logo: isEdit ? (data?.logo ?? undefined) : undefined,
  };
};

export const useWorkspaceProjectFormValidation = ({
  data,
  isEditMode,
  workspaceId,
  action,
}: {
  data: Partial<Project & Workspace> | undefined;
  isEditMode: boolean;
  workspaceId: string | undefined;
  action: (payload: CreateActionPayload) => void;
}) => {
  const [isPending, startTransition] = useTransition();

  const form = useForm({
    defaultValues: getDefaultValues(data, isEditMode),
    validators: {
      onSubmit: CreateProjectsSchema,
      onMount: CreateProjectsSchema,
    },
    onSubmit: ({ value }) => {
      const formData = new FormData();

      if (value.name) formData.append("name", value.name);
      if (value.description && value.description.trim() !== "") {
        formData.append("description", value.description);
      }
      if (value.logo) {
        if (value.logo instanceof File) {
          formData.append("logo", value.logo);
        }
      }

      startTransition(() => {
        action({
          formData: formData,
          projectLogo: data?.logo,
          currentWsId: workspaceId,
          projectId: data?.id,
        });
      });
    },
  });

  return {
    isPending,
    form,
  };
};
