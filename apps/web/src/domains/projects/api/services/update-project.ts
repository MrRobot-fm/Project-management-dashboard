import type { ActionResponse } from "@/domains/shared/types/action";
import { type UpdateProjectType } from "@workspace/schemas";
import type { ApiCreateProjectResponseModel, Project } from "../types";
import { fetchInstance } from "@/domains/shared/utils/fetch-instance";

export const updateProjectAction = async ({
  values,
  projectId
}: {
  values: UpdateProjectType;
  projectId: string | undefined;
}): Promise<ActionResponse<Project, "project", UpdateProjectType>> => {
  try {
    if (!projectId) throw new Error("Project ID is required");

    const response = await fetchInstance<ApiCreateProjectResponseModel>({
      path: `projects/${projectId}`,
      options: {
        method: "PUT",
        body: JSON.stringify(values),
        credentials: "include",
        headers: {
          "Content-Type": "application/json"
        }
      }
    });

    return { success: true, project: response.data?.project };
  } catch (error) {
    throw error;
  }
};
