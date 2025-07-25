"use server";

import { revalidateTag } from "next/cache";
import { errorData } from "@/utils/error-data";
import { fetchInstance } from "@/utils/fetch-instance";
import { getCookie } from "@/utils/get-cookie";

interface UploadLogo {
  type: "workspace" | "project" | "user";
  id: string | undefined;
  logo: File;
}

export const uploadLogo = async ({ type, id, logo }: UploadLogo) => {
  try {
    const jwtToken = await getCookie("jwt_token");

    if (!id || !type) throw new Error("ID and type are required");

    const tagMap: Record<typeof type, string> = {
      workspace: "workspaces",
      project: "projects",
      user: "users",
    };

    const formData = new FormData();

    if (logo) {
      formData.append("logo", logo);
    }

    const response = await fetchInstance<{ success: boolean }>({
      path: `${tagMap[type]}/${id}/logo`,
      options: {
        method: "POST",
        headers: {
          Cookie: `jwt_token=${jwtToken}`,
        },
        body: formData,
      },
    });

    if (response.data?.success) {
      revalidateTag(tagMap[type]);
    }

    return { success: response.data?.success };
  } catch (error) {
    return errorData(error);
  }
};
