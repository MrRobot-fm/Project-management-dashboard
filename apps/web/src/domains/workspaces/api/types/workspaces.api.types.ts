import type { User, Workspace } from "@workspace/db";

export interface WorkspaceWithStats extends Workspace {
  members: User[];
  projectsCount: number;
  projectMembersCount: number;
  tasksCount: number;
}

export interface ApiGetWorkspacesResponseModel {
  workspaces: WorkspaceWithStats[] | undefined;
}
