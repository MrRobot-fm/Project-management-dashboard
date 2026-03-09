import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "@tanstack/react-router";
import { login } from "../services/login";

export const useLogin = () => {
  const navigate = useNavigate();

  const { mutate, isPending } = useMutation({
    mutationFn: login,
    onSuccess: data => {
      if (!data?.user) return;

      navigate({ to: "/dashboard", replace: true });
    }
  });

  return { mutate, isPending };
};
