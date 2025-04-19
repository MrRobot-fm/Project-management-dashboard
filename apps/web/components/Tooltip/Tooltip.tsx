import type { ComponentProps, ReactNode } from "react";
import {
  TooltipContent,
  Tooltip as TooltipRoot,
  TooltipTrigger,
} from "@workspace/ui/components/Tooltip";

interface TooltipProps extends ComponentProps<typeof TooltipContent> {
  trigger: ReactNode;
  contents: ReactNode;
}

export const Tooltip = ({
  contents,
  trigger,
  className,
  sideOffset,
  alignOffset,
  align,
  side,
  asChild = true,
  ...props
}: TooltipProps) => {
  return (
    <TooltipRoot>
      <TooltipTrigger asChild={asChild}>{trigger}</TooltipTrigger>
      <TooltipContent
        className={className}
        sideOffset={sideOffset}
        alignOffset={alignOffset}
        align={align}
        side={side}
        {...props}
      >
        {contents}
      </TooltipContent>
    </TooltipRoot>
  );
};
