import { queryOptions } from "@tanstack/react-query";
import { usersServices } from "@/domains/users/api/services";
import { usersKeys } from "@/domains/users/api/keys";

export const usersQueries = {
  getCurrentUser: queryOptions({
    queryKey: usersKeys.currentUser,
    queryFn: usersServices.getCurrentUser,
    staleTime: 1000 * 60 * 5,
    refetchInterval: 1000 * 60 * 5,
    refetchOnWindowFocus: true
  })
};
