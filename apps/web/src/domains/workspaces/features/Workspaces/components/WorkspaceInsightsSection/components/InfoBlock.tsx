interface InfoBlockProps {
  label: string;
  value: string;
  description: string;
}

export const InfoBlock = ({ label, value, description }: InfoBlockProps) => {
  return (
    <div className="border-b border-neutral-200/70 pb-5 last:border-b-0 last:pb-0">
      <p className="text-[10px] font-medium uppercase tracking-[0.2em] text-neutral-400">
        {label}
      </p>
      <p className="mt-1 text-lg font-semibold text-neutral-900">{value}</p>
      <p className="mt-1 text-sm leading-6 text-neutral-500">{description}</p>
    </div>
  );
};
