import { fetchInstance } from "@/utils/fetch-instance";
import { getCookie } from "@/utils/get-cookie";
import type { Project } from "@workspace/db";

export const getProjectById = async (projectId: string) => {
  const jwtToken = await getCookie("jwt_token");

  const response = await fetchInstance<{ project: Project }>({
    path: `projects/${projectId}`,
    options: {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Cookie: `jwt_token=${jwtToken}`,
      },
    },
  });

  return { project: response.data?.project };
};
