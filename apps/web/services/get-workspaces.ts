import { cookies } from "next/headers";
import type { ApiGetWorkspacesResponseModel } from "@/types/models/api-get-workspaces";
import {
  InternalServerError,
  NotFoundError,
  UnauthorizedError,
} from "@workspace/exceptions";

export const getWorkspaces =
  async (): Promise<ApiGetWorkspacesResponseModel> => {
    try {
      const baseUrl = process.env.NEXT_PUBLIC_API_BASE_URL;
      const cookieStore = await cookies();
      const jwtToken = cookieStore.get("jwt_token")?.value;

      if (!baseUrl) {
        throw new Error("Missing API_BASE_URL env variable");
      }

      const res = await fetch(`${baseUrl}/workspaces`, {
        method: "GET",
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
      }

      return res.json();
    } catch (error) {
      if (error instanceof NotFoundError) {
        throw error;
      }
      if (error instanceof Error) {
        throw new InternalServerError(error.message, error);
      }
      throw error;
    }
  };
