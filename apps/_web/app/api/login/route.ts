import { NextResponse } from "next/server";
import { loginUser } from "@/services/auth/login";
import { setCookiesFromResponse } from "@/utils/set-cookies";
import { HttpExceptionError } from "@workspace/exceptions";

export async function POST(request: Request) {
  try {
    const { email, password } = await request.json();

    const loginRes = await loginUser(email, password);

    const res = NextResponse.redirect(new URL("/", request.url));

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
