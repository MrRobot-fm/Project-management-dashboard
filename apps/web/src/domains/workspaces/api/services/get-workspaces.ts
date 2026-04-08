import type {
  ApiGetWorkspacesResponseModel,
  WorkspaceWithStats
} from "@/domains/workspaces/api/types";
import { fetchInstance } from "@/domains/shared/utils/fetch-instance";

export const getWorkspaces = async (): Promise<WorkspaceWithStats[]> => {
  const response = await fetchInstance<ApiGetWorkspacesResponseModel>({
    path: "workspaces",
    options: {
      method: "GET",
      credentials: "include",
      headers: {
        "Content-Type": "application/json"
      }
    }
  });

  return response.data?.workspaces ?? [];
};
