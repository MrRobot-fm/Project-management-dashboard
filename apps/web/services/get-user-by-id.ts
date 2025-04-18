import { cookies } from "next/headers";
import {
  InternalServerError,
  NotFoundError,
  UnauthorizedError,
} from "@workspace/exceptions";

export const getUserById = async ({ id }: { id: string }) => {
  try {
    const baseUrl = process.env.NEXT_PUBLIC_API_BASE_URL;
    const cookieStore = await cookies();
    const jwtToken = cookieStore.get("jwt_token")?.value;

    if (!baseUrl) {
      throw new Error("Missing API_BASE_URL env variable");
    }

    const headers: HeadersInit = {
      "Content-Type": "application/json",
    };

    if (jwtToken) {
      headers["Cookie"] = `jwt_token=${jwtToken}`;
    }

    const res = await fetch(`${baseUrl}/users/${id}`, {
      method: "GET",
      headers,
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
