import type { ReactNode } from "react";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@workspace/ui/components/Sheet";
import type { Project, Workspace } from "@workspace/db";

interface CreateProjectSheetProps {
  project?: Partial<Project & Workspace>;
  isOpen: boolean;
  triggerSlot?: React.ReactNode;
  setIsOpen: (open: boolean) => void;
  title: string;
  description?: string;
  contentSlot: ReactNode;
}

export const CustomSheet = ({
  isOpen,
  setIsOpen,
  triggerSlot,
  title,
  description,
  contentSlot,
}: CreateProjectSheetProps) => {
  return (
    <Sheet open={isOpen} onOpenChange={setIsOpen}>
      {triggerSlot && <SheetTrigger asChild>{triggerSlot}</SheetTrigger>}
      <SheetContent className="w-full sm:max-w-full md:max-w-2/3 lg:max-w-3/7 xl:max-w-2/6 px-8 py-6">
        <div className="w-full mx-auto">
          <SheetHeader className="px-0">
            <SheetTitle>{title} </SheetTitle>
            <SheetDescription>{description}</SheetDescription>
          </SheetHeader>
        </div>
        {contentSlot}
      </SheetContent>
    </Sheet>
  );
};
