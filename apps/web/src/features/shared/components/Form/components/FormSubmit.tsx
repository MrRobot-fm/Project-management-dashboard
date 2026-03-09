import { Button } from "@workspace/ui/components/Button";
import type { ComponentProps, ReactNode } from "react";

interface FormSubmitProps extends ComponentProps<typeof Button> {
  children: ReactNode;
}

export const FormSubmit = ({ children, ...props }: FormSubmitProps) => {
  return (
    <Button type="submit" {...props}>
      {children}
    </Button>
  );
};
