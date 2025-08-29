import { redirect } from "next/navigation";
import { KanbanBoard } from "@/components/KanbanBoard";
import { getProjectById } from "@/services/projects/get-project-by-id";

export default async function Tasks({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;

  const { project, error } = await getProjectById(id);

  console.log({ project });

  if (error?.status === 404) {
    redirect("/");
  }

  if (!project) return;

  return (
    <div className="flex flex-col gap-10 h-screen w-full">
      <div className="flex flex-col gap-0.5">
        <p className="text-neutral-600 font-medium">Tasks</p>
        <h1 className="font-semibold text-4xl">{project.name}</h1>
      </div>
      <KanbanBoard projectMembers={project.members} />
    </div>
  );
}
