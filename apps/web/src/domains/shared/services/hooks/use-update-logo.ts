import { projectsKeys } from "@/domains/projects/api/keys/projects.keys.js";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { uploadLogo } from "../logo/upload-logo.js";

export const useUpdateLogo = () => {
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: uploadLogo,
    onSuccess: (_, variables) => {
      if (variables.type === "project" && variables.id) {
        queryClient.invalidateQueries({
          queryKey: projectsKeys.byWorkspace(variables.id)
        });
      }

      toast.success("Logo updated successfully!", {
        position: "bottom-left"
      });
    }
  });

  return mutation;
};
