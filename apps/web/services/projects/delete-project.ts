"use server";

import { revalidateTag } from "next/cache";
import { fetchInstance } from "@/utils/fetch-instance";
import { getCookie } from "@/utils/get-cookie";
import type { Project } from "@workspace/db";

export const deleteProjectAction = async (projectId: string) => {
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

  return response;
};
