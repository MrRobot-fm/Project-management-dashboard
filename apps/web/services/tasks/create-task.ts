"use server";

import { revalidateTag } from "next/cache";
import type { ActionResponse } from "@/types/action";
import { errorData } from "@/utils/error-data";
import { fetchInstance } from "@/utils/fetch-instance";
import { getCookie } from "@/utils/get-cookie";
import { validateFormData } from "@/utils/validate-form-data";
import { validationErrorData } from "@/utils/validation-error-data";
import type { Task } from "@workspace/db";
import { CreateTaskSchema, type CreateTaskValidation } from "@workspace/schemas";

export const createTask = async (
  formData: FormData,
): Promise<ActionResponse<Task, "task", CreateTaskValidation>> => {
  try {
    const jwtToken = await getCookie("jwt_token");

    const projectId = formData.get("projectId");

    if (!projectId) throw new Error("projectId missing");

    const validation = validateFormData({ schema: CreateTaskSchema, formData });

    if (!validation.success) {
      return validationErrorData<CreateTaskValidation>(validation.errors);
    }

    const response = await fetchInstance<{ task: Task; success: boolean }>({
      path: `projects/${projectId}/tasks`,
      options: {
        method: "POST",
        headers: {
          Cookie: `jwt_token=${jwtToken}`,
        },
        body: formData,
      },
    });

    if (response.data?.success) {
      revalidateTag("get-project");
    }

    return { task: response.data?.task, success: response.data?.success };
  } catch (error) {
    return errorData(error);
  }
};
