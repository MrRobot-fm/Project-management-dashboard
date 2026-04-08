import { queryOptions } from "@tanstack/react-query";
import { workspacesServices } from "@/domains/workspaces/api/services";
import { workspacesKeys } from "@/domains/workspaces/api/keys";

export const workspacesQueries = {
  getWorkspaces: queryOptions({
    queryKey: workspacesKeys.all,
    queryFn: workspacesServices.getWorkspaces
  })
};
