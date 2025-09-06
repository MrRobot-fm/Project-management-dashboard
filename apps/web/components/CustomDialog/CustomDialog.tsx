import type { ReactNode } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@workspace/ui/components/Dialog";

interface CustomDialogProps {
  isOpen?: boolean;
  triggerSlot?: React.ReactNode;
  setIsOpen?: (open: boolean) => void;
  title?: string;
  description?: string;
  contentSlot: ReactNode;
}

export const CustomDialog = ({
  isOpen,
  setIsOpen,
  triggerSlot,
  title,
  description,
  contentSlot,
}: CustomDialogProps) => {
  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      {triggerSlot && <DialogTrigger asChild>{triggerSlot}</DialogTrigger>}
      <DialogContent
        aria-describedby={undefined}
        className="w-full sm:max-w-lg lg:max-w-xl px-8 py-6 overflow-y-auto"
      >
        {title || description ? (
          <div className="w-full mx-auto pb-4">
            <DialogHeader className="px-0">
              <DialogTitle>{title} </DialogTitle>
              <DialogDescription>{description}</DialogDescription>
            </DialogHeader>
          </div>
        ) : (
          <span className="sr-only">
            <DialogTitle>{title} </DialogTitle>
          </span>
        )}
        {contentSlot}
      </DialogContent>
    </Dialog>
  );
};
