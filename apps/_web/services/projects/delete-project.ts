"use server";

import { revalidateTag } from "next/cache";
import type { ActionResponse } from "@/types/action";
import { errorData } from "@/utils/error-data";
import { fetchInstance } from "@/utils/fetch-instance";
import { getCookie } from "@/utils/get-cookie";
import type { Project } from "@workspace/db";

export const deleteProjectAction = async (
  projectId: string,
): Promise<ActionResponse<Project, "project">> => {
  try {
    const jwtToken = await getCookie("jwt_token");

    const response = await fetchInstance<{ success: boolean; project: Project }>({
      path: `projects/${projectId}`,
      options: {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
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
