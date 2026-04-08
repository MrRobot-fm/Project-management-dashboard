import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "@tanstack/react-router";
import { toast } from "sonner";
import { authMutations } from "../api/mutations";

export const useLogout = () => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  return useMutation(
    authMutations.logout({
      onSuccess: () => {
        queryClient.clear();
        navigate({ to: "/login", replace: true });
      },
      onError: error => {
        toast.error(error.message, {
          duration: 7000,
          position: "top-right"
        });
      }
    })
  );
};
