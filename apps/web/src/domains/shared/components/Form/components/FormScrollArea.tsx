import { useIsScrollable } from "@/domains/shared/hooks/use-is-scrollable";
import { FormScrollAreaContext } from "@/domains/shared/components/Form/context/FormScrollAreaContext";
import { cn } from "@workspace/ui/lib/utils";
import type { ReactNode } from "react";

interface FormScrollAreaProps {
  children: ReactNode;
  className?: string;
}

export const FormScrollAreaProvider = FormScrollAreaContext;

export const FormScrollArea = ({
  children,
  className
}: FormScrollAreaProps) => {
  const { ref, isScrollable } = useIsScrollable();

  return (
    <FormScrollAreaProvider value={{ isScrollable }}>
      <div
        ref={ref}
        className={cn(
          "flex flex-col flex-1 overflow-y-auto relative",
          className
        )}
      >
        {children}
      </div>
    </FormScrollAreaProvider>
  );
};
