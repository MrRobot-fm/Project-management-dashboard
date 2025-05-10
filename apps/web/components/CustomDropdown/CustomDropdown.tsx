import type { ComponentProps, ReactNode } from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@workspace/ui/components/DropdownMenu";

interface CustomDropdownProps<T>
  extends ComponentProps<typeof DropdownMenuContent> {
  data: T[];
  items: (item: T, index?: number) => ReactNode;
  trigger: ReactNode;
}

export const CustomDropdown = <T,>({
  data,
  items,
  trigger,
  ...props
}: CustomDropdownProps<T>) => {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>{trigger}</DropdownMenuTrigger>
      <DropdownMenuContent {...props}>
        {data.map((item, index) => items(item, index))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
