"use server";

import { revalidateTag } from "next/cache";
import type { ActionResponse } from "@/types/action";
import type { ApiCreateProjectResponseModel } from "@/types/models/api-create-project";
import { errorData } from "@/utils/error-data";
import { fetchInstance } from "@/utils/fetch-instance";
import { getCookie } from "@/utils/get-cookie";
import { validateFormData } from "@/utils/validate-form-data";
import { validationErrorData } from "@/utils/validation-error-data";
import type { Project } from "@workspace/db";
import { CreateProjectsSchema, type CreateProjectType } from "@workspace/schemas";

export const createProjectAction = async ({
  formData,
  workspaceId,
}: {
  formData: FormData;
  workspaceId: string | undefined;
}): Promise<ActionResponse<Project, "project", CreateProjectType>> => {
  try {
    if (!workspaceId) throw new Error("Workspace ID is required");

    const jwtToken = await getCookie("jwt_token");

    const logo = formData.get("logo");
    const description = formData.get("description");

    if (!description) {
      formData.delete("description");
    }

    if (!logo || (logo instanceof File && logo.size === 0)) {
      formData.delete("logo");
    }

    const validation = validateFormData({ schema: CreateProjectsSchema, formData });

    if (!validation.success) {
      return validationErrorData<CreateProjectType>(validation.errors);
    }

    const response = await fetchInstance<ApiCreateProjectResponseModel>({
      path: `workspaces/${workspaceId}/project`,
      options: {
        method: "POST",
        body: formData,
        headers: {
          Cookie: `jwt_token=${jwtToken}`,
        },
      },
    });

    revalidateTag("get-projects");

    return { success: true, project: response.data?.project };
  } catch (error) {
    return errorData(error);
  }
};
