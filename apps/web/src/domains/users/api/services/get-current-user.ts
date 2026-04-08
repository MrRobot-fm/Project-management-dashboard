import type {
  ApiGetCurrentUserResponseModel,
  User
} from "@/domains/users/api/types";
import { fetchInstance } from "@/domains/shared/utils/fetch-instance";

export const getCurrentUser = async (): Promise<User | null> => {
  const response = await fetchInstance<ApiGetCurrentUserResponseModel>({
    path: "users/me",
    options: {
      method: "GET",
      credentials: "include",
      headers: {
        "Content-Type": "application/json"
      }
    }
  });

  return response.data?.user ?? null;
};
