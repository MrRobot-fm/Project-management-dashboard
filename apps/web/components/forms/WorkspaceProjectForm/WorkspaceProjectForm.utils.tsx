import { useTransition } from "react";
import { useForm } from "@tanstack/react-form";
import type { Project, Workspace } from "@workspace/db";
import {
  CreateProjectsSchema,
  CreateWorkspaceSchema,
  type CreateProjectType,
} from "@workspace/schemas";

const getDefaultValues = (
  type: "workspace" | "project",
  data?: Partial<Project & Workspace>,
  isEdit = false,
): CreateProjectType => {
  return {
    name: isEdit ? (data?.name ?? "") : "",
    ...(type === "project" && {
      description: isEdit ? (data?.description ?? "") : "",
    }),
    logo: isEdit ? (data?.logo ?? undefined) : undefined,
  };
};

interface WorkspacePayload {
  formData: FormData;
  projectLogo?: string | null;
}

interface ProjectPayload extends WorkspacePayload {
  currentWsId?: string;
  projectId?: string;
}

export type FormActionPayload = WorkspacePayload | ProjectPayload;

interface UseWorkspaceProjectFormValidationProps {
  data: Partial<Project & Workspace> | undefined;
  isEditMode: boolean;
  workspaceId: string | undefined;
  action: (payload: FormActionPayload) => void;
  type: "workspace" | "project";
}

export const useWorkspaceProjectFormValidation = ({
  data,
  isEditMode,
  workspaceId,
  action,
  type,
}: UseWorkspaceProjectFormValidationProps) => {
  const [isPending, startTransition] = useTransition();

  const form = useForm({
    defaultValues: getDefaultValues(type, data, isEditMode),
    validators: {
      onSubmit: type === "project" ? CreateProjectsSchema : CreateWorkspaceSchema,
      onMount: type === "project" ? CreateProjectsSchema : CreateWorkspaceSchema,
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
        if (type === "project") {
          action({
            formData: formData,
            projectLogo: data?.logo,
            currentWsId: workspaceId,
            projectId: data?.id,
          });

          return;
        }
        action({
          formData: formData,
          projectLogo: data?.logo,
          currentWsId: workspaceId,
        });
      });
    },
  });

  return {
    isPending,
    form,
  };
};
