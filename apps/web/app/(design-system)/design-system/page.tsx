import React from "react";
import { avatarsList } from "../constant/avatars";
import { Avatar } from "@/components/Avatar";
import { AvatarStack } from "@/components/AvatarStack";
import { UserMenu } from "@/components/UserMenu";
import { WorkspaceSelector } from "@/components/WorkspaceSelector";

const workspaces = [
  { id: "1", name: "Wolf Pixel", logo: "https://github.com/shadcn.png" },
  { id: "2", name: "Cloud Studio", logo: "https://github.com/shadcn.png" },
  { id: "3", name: "Dev Space", logo: "https://github.com/shadcn.png" },
];

export default function DesignSystemPage() {
  return (
    <div className="h-screen w-full p-4 flex flex-col gap-4">
      <h1 className="text-4xl font-bold mb-4">Design System </h1>
      <section className="space-y-2">
        <h2 className="text-3xl font-bold">Avatar </h2>
        <div className="flex gap-2">
          <Avatar
            image="https://rickandmortyapi.com/api/character/avatar/8.jpeg"
            size="xl"
          />
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
              avatar: "https://github.com/shadcn.png",
              email: "federico@gmail.com",
            }}
            menuItems={[]}
          />
          <UserMenu
            user={{
              name: "Federico Migliore",
              avatar: "https://github.com/shadcn.png",
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
          <WorkspaceSelector workspaces={workspaces} />
        </div>
      </section>
    </div>
  );
}
