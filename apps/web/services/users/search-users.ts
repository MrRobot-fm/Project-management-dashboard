import { fetchInstance } from "@/utils/fetch-instance";
import type { User } from "@workspace/db";

export const searchUsers = async (query: string): Promise<User[]> => {
  const response = await fetchInstance<User[]>({
    path: `users/search?query=${query}`,
    options: {
      method: "GET",
      credentials: "include",
    },
  });

  return response.data || [];
};
