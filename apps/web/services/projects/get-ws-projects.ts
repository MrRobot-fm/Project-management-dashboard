import { SELECTED_WS_ID_COOKIE_KEY } from "@/constants/workspaces";
import type { Project } from "@workspace/db";
import {
  InternalServerError,
  NotFoundError,
  UnauthorizedError,
} from "@workspace/exceptions";
import Cookies from "js-cookie";

export const getWsProjectsClient = async (
  userId: string,
): Promise<{ projects: Project[] }> => {
  try {
    const baseUrl = process.env.NEXT_PUBLIC_API_BASE_URL;

    if (!baseUrl) {
      throw new Error("Missing API_BASE_URL env variable");
    }

    const selectedWsId = Cookies.get(`${SELECTED_WS_ID_COOKIE_KEY}_${userId}`);
    console.log({ selectedWsId });

    if (!selectedWsId) {
      throw new UnauthorizedError("Missing token or workspace ID");
    }

    const res = await fetch(`${baseUrl}/workspaces/${selectedWsId}/project`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
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
