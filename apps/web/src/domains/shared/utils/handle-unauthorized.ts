import { ApiError, ErrorCode } from "@workspace/exceptions";
import type { QueryClient } from "@tanstack/react-query";
import type { getRouter } from "@/router";

type Router = ReturnType<typeof getRouter>;

export const handleUnauthorized = (
  error: Error,
  router: Router,
  queryClient: QueryClient
) => {
  if (error instanceof ApiError && error.code === ErrorCode.UNAUTHORIZED) {
    if (router.state.location.pathname === "/login") return;

    queryClient.clear();

    router.navigate({ to: "/login", replace: true });
  }
};
