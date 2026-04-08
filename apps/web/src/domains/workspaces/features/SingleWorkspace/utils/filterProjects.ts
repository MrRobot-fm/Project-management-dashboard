import type { ProjectFilter, ProjectListItem } from "./types";

export const filterProjects = (
  projects: ProjectListItem[],
  searchQuery: string,
  projectFilter: ProjectFilter,
) =>
  projects.filter((project) => {
    const normalizedQuery = searchQuery.trim().toLowerCase();

    if (
      normalizedQuery &&
      !project.name.toLowerCase().includes(normalizedQuery)
    ) {
      return false;
    }

    switch (projectFilter) {
      case "active":
        return project.status !== "COMPLETED" && project.status !== "CANCELLED";
      case "blocked":
        return project.status === "BLOCKED";
      case "completed":
        return project.status === "COMPLETED";
      default:
        return true;
    }
  });
