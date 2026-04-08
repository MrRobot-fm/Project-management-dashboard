import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "@tanstack/react-router";
import { toast } from "sonner";
import { authMutations } from "@/domains/auth/api/mutations";

export const useLogin = () => {
  const navigate = useNavigate();

  const { mutate, isPending } = useMutation(
    authMutations.login({
      onSuccess: data => {
        if (!data?.user) return;

        navigate({ to: "/workspaces", replace: true });
      },
      onError: error => {
        toast.error(error.message, {
          duration: 7000,
          position: "top-right"
        });
      }
    })
  );

  return { mutate, isPending };
};
