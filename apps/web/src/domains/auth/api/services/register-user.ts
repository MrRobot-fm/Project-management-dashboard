import { ApiError } from "@workspace/exceptions";
import { AUTH_ENDPOINTS } from "../../constants/auth-endpoints";

export async function registerUser(value: {
  name: string;
  email: string;
  password: string;
}) {
  const registerRes = await fetch(AUTH_ENDPOINTS.SIGNUP, {
    method: "POST",
    credentials: "include",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(value)
  });

  if (!registerRes.ok) {
    const registerData = await registerRes.json();

    throw new ApiError(
      registerData.message,
      registerData.status,
      registerData.code,
      registerData.errors
    );
  }

  return registerRes.json();
}
