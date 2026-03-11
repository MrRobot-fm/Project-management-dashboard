import type { ReactNode } from "react";
import { Controller, useFormContext as useRHFContext } from "react-hook-form";
import { FormFieldContext } from "../context/FormFieldContext";

interface FormFieldProps {
  children: ReactNode;
  name: string;
}
export const FormField = ({ name, children }: FormFieldProps) => {
  const {
    control,
    formState: { errors }
  } = useRHFContext();

  console.log({ errors });

  return (
    <Controller
      name={name}
      control={control}
      render={({ field }) => (
        <FormFieldContext
          value={{
            field
          }}
        >
          <div className="flex flex-col items-start gap-2">{children}</div>
        </FormFieldContext>
      )}
    />
  );
};
