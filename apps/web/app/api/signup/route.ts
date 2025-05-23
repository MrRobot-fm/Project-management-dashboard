import { NextResponse } from "next/server";
import { loginUser } from "@/services/auth/login";
import { registerUser } from "@/services/auth/register-user";
import { setCookiesFromResponse } from "@/utils/set-cookies";
import { BadRequestError, HttpExceptionError } from "@workspace/exceptions";

export async function POST(request: Request) {
  try {
    const { password, repeatPassword, name, email } = await request.json();

    if (password !== repeatPassword) {
      throw new BadRequestError("Passwords do not match");
    }

    await registerUser(name, email, password);

    const loginRes = await loginUser(email, password);

    const res = NextResponse.redirect(new URL("/", request.url), 303);

    setCookiesFromResponse(res, loginRes);

    return res;
  } catch (error) {
    if (error instanceof HttpExceptionError) {
      return NextResponse.json(
        {
          message: error.message,
          status: error.status,
          code: error.code,
          errors: error.errors,
        },
        { status: error.status },
      );
    }
    throw error;
  }
}
