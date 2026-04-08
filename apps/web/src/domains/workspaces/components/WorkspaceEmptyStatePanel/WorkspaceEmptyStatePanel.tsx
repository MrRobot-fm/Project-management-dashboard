import type { ReactNode } from "react";

export const WorkspaceEmptyStatePanel = ({
  title,
  description,
  action,
}: {
  title: string;
  description: string;
  action?: ReactNode;
}) => (
  <div className="rounded-3xl border border-dashed border-neutral-300 px-6 py-10 text-center">
    <p className="text-base font-semibold text-neutral-900">{title}</p>
    <p className="mt-2 text-sm leading-6 text-neutral-500">{description}</p>
    {action ? <div className="mt-6">{action}</div> : null}
  </div>
);
