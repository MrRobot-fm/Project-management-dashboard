import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from "@workspace/ui/components/Select";
import { cn } from "@workspace/ui/lib/utils";
import type { ComponentProps, ReactNode } from "react";
import { useFormField } from "../context/FormFieldContext";

export type ItemType<V> = {
  id?: string | number;
  value: V;
  label?: string;
  avatar?: string | null;
};

interface FormSelectProps<T extends ItemType<string>>
  extends Omit<
    ComponentProps<typeof Select>,
    "value" | "onValueChange" | "defaultValue" | "children"
  > {
  data: T[];
  children?: (item: T) => ReactNode;
  contentProps?: ComponentProps<typeof SelectContent>;
  triggerProps?: ComponentProps<typeof SelectTrigger>;
  itemProps?: Partial<ComponentProps<typeof SelectItem>>;
  placeholder?: string;
}

export const FormSelect = <T extends ItemType<string>>({
  data,
  placeholder,
  children,
  contentProps,
  itemProps,
  ...props
}: FormSelectProps<T>) => {
  const { field, variant } = useFormField();

  return (
    <Select value={field.value} onValueChange={field.onChange} {...props}>
      <SelectTrigger
        className={cn("focus-visible:ring-0 cursor-pointer", {
          "w-full justify-between focus:border-neutral-300 bg-white border-none shadow-none p-0  data-[size=default]:h-fit":
            variant === "minimal"
        })}
      >
        <SelectValue placeholder={placeholder || "Select"} />
      </SelectTrigger>
      <SelectContent {...contentProps}>
        {data.map(item => (
          <SelectItem
            key={item.id}
            value={item.value}
            className={cn("cursor-pointer", itemProps?.className)}
          >
            {children ? children(item) : item.label}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
};
