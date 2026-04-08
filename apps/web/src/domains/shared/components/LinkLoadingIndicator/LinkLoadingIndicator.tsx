"use client";

import type { ReactNode } from "react";
// @ts-expect-error  useLinkStatus is available on Next.js 15.3+
import { useLinkStatus } from "next/link";
import { type LoaderVariants, Spinner } from "@workspace/ui/components/Spinner";
import { type LucideProps } from "lucide-react";

interface LinkLoadingIndicatorProps extends LoaderVariants {
  className?: LucideProps["className"];
  children?: ReactNode;
}

export const LinkLoadingIndicator = ({
  className,
  size,
  children
}: LinkLoadingIndicatorProps) => {
  const { pending } = useLinkStatus();

  return pending ? (
    <Spinner size={size} className={className} />
  ) : (
    <>{children}</>
  );
};
