export const projectsKeys = {
  all: ["projects"] as const,
  byWorkspace: (workspaceId: string) => {
    return [...projectsKeys.all, workspaceId] as const;
  }
};
