"use server";

import { revalidateTag } from "next/cache";
import type { ActionResponse } from "@/types/action";
import { errorData } from "@/utils/error-data";
import { fetchInstance } from "@/utils/fetch-instance";
import { getCookie } from "@/utils/get-cookie";
import { validateFormData } from "@/utils/validate-form-data";
import { validationErrorData } from "@/utils/validation-error-data";
import type { Task } from "@workspace/db";
import { EditTaskSchema, type EditTaskValidation } from "@workspace/schemas";

export const editTask = async (
  formData: FormData,
): Promise<ActionResponse<Task, "task", EditTaskValidation>> => {
  try {
    const jwtToken = await getCookie("jwt_token");

    const taskId = formData.get("taskId");

    if (!taskId) throw Error("Task id is requires");

    const validation = validateFormData({ schema: EditTaskSchema, formData });

    if (!validation.success) {
      return validationErrorData<EditTaskValidation>(validation.errors);
    }

    const response = await fetchInstance<{ task: Task; success: boolean }>({
      path: `tasks/${taskId}`,
      options: {
        method: "PUT",
        headers: {
          Cookie: `jwt_token=${jwtToken}`,
        },
        body: formData,
      },
    });

    if (response.data?.success) {
      revalidateTag("get-project");
    }

    return { task: response.data?.task, success: true };
  } catch (error) {
    return errorData(error);
  }
};
