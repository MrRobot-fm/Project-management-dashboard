"use server";

import { revalidateTag } from "next/cache";
import { cookies } from "next/headers";
import { InternalServerError, NotFoundError, UnauthorizedError } from "@workspace/exceptions";

export const updateProjectAction = async (formData: FormData) => {
  try {
    const cookieStore = await cookies();
    const jwtToken = cookieStore.get("jwt_token")?.value;
    const baseUrl = process.env.NEXT_PUBLIC_API_BASE_URL;

    if (!baseUrl) {
      throw new Error("Missing API_BASE_URL env variable");
    }

    const logo = formData.get("logo");
    const projectId = formData.get("projectId");

    if (!logo || (logo instanceof File && logo.size === 0)) {
      formData.delete("logo");
    }

    const res = await fetch(`${baseUrl}/projects/${projectId}`, {
      method: "PUT",
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

    return res.json();
  } catch (error) {
    if (error instanceof NotFoundError || error instanceof UnauthorizedError) {
      throw error;
    }

    if (error instanceof Error) {
      throw new InternalServerError(error.message, error);
    }

    throw error;
  }
};
