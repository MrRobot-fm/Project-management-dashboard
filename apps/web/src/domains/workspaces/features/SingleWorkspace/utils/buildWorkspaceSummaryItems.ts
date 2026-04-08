import { formatDate, getMostRecentBy } from "@/domains/workspaces/utils";

import type { ProjectListItem, WorkspaceSummaryItem } from "./types";

export const buildWorkspaceSummaryItems = (
  projects: ProjectListItem[]
): WorkspaceSummaryItem[] => {
  const totalTasks = projects.reduce(
    (total, project) => total + project.tasks.length,
    0
  );
  const uniqueMembers = new Set(
    projects.flatMap(project => project.members.map(member => member.id))
  ).size;
  const latestProject = getMostRecentBy(projects, "updatedAt");
  const newestProject = getMostRecentBy(projects, "createdAt");

  return [
    {
      label: "Projects",
      value: String(projects.length),
      description: "Total projects in this workspace"
    },
    {
      label: "Last updated project",
      value: latestProject?.name || "No project yet",
      description: latestProject
        ? `Updated ${formatDate(latestProject.updatedAt)}`
        : "Create a project to start tracking activity."
    },
    {
      label: "Newest project",
      value: newestProject?.name || "No project yet",
      description: newestProject
        ? `Created ${formatDate(newestProject.createdAt)}`
        : "Your next project will appear here."
    },
    {
      label: "Members",
      value: String(uniqueMembers),
      description: "Unique collaborators assigned"
    },
    {
      label: "Tasks",
      value: String(totalTasks),
      description: "Tracked tasks across projects"
    }
  ];
};
