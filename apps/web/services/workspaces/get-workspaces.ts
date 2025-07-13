import type { ApiGetWorkspacesResponseModel } from "@/types/models/api-get-workspaces";
import { fetchInstance } from "@/utils/fetch-instance";
import { getCookie } from "@/utils/get-cookie";

export const getWorkspaces = async (): Promise<ApiGetWorkspacesResponseModel> => {
  const jwtToken = await getCookie("jwt_token");

  const response = await fetchInstance<ApiGetWorkspacesResponseModel>({
    path: "workspaces",
    options: {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Cookie: `jwt_token=${jwtToken}`,
      },
      next: {
        tags: ["get-workspaces"],
      },
    },
  });

  return { workspaces: response.data?.workspaces };
};
