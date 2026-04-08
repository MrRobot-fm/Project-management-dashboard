import { usersQueries } from "@/domains/users/api/queries";
import { redirect } from "@tanstack/react-router";
import type { QueryClient } from "@tanstack/react-query";

export const requireUser = async (queryClient: QueryClient) => {
  const user = await queryClient.ensureQueryData(usersQueries.getCurrentUser);

  if (!user) throw redirect({ to: "/login" });

  return { user };
};
