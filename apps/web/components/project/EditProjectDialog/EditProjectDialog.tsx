"use client";

import { useEffect, useState } from "react";
import { Button } from "@workspace/ui/components/Button";
import { CustomDialog } from "@/components/CustomDialog";
import { WorkspaceProjectForm } from "@/components/forms/WorkspaceProjectForm";
import { useUpdateProject } from "@/hooks/use-update-project";
import type { Project } from "@workspace/db";
import { PencilLine } from "lucide-react";

interface EditProjectDialogProps {
  project: Project;
}

export const EditProjectDialog = ({ project }: EditProjectDialogProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const { createAction, createProjectState } = useUpdateProject({ projects: [project] });

  useEffect(() => {
    if (createProjectState?.success) {
      setIsOpen(false);
    }
  }, [createProjectState]);

  return (
    <CustomDialog
      title="Edit project"
      description="Make quick edits to keep your project on track"
      isOpen={isOpen}
      setIsOpen={setIsOpen}
      triggerSlot={
        <Button
          variant="outline"
          className="cursor-pointer rounded-sm text-xs font-medium text-neutral-600"
        >
          <PencilLine />
          Edit this project
        </Button>
      }
      contentSlot={
        <WorkspaceProjectForm
          id={project.id}
          action={createAction}
          data={project}
          workspaceId={project.workspaceId}
          mode="edit"
          type="project"
        />
      }
    />
  );
};
