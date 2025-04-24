import type { Workspace } from "@workspace/db";

export interface ApiGetWorkspacesResponseModel {
  workspaces: Workspace[];
}

export type AllWorkspaces = Pick<Workspace, "id" | "name" | "logo">;
