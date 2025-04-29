export const getBasePath = (workspaceId?: string, userId?: string): string => {
  let basePath = "";

  if (workspaceId) {
    basePath = `workspaces/${workspaceId}/`;
  } else if (userId) {
    basePath = `users/${userId}/`;
  }

  return basePath;
};
