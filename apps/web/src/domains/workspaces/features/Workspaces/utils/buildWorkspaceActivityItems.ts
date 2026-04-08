import type { WorkspaceWithStats } from "@/domains/workspaces/api/types";
import { formatDate, getMostRecentBy } from "@/domains/workspaces/utils";

import type { WorkspaceActivityItem } from "./types";

export const buildWorkspaceActivityItems = (
  workspaces: WorkspaceWithStats[]
): WorkspaceActivityItem[] => {
  const latestWorkspace = getMostRecentBy(workspaces, "updatedAt");
  const newestWorkspace = getMostRecentBy(workspaces, "createdAt");
  const attentionWorkspace = [...workspaces].sort((left, right) => {
    if (right.tasksCount !== left.tasksCount) {
      return right.tasksCount - left.tasksCount;
    }

    return right.projectsCount - left.projectsCount;
  })[0];

  return [
    {
      label: "Last updated workspace",
      value: latestWorkspace?.name || "No workspace yet",
      description: latestWorkspace
        ? `Updated ${formatDate(latestWorkspace.updatedAt)}`
        : "Create a workspace to start organizing projects."
    },
    {
      label: "Newest workspace",
      value: newestWorkspace?.name || "No workspace yet",
      description: newestWorkspace
        ? `Created ${formatDate(newestWorkspace.createdAt)}`
        : "Your next workspace will appear here as soon as you create it."
    },
    {
      label: "Needs attention",
      value: attentionWorkspace?.name || "No workspace yet",
      description: attentionWorkspace
        ? `${attentionWorkspace.tasksCount} tasks across ${attentionWorkspace.projectsCount} projects`
        : "The busiest workspace will appear here once data is available."
    }
  ];
};
