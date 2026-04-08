import type { ProjectFilter } from "@/domains/workspaces/utils/single-workspace-page-content";

export const PROJECT_FILTER_OPTIONS: Array<{
  label: string;
  value: ProjectFilter;
}> = [
  { label: "All", value: "all" },
  { label: "Active", value: "active" },
  { label: "Blocked", value: "blocked" },
  { label: "Completed", value: "completed" },
];
