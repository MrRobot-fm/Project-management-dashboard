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
import { UpdateProjectSchema, type UpdateProjectType } from "@workspace/schemas";

export const updateProjectAction = async ({
  formData,
  projectId,
}: {
  formData: FormData;
  projectId: string | undefined;
}): Promise<ActionResponse<Project, "project", UpdateProjectType>> => {
  try {
    const jwtToken = await getCookie("jwt_token");

    const logo = formData.get("logo");
    const description = formData.get("description");

    if (!description) {
      formData.delete("description");
    }

    if (!logo || (logo instanceof File && logo.size === 0)) {
      formData.delete("logo");
    }

    const validation = validateFormData({ schema: UpdateProjectSchema, formData });

    if (!validation.success) {
      return validationErrorData<UpdateProjectType>(validation.errors);
    }

    if (!projectId) throw new Error("Project ID is required");

    const response = await fetchInstance<ApiCreateProjectResponseModel>({
      path: `projects/${projectId}`,
      options: {
        method: "PUT",
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
