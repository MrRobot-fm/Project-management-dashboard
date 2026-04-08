import { useEffect, useRef } from "react";
import { useSidebar } from "@workspace/ui/components/Sidebar";

export const useExpandSidebar = () => {
  const { toggleSidebar, state } = useSidebar();

  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const handleMouseEnter = () => {
    if (state === "collapsed") {
      timeoutRef.current = setTimeout(() => {
        toggleSidebar();
      }, 200);
    }
  };

  const handleMouseLeave = () => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
      timeoutRef.current = null;
    }
  };

  useEffect(() => {
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, [state]);

  return {
    handleMouseEnter,
    handleMouseLeave,
  };
};
