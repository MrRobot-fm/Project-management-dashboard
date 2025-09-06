import { Spinner } from "@workspace/ui/components/Spinner";
import type { LucideIcon, LucideProps } from "lucide-react";

type IconClassName = LucideProps["className"];

interface SubmitButtonContentProps {
  label: string;
  icon: LucideIcon;
  isLoading: boolean;
  loadingIconClassName?: IconClassName;
  iconClassName?: IconClassName;
}

export const SubmitButtonContent = ({
  label,
  icon: Icon,
  isLoading,
  loadingIconClassName,
  iconClassName,
}: SubmitButtonContentProps) => {
  return (
    <>
      {isLoading ? (
        <Spinner className={loadingIconClassName} />
      ) : (
        <Icon className={iconClassName} />
      )}
      {label}
    </>
  );
};
