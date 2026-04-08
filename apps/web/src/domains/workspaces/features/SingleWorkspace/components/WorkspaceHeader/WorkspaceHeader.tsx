import { ProjectSheet } from "@/domains/projects/components/ProjectSheet/ProjectSheet";
import { Avatar } from "@/domains/shared/components/Avatar";
import { Link } from "@tanstack/react-router";
import { Button } from "@workspace/ui/components/Button";
import { CirclePlus } from "lucide-react";

interface WorkspaceHeaderProps {
  workspaceId: string;
  workspaceName: string;
  workspaceLogo: string | null;
  isCreateProjectDialogOpen: boolean;
  onCreateProject: () => void;
  onOpenChange: (isOpen: boolean) => void;
}

export const WorkspaceHeader = ({
  workspaceId,
  workspaceName,
  workspaceLogo,
  isCreateProjectDialogOpen,
  onCreateProject,
  onOpenChange
}: WorkspaceHeaderProps) => {
  return (
    <section className="sticky top-14.25 z-30 border-b border-neutral-200/80 bg-white/95 pt-8 pb-5 backdrop-blur supports-backdrop-filter:bg-white/80 xl:pt-10">
      <div className="relative flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
        <div className="flex flex-col gap-4">
          <p className="text-xs font-semibold uppercase tracking-[0.24em] text-teal-700">
            Workspace
          </p>
          <div className="flex items-center gap-4">
            <Avatar
              image={workspaceLogo}
              fallback={workspaceName}
              size="4xl"
              shape="square"
              className="shadow-sm"
            />
            <div className="space-y-1">
              <h1 className="text-3xl font-semibold tracking-tight text-neutral-950">
                {workspaceName}
              </h1>
              <p className="max-w-2xl text-sm leading-6 text-neutral-600">
                Track project health, recent changes, and team activity from a
                single working surface.
              </p>
            </div>
          </div>
        </div>

        <div className="flex flex-wrap gap-3">
          <Button
            onClick={onCreateProject}
            className="inline-flex items-center gap-2 rounded-full shadow-none"
          >
            <CirclePlus className="size-4" aria-hidden="true" />
            Create project
          </Button>
          <Link
            to="/workspaces"
            className="inline-flex items-center gap-2 rounded-full border border-neutral-200 bg-white px-4 py-2 text-sm font-medium text-neutral-700 transition-colors hover:bg-neutral-50"
          >
            All workspaces
          </Link>
          <ProjectSheet
            isOpen={isCreateProjectDialogOpen}
            setIsOpen={onOpenChange}
            workspaceId={workspaceId}
          />
        </div>
      </div>
    </section>
  );
};
