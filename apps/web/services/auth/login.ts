import { HttpExceptionError } from "@workspace/exceptions";

export async function loginUser(email: string, password: string) {
  const loginRes = await fetch(
    `${process.env.NEXT_PUBLIC_API_BASE_URL}/auth/login`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password }),
    },
  );

  if (!loginRes.ok) {
    const loginData = await loginRes.json();
    throw new HttpExceptionError(
      loginData.message,
      loginData.status,
      loginData.code,
      loginData.errors,
    );
  }

  return loginRes;
}
