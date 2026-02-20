import type { ReactNode } from "react";
import {
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialog as AlertDialogoRoot,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@workspace/ui/components/AlertDialog";

interface AlertDialogProps {
  title: string;
  description: string;
  triggerSlot?: ReactNode;
  actionSlot?: ReactNode;
  isOpen?: boolean;
  onOpenChange?: (open: boolean) => void;
}

export const AlertDialog = ({
  title,
  description,
  triggerSlot,
  actionSlot,
  isOpen,
  onOpenChange,
}: AlertDialogProps) => {
  return (
    <AlertDialogoRoot open={isOpen} onOpenChange={onOpenChange}>
      {triggerSlot && <AlertDialogTrigger asChild>{triggerSlot}</AlertDialogTrigger>}
      <AlertDialogContent forceMount>
        <AlertDialogHeader>
          <AlertDialogTitle>{title}</AlertDialogTitle>
          <AlertDialogDescription>{description}</AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          {actionSlot ? actionSlot : <AlertDialogAction>Continue</AlertDialogAction>}
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialogoRoot>
  );
};
