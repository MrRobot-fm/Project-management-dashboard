import { Textarea } from "@workspace/ui/components/Textarea";
import { type ComponentProps } from "react";
import { useFormField } from "../context/FormFieldContext";
import { cn } from "@workspace/ui/lib/utils";

type FormTextareaProps = ComponentProps<typeof Textarea>;

export const FormTextarea = ({ ...props }: FormTextareaProps) => {
  const { field, variant } = useFormField();

  return (
    <Textarea
      id={field.name}
      spellCheck={false}
      className={cn("rounded", {
        "focus-visible:ring-0 focus-visible:border-neutral-300 shadow-none border-none p-0 py-0 h-auto min-h-6 max-h-48 resize-none rounded-none":
          variant === "minimal"
      })}
      {...props}
      {...field}
    />
  );
};
