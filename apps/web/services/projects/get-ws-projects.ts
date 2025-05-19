import { fetchInstance } from "@/utils/fetch-instance";
import { getCookie } from "@/utils/get-cookie";
import type { Project } from "@workspace/db";

export const getWsProjects = async (workspaceId: string | undefined) => {
  const jwtToken = await getCookie("jwt_token");

  const response = await fetchInstance<{ projects: Project[] }>({
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
