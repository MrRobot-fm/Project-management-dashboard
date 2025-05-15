import type { ApiGetCurrentUserResponseModel } from "@/types/models/api-get-current-user";
import { fetchInstance } from "@/utils/fetch-instance";
import { getCookie } from "@/utils/get-cookie";

export const getCurrentUser = async () => {
  const jwtToken = await getCookie("jwt_token");

  const response = await fetchInstance<ApiGetCurrentUserResponseModel>({
    path: "users/me",
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
