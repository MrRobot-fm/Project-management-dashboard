import { useMutation, useQueryClient } from "@tanstack/react-query";
import { projectsKeys } from "@/domains/projects/api/keys";
import { projectMutations } from "@/domains/projects/api/mutations";
import type { Project } from "@/domains/projects/api/types";
import { toast } from "sonner";

export const useUpdateProject = (workspaceId: string) => {
  const queryClient = useQueryClient();

  const mutation = useMutation({
    ...projectMutations.updateProject(),
    onMutate: async variables => {
      queryClient.cancelQueries({
        queryKey: projectsKeys.byWorkspace(workspaceId)
      });

      const previousProjects = queryClient.getQueryData<Project[]>(
        projectsKeys.byWorkspace(workspaceId)
      );

      queryClient.setQueryData<Project[]>(
        projectsKeys.byWorkspace(workspaceId),
        old =>
          old?.map(project => {
            if (project.id !== variables.projectId) return project;

            return {
              ...project,
              ...variables.values,
              updatedAt: new Date().toISOString()
            };
          }) ?? []
      );
      return { previousProjects };
    },

    onSuccess: async data => {
      await queryClient.invalidateQueries({
        queryKey: projectsKeys.byWorkspace(workspaceId)
      });

      toast.success("Project updated", {
        description: `${data.project?.name} was updated successfully!`,
        duration: 5000
      });
    },
    onError: (error, _, context) => {
      if (context?.previousProjects) {
        queryClient.setQueryData<Project[]>(
          projectsKeys.byWorkspace(workspaceId),
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
