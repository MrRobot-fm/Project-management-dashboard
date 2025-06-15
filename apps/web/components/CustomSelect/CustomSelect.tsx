import type { ComponentProps, ReactNode } from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@workspace/ui/components/Select";
import { cn } from "@workspace/ui/lib/utils";

type ItemType<V> = { id?: string; value: V; label?: string };

type ExtractValue<T> = T extends ItemType<infer V> ? V : never;

interface CustomSelectProps<T extends ItemType<string>>
  extends Omit<ComponentProps<typeof Select>, "defaultValue"> {
  data: T[];
  defaultValue?: ExtractValue<T>;
  renderItem?: (item: T) => ReactNode;
  contentProps?: ComponentProps<typeof SelectContent>;
  triggerProps?: ComponentProps<typeof SelectTrigger>;
  itemProps?: ComponentProps<typeof SelectItem>;
}

export const CustomSelect = <T extends ItemType<string>>({
  data,
  onValueChange,
  renderItem,
  defaultValue,
  triggerProps,
  contentProps,
  itemProps,
  ...rest
}: CustomSelectProps<T>) => {
  return (
    <Select defaultValue={String(defaultValue)} onValueChange={onValueChange} {...rest}>
      <SelectTrigger
        {...triggerProps}
        className={cn("w-[180px] focus-visible:ring-0 cursor-pointer", triggerProps?.className)}
      >
        <SelectValue placeholder="Select" />
      </SelectTrigger>
      <SelectContent {...contentProps}>
        {data.map((item) => (
          <SelectItem
            key={item.id}
            value={String(item.value)}
            {...itemProps}
            className={cn("cursor-pointer", itemProps?.className)}
          >
            {renderItem ? renderItem(item) : item.label}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
};
