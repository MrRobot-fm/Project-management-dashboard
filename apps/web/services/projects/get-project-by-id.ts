import type { ApiGetProjectByIdResponseModel } from "@/types/models/api-get-project-by-id";
import { fetchInstance } from "@/utils/fetch-instance";
import { getCookie } from "@/utils/get-cookie";

export const getProjectById = async (projectId: string) => {
  const token = getCookie("jwt_token");

  const response = await fetchInstance<ApiGetProjectByIdResponseModel>({
    path: `projects/${projectId}`,
    options: {
      headers: {
        "Content-Type": "application/json",
        Cookie: `jwt_token=${token}`,
      },
      method: "GET",
    },
  });

  return response;
};
