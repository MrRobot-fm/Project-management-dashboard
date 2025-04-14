"use server";

import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { setCookiesFromResponse } from "@/utils/set-cookies";

export const logoutAction = async () => {
  const cookieStore = await cookies();
  const refreshToken = cookieStore.get("refresh_token")?.value;
  const jwtToken = cookieStore.get("jwt_token")?.value;

  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_BASE_URL}/auth/logout`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Cookie: `refresh_token=${refreshToken}; jwt_token=${jwtToken}`,
      },
    },
  );

  setCookiesFromResponse(cookieStore, response);

  redirect("/login");
};
