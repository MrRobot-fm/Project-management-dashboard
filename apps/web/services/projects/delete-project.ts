"use server";

import { revalidateTag } from "next/cache";
import { cookies } from "next/headers";
import {
  InternalServerError,
  NotFoundError,
  UnauthorizedError,
} from "@workspace/exceptions";

export const deleteProjectAction = async (projectId: string) => {
  try {
    const cookieStore = await cookies();
    const jwtToken = cookieStore.get("jwt_token")?.value;
    const baseUrl = process.env.NEXT_PUBLIC_API_BASE_URL;

    if (!baseUrl) {
      throw new Error("Missing API_BASE_URL env variable");
    }

    const res = await fetch(`${baseUrl}/projects/${projectId}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Cookie: `jwt_token=${jwtToken}`,
      },
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
