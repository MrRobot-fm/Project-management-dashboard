import { Suspense } from "react";
import { ProjectTasks } from "@/components/pages/ProjectTasks/ProjectTasks";
import { ProjectTasksSkeleton } from "@/components/pages/ProjectTasks/ProjectTasksSkeleton";

export default async function Tasks({ params }: PageProps<"/projects/[id]/tasks">) {
  const { id } = await params;

  return (
    <Suspense fallback={<ProjectTasksSkeleton />}>
      <ProjectTasks projectId={id} />
    </Suspense>
  );
}
