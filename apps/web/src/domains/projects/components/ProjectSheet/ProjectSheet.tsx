import type { Project } from "@/domains/projects/api/types";
import { ProjectForm } from "@/domains/projects/components/ProjectForm";
import type { CreateProjectType } from "@workspace/schemas";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger
} from "@workspace/ui/components/Sheet";
import type { ReactNode } from "react";
import { useUpsertProject } from "@/domains/projects/api/hooks/use-upsert-project";

interface ProjectSheetProps {
  isOpen?: boolean;
  setIsOpen?: (open: boolean) => void;
  triggerSlot?: ReactNode;
  workspaceId: string;
  project?: Project | null;
}

export const ProjectSheet = ({
  isOpen,
  setIsOpen,
  triggerSlot,
  workspaceId,
  project
}: ProjectSheetProps) => {
  const initialValues: CreateProjectType = {
    name: project?.name ?? "",
    description: project?.description ?? "",
    status: project?.status ?? "INIT",
    priority: project?.priority ?? "LOW",
    logo: project?.logo ?? null
  };

  const { submit } = useUpsertProject({ workspaceId, projectId: project?.id });

  const handleSubmit = (values: CreateProjectType) => {
    submit(values);

    console.log({ values });

    if (setIsOpen) setIsOpen(false);
  };

  const mode = project ? "update" : "create";

  const sheetText = {
    create: {
      title: "Create Project",
      description: "What’s your project about? Add a few details."
    },
    update: {
      title: "Edit Project",
      description: "Make quick edits to keep your project on track"
    }
  };

  const { title, description } = sheetText[mode];

  return (
    <Sheet open={isOpen} onOpenChange={setIsOpen}>
      {triggerSlot && <SheetTrigger asChild>{triggerSlot}</SheetTrigger>}
      <SheetContent
        aria-describedby={undefined}
        className="w-full sm:max-w-lg lg:max-w-xl px-0 pt-10 rounded-2xl right-8 max-h-[90vh] top-1/2 bottom-1/2 -translate-y-1/2 overflow-hidden gap-0"
      >
        <div className="w-full mx-auto">
          <SheetHeader className="px-8 pt-0">
            <SheetTitle>{title} </SheetTitle>
            <SheetDescription>{description}</SheetDescription>
          </SheetHeader>
        </div>
        <ProjectForm
          onSubmit={handleSubmit}
          values={initialValues}
          mode={mode}
          entityId={project?.id}
        />
      </SheetContent>
    </Sheet>
  );
};
