import { createContext, useContext } from "react";
import type { ControllerRenderProps, FieldValues } from "react-hook-form";

interface FormFieldContextInterface {
  field: ControllerRenderProps<FieldValues, string>;
  variant?: "default" | "minimal";
}

export const FormFieldContext = createContext<FormFieldContextInterface | null>(
  null
);

export const useFormField = () => {
  const ctx = useContext(FormFieldContext);
  if (!ctx) {
    throw new Error("useFormField must be used inside <FormField>");
  }
  return ctx;
};
