import { Input } from "@workspace/ui/components/Input";
import type { ComponentProps } from "react";
import { useFormField } from "../context/FormFieldContext";

type FormInputProps = Omit<
  ComponentProps<"input">,
  "name" | "id" | "value" | "onChange"
>;

export function FormInput({ type, ...props }: FormInputProps) {
  const { name, value, onChange } = useFormField();

  return (
    <Input
      id={name}
      name={name}
      type={type}
      value={value as string}
      onChange={onChange}
      className="rounded"
      {...props}
    />
  );
}
