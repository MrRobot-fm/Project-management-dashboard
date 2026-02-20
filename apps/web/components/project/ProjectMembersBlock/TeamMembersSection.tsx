"use client";

import { useState } from "react";
import { AddTeamMemberButton, ProjectMembersBlock } from "./ProjectMembersBlock";
import { AddTeamMemberDialog } from "@/components/AddTeamMemberDialog";
import type { ProjectMember } from "@/types/models/api-get-project-by-id";

interface TeamMembersSectionProps {
  members: ProjectMember[];
  workspaceId: string;
  projectId: string;
}

export const TeamMembersSection = ({
  members,
  workspaceId,
  projectId,
}: TeamMembersSectionProps) => {
  const [showDialog, setShowDialog] = useState(false);

  return (
    <>
      <div className="h-full rounded-lg bg-white p-2 flex flex-col min-h-0">
        <div className="flex items-center justify-between mb-6 flex-shrink-0">
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-emerald-500 shrink-0" aria-hidden />
            <h2 className="text-base font-semibold text-neutral-900">Team Members</h2>
          </div>
          <AddTeamMemberButton onClick={() => setShowDialog(true)} />
        </div>
        <div className="flex-1 min-h-0 overflow-y-auto">
          <ProjectMembersBlock members={members} workspaceId={workspaceId} projectId={projectId} />
        </div>
      </div>
      <AddTeamMemberDialog
        isOpen={showDialog}
        setIsOpen={setShowDialog}
        members={members}
        workspaceId={workspaceId}
        projectId={projectId}
      />
    </>
  );
};
