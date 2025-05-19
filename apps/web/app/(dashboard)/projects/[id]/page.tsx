import { Avatar } from "@/components/Avatar";
import { getProjectById } from "@/services/projects/get-project-by-id";

interface SingleProjectProps {
  params: Promise<{
    id: string;
  }>;
}

export default async function SingleProject({ params }: SingleProjectProps) {
  const { id } = await params;

  const { project } = await getProjectById(id);

  if (!project) return;

  return (
    <div className="p-6">
      <h1>{project.name}</h1>
      <p>{project.description}</p>
      <p>Project ID: {id}</p>
      <Avatar image={project.logo} fallback={project.name} className="size-20" />
    </div>
  );
}
