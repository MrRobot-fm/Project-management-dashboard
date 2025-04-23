"use client";

import { useEffect, useMemo, useState, Fragment } from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@workspace/ui/components/Select";
import { SidebarMenuButton } from "@workspace/ui/components/Sidebar";
import { Avatar } from "../Avatar";
import {
  ALL_WORKSPACES_ID,
  allWorkspacesOption,
  SELECTED_WS_COOKIE_KEY,
} from "@/constants/workspaces";
import Cookies from "js-cookie";
import { ChevronsUpDownIcon } from "lucide-react";

interface Workspace {
  id: string;
  name: string;
  logo: string;
}

interface WorkspaceSelectorProps {
  workspaces: Workspace[];
}

const WorkspaceInfo = ({ workspace }: { workspace: Workspace }) => (
  <div className="flex items-center gap-3">
    <Avatar image={workspace.logo} size="lg" className="rounded" />
    <div className="flex flex-col items-start">
      <span className="font-medium text-foreground">{workspace.name}</span>
      <span className="text-sm text-muted-foreground">Workspace</span>
    </div>
  </div>
);

export const WorkspaceSelector = ({ workspaces }: WorkspaceSelectorProps) => {
  const options = useMemo(
    () => [allWorkspacesOption, ...workspaces],
    [workspaces],
  );

  const [selectedId, setSelectedId] = useState<string>(ALL_WORKSPACES_ID);

  useEffect(() => {
    const savedWorkspace = Cookies.get(SELECTED_WS_COOKIE_KEY);

    if (savedWorkspace && options.some((w) => w.id === savedWorkspace)) {
      setSelectedId(savedWorkspace);
    }
  }, [options]);

  const handleSelect = (id: string) => {
    setSelectedId(id);
    Cookies.set(SELECTED_WS_COOKIE_KEY, id, { expires: 365 });
  };

  const selectedWorkspace = useMemo(() => {
    return options.find((w) => w.id === selectedId) ?? allWorkspacesOption;
  }, [selectedId, options]);

  return (
    <div className="w-full max-w-xs">
      <Select onValueChange={handleSelect} value={selectedId}>
        <SidebarMenuButton size="lg" asChild>
          <SelectTrigger className="w-full bg-stone-50 border-gray-200 dark:border-stone-700 !h-fit px-2 py-1 *:data-[slot=select-icon]:hidden cursor-pointer focus-visible:ring-0 ring-0 focus-visible:border-gray-200">
            <SelectValue>
              <WorkspaceInfo workspace={selectedWorkspace} />
            </SelectValue>
            <ChevronsUpDownIcon className="group-data-[collapsible=icon]:hidden" />
          </SelectTrigger>
        </SidebarMenuButton>
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
