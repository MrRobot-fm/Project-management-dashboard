import { Input } from "@workspace/ui/components/Input";
import type { ComponentProps } from "react";
import { useFormField } from "../context/FormFieldContext";

type FormInputProps = Omit<
  ComponentProps<"input">,
  "name" | "id" | "value" | "onChange"
>;

export function FormInput({ type, ...props }: FormInputProps) {
  const { field } = useFormField();

  return (
    <Input
      id={field.name}
      type={type}
      className="rounded"
      spellCheck={false}
      {...field}
      {...props}
    />
  );
}
