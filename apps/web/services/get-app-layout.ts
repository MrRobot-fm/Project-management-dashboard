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
  const { data: userData } = await getCurrentUser();
  const { data: workspacesData } = await getWorkspaces();
  const selectedWsCookie = await getCookie(`${SELECTED_WS_ID_COOKIE_KEY}_${userData?.user.id}`);

  const { data: projectsData } = await getWsProjects(
    selectedWsCookie ?? workspacesData?.workspaces[0]?.id,
  );

  return {
    user: userData && userData?.user,
    workspaces: workspacesData?.workspaces ?? [],
    projects: projectsData?.projects ?? [],
    currentWorkspaceId: selectedWsCookie,
  };
};
