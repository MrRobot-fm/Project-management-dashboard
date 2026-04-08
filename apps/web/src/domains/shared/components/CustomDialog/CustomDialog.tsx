import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@workspace/ui/components/Sheet";
import type { ReactNode } from "react";

interface CustomDialogProps {
  open?: boolean;
  trigger?: React.ReactNode;
  onOpenChange?: (open: boolean) => void;
  title?: string;
  description?: string;
  children: ReactNode;
}

export const CustomDialog = ({
  open,
  onOpenChange,
  trigger,
  title,
  description,
  children,
}: CustomDialogProps) => {
  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      {trigger && <SheetTrigger asChild>{trigger}</SheetTrigger>}
      <SheetContent
        aria-describedby={undefined}
        className="w-full sm:max-w-lg lg:max-w-xl px-0 py-10 rounded-2xl right-8 max-h-[90vh] top-1/2 bottom-1/2 -translate-y-1/2 overflow-hidden gap-0"
      >
        {title || description ? (
          <div className="w-full mx-auto">
            <SheetHeader className="px-8 pt-0">
              <SheetDescription>{title} </SheetDescription>
              <SheetDescription>{description}</SheetDescription>
            </SheetHeader>
          </div>
        ) : (
          <span className="sr-only">
            <SheetTitle>{title} </SheetTitle>
          </span>
        )}
        {children}
      </SheetContent>
    </Sheet>
  );
};
