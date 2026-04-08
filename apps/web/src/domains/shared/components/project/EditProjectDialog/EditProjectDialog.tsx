"use client";

import { useEffect, useState } from "react";
import { Button } from "@workspace/ui/components/Button";
import { CustomDialog } from "@/domains/shared/components/CustomDialog";
import { WorkspaceProjectForm } from "@/domains/shared/components/forms/WorkspaceProjectForm";
import { useUpdateProject } from "@/hooks/use-update-project";
import type { Project } from "@/types/models/api-get-project-by-id";
import { PencilLine } from "lucide-react";

interface EditProjectDialogProps {
  project: Project;
  iconOnly?: boolean;
}

export const EditProjectDialog = ({
  project,
  iconOnly = false
}: EditProjectDialogProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const { createAction, createProjectState } = useUpdateProject({
    projects: [project]
  });

  useEffect(() => {
    if (createProjectState?.success) {
      setIsOpen(false);
    }
  }, [createProjectState]);

  return (
    <CustomDialog
      title="Edit project"
      description="Make quick edits to keep your project on track"
      open={isOpen}
      onOpenChange={setIsOpen}
      trigger={
        <Button
          variant="outline"
          size={iconOnly ? "icon" : "default"}
          className="cursor-pointer border-none shadow-none text-xs font-medium text-neutral-600"
          aria-label="Modifica progetto"
        >
          <PencilLine className={iconOnly ? "size-4" : undefined} />
          {!iconOnly && "Edit this project"}
        </Button>
      }
    >
      <WorkspaceProjectForm
        id={project.id}
        action={createAction}
        data={project}
        workspaceId={project.workspaceId}
        mode="edit"
        type="project"
      />
    </CustomDialog>
  );
};
