import { createContext, useContext, type ChangeEvent } from "react";

interface FormFieldContextInterface {
  name: string;
  value: unknown;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
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
