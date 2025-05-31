"use server";

import { revalidateTag } from "next/cache";
import type { ActionResponse } from "@/types/action";
import { errorData } from "@/utils/error-data";
import { fetchInstance } from "@/utils/fetch-instance";
import { getCookie } from "@/utils/get-cookie";
import type { Workspace } from "@workspace/db";

export const deleteWorkspaceAction = async ({
  workspaceId,
}: {
  workspaceId: string | undefined;
}): Promise<ActionResponse<Workspace, "workspace">> => {
  try {
    if (!workspaceId) throw new Error("Workspace ID is required");

    const jwtToken = await getCookie("jwt_token");

    const response = await fetchInstance<{ success: boolean; workspace: Workspace }>({
      path: `workspaces/${workspaceId}`,
      options: {
        method: "DELETE",
        headers: {
          Cookie: `jwt_token=${jwtToken}`,
        },
      },
    });

    revalidateTag("get-workspaces");

    return { success: true, workspace: response.data?.workspace };
  } catch (error) {
    return errorData(error);
  }
};
