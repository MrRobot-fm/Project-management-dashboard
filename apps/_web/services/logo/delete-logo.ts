"use server";

import { revalidateTag } from "next/cache";
import { errorData } from "@/utils/error-data";
import { fetchInstance } from "@/utils/fetch-instance";
import { getCookie } from "@/utils/get-cookie";

export const deleteLogo = async ({
  type,
  id,
}: {
  type: "workspace" | "project" | "user";
  id: string;
}) => {
  try {
    const jwtToken = await getCookie("jwt_token");

    if (!id || !type) throw new Error("ID and type are required");

    const tagMap: Record<typeof type, string> = {
      workspace: "workspaces",
      project: "projects",
      user: "users",
    };

    const response = await fetchInstance<{ success: boolean }>({
      path: `${tagMap[type]}/${id}/logo`,
      options: {
        method: "DELETE",
        headers: {
          Cookie: `jwt_token=${jwtToken}`,
        },
      },
    });

    if (response.data?.success) {
      revalidateTag(`get-${type}`);
      revalidateTag(`get-${tagMap[type]}`);
    }

    return { success: response.data?.success };
  } catch (error) {
    return errorData(error);
  }
};
