"use server";

import { fetchInstance } from "@/utils/fetch-instance";
import { getCookie } from "@/utils/get-cookie";
import type { User } from "@workspace/db";

export const searchUsers = async (query: string, projectId: string): Promise<User[]> => {
  const jwtToken = await getCookie("jwt_token");

  const response = await fetchInstance<User[]>({
    path: `users/search/${projectId}?query=${query}`,
    options: {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Cookie: `jwt_token=${jwtToken}`,
      },
    },
  });

  return response.data || [];
};
