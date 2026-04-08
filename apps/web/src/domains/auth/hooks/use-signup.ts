import { errorData } from "@/domains/shared/utils/error-data";
import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "@tanstack/react-router";
import { toast } from "sonner";
import { authMutations } from "@/domains/auth/api/mutations";

export const useSignup = () => {
  const navigate = useNavigate();

  const { mutate, isPending, error } = useMutation(
    authMutations.signup({
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

  const formattedError = errorData(error);

  return { mutate, isPending, error: formattedError };
};
