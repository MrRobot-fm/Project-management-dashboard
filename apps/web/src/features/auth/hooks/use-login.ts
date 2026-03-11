import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "@tanstack/react-router";
import { login } from "../services/login";
import { toast } from "sonner";

export const useLogin = () => {
  const navigate = useNavigate();

  const { mutate, isPending } = useMutation({
    mutationFn: login,
    onSuccess: data => {
      if (!data?.user) return;

      navigate({ to: "/dashboard", replace: true });
    },
    onError: error => {
      toast.error(error.message, {
        duration: 7000,
        position: "top-right"
      });
    }
  });

  return { mutate, isPending };
};
