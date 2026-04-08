interface WorkspaceSectionIntroProps {
  title: string;
  description: string;
  className?: string;
}

export const WorkspaceSectionIntro = ({
  title,
  description,
  className,
}: WorkspaceSectionIntroProps) => (
  <div className={className}>
    <h2 className="text-xl font-semibold text-neutral-950">{title}</h2>
    <p className="mt-1 text-sm leading-6 text-neutral-500">{description}</p>
  </div>
);
