import { errorData } from "@/features/shared/utils/error-data";
import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "@tanstack/react-router";
import { toast } from "sonner";
import { signup } from "../services/signup";

export const useSignup = () => {
  const navigate = useNavigate();

  const { mutate, isPending, error } = useMutation({
    mutationFn: signup,
    onSuccess: data => {
      if (!data?.user) return;

      navigate({ to: "/dashboard" });
    },
    onError: error => {
      toast.error(error.message, {
        duration: 7000,
        position: "top-right"
      });
    }
  });

  const formattedError = errorData(error);

  return { mutate, isPending, error: formattedError };
};
