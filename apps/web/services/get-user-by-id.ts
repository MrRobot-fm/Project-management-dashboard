import { InternalServerError, NotFoundError } from "@workspace/exceptions";

export const getUserById = async ({ id }: { id: string }) => {
  try {
    const baseUrl = process.env.NEXT_PUBLIC_API_BASE_URL;

    if (!baseUrl) {
      throw new Error("Missing API_BASE_URL env variable");
    }
    const res = await fetch(`${baseUrl}/users/${id}`);

    console.log(res.ok);
    if (!res.ok) {
      if (res.status === 404) {
        const errorData = await res.json();

        throw new NotFoundError(errorData.message);
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
