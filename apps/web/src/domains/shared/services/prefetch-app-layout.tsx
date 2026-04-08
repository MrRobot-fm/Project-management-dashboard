import { workspacesQueries } from "@/domains/workspaces/api/queries";
import type { QueryClient } from "@tanstack/react-query";

export const prefetchAppLayout = async (
  queryClient: QueryClient,
  workspaceId?: string
) => {
  const workspaces = await queryClient.ensureQueryData(
    workspacesQueries.getWorkspaces
  );

  // const cookieKey = `${SELECTED_WS_ID_COOKIE_KEY}_${userId}`;
  // const selectedWsCookie = Cookies.get(cookieKey);

  // const validWorkspaceIds = workspaces.map(ws => ws.id);

  // const currentWorkspaceId = validWorkspaceIds.includes(selectedWsCookie ?? "")
  //   ? selectedWsCookie
  //   : workspaces[0]?.id;

  return { workspaces };
};
