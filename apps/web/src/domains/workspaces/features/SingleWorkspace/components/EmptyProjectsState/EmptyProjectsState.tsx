import { WorkspaceEmptyStatePanel } from "@/domains/workspaces/components";
import { Button } from "@workspace/ui/components/Button";
import { CirclePlus } from "lucide-react";

interface EmptyProjectsStateProps {
  onCreateProject: () => void;
}

export const EmptyProjectsState = ({
  onCreateProject
}: EmptyProjectsStateProps) => {
  return (
    <WorkspaceEmptyStatePanel
      title="No projects yet"
      description="Create the first project here to start tracking work, owners, and recent updates."
      action={
        <Button
          onClick={onCreateProject}
          className="inline-flex items-center gap-2 rounded-full bg-neutral-900 px-4 py-2 text-sm font-medium text-white hover:bg-neutral-800"
        >
          <CirclePlus className="size-4" aria-hidden="true" />
          Create first project
        </Button>
      }
    />
  );
};
