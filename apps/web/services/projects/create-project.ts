"use server";

import { revalidateTag } from "next/cache";
import { cookies } from "next/headers";
import { NotFoundError, UnauthorizedError } from "@workspace/exceptions";
import { CreateProjectsSchema } from "@workspace/schemas";

export const createProjectAction = async (formData: FormData, workspaceId: string | undefined) => {
  try {
    const cookieStore = await cookies();
    const jwtToken = cookieStore.get("jwt_token")?.value;
    const baseUrl = process.env.NEXT_PUBLIC_API_BASE_URL;

    if (!baseUrl) {
      throw new Error("Missing API_BASE_URL env variable");
    }

    const logo = formData.get("logo");
    const description = formData.get("description");

    console.log({ actionDes: description });

    if (!description) {
      formData.delete("description");
    }

    const validationResult = CreateProjectsSchema.safeParse(Object.fromEntries(formData.entries()));

    if (!validationResult.success) {
      return { success: false, errors: validationResult.error.flatten().fieldErrors };
    }

    if (!logo || (logo instanceof File && logo.size === 0)) {
      formData.delete("logo");
    }

    const res = await fetch(`${baseUrl}/workspaces/${workspaceId}/project`, {
      method: "POST",
      headers: {
        Cookie: `jwt_token=${jwtToken}`,
      },
      body: formData,
    });

    if (!res.ok) {
      if (res.status === 404) {
        const errorData = await res.json();
        throw new NotFoundError(errorData.message);
      }

      if (res.status === 401) {
        throw new UnauthorizedError("Unauthorized");
      }

      throw new Error("Fetch failed with status " + res.status);
    }

    revalidateTag("get-projects");

    console.log({ response: res.json });

    return res.json();
  } catch (error) {
    console.log({ error });
  }
};
