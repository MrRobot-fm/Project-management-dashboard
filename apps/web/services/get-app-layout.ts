"server only";

import { getWsProjects } from "./projects/get-ws-projects";
import { getCurrentUser } from "./users/get-current-user";
import { getWorkspaces } from "./workspaces/get-workspaces";
import { SELECTED_WS_ID_COOKIE_KEY } from "@/constants/workspaces";
import { getCookie } from "@/utils/get-cookie";
import type { Project, User, Workspace } from "@workspace/db";

type AppLayoutData = {
  user: Omit<User, "createdAt" | "updatedAt"> | undefined;
  workspaces: Workspace[];
  projects: Project[];
  currentWorkspaceId: string | undefined;
};

export const getAppLayout = async (): Promise<AppLayoutData> => {
  const { user } = await getCurrentUser();
  const { workspaces } = await getWorkspaces();
  const selectedWsCookie = await getCookie(`${SELECTED_WS_ID_COOKIE_KEY}_${user?.id}`);

  const { projects } = await getWsProjects(selectedWsCookie ?? workspaces?.[0]?.id);

  return {
    user: user,
    workspaces: workspaces ?? [],
    projects: projects ?? [],
    currentWorkspaceId: selectedWsCookie,
  };
};
