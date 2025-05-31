"use server";

import { revalidateTag } from "next/cache";
import type { ActionResponse } from "@/types/action";
import { errorData } from "@/utils/error-data";
import { fetchInstance } from "@/utils/fetch-instance";
import { getCookie } from "@/utils/get-cookie";
import type { Workspace } from "@workspace/db";

export const updateWorkspaceAction = async ({
  formData,
  workspaceId,
}: {
  formData: FormData;
  workspaceId: string;
}): Promise<ActionResponse<Workspace, "workspace">> => {
  try {
    if (!workspaceId) throw new Error("Workspace ID is required");

    const jwtToken = await getCookie("jwt_token");

    const logo = formData.get("logo");

    if (!logo || (logo instanceof File && logo.size === 0)) {
      formData.delete("logo");
    }

    const response = await fetchInstance<{ success: boolean; workspace: Workspace }>({
      path: `workspaces/${workspaceId}`,
      options: {
        method: "PUT",
        headers: {
          Cookie: `jwt_token=${jwtToken}`,
        },
        body: formData,
      },
    });

    if (response.data?.success) {
      revalidateTag("get-workspaces");
    }

    return { success: true, workspace: response.data?.workspace };
  } catch (error) {
    return errorData(error);
  }
};
