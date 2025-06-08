import type { ApiGetProjectByIdResponseModel } from "@/types/models/api-get-project-by-id";
import { fetchInstance } from "@/utils/fetch-instance";
import { getCookie } from "@/utils/get-cookie";

export const getProjectById = async (
  projectId: string,
): Promise<ApiGetProjectByIdResponseModel> => {
  const jwtToken = await getCookie("jwt_token");

  const response = await fetchInstance<ApiGetProjectByIdResponseModel>({
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
