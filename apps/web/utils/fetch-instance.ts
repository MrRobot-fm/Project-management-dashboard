import { ApiError } from "@workspace/exceptions";

export interface FetchResult<T> {
  data?: T;
}

export const fetchInstance = async <T>({
  path,
  options,
}: {
  path: string;
  options: RequestInit;
}): Promise<FetchResult<T>> => {
  const baseUrl = process.env.NEXT_PUBLIC_API_BASE_URL;

  if (!baseUrl) {
    throw new Error("Missing API_BASE_URL env variable");
  }

  const response = await fetch(`${baseUrl}/${path}`, {
    ...options,
    headers: {
      ...(options.headers || {}),
    },
  });

  if (!response.ok) {
    const errorRes: ApiError = await response.json();

    console.log({ errorRes });

    throw new ApiError(errorRes.message, errorRes.status, errorRes.code, errorRes.errors);
  }

  const data = await response.json();

  return { data };
};
