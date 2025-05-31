import type { ReactNode } from "react";
import {
  AlertDialog as AlertDialogoRoot,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@workspace/ui/components/AlertDialog";
import { Button } from "@workspace/ui/components/Button";

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
      <AlertDialogTrigger asChild>
        {triggerSlot ? triggerSlot : <Button variant="outline">Show Dialog</Button>}
      </AlertDialogTrigger>
      <AlertDialogContent>
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
