import { cn } from "@workspace/ui/lib/utils";
import { useFormScrollArea } from "@/domains/shared/components/Form/context/FormScrollAreaContext";

interface FormStickyFooterProps {
  children: React.ReactNode;
  className?: string;
  contentClassName?: string;
  showFade?: boolean;
}

export const FormStickyFooter = ({
  children,
  className,
  contentClassName,
  showFade = true
}: FormStickyFooterProps) => {
  const { isScrollable } = useFormScrollArea();

  return (
    <div className={cn("sticky bottom-0", className)}>
      <div className="relative w-full">
        {showFade && isScrollable && (
          <div className="absolute -top-10 left-0 right-0 h-10 bg-linear-to-t from-white to-transparent pointer-events-none" />
        )}

        <div
          className={cn(
            "pt-3 pb-6 flex justify-end bg-white",
            contentClassName
          )}
        >
          {children}
        </div>
      </div>
    </div>
  );
};
