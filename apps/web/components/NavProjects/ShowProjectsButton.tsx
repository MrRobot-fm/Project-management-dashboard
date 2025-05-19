import type { Dispatch, SetStateAction } from "react";
import { SidebarMenuButton } from "@workspace/ui/components/Sidebar";
import { ChevronDown, ChevronUp } from "lucide-react";

interface ShowProjectsButtonProps {
  isExpanded: boolean;
  setIsExpanded: Dispatch<SetStateAction<boolean>>;
}

export const ShowProjectsButton = ({
  isExpanded,
  setIsExpanded,
}: ShowProjectsButtonProps) => {
  return (
    <SidebarMenuButton
      className="text-sidebar-foreground/70 bg-stone-100 dark:bg-transparent justify-center cursor-pointer dark:border dark:border-muted-foreground"
      onClick={() => setIsExpanded((prev) => !prev)}
    >
      <span>{isExpanded ? "Show less" : "Show all"}</span>
      {isExpanded ? (
        <ChevronUp className="text-sidebar-foreground/70" />
      ) : (
        <ChevronDown className="text-sidebar-foreground/70" />
      )}
    </SidebarMenuButton>
  );
};
