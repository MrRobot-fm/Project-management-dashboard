import type { WorkspaceSort } from "@/domains/workspaces/utils/workspaces-page-content";

export const WORKSPACE_SORT_OPTIONS: Array<{
  label: string;
  value: WorkspaceSort;
}> = [
  { label: "Recent", value: "recent" },
  { label: "Most projects", value: "projects" },
  { label: "A-Z", value: "name" },
];
