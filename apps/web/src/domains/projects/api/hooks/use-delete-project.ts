import { useMutation, useQueryClient } from "@tanstack/react-query";
import { projectMutations } from "../mutations";
import { projectsKeys } from "../keys";
import { toast } from "sonner";

export const useDeleteProject = (workspaceId: string | undefined) => {
  const queryClient = useQueryClient();

  const mutation = useMutation({
    ...projectMutations.deleteProject(),
    onSuccess: () => {
      if (workspaceId) {
        queryClient.invalidateQueries({
          queryKey: projectsKeys.byWorkspace(workspaceId)
        });
      }

      toast.success("Project deleted successfully!", {
        duration: 5000
      });
    },
    onError: error => {
      toast.error("Something went wrong", {
        description: error.message,
        duration: 7000
      });
    }
  });

  return mutation;
};
