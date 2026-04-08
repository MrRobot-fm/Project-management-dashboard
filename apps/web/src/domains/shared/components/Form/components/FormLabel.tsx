import { FieldLabel } from "@workspace/ui/components/Field";
import { type ReactNode } from "react";
import { useFormField } from "../context/FormFieldContext";

interface FormLabelProps {
  children: ReactNode;
}

export const FormLabel = ({ children }: FormLabelProps) => {
  const { field } = useFormField();

  return <FieldLabel htmlFor={field.name}>{children}</FieldLabel>;
};
