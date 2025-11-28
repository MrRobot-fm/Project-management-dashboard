import { redirect } from "next/navigation";
import { parsedTaskFilterData } from "@/components/filters/TaskFilter/TaskFilter.utils";
import { AboutProjectBlock } from "@/components/project/AboutProjectBlock/AboutProjectBlock";
import { CompletedTasksBlock } from "@/components/project/CompletedTasksBlock";
import { ProjectMembersBlock } from "@/components/project/ProjectMembersBlock";
import { TaskListBlock } from "@/components/project/TaskSummaryBlock";
import { getProjectById } from "@/services/projects/get-project-by-id";

interface SingleProjectProps {
  projectId: string;
}

export const SingleProject = async ({ projectId }: SingleProjectProps) => {
  const { project, error } = await getProjectById(projectId);

  const taskFilterData = parsedTaskFilterData({ tasks: project?.tasks, members: project?.members });

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
            projectId={projectId}
          />
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-5 w-full gap-6">
          <TaskListBlock project={project} taskFilterData={taskFilterData} />
          <CompletedTasksBlock tasks={project.tasks} />
        </div>
      </div>
    </div>
  );
};
