import { projectsKeys } from "@/domains/projects/api/keys";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { deleteLogo } from "../logo/delete-logo";

export const useRemoveLogo = (options: { onSuccess: () => void }) => {
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: deleteLogo,
    onSuccess: (_, variables) => {
      if (variables.type === "project" && variables.id) {
        queryClient.invalidateQueries({
          queryKey: projectsKeys.byWorkspace(variables.id)
        });
      }

      toast.success("Logo removed successfully!", {
        position: "bottom-left"
      });

      if (options.onSuccess) {
        options.onSuccess();
      }
    }
  });

  return mutation;
};
