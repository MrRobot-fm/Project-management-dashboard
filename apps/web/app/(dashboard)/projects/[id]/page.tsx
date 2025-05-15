import { Avatar } from "@/components/Avatar";
import { getProjectById } from "@/services/projects/get-project-by-id";

interface SingleProjectProps {
  params: Promise<{
    id: string;
  }>;
}

export default async function SingleProject({ params }: SingleProjectProps) {
  const { id } = await params;

  const { data } = await getProjectById(id);

  if (!data?.project) return;

  return (
    <div className="p-6">
      <h1>{data.project.name}</h1>
      <p>{data.project.description}</p>
      <p>Project ID: {id}</p>
      <Avatar image={data.project.logo} fallback={data.project.name} className="size-20" />
    </div>
  );
}
