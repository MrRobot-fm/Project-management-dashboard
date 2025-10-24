"use server";

import { revalidateTag } from "next/cache";
import type { ActionResponse } from "@/types/action";
import { errorData } from "@/utils/error-data";
import { fetchInstance } from "@/utils/fetch-instance";
import { getCookie } from "@/utils/get-cookie";
import type { Task } from "@workspace/db";

export const deleteTask = async (taskId: string): Promise<ActionResponse<Task, "task">> => {
  try {
    const jwtToken = await getCookie("jwt_token");

    if (!taskId) throw new Error("Task id is required");

    const response = await fetchInstance<{ success: boolean; task: Task }>({
      path: `tasks/${taskId}`,
      options: {
        method: "DELETE",
        headers: {
          Cookie: `jwt_token=${jwtToken}`,
        },
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
