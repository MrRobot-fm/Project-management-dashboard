import type { ComponentProps, ReactNode } from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@workspace/ui/components/DropdownMenu";

interface CustomDropdownProps<T> extends ComponentProps<typeof DropdownMenuContent> {
  data: T[];
  items: (item: T, index?: number) => ReactNode;
  triggerSlot: ReactNode;
}

export const CustomDropdown = <T,>({
  data,
  items,
  triggerSlot,
  ...props
}: CustomDropdownProps<T>) => {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>{triggerSlot}</DropdownMenuTrigger>
      <DropdownMenuContent {...props}>
        {data.map((item, index) => items(item, index))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
