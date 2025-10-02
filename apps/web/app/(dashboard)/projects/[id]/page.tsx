import { redirect } from "next/navigation";
import { AboutProjectBlock } from "@/components/project/AboutProjectBlock/AboutProjectBlock";
import { CompletedTasksBlock } from "@/components/project/CompletedTasksBlock";
import { ProjectMembersBlock } from "@/components/project/ProjectMembersBlock";
import { ProjectTaskSummaryBlock } from "@/components/project/ProjectTaskSummaryBlock";
import { getProjectById } from "@/services/projects/get-project-by-id";

export const dynamic = "force-dynamic";

export default async function SingleProject({ params }: PageProps<"/projects/[id]">) {
  const { id } = await params;

  const { project, error } = await getProjectById(id);

  console.log({ project });

  if (error?.status === 404) {
    redirect("/");
  }

  if (!project) return;

  return (
    <div className="flex flex-col gap-10">
      <h1 className="font-semibold text-4xl">{project.name}</h1>
      <div className="flex-col flex gap-6">
        <div className="w-full shrink-0 flex flex-col gap-6">
          <AboutProjectBlock project={project} />
        </div>
        <div className="flex flex-col gap-6 w-full">
          <ProjectMembersBlock
            members={project.members}
            workspaceId={project.workspaceId}
            projectId={id}
          />
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-2 w-full gap-6">
          <ProjectTaskSummaryBlock tasks={project.tasks} />
          <CompletedTasksBlock tasks={project.tasks} />
        </div>
      </div>
    </div>
  );
}
