"use server";

import { revalidatePath } from "next/cache";
import type { ActionResponse } from "@/types/action";
import { errorData } from "@/utils/error-data";
import { fetchInstance } from "@/utils/fetch-instance";
import { getCookie } from "@/utils/get-cookie";
import type { Workspace } from "@workspace/db";

export const createWorkspaceAction = async (
  formData: FormData,
): Promise<ActionResponse<Workspace, "workspace">> => {
  try {
    const jwtToken = await getCookie("jwt_token");

    const logo = formData.get("logo");

    if (!logo || (logo instanceof File && logo.size === 0)) {
      formData.delete("logo");
    }

    const response = await fetchInstance<{ success: boolean; workspace: Workspace }>({
      path: "workspaces",
      options: {
        method: "POST",
        headers: {
          Cookie: `jwt_token=${jwtToken}`,
        },
        body: formData,
      },
    });

    if (response.data?.success) {
      revalidatePath("get-workspaces");
    }

    return { success: true, workspace: response.data?.workspace };
  } catch (error) {
    return errorData(error);
  }
};
