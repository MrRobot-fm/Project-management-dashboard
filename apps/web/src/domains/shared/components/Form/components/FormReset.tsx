import { Button } from "@workspace/ui/components/Button";
import { type ReactNode } from "react";
import { useFormContext as useRHFContext } from "react-hook-form";

interface FormResetProps {
  children: ReactNode;
}

export const FormReset = ({ children }: FormResetProps) => {
  const { reset } = useRHFContext();

  return (
    <Button
      type="button"
      variant="destructive"
      className="rounded cursor-pointer bg-red-500"
      onClick={reset}
    >
      {children}
    </Button>
  );
};
