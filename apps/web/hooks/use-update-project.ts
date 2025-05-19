import { useActionState, useOptimistic } from "react";
import { createProjectAction } from "@/services/projects/create-project";
import { deleteProjectAction } from "@/services/projects/delete-project";
import { updateProjectAction } from "@/services/projects/update-project";
import type { Project } from "@workspace/db";

interface OptimisticUpdate {
  actionType: "remove" | "add" | "update";
  project: Project;
}

type CreateActionState = Awaited<ReturnType<typeof createProjectAction>>;

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
    { success: false, error: {} },
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
    const logo = formData.get("logo");

    const newProject = {
      id: Date.now().toString(),
      name: formData.get("name"),
      description: formData.get("description"),
      logo: logo instanceof File && logo.size > 0 ? URL.createObjectURL(logo) : null,
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
      id: projectId,
      name: formData.get("name"),
      description: formData.get("description"),
      logo: logo instanceof File && logo.size > 0 ? URL.createObjectURL(logo) : projectLogo,
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
