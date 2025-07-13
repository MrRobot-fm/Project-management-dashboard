"use server";

import { revalidateTag } from "next/cache";
import type { ActionResponse } from "@/types/action";
import type { ProjectMember } from "@/types/models/api-get-project-by-id";
import { errorData } from "@/utils/error-data";
import { fetchInstance } from "@/utils/fetch-instance";
import { getCookie } from "@/utils/get-cookie";

export const addProjectMembers = async (
  formData: FormData,
): Promise<ActionResponse<ProjectMember[], "members">> => {
  try {
    const token = await getCookie("jwt_token");

    const data = {
      projectId: formData.get("projectId"),
      workspaceId: formData.get("workspaceId"),
      role: formData.get("role"),
      userId: formData.getAll("userId[]"),
    };

    const response = await fetchInstance<{ members: ProjectMember[]; success: boolean }>({
      path: `projects/${data?.projectId}/members`,

      options: {
        method: "POST",
        body: JSON.stringify(data),
        headers: {
          Cookie: `jwt_token=${token}`,
          "Content-Type": "application/json",
        },
      },
    });

    if (response.data?.success) {
      revalidateTag("get-project");
    }

    return { success: true, members: response.data?.members };
  } catch (error) {
    return errorData(error);
  }
};
