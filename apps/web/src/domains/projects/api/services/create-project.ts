import type { ActionResponse } from "@/domains/shared/types/action";
import { type CreateProjectType } from "@workspace/schemas";
import type { ApiCreateProjectResponseModel, Project } from "../types";
import { fetchInstance } from "@/domains/shared/utils/fetch-instance";

export const createProjectAction = async ({
  values,
  workspaceId
}: {
  values: CreateProjectType;
  workspaceId: string;
}): Promise<ActionResponse<Project, "project", CreateProjectType>> => {
  try {
    if (!workspaceId) throw new Error("Workspace ID is required");

    const formData = new FormData();

    formData.append("name", values.name);

    if (values.status) formData.append("status", values.status);
    if (values.priority) formData.append("priority", values.priority);
    if (values.description) formData.append("description", values.description);
    if (values.logo instanceof File) formData.append("logo", values.logo);

    const response = await fetchInstance<ApiCreateProjectResponseModel>({
      path: `workspaces/${workspaceId}/project`,
      options: {
        method: "POST",
        credentials: "include",
        body: formData
      }
    });

    return { success: true, project: response.data?.project };
  } catch (error) {
    throw error;
  }
};
