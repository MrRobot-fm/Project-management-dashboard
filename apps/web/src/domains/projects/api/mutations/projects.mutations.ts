import { mutationOptions } from "@tanstack/react-query";
import { projectsService } from "@/domains/projects/api/services";

export const projectMutations = {
  createProject: () => {
    return mutationOptions({
      mutationFn: projectsService.createProjectAction
    });
  },
  updateProject: () => {
    return mutationOptions({
      mutationFn: projectsService.updateProjectAction
    });
  },
  deleteProject: () => {
    return mutationOptions({
      mutationFn: projectsService.deleteProjectAction
    });
  }
};
