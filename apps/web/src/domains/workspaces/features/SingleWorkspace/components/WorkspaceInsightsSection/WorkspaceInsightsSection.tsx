import type {
  RecentActivityItem,
  TeamSnapshotItem
} from "@/domains/workspaces/features/SingleWorkspace";
import { EmptySurfaceMessage } from "./components/EmptySurfaceMessage";
import { RecentActivityList } from "./components/RecentActivityList";
import { SurfaceBlock } from "./components/SurfaceBlock";
import { TeamSnapshotList } from "./components/TeamSnapshotList";

interface WorkspaceInsightsSectionProps {
  workspaceId: string;
  recentActivity: RecentActivityItem[];
  teamSnapshot: TeamSnapshotItem[];
}

export const WorkspaceInsightsSection = ({
  workspaceId,
  recentActivity,
  teamSnapshot
}: WorkspaceInsightsSectionProps) => {
  return (
    <section className="border-t border-neutral-200/70 pt-14">
      <div className="grid gap-8 xl:grid-cols-[minmax(0,1.1fr)_minmax(0,0.9fr)] xl:items-stretch">
        <SurfaceBlock
          eyebrow="Activity"
          title="Recent task movement"
          description="The latest updates across tasks in this workspace."
        >
          {recentActivity.length === 0 ? (
            <EmptySurfaceMessage>
              Recent activity will appear here as soon as tasks start moving.
            </EmptySurfaceMessage>
          ) : (
            <RecentActivityList
              workspaceId={workspaceId}
              items={recentActivity}
            />
          )}
        </SurfaceBlock>

        <div className="border-t border-neutral-200/70 pt-8 xl:h-full xl:border-t-0 xl:border-l xl:pt-0 xl:pl-8">
          <SurfaceBlock
            eyebrow="Team"
            title="Team snapshot"
            description="People appearing across the most projects right now."
          >
            {teamSnapshot.length === 0 ? (
              <EmptySurfaceMessage>
                Add members to projects to build a clearer team overview here.
              </EmptySurfaceMessage>
            ) : (
              <TeamSnapshotList items={teamSnapshot} />
            )}
          </SurfaceBlock>
        </div>
      </div>
    </section>
  );
};
