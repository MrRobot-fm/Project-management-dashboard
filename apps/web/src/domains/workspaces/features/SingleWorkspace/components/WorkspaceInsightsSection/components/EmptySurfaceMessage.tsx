import type { ReactNode } from "react";

interface EmptySurfaceMessageProps {
  children: ReactNode;
}

export const EmptySurfaceMessage = ({ children }: EmptySurfaceMessageProps) => {
  return <p className="text-sm leading-6 text-neutral-500">{children}</p>;
};
