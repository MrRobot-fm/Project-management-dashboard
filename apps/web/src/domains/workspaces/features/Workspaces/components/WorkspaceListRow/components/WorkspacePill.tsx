const workspacePillToneClasses = {
  emerald: "border-emerald-200 bg-emerald-50 text-emerald-700",
  sky: "border-sky-200 bg-sky-50 text-sky-700"
} as const;

interface WorkspacePillProps {
  label: string;
  tone: "emerald" | "sky";
}

export const WorkspacePill = ({ label, tone }: WorkspacePillProps) => {
  return (
    <span
      className={`rounded-full border px-2.5 py-1 text-[10px] font-medium uppercase tracking-[0.16em] ${workspacePillToneClasses[tone]}`}
    >
      {label}
    </span>
  );
};
