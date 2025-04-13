import { NextResponse, type NextRequest } from "next/server";
import { setCookiesFromResponse } from "@/utils/set-cookies";

export const refreshToken = async (req: NextRequest) => {
  const refreshToken = req.cookies.get("refresh_token")?.value;

  if (!refreshToken) return null;

  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_BASE_URL}/auth/refresh`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Cookie: `refresh_token=${refreshToken}`,
        },
        credentials: "include",
      },
    );

    if (!response.ok) return null;

    const setCookieHeader = response.headers.get("set-cookie");

    if (!setCookieHeader) return null;

    const nextResponse = NextResponse.next();

    setCookiesFromResponse(nextResponse, response);

    return nextResponse;
  } catch (error) {
    console.error("Error during token refresh:", error);
    return null;
  }
};
