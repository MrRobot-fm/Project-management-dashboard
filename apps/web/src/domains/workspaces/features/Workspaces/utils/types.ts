export type WorkspaceSort = "recent" | "projects" | "name";
export type WorkspaceSummaryTone = "amber" | "sky" | "emerald" | "rose";
export type WorkspaceSummaryItemKey =
  | "totalWorkspaces"
  | "totalProjects"
  | "totalTasks"
  | "lastUpdated";

export type WorkspaceSummaryItem = {
  key: WorkspaceSummaryItemKey;
  label: string;
  value: string;
  description: string;
  tone: WorkspaceSummaryTone;
};

export type WorkspaceActivityItem = {
  label: string;
  value: string;
  description: string;
};
