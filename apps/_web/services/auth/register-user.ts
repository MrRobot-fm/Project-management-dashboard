import { HttpExceptionError } from "@workspace/exceptions";

export async function registerUser(
  name: string,
  email: string,
  password: string,
) {
  const registerRes = await fetch(
    `${process.env.NEXT_PUBLIC_API_BASE_URL}/auth/signup`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ name, email, password }),
    },
  );

  if (!registerRes.ok) {
    const registerData = await registerRes.json();

    throw new HttpExceptionError(
      registerData.message,
      registerData.status,
      registerData.code,
      registerData.errors,
    );
  }

  return registerRes;
}
