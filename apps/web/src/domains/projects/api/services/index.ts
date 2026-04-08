import { createProjectAction } from "./create-project";
import { deleteProjectAction } from "./delete-project";
import { getWsProjects } from "./get-ws-projects";
import { updateProjectAction } from "./update-project";

export const projectsService = {
  getWsProjects,
  createProjectAction,
  updateProjectAction,
  deleteProjectAction
};
