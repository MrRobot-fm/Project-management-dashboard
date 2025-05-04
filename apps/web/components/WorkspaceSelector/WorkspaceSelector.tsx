"use client";

import {
  type ComponentProps,
  type ComponentType,
  Fragment,
  type ReactNode,
  useEffect,
  useState,
} from "react";
import { Button } from "@workspace/ui/components/Button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@workspace/ui/components/Select";
import type { SidebarMenuButton } from "@workspace/ui/components/Sidebar";
import { Avatar } from "@/components/Avatar";
import { SELECTED_WS_ID_COOKIE_KEY } from "@/constants/workspaces";
import type { Workspace } from "@workspace/db";
import Cookies from "js-cookie";
import { ChevronsUpDownIcon, PlusCircle } from "lucide-react";

type SidebarWrapper = {
  component: ComponentType<ComponentProps<typeof SidebarMenuButton>>;
  props?: ComponentProps<typeof SidebarMenuButton>;
};

interface WorkspaceSelectorProps {
  workspaces: Workspace[];
  sidebarMenuButtonWrapper?: SidebarWrapper;
  userId: string;
}

const WorkspaceInfo = ({ workspace }: { workspace: Workspace }) => (
  <div className="flex items-center gap-3">
    <Avatar
      image={workspace.logo}
      fallback={workspace.name}
      size="lg"
      shape="square"
    />
    <div className="flex flex-col items-start">
      <span className="font-medium text-foreground">{workspace.name}</span>
      <span className="text-xs text-muted-foreground">Workspace</span>
    </div>
  </div>
);

export const WorkspaceSelector = ({
  workspaces,
  sidebarMenuButtonWrapper,
  userId,
}: WorkspaceSelectorProps) => {
  const [selectedId, setSelectedId] = useState<string | undefined>(undefined);

  useEffect(() => {
    const savedId = Cookies.get(`${SELECTED_WS_ID_COOKIE_KEY}_${userId}`);

    if (savedId && workspaces.some((w) => w.id === savedId)) {
      setSelectedId(savedId);
    } else if (workspaces.length > 0) {
      setSelectedId(workspaces[0]?.id);
    } else {
      setSelectedId(undefined);
    }
  }, [workspaces, userId]);

  const handleSelect = (id: string) => {
    setSelectedId(id);
    Cookies.set(`${SELECTED_WS_ID_COOKIE_KEY}_${userId}`, id, { expires: 365 });
  };

  const selectedWorkspace = workspaces.find((w) => w.id === selectedId);

  const TriggerWithWrapper = ({ children }: { children: ReactNode }) => {
    if (!sidebarMenuButtonWrapper) return <>{children}</>;

    const { component: Wrapper, props = {} } = sidebarMenuButtonWrapper;
    return <Wrapper {...props}>{children}</Wrapper>;
  };

  return (
    <div className="w-full max-w-xs">
      <Select onValueChange={handleSelect} value={selectedId}>
        <TriggerWithWrapper>
          <SelectTrigger
            data-test-id="workspaces-select"
            className="w-full bg-stone-50 border-gray-200 dark:border-stone-700 !h-11.5 px-2 py-1 *:data-[slot=select-icon]:hidden cursor-pointer focus-visible:ring-0 focus-visible:border-gray-200 data-[placeholder]:text-stone-700 dark:data-[placeholder]:text-foreground"
          >
            <SelectValue placeholder="No workspaces. Create one!">
              {selectedWorkspace && (
                <WorkspaceInfo workspace={selectedWorkspace} />
              )}
            </SelectValue>
            <ChevronsUpDownIcon className="group-data-[collapsible=icon]:hidden" />
          </SelectTrigger>
        </TriggerWithWrapper>
        <SelectContent className="min-w-64">
          {workspaces.map((workspace) => (
            <Fragment key={workspace.id}>
              <SelectItem value={workspace.id} className="h-fit px-2 py-1">
                <WorkspaceInfo workspace={workspace} />
              </SelectItem>
            </Fragment>
          ))}
          {workspaces.length > 0 && (
            <div className="my-1 h-px bg-gray-200 dark:bg-stone-700" />
          )}
          <Button
            variant="ghost"
            className="flex gap-2 items-center cursor-pointer w-full justify-start"
          >
            <PlusCircle className="size-4 text-gray-600" />
            <span className="text-xs text-stone-600">Create workspace</span>
          </Button>
        </SelectContent>
      </Select>
    </div>
  );
};
