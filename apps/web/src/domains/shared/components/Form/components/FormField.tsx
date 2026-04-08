import type { ReactNode } from "react";
import { Controller, useFormContext as useRHFContext } from "react-hook-form";
import { FormFieldContext } from "../context/FormFieldContext";
import { useFormContext } from "../context/FormProvider";

interface FormFieldProps {
  children: ReactNode;
  name: string;
}
export const FormField = ({ name, children }: FormFieldProps) => {
  const { variant } = useFormContext();
  const { control } = useRHFContext();

  return (
    <Controller
      name={name}
      control={control}
      render={({ field }) => (
        <FormFieldContext
          value={{
            field,
            variant
          }}
        >
          <div className="flex flex-col items-start gap-2">{children}</div>
        </FormFieldContext>
      )}
    />
  );
};
