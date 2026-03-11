import { type ReactNode } from "react";
import {
  useFormContext as useRHFContext,
  type FieldValues
} from "react-hook-form";

interface FormRootProps<T extends FieldValues> {
  children: ReactNode;
  onSubmit: (values: T) => void;
}

export const FormRoot = <T extends FieldValues>({
  children,
  onSubmit
}: FormRootProps<T>) => {
  const { handleSubmit } = useRHFContext<T>();

  return (
    <form
      noValidate
      onSubmit={handleSubmit(onSubmit)}
      className="flex flex-col gap-6"
    >
      {children}
    </form>
  );
};
