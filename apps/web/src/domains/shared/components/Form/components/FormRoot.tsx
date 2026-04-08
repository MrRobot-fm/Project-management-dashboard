import { type ReactNode } from "react";
import {
  useFormContext as useRHFContext,
  type FieldValues,
  type SubmitHandler
} from "react-hook-form";

interface FormRootProps<T extends FieldValues> {
  children: ReactNode;
  onSubmit: SubmitHandler<T>;
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
