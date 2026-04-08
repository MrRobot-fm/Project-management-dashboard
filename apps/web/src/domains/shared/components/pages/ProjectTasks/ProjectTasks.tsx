import { redirect } from "next/navigation";
import { KanbanBoard } from "@/domains/shared/components/KanbanBoard";
import { TaskFilter } from "@/domains/shared/components/filters/TaskFilter";
import { parsedTaskFilterData } from "@/domains/shared/components/filters/TaskFilter/TaskFilter.utils";
import { getProjectById } from "@/services/projects/get-project-by-id";

interface ProjectTasksPageProps {
  projectId: string;
}

export const ProjectTasks = async ({ projectId }: ProjectTasksPageProps) => {
  const { project, error } = await getProjectById(projectId);

  const taskFilterData = parsedTaskFilterData({
    tasks: project?.tasks,
    members: project?.members
  });

  if (error?.status === 404) {
    redirect("/");
  }

  if (!project) return;

  return (
    <div className="flex flex-col gap-10 w-full h-full max-w-[920px] mx-auto">
      <div className="flex justify-between items-end">
        <div className="flex flex-col gap-0.5">
          <p className="text-neutral-600 font-medium">Tasks</p>
          <h1 className="font-semibold text-4xl">{project.name}</h1>
        </div>
        <TaskFilter data={taskFilterData} tasks={project.tasks} />
      </div>
      <KanbanBoard tasks={project.tasks} projectMembers={project.members} />
    </div>
  );
};
