import Link from "next/link";
import { redirect } from "next/navigation";
import { KanbanBoard } from "@/components/KanbanBoard";
import { LinkLoadingIndicator } from "@/components/LinkLoadingIndicator";
import { getProjectById } from "@/services/projects/get-project-by-id";
import { ArrowLeft } from "lucide-react";

interface ProjectTasksPageProps {
  projectId: string;
}

export const ProjectTasks = async ({ projectId }: ProjectTasksPageProps) => {
  const { project, error } = await getProjectById(projectId);

  if (error?.status === 404) {
    redirect("/");
  }

  if (!project) return;

  return (
    <div className="flex flex-col gap-10 w-full h-full">
      <div className="flex justify-between items-center">
        <div className="flex flex-col gap-0.5">
          <p className="text-neutral-600 font-medium">Tasks</p>
          <h1 className="font-semibold text-4xl">{project.name}</h1>
        </div>
        <Link href={`/projects/${projectId}`} className="flex gap-1 items-center">
          <LinkLoadingIndicator size="xs" className="text-neutral-600">
            <ArrowLeft className="size-4 text-neutral-600" />
          </LinkLoadingIndicator>
          <p className="text-neutral-600 text-xs">Go back</p>
        </Link>
      </div>
      <KanbanBoard tasks={project.tasks} projectMembers={project.members} />
    </div>
  );
};
