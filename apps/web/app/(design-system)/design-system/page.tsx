"use client";

import { MultipleSelector, type Option } from "@workspace/ui/components/MultipleSelector";
import { avatarsList } from "../constant/avatars";
import { Avatar } from "@/components/Avatar";
import { AvatarStack } from "@/components/AvatarStack";
import { CustomSelect } from "@/components/CustomSelect";
import { UserMenu } from "@/components/UserMenu";
import { WorkspaceSelector } from "@/components/WorkspaceSelector";
import { PriorityBadge } from "@/components/badges/PriorityBadge";
import { StatusBadge } from "@/components/badges/StatusBadge";
import { priorityBadgeData, statusBadgeData } from "@/constants/badges";
import { searchUsers } from "@/services/users/search-users";

const workspaces = [
  {
    id: "1",
    name: "Wolf Pixel",
    logo: "https://github.com/shadcn.png",
    ownerId: "owner1",
    createdAt: new Date("2023-01-01"),
    updatedAt: new Date("2023-01-10"),
  },
  {
    id: "2",
    name: "Cloud Studio",
    logo: "https://github.com/shadcn.png",
    ownerId: "owner2",
    createdAt: new Date("2023-02-01"),
    updatedAt: new Date("2023-02-10"),
  },
  {
    id: "3",
    name: "Dev Space",
    logo: "https://github.com/shadcn.png",
    ownerId: "owner3",
    createdAt: new Date("2023-03-01"),
    updatedAt: new Date("2023-03-10"),
  },
];

const mockSearch = async (value: string): Promise<Option[]> => {
  const res = await searchUsers(value);

  const options: Option[] = res.map((user) => ({
    label: user.name,
    email: user.email,
    logo: user.logo,
    value: user.id,
  }));

  return options;
};

export default function DesignSystemPage() {
  return (
    <div className="h-screen w-full p-4 flex flex-col gap-4">
      <h1 className="text-4xl font-bold mb-4">Design System </h1>
      <section className="space-y-2">
        <h2 className="text-3xl font-bold">Avatar </h2>
        <div className="flex gap-2">
          <Avatar image="https://rickandmortyapi.com/api/character/avatar/8.jpeg" size="xl" />
          <Avatar fallback="Federico Migliore" size="xl" />
        </div>
      </section>
      <section className="space-y-2">
        <h2 className="text-3xl font-bold">Avatar Stack</h2>
        <div>
          <AvatarStack avatars={avatarsList} avatarSize="xl" />
        </div>
      </section>
      <section className="space-y-2">
        <h2 className="text-3xl font-bold">User Menù</h2>
        <div>
          <UserMenu
            user={{
              name: "Federico Migliore",
              logo: "https://github.com/shadcn.png",
              email: "federico@gmail.com",
            }}
            menuItems={[]}
          />
          <UserMenu
            user={{
              name: "Federico Migliore",
              logo: "https://github.com/shadcn.png",
              email: "federico@gmail.com",
            }}
            variant="avatar"
            menuItems={[]}
          />
        </div>
      </section>
      <section className="space-y-2">
        <h2 className="text-3xl font-bold">Workspace Selector</h2>
        <div>
          <WorkspaceSelector workspaces={workspaces} userId="2" />
        </div>
      </section>
      <section className="space-y-2">
        <h2 className="text-3xl font-bold">Custom Select</h2>
        <div className="flex gap-4">
          <CustomSelect
            data={statusBadgeData}
            defaultValue="COMPLETED"
            triggerProps={{ className: "border-none p-0 shadow-none w-fit" }}
            renderItem={({ value }) => <StatusBadge size="md" status={value} />}
            onValueChange={(value) => console.log(value)}
          />
          <CustomSelect
            data={priorityBadgeData}
            defaultValue="LOW"
            triggerProps={{ className: "border-none p-0 shadow-none w-fit" }}
            renderItem={({ value }) => <PriorityBadge priority={value} />}
            onValueChange={(value) => console.log(value)}
          />
        </div>
      </section>
      <section className="space-y-2">
        <h2 className="text-3xl font-bold">Async multiple selector</h2>
        <div className="flex gap-4 max-w-96">
          <MultipleSelector
            placeholder="Search and add members..."
            onSearch={async (value) => {
              const res = await mockSearch(value);
              return res;
            }}
            menuItem={(item) => (
              <div className="flex items-center gap-2">
                <Avatar
                  image={item.logo ?? ""}
                  fallback={item.label}
                  className="rounded-full size-8"
                />
                <div className="flex flex-col">
                  <p>{item.label}</p>
                  <p className="text-xs text-muted-foreground">{item.email}</p>
                </div>
              </div>
            )}
            badgeClassName="bg-transparent text-neutral-600 border !border-neutral-400"
            creatable
          />
        </div>
      </section>
    </div>
  );
}
