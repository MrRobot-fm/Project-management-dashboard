import type { ProjectListItem, TeamSnapshotItem } from "./types";

export const buildTeamSnapshot = (
  projects: ProjectListItem[],
): TeamSnapshotItem[] => {
  const memberMap = new Map<string, TeamSnapshotItem>();

  for (const project of projects) {
    for (const member of project.members) {
      const existingMember = memberMap.get(member.id);

      if (existingMember) {
        existingMember.projectCount += 1;
        continue;
      }

      memberMap.set(member.id, {
        id: member.id,
        name: member.name,
        logo: member.logo,
        projectCount: 1,
      });
    }
  }

  return [...memberMap.values()]
    .sort((left, right) => right.projectCount - left.projectCount)
    .slice(0, 4);
};
