import { redirect } from "next/navigation";
import { Separator } from "@workspace/ui/components/Separator";
import { parsedTaskFilterData } from "@/components/filters/TaskFilter/TaskFilter.utils";
import { AboutProjectBlock } from "@/components/project/AboutProjectBlock/AboutProjectBlock";
import { CompletedTasksBlock } from "@/components/project/CompletedTasksBlock";
import { EditProjectDialog } from "@/components/project/EditProjectDialog";
import { TeamMembersSection } from "@/components/project/ProjectMembersBlock/TeamMembersSection";
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
    <div className="flex flex-col gap-8">
      <h1 className="font-semibold text-4xl mb-2">{project.name}</h1>
      <div className="grid grid-cols-1 xl:grid-cols-[4fr_auto_4fr] w-full gap-10 lg:gap-6 items-stretch">
        <section className="rounded-lg bg-white p-2 flex flex-col col-span-full">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-blue-500 shrink-0" aria-hidden />
              <h2 className="text-base font-semibold text-neutral-900">About</h2>
            </div>
            <EditProjectDialog project={project} iconOnly />
          </div>
          <AboutProjectBlock project={project} />
        </section>
        <Separator
          orientation="horizontal"
          className="hidden lg:block h-full mx-0 w-px bg-neutral-200/70 col-span-full"
          decorative
        />
        <section className="col-span-full">
          <TeamMembersSection
            members={project.members}
            workspaceId={project.workspaceId}
            projectId={projectId}
          />
        </section>
        <Separator
          orientation="horizontal"
          className="hidden lg:block col-span-full h-full mx-0 w-px bg-neutral-200/70"
          decorative
        />
        <section className="rounded-lg bg-white p-2">
          <TaskListBlock project={project} taskFilterData={taskFilterData} />
        </section>
        <Separator
          orientation="vertical"
          className="hidden lg:block h-full mx-0 w-px bg-neutral-200/70"
          decorative
        />
        <section className="rounded-lg bg-white p-2">
          <div className="flex items-center gap-2 mb-6">
            <div className="w-2 h-2 rounded-full bg-violet-500 shrink-0" aria-hidden />
            <h2 className="text-base font-semibold text-neutral-900">Progress</h2>
          </div>
          <CompletedTasksBlock tasks={project.tasks} />
        </section>
      </div>
    </div>
  );
};
