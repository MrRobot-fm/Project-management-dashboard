"use server";

import { revalidateTag } from "next/cache";
import type { ActionResponse } from "@/types/action";
import type { ProjectMember } from "@/types/models/api-get-project-by-id";
import { errorData } from "@/utils/error-data";
import { fetchInstance } from "@/utils/fetch-instance";
import { getCookie } from "@/utils/get-cookie";
import type { UserRole } from "@workspace/db";

export const changeMemberRole = async ({
  userId,
  projectId,
  role,
  workspaceId,
}: {
  userId: string;
  projectId: string;
  role: UserRole;
  workspaceId: string;
}): Promise<ActionResponse<ProjectMember, "member">> => {
  try {
    const token = await getCookie("jwt_token");

    const response = await fetchInstance<{ member: ProjectMember; success: boolean }>({
      path: `projects/${projectId}/members/${userId}`,
      options: {
        method: "PUT",
        body: JSON.stringify({ role, workspaceId }),
        headers: {
          "Content-Type": "application/json",
          Cookie: `jwt_token=${token}`,
        },
      },
    });

    revalidateTag("get-project");

    return { success: true, member: response.data?.member };
  } catch (error) {
    return errorData(error);
  }
};
