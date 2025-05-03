export const getBasePath = ({
  workspaceId,
  userId,
  projectId,
}: {
  workspaceId?: string;
  userId?: string;
  projectId?: string;
}): string => {
  let basePath = "";

  if (workspaceId) {
    basePath = `workspaces/${workspaceId}/`;
  } else if (userId) {
    basePath = `users/${userId}/`;
  } else if (projectId) {
    basePath = `projects/${projectId}/`;
  }

  return basePath;
};
