import { AUTH_ENDPOINTS } from "@/domains/auth/constants/auth-endpoints";
import { ApiError } from "@workspace/exceptions";

export async function login(value: { email: string; password: string }) {
  const response = await fetch(AUTH_ENDPOINTS.LOGIN, {
    method: "POST",
    credentials: "include",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(value)
  });

  if (!response.ok) {
    const data = await response.json();

    throw new ApiError(data.message, response.status, data.code, data.errors);
  }

  return response.json();
}
