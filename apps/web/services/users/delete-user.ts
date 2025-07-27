"use server";

import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { errorData } from "@/utils/error-data";
import { setCookiesFromResponse } from "@/utils/set-cookies";

export const deleteUser = async (userId: string | undefined) => {
  try {
    const cookieStore = await cookies();
    const refreshToken = cookieStore.get("refresh_token")?.value;
    const jwtToken = cookieStore.get("jwt_token")?.value;

    const response = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/users/${userId}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Cookie: `refresh_token=${refreshToken}; jwt_token=${jwtToken}`,
      },
    });

    if (!response.ok) {
      const errorRes = await response.json();
      console.error(errorRes);
      return errorData(new Error(errorRes.message || "Failed to delete user"));
    }

    setCookiesFromResponse(cookieStore, response);
  } catch (error) {
    return errorData(error);
  }

  redirect("/signup");
};
