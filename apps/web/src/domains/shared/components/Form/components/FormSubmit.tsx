import { Button } from "@workspace/ui/components/Button";
import type { ComponentProps, ReactNode } from "react";
import { useFormContext } from "react-hook-form";

interface FormSubmitProps extends ComponentProps<typeof Button> {
  children: ReactNode;
}

export const FormSubmit = ({ children, ...props }: FormSubmitProps) => {
  const { formState } = useFormContext();

  return (
    <Button type="submit" disabled={!formState.isDirty} {...props}>
      {children}
    </Button>
  );
};
