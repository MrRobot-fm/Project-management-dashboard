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
  trigger?: ReactNode;
  children?: ReactNode;
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
}

export const AlertDialog = ({
  title,
  description,
  trigger,
  children,
  open,
  onOpenChange,
}: AlertDialogProps) => {
  return (
    <AlertDialogoRoot open={open} onOpenChange={onOpenChange}>
      {trigger && <AlertDialogTrigger asChild>{trigger}</AlertDialogTrigger>}
      <AlertDialogContent forceMount>
        <AlertDialogHeader>
          <AlertDialogTitle>{title}</AlertDialogTitle>
          <AlertDialogDescription>{description}</AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          {children ? (
            children
          ) : (
            <AlertDialogAction>Continue</AlertDialogAction>
          )}
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialogoRoot>
  );
};
