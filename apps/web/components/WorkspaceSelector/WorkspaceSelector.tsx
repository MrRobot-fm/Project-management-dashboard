"use client";

import {
  type ComponentProps,
  type ComponentType,
  Fragment,
  type ReactNode,
  useEffect,
  useMemo,
  useState,
} from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@workspace/ui/components/Select";
import type { SidebarMenuButton } from "@workspace/ui/components/Sidebar";
import { Avatar } from "@/components/Avatar";
import {
  ALL_WORKSPACES_ID,
  allWorkspacesOption,
  SELECTED_WS_ID_COOKIE_KEY,
} from "@/constants/workspaces";
import type { AllWorkspaces } from "@/types/models/api-get-workspaces";
import type { Workspace } from "@workspace/db";
import Cookies from "js-cookie";
import { ChevronsUpDownIcon } from "lucide-react";

type SidebarWrapper = {
  component: ComponentType<ComponentProps<typeof SidebarMenuButton>>;
  props?: ComponentProps<typeof SidebarMenuButton>;
};

interface WorkspaceSelectorProps {
  workspaces: Workspace[];
  sidebarMenuButtonWrapper?: SidebarWrapper;
  userId: string;
}

const WorkspaceInfo = ({
  workspace,
}: {
  workspace: Workspace | AllWorkspaces;
}) => (
  <div className="flex items-center gap-3">
    <Avatar
      image={workspace?.logo}
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
  const [selectedId, setSelectedId] = useState<string>(ALL_WORKSPACES_ID);

  const options = useMemo(
    () => [allWorkspacesOption, ...workspaces],
    [workspaces],
  );

  useEffect(() => {
    const savedWorkspace = Cookies.get(
      `${SELECTED_WS_ID_COOKIE_KEY}_${userId}`,
    );

    if (savedWorkspace && options.some((w) => w.id === savedWorkspace)) {
      setSelectedId(savedWorkspace);
    }
  }, [options, userId]);

  const handleSelect = (id: string) => {
    setSelectedId(id);
    Cookies.set(`${SELECTED_WS_ID_COOKIE_KEY}_${userId}`, id, { expires: 365 });
  };

  const selectedWorkspace = useMemo(() => {
    return options.find((w) => w.id === selectedId) ?? allWorkspacesOption;
  }, [selectedId, options]);

  const TriggerWithWrapper = ({ children }: { children: ReactNode }) => {
    if (!sidebarMenuButtonWrapper) return <>{children}</>;

    const { component: WrapperComponent, props = {} } =
      sidebarMenuButtonWrapper;

    return <WrapperComponent {...props}>{children}</WrapperComponent>;
  };

  return (
    <div className="w-full max-w-xs">
      <Select onValueChange={handleSelect} value={selectedId}>
        <TriggerWithWrapper>
          <SelectTrigger
            data-test-id="workspaces-select"
            className="w-full bg-stone-50 border-gray-200 dark:border-stone-700 !h-fit px-2 py-1 *:data-[slot=select-icon]:hidden cursor-pointer focus-visible:ring-0 ring-0 focus-visible:border-gray-200"
          >
            <SelectValue>
              <WorkspaceInfo workspace={selectedWorkspace} />
            </SelectValue>
            <ChevronsUpDownIcon className="group-data-[collapsible=icon]:hidden" />
          </SelectTrigger>
        </TriggerWithWrapper>
        <SelectContent className="min-w-64">
          {options.map((workspace, index) => (
            <Fragment key={workspace.id}>
              {index === 1 && (
                <div className="my-1 h-px bg-gray-200 dark:bg-stone-700" />
              )}
              <SelectItem value={workspace.id} className="h-fit px-2 py-1">
                <WorkspaceInfo workspace={workspace} />
              </SelectItem>
            </Fragment>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
};
