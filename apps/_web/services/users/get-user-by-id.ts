import { fetchInstance } from "@/utils/fetch-instance";
import { getCookie } from "@/utils/get-cookie";

export const getUserById = async ({ id }: { id: string }) => {
  const jwtToken = await getCookie("jwt_token");

  const response = await fetchInstance({
    path: `users/${id}`,
    options: {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Cookie: `jwt_token=${jwtToken}`,
      },
    },
  });

  return response;
};
