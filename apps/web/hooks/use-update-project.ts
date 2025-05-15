import { useActionState, useOptimistic } from "react";
import { createProjectAction } from "@/services/projects/create-project";
import { deleteProjectAction } from "@/services/projects/delete-project";
import { updateProjectAction } from "@/services/projects/update-prject";
import type { FetchResult } from "@/utils/fetch-instance";
import type { Project } from "@workspace/db";

interface OptimisticUpdate {
  actionType: "remove" | "add" | "update";
  project: Project;
}

type CreateActionState = Promise<FetchResult<Project>>;

export interface CreateActionPayload {
  formData: FormData;
  currentWsId?: string;
  projectLogo?: string | null;
  projectId?: string;
}

export const useUpdateProject = ({ projects }: { projects: Project[] }) => {
  const [createProjectState, createAction, pending] = useActionState<
    CreateActionState,
    CreateActionPayload
  >(
    async (_state, { formData, currentWsId, projectLogo, projectId }) => {
      if (projectId) {
        return await handleUpdateProject({ formData, projectLogo, projectId });
      } else {
        return await handleCreateProject({ formData, workspaceId: currentWsId });
      }
    },
    { success: false },
  );

  const applyOptimisticUpdate = (
    currentProjects: Project[],
    update: OptimisticUpdate,
  ): Project[] => {
    switch (update.actionType) {
      case "remove":
        return currentProjects.filter((project) => project.id !== update.project.id);

      case "add":
        return [...currentProjects, update.project];

      case "update":
        return currentProjects.map((project) =>
          project.id === update.project.id ? update.project : project,
        );

      default:
        return currentProjects;
    }
  };

  const [optimisticProjects, updateOptimisticProjects] = useOptimistic<Project[], OptimisticUpdate>(
    projects,
    applyOptimisticUpdate,
  );

  const handleDeleteProject = async (project: Project) => {
    updateOptimisticProjects({ actionType: "remove", project });

    await deleteProjectAction(project.id);
  };

  const handleCreateProject = async ({
    formData,
    workspaceId,
  }: {
    formData: FormData;
    workspaceId: string | undefined;
  }) => {
    const newProject = {
      id: Date.now().toString(),
      name: formData.get("name"),
      description: formData.get("description"),
      logo: URL.createObjectURL(formData.get("logo") as File),
    } as Project;

    updateOptimisticProjects({ actionType: "add", project: newProject });

    return await createProjectAction({ formData, workspaceId });
  };

  const handleUpdateProject = async ({
    formData,
    projectLogo,
    projectId,
  }: {
    formData: FormData;
    projectLogo: string | undefined | null;
    projectId: string | undefined;
  }) => {
    const logo = formData.get("logo") as File;

    const updatedProject = {
      id: formData.get("projectId"),
      name: formData.get("name"),
      description: formData.get("description"),
      logo: logo.size === 0 ? projectLogo : URL.createObjectURL(logo as File),
    } as Project;

    updateOptimisticProjects({ actionType: "update", project: updatedProject });

    return await updateProjectAction({ formData, projectId });
  };

  return {
    optimisticProjects,
    updateOptimisticProjects,
    handleDeleteProject,
    isPending: pending,
    createProjectState,
    createAction,
  };
};
