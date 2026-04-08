import type { ActionResponse } from "@/domains/shared/types/action";
import { fetchInstance } from "@/domains/shared/utils/fetch-instance";
import type { Project } from "../types";

export const deleteProjectAction = async (
  projectId: string
): Promise<ActionResponse<Project, "project">> => {
  try {
    const response = await fetchInstance<{
      success: boolean;
      project: Project;
    }>({
      path: `projects/${projectId}`,
      options: {
        method: "DELETE",
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
