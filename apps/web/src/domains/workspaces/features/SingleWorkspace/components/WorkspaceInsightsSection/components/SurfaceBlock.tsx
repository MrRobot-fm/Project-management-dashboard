import type { ReactNode } from "react";

interface SurfaceBlockProps {
  eyebrow: string;
  title: string;
  description: string;
  children: ReactNode;
}

export const SurfaceBlock = ({
  eyebrow,
  title,
  description,
  children
}: SurfaceBlockProps) => {
  return (
    <div>
      <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-neutral-400">
        {eyebrow}
      </p>
      <h2 className="mt-2 text-lg font-semibold text-neutral-950">{title}</h2>
      <p className="mt-1 text-sm leading-6 text-neutral-500">{description}</p>
      <div className="mt-5">{children}</div>
    </div>
  );
};
