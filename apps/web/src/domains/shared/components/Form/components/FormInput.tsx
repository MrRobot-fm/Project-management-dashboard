import { Input } from "@workspace/ui/components/Input";
import type { ComponentProps } from "react";
import { useFormField } from "../context/FormFieldContext";
import { cn } from "@workspace/ui/lib/utils";

type FormInputProps = Omit<
  ComponentProps<"input">,
  "name" | "id" | "value" | "onChange"
>;

export function FormInput({ type, ...props }: FormInputProps) {
  const { field, variant } = useFormField();

  return (
    <Input
      id={field.name}
      type={type}
      className={cn("rounded", {
        "focus-visible:ring-0 focus-visible:border-neutral-300 shadow-none border-none p-0 h-6 rounded-none":
          variant === "minimal"
      })}
      spellCheck={false}
      {...field}
      {...props}
    />
  );
}
