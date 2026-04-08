import { AddTeamMemberDialog } from "@/domains/shared/components/AddTeamMemberDialog";
import { AlertDialog } from "@/domains/shared/components/AlertDialog";
import { CustomDropdown } from "@/domains/shared/components/CustomDropdown";
import { MemberCard } from "@/domains/shared/components/cards/MemberCard/MemberCard";
import { Button } from "@workspace/ui/components/Button";
import { DropdownMenuItem } from "@workspace/ui/components/DropdownMenu";
import { useState } from "react";
// import { removeProjectMember } from "@/services/projects/remove-project-member";
// import type { ProjectMember } from "@/types/models/api-get-project-by-id";
import type { ProjectMember } from "@/domains/shared/types/api-get-project-by-id";
import { IconDotsVertical } from "@tabler/icons-react";
import { Plus } from "lucide-react";

interface ProjectMembersBlockProps {
  members: ProjectMember[];
  workspaceId: string;
  projectId: string;
  onAddMemberClick?: () => void;
}

export const ProjectMembersBlock = ({
  members,
  workspaceId,
  projectId,
  onAddMemberClick
}: ProjectMembersBlockProps) => {
  const [showDialog, setShowDialog] = useState(false);

  return (
    <>
      <div className="flex gap-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 w-full">
          {members.map(member => (
            <MemberCard
              key={member.id}
              member={member}
              projectId={projectId}
              workspaceId={workspaceId}
              hasRole
              endEnchant={
                member.role !== "OWNER" && (
                  <MemberCardMenu member={member} projectId={projectId} />
                )
              }
            />
          ))}
        </div>
      </div>
      {!onAddMemberClick && (
        <AddTeamMemberDialog
          isOpen={showDialog}
          setIsOpen={setShowDialog}
          members={members}
          workspaceId={workspaceId}
          projectId={projectId}
        />
      )}
    </>
  );
};

export const AddTeamMemberButton = ({ onClick }: { onClick: () => void }) => {
  return (
    <Button
      data-test-id="add-team-member-btn"
      variant="ghost"
      size="icon"
      className="cursor-pointer h-8 w-8"
      onClick={onClick}
    >
      <Plus className="size-5" />
    </Button>
  );
};

const MemberCardMenu = (
  {
    // member,
    // projectId,
  }: {
    member: ProjectMember;
    projectId: string;
  }
) => {
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);

  // const [, removeMemberAction, pending] = useActionState(async () => {
  //   if (projectId) {
  //     const response = await removeProjectMember({
  //       projectId: projectId,
  //       userId: member.id,
  //     });

  //     if (response.success && !pending) {
  //       setIsDeleteDialogOpen(false);
  //     }
  //   }
  // }, undefined);

  return (
    <>
      <CustomDropdown
        triggerSlot={
          <Button
            data-test-id="member-card-menu-btn"
            size="icon"
            variant="transparent"
            className="size-fit p-0 -ml-1.5 cursor-pointer"
          >
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
        open={isDeleteDialogOpen}
        onOpenChange={setIsDeleteDialogOpen}
        title="Remove member"
        description="Are you sure you want to remove this member from the project?"
      >
        <form
        // action={removeMemberAction}
        >
          <Button
            variant="destructive"
            className="cursor-pointer min-w-[85px]"
            // disabled={pending}
          >
            {/* {pending ? <Spinner className="text-white" /> : */}
            "Remove"
            {/* } */}
          </Button>
        </form>
      </AlertDialog>
    </>
  );
};
