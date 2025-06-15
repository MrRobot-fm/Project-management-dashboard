import { fetchInstance } from "@/utils/fetch-instance";
import { getCookie } from "@/utils/get-cookie";
import type { Project } from "@workspace/db";

interface GetWsProjectResponse {
  projects: Project[] | undefined;
}

export const getWsProjects = async (
  workspaceId: string | undefined,
): Promise<GetWsProjectResponse> => {
  const jwtToken = await getCookie("jwt_token");

  const response = await fetchInstance<GetWsProjectResponse>({
    path: `workspaces/${workspaceId}/project`,
    options: {
      method: "GET",
      headers: {
        Cookie: `jwt_token=${jwtToken}`,
      },
      next: {
        tags: ["get-projects"],
      },
    },
  });

  return { projects: response.data?.projects };
};
