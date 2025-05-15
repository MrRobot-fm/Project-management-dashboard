import { errorData } from "./error-data";
import { type ErrorCode, type StatusCode } from "@workspace/exceptions";

export interface ErrorResponse {
  message: string;
  status: StatusCode;
  code: ErrorCode;
  errors: Record<string, unknown>;
}

export interface FetchResult<T> {
  success: boolean;
  data?: T;
  error?: {
    message: string;
    status: StatusCode;
    code: ErrorCode;
    errors: Record<string, unknown>;
  };
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
    const errorRes: ErrorResponse = await response.json();

    return errorData(errorRes);
  }

  const data = await response.json();

  return { success: true, data: data };
};
