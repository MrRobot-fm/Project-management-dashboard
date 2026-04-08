"use server";

import { revalidateTag } from "next/cache";
import type { ActionResponse } from "@/types/action";
import type { ProjectMember } from "@/types/models/api-get-project-by-id";
import { errorData } from "@/utils/error-data";
import { fetchInstance } from "@/utils/fetch-instance";
import { getCookie } from "@/utils/get-cookie";

export const removeProjectMember = async ({
  userId,
  projectId,
}: {
  userId: string;
  projectId: string;
}): Promise<ActionResponse<ProjectMember, "member">> => {
  try {
    const token = await getCookie("jwt_token");

    const response = await fetchInstance<{ member: ProjectMember; success: boolean }>({
      path: `projects/${projectId}/members/${userId}`,

      options: {
        method: "DELETE",
        headers: {
          Cookie: `jwt_token=${token}`,
        },
      },
    });

    if (response.data?.success) {
      revalidateTag("get-project");
    }

    return { success: true, member: response.data?.member };
  } catch (error) {
    return errorData(error);
  }
};
