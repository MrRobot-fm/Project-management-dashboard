import { getCookie } from "@/utils/get-cookie";
import type { Project } from "@workspace/db";
import {
  InternalServerError,
  NotFoundError,
  UnauthorizedError,
} from "@workspace/exceptions";

export const getWsProjects = async (
  workspaceId: string | undefined,
): Promise<{ projects: Project[] }> => {
  const jwtToken = await getCookie("jwt_token");

  try {
    const baseUrl = process.env.NEXT_PUBLIC_API_BASE_URL;

    if (!baseUrl) {
      throw new Error("Missing API_BASE_URL env variable");
    }

    const res = await fetch(`${baseUrl}/workspaces/${workspaceId}/project`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Cookie: `jwt_token=${jwtToken}`,
      },
      next: {
        tags: ["get-projects"],
      },
      credentials: "include",
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
