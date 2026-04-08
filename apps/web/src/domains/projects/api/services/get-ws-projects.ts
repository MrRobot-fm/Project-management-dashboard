import { fetchInstance } from "@/domains/shared/utils/fetch-instance";
import type { Project } from "@/domains/projects/api/types";

interface GetWsProjectResponse {
  projects: Project[] | undefined;
}

export const getWsProjects = async (
  workspaceId: string | undefined
): Promise<Project[]> => {
  const response = await fetchInstance<GetWsProjectResponse>({
    path: `workspaces/${workspaceId}/project`,
    options: {
      method: "GET",
      credentials: "include"
    }
  });

  return response.data?.projects ?? [];
};
