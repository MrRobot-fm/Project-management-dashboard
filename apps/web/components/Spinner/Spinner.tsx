import { cn } from "@workspace/ui/lib/utils";
import { cva, type VariantProps } from "class-variance-authority";
import { Loader2, type LucideProps } from "lucide-react";

export type LoaderVariants = VariantProps<typeof loaderSize>;

interface SpinnerProps extends LoaderVariants {
  className?: LucideProps["className"];
}

export const Spinner = ({ size, className }: SpinnerProps) => {
  return (
    <div role="status" aria-label="Loading...">
      <Loader2 className={cn(loaderSize({ size }), className)} />
      <span className="sr-only">Caricamento...</span>
    </div>
  );
};

const loaderSize = cva("animate-spin text-primary-foreground", {
  variants: {
    size: {
      "2xs": "!size-3",
      xs: "size-4",
      sm: "size-4.5",
      md: "size-6",
      lg: "size-8",
    },
  },
  defaultVariants: {
    size: "sm",
  },
});
