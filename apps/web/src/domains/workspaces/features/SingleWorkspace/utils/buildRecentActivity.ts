import type { ProjectListItem, RecentActivityItem } from "./types";

export const buildRecentActivity = (
  projects: ProjectListItem[],
): RecentActivityItem[] => {
  return projects
    .flatMap((project) =>
      project.tasks.map((task) => ({
        id: task.id,
        title: task.title,
        status: task.status,
        updatedAt: task.updatedAt,
        projectId: project.id,
        projectName: project.name,
      })),
    )
    .sort(
      (left, right) =>
        new Date(right.updatedAt).getTime() -
        new Date(left.updatedAt).getTime(),
    )
    .slice(0, 4);
};
