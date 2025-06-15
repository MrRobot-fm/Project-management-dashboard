interface ProjectDescriptionBLockProps {
  description: string | null;
}

export const ProjectDescriptionBlock = ({ description }: ProjectDescriptionBLockProps) => {
  return (
    <div className="rounded-md border border-neutral-100 shadow p-6 flex flex-col gap-2">
      <h2 className="font-medium text-md">Description</h2>
      <p className="text-sm text-neutral-600">{description}</p>
    </div>
  );
};
