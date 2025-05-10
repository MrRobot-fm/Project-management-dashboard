import { useLinkStatus } from "next/link";
import { type LoaderVariants, Spinner } from "../Spinner";
import { type LucideProps } from "lucide-react";

interface LinkLoadingIndicatorProps extends LoaderVariants {
  className?: LucideProps["className"];
}

export const LinkLoadingIndicator = ({
  className,
  size,
}: LinkLoadingIndicatorProps) => {
  const { pending } = useLinkStatus();

  return pending ? <Spinner size={size} className={className} /> : null;
};
