import { Avatar } from "@/domains/shared/components/Avatar";
import type { TeamSnapshotItem } from "@/domains/workspaces/features/SingleWorkspace";

interface TeamSnapshotListProps {
  items: TeamSnapshotItem[];
}

export const TeamSnapshotList = ({ items }: TeamSnapshotListProps) => {
  return (
    <div className="divide-y divide-neutral-200/70">
      {items.map(member => (
        <div
          key={member.id}
          className="flex items-center justify-between gap-3 px-4 py-4"
        >
          <div className="flex min-w-0 items-center gap-3">
            <Avatar image={member.logo} fallback={member.name} size="lg" />
            <div className="min-w-0">
              <p className="truncate text-sm font-medium text-neutral-900">
                {member.name}
              </p>
              <p className="text-xs text-neutral-500">
                Active across {member.projectCount} project
                {member.projectCount === 1 ? "" : "s"}
              </p>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};
