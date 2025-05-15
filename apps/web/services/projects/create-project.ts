"use server";

import { revalidateTag } from "next/cache";
import { fetchInstance } from "@/utils/fetch-instance";
import { getCookie } from "@/utils/get-cookie";
import { validateFormData } from "@/utils/validate-form-data";
import type { Project } from "@workspace/db";
import { CreateProjectsSchema } from "@workspace/schemas";

export const createProjectAction = async ({
  formData,
  workspaceId,
}: {
  formData: FormData;
  workspaceId: string | undefined;
}) => {
  const jwtToken = await getCookie("jwt_token");

  const logo = formData.get("logo");
  const description = formData.get("description");

  if (!description) {
    formData.delete("description");
  }

  if (!logo || (logo instanceof File && logo.size === 0)) {
    formData.delete("logo");
  }

  const validation = validateFormData({ schema: CreateProjectsSchema, formData });

  if (!validation.success) {
    return { success: false, errors: validation.errors };
  }

  const response = await fetchInstance<Project>({
    path: `workspaces/${workspaceId}/project`,
    options: {
      method: "POST",
      body: formData,
      headers: {
        Cookie: `jwt_token=${jwtToken}`,
      },
    },
  });

  revalidateTag("get-projects");

  return response;
};
