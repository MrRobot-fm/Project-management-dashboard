import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "@tanstack/react-router";
import { signup } from "../services/signup";
import { errorData } from "@/features/shared/utils/error-data";

export const useSignup = () => {
  const navigate = useNavigate();

  const { mutate, isPending, error } = useMutation({
    mutationFn: signup,
    onSuccess: data => {
      if (!data?.user) return;

      navigate({ to: "/dashboard" });
    }
  });

  const formattedError = errorData(error);

  return { mutate, isPending, error: formattedError };
};
