"use server";

import { revalidateTag } from "next/cache";
import type { ActionResponse } from "@/types/action";
import { errorData } from "@/utils/error-data";
import { fetchInstance } from "@/utils/fetch-instance";
import { getCookie } from "@/utils/get-cookie";
import { validateFormData } from "@/utils/validate-form-data";
import { validationErrorData } from "@/utils/validation-error-data";
import type { Workspace } from "@workspace/db";
import { UpdateWorkspaceSchema, type UpdateWorkspaceType } from "@workspace/schemas";

export const updateWorkspaceAction = async ({
  formData,
  workspaceId,
}: {
  formData: FormData;
  workspaceId: string;
}): Promise<ActionResponse<Workspace, "workspace", UpdateWorkspaceType>> => {
  try {
    if (!workspaceId) throw new Error("Workspace ID is required");

    const jwtToken = await getCookie("jwt_token");

    const validation = validateFormData({ schema: UpdateWorkspaceSchema, formData });

    if (!validation.success) {
      return validationErrorData<UpdateWorkspaceType>(validation.errors);
    }

    const data = Object.fromEntries(formData.entries());

    const response = await fetchInstance<{ success: boolean; workspace: Workspace }>({
      path: `workspaces/${workspaceId}`,
      options: {
        method: "PUT",
        headers: {
          Cookie: `jwt_token=${jwtToken}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
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
