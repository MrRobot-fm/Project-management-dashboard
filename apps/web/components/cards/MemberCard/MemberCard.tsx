import { Avatar } from "@/components/Avatar";
import { RoleBadge } from "@/components/badges/RoleBadge";
import type { ProjectMember } from "@/types/models/api-get-project-by-id";

interface MemberCardProps {
  member: ProjectMember;
  hasRole?: boolean;
}

export const MemberCard = ({ member, hasRole = false }: MemberCardProps) => {
  return (
    <div className="flex items-center gap-2 border border-neutral-200 rounded-lg p-3">
      <Avatar
        size="xl"
        image={member.logo}
        fallback={member.name}
        className="border-none bg-neutral-100"
      />
      <div className="flex flex-col">
        <p className="text-sm font-medium">{member.name}</p>
        <p className="text-xs text-neutral-600">{member.email}</p>
      </div>
      {hasRole && <RoleBadge role={member.role} className="ml-auto" />}
    </div>
  );
};
