import type { WorkspaceWithStats } from "@/domains/workspaces/api/types";

import type { WorkspaceSort } from "./types";

export const filterWorkspaces = (
  workspaces: WorkspaceWithStats[],
  searchQuery: string,
  sortBy: WorkspaceSort,
) => {
  const normalizedQuery = searchQuery.trim().toLowerCase();
  const matchingWorkspaces = workspaces.filter((workspace) => {
    if (!normalizedQuery) {
      return true;
    }

    return workspace.name.toLowerCase().includes(normalizedQuery);
  });

  return [...matchingWorkspaces].sort((left, right) => {
    if (sortBy === "name") {
      return left.name.localeCompare(right.name);
    }

    if (sortBy === "projects") {
      if (right.projectsCount !== left.projectsCount) {
        return right.projectsCount - left.projectsCount;
      }

      return right.tasksCount - left.tasksCount;
    }

    return (
      new Date(right.updatedAt).getTime() - new Date(left.updatedAt).getTime()
    );
  });
};
