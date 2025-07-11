export const PATHS = {
  DASHBOARD: "/dashboard",
  PROJECT: (id: string) => `/projects/${id}`,
  PROJECT_TASKS: (id: string) => `/projects/${id}/tasks`,
};
