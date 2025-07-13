import { useTransition } from "react";
import { useForm } from "@tanstack/react-form";
import type { Workspace, Project } from "@workspace/db";
import {
  CreateProjectsSchema,
  CreateWorkspaceSchema,
  type CreateProjectType,
} from "@workspace/schemas";

const getDefaultValues = <T extends Project | Workspace>(
  type: "workspace" | "project",
  data?: T,
  isEdit = false,
): CreateProjectType => {
  const base = {
    name: isEdit ? (data?.name ?? "") : "",
    logo: isEdit ? (data?.logo ?? undefined) : undefined,
  };

  if (type !== "project") {
    return base;
  }

  const projectData = data as Project | undefined;

  return {
    ...base,
    description: isEdit ? (projectData?.description ?? "") : "",
    status: isEdit ? (projectData?.status ?? "INIT") : "INIT",
    priority: isEdit ? (projectData?.priority ?? "LOW") : "LOW",
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

interface UseWorkspaceProjectFormValidationProps<T extends Project | Workspace> {
  data: T | undefined;
  isEditMode: boolean;
  workspaceId: string | undefined;
  action: (payload: FormActionPayload) => void;
  type: "workspace" | "project";
}

export const useWorkspaceProjectFormValidation = <T extends Project | Workspace>({
  data,
  isEditMode,
  workspaceId,
  action,
  type,
}: UseWorkspaceProjectFormValidationProps<T>) => {
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

      if (value.priority) formData.append("priority", value.priority);
      if (value.status) formData.append("status", value.status);

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
