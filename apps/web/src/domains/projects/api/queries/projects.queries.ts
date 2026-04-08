import { queryOptions } from "@tanstack/react-query";
import { projectsService } from "@/domains/projects/api/services";
import { projectsKeys } from "@/domains/projects/api/keys";

export const projectsQueries = {
  getWsProjects: (workspaceId: string | undefined) => {
    return queryOptions({
      queryKey: projectsKeys.byWorkspace(workspaceId ?? ""),
      queryFn: () => projectsService.getWsProjects(workspaceId),
      enabled: !!workspaceId
    });
  }
};
