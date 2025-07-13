"use client";

import { Fragment, useActionState, useState } from "react";
import { Button } from "@workspace/ui/components/Button";
import { DropdownMenuItem } from "@workspace/ui/components/DropdownMenu";
import { Spinner } from "@workspace/ui/components/Spinner";
import { AddTeamMemberDialog } from "@/components/AddTeamMemberDialog";
import { AlertDialog } from "@/components/AlertDialog";
import { CustomDropdown } from "@/components/CustomDropdown";
import { MemberCard } from "@/components/cards/MemberCard/MemberCard";
import { removeProjectMember } from "@/services/projects/remove-project-member";
import type { ProjectMember } from "@/types/models/api-get-project-by-id";
import { IconDotsVertical } from "@tabler/icons-react";
import { Plus } from "lucide-react";

interface ProjectMembersBlockProps {
  members: ProjectMember[];
  workspaceId: string;
  projectId: string;
}

export const ProjectMembersBlock = ({
  members,
  workspaceId,
  projectId,
}: ProjectMembersBlockProps) => {
  const [showDialog, setShowDialog] = useState(false);

  return (
    <div className="rounded-lg border border-neutral-200/70 shadow-neutral-100 shadow-md p-6 flex flex-col gap-4">
      <h2 className="font-medium text-md">Team Members</h2>
      <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-4">
        {members.map((member) => (
          <MemberCard
            key={member.id}
            member={member}
            projectId={projectId}
            workspaceId={workspaceId}
            hasRole
            endEnchant={
              member.role !== "OWNER" && <MemberCardMenu member={member} projectId={projectId} />
            }
          />
        ))}
        <div>
          <Button
            variant="transparent"
            className="cursor-pointer h-full justify-start px-2"
            onClick={() => setShowDialog(true)}
          >
            <div className="p-2 rounded-full bg-neutral-100">
              <Plus />
            </div>
            Add team member
          </Button>
        </div>
      </div>
      <AddTeamMemberDialog
        isOpen={showDialog}
        setIsOpen={setShowDialog}
        members={members}
        workspaceId={workspaceId}
      />
    </div>
  );
};

const MemberCardMenu = ({ member, projectId }: { member: ProjectMember; projectId: string }) => {
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);

  const [, removeMemberAction, pending] = useActionState(async () => {
    if (projectId) {
      const response = await removeProjectMember({
        projectId: projectId,
        userId: member.id,
      });

      if (response.success && !pending) {
        setIsDeleteDialogOpen(false);
      }
    }
  }, undefined);

  return (
    <>
      <CustomDropdown
        triggerSlot={
          <Button size="icon" variant="transparent" className="size-fit p-0 -ml-1.5 cursor-pointer">
            <IconDotsVertical className="size-3.5" />
          </Button>
        }
        contentSlot={
          <DropdownMenuItem asChild>
            <Button
              variant="ghost"
              onClick={() => setTimeout(() => setIsDeleteDialogOpen(true), 200)}
              className="rounded text-xs appearance-none font-medium p-2 h-fit w-full text-rose-500 cursor-pointer focus-visible:ring-0 focus:text-rose-600 focus:bg-rose-50"
            >
              Remove member
            </Button>
          </DropdownMenuItem>
        }
        align="start"
        className="rounded"
      />
      <AlertDialog
        isOpen={isDeleteDialogOpen}
        onOpenChange={setIsDeleteDialogOpen}
        title="Remove member"
        description="Are you sure you want to remove this member from the project?"
        actionSlot={
          <form action={removeMemberAction}>
            <Button
              variant="destructive"
              className="cursor-pointer min-w-[85px]"
              disabled={pending}
            >
              {pending ? <Spinner className="text-white" /> : "Remove"}
            </Button>
          </form>
        }
      />
    </>
  );
};
