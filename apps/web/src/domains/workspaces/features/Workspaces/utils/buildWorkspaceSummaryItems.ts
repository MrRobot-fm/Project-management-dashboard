import type { WorkspaceWithStats } from "@/domains/workspaces/api/types";
import { formatDate, getMostRecentBy } from "@/domains/workspaces/utils";

import type { WorkspaceSummaryItem } from "./types";

export const buildWorkspaceSummaryItems = (
  workspaces: WorkspaceWithStats[]
): WorkspaceSummaryItem[] => {
  const latestWorkspace = getMostRecentBy(workspaces, "updatedAt");
  const totalProjects = workspaces.reduce(
    (total, workspace) => total + workspace.projectsCount,
    0
  );
  const totalTasks = workspaces.reduce(
    (total, workspace) => total + workspace.tasksCount,
    0
  );

  return [
    {
      key: "totalWorkspaces",
      label: "Total workspaces",
      value: String(workspaces.length),
      description: "Available spaces",
      tone: "sky"
    },
    {
      key: "totalProjects",
      label: "Total projects",
      value: String(totalProjects),
      description: "Projects across workspaces",
      tone: "amber"
    },
    {
      key: "totalTasks",
      label: "Total tasks",
      value: String(totalTasks),
      description: "Tasks across all projects",
      tone: "emerald"
    },
    {
      key: "lastUpdated",
      label: "Last updated",
      value: latestWorkspace
        ? formatDate(latestWorkspace.updatedAt)
        : "No activity yet",
      description: "Most recent activity",
      tone: "rose"
    }
  ];
};
