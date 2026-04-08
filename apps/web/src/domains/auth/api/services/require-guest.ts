import { usersQueries } from "@/domains/users/api/queries";
import { isRedirect, redirect } from "@tanstack/react-router";
import type { QueryClient } from "@tanstack/react-query";

export const requireGuest = async (queryClient: QueryClient) => {
  try {
    const user = await queryClient.ensureQueryData(usersQueries.getCurrentUser);

    if (user) throw redirect({ to: "/workspaces", replace: true });
  } catch (error) {
    if (isRedirect(error)) throw error;
  }
};
