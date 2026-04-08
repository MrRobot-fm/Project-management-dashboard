interface WorkspaceDetailInlineProps {
  label: string;
  value: string;
  description: string;
}

export const WorkspaceDetailInline = ({
  label,
  value,
  description
}: WorkspaceDetailInlineProps) => {
  return (
    <div className="border-l border-neutral-200/70 pl-4 first:border-l-0 first:pl-0 lg:min-h-24">
      <p className="text-[10px] font-medium uppercase tracking-[0.2em] text-neutral-400">
        {label}
      </p>
      <p className="mt-1 text-lg font-semibold text-neutral-900">{value}</p>
      <p className="mt-1 text-sm leading-6 text-neutral-500">{description}</p>
    </div>
  );
};
