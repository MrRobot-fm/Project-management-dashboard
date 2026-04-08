import type { ReactNode } from "react";
import { Avatar } from "@/domains/shared/components/Avatar";
import { CustomSelect } from "@/domains/shared/components/CustomSelect";
import { RoleBadge } from "@/domains/shared/components/badges/RoleBadge";
import { roleBadgeData } from "@/domains/shared/constants/badges";
import { changeMemberRole } from "@/services/projects/change-member-role";
import type { ProjectMember } from "@/types/models/api-get-project-by-id";

interface MemberCardProps {
  member: ProjectMember;
  hasRole?: boolean;
  projectId?: string;
  workspaceId?: string;
  endEnchant: ReactNode;
}

export const MemberCard = ({
  member,
  hasRole = false,
  workspaceId,
  projectId,
  endEnchant
}: MemberCardProps) => {
  return (
    <div
      data-test-id="member-card"
      className="flex items-center gap-2 border border-neutral-200 rounded-lg p-3"
    >
      <Avatar
        size="xl"
        image={member.logo}
        fallback={member.name}
        className="border-none bg-neutral-100"
      />
      <div className="flex flex-col overflow-hidden">
        <p className="text-sm font-medium truncate">{member.name}</p>
        <p className="text-xs text-neutral-600 truncate">{member.email}</p>
      </div>
      {hasRole &&
        (member.role === "OWNER" ? (
          <RoleBadge role="OWNER" className="ml-auto" />
        ) : (
          <CustomSelect
            data={roleBadgeData}
            defaultValue={member.role}
            onValueChange={async role => {
              if (projectId && workspaceId) {
                await changeMemberRole({
                  role,
                  projectId: projectId,
                  userId: member.id,
                  workspaceId: workspaceId
                });
              }
            }}
            triggerProps={{
              className:
                "ml-auto w-fit justify-between. gap-px focus:border-neutral-300 bg-white border-none shadow-none p-0 data-[size=default]:h-fit"
            }}
            contentProps={{ className: "w-[180px]" }}
            renderItem={({ value }) => <RoleBadge role={value} />}
            itemProps={{ className: "focus:bg-transparent" }}
          />
        ))}
      {endEnchant}
    </div>
  );
};
