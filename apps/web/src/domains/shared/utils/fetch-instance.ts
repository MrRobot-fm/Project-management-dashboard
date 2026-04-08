import { refreshToken } from "@/domains/auth/api/services/refresh-token";
import { ApiError, ErrorCode } from "@workspace/exceptions";

export interface FetchResult<T> {
  data?: T;
}

let refreshPromise: Promise<boolean | null> | null = null;

export const fetchInstance = async <T>({
  path,
  options
}: {
  path: string;
  options: RequestInit;
}): Promise<FetchResult<T>> => {
  const baseUrl = import.meta.env.VITE_API_BASE_URL;

  if (!baseUrl) {
    throw new Error("Missing API_BASE_URL env variable");
  }

  const response = await fetch(`${baseUrl}/${path}`, {
    ...options,
    headers: {
      ...(options.headers || {})
    }
  });

  if (response.status === 401) {
    if (!refreshPromise) {
      refreshPromise = refreshToken().finally(() => {
        refreshPromise = null;
      });
    }

    const refreshed = await refreshPromise;

    if (!refreshed) {
      throw new ApiError("Session expired", 401, ErrorCode.UNAUTHORIZED, []);
    }

    return fetchInstance({ path, options });
  }

  if (!response.ok) {
    const errorRes: ApiError = await response.json();
    console.error(errorRes);

    throw new ApiError(
      errorRes.message,
      errorRes.status,
      errorRes.code,
      errorRes.errors
    );
  }

  const data = await response.json();

  return { data };
};
