import { projectsKeys } from "@/domains/projects/api/keys";
import { projectMutations } from "@/domains/projects/api/mutations";
import type { Project } from "@/domains/projects/api/types";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

export const useCreateProject = () => {
  const queryClient = useQueryClient();

  const mutation = useMutation({
    ...projectMutations.createProject(),
    onMutate: async variables => {
      await queryClient.cancelQueries({
        queryKey: projectsKeys.byWorkspace(variables.workspaceId)
      });
      const previousProjects = queryClient.getQueryData<Project[]>(
        projectsKeys.byWorkspace(variables.workspaceId)
      );

      queryClient.setQueryData<Project[]>(
        projectsKeys.byWorkspace(variables.workspaceId),
        old => [
          ...(old ?? []),
          {
            id: String(new Date()),
            name: variables.values.name,
            description: variables.values.description ?? "",
            status: variables.values.status ?? "INIT",
            priority: variables.values.priority ?? "LOW",
            logo: null,
            workspaceId: variables.workspaceId,
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString(),
            members: [],
            tasks: []
          }
        ]
      );

      return { previousProjects };
    },
    onSuccess: async (data, variables) => {
      await queryClient.invalidateQueries({
        queryKey: projectsKeys.byWorkspace(variables.workspaceId)
      });

      toast.success("Project created", {
        description: `${data.project?.name} was created successfully!`,
        duration: 5000
      });
    },
    onError: (error, variables, context) => {
      if (context?.previousProjects) {
        queryClient.setQueryData<Project[]>(
          projectsKeys.byWorkspace(variables.workspaceId),
          context.previousProjects
        );
      }

      toast.error("Something went wrong", {
        description: error.message,
        duration: 7000
      });
    }
  });

  return mutation;
};
