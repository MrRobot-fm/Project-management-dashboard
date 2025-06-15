import { Button } from "@workspace/ui/components/Button";
import { MemberCard } from "@/components/cards/MemberCard/MemberCard";
import type { ProjectMember } from "@/types/models/api-get-project-by-id";
import { Plus } from "lucide-react";

interface ProjectMembersBlockProps {
  members: ProjectMember[];
}

export const ProjectMembersBlock = ({ members }: ProjectMembersBlockProps) => {
  return (
    <div className="rounded-md border border-neutral-100 shadow p-6 flex flex-col gap-2">
      <h2 className="font-medium text-md">Team Members</h2>

      <div className="grid grid-cols-1 xl:grid-cols-2 gap-4">
        {members.map((member) => (
          <MemberCard key={member.id} member={member} hasRole />
        ))}
        <div>
          <Button variant="transparent" className="cursor-pointer h-full justify-start px-2">
            <div className="p-2 rounded-full bg-neutral-100">
              <Plus />
            </div>
            Add team member
          </Button>
        </div>
      </div>
    </div>
  );
};
