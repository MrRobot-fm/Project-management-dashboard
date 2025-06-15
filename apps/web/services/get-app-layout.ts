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
  const [userRes, workspacesRes] = await Promise.all([getCurrentUser(), getWorkspaces()]);

  const user = userRes.user;
  const workspaces = workspacesRes.workspaces ?? [];

  const selectedWsCookie = await getCookie(`${SELECTED_WS_ID_COOKIE_KEY}_${user?.id}`);

  const validWorkspaceIds = workspaces.map((workspace) => workspace.id);
  const currentWorkspaceId = validWorkspaceIds.includes(selectedWsCookie || "")
    ? selectedWsCookie
    : workspaces[0]?.id;

  const { projects } = await getWsProjects(currentWorkspaceId);

  return {
    user,
    workspaces,
    projects: projects ?? [],
    currentWorkspaceId,
  };
};
