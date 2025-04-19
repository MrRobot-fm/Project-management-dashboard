import React from "react";
import { avatarsList } from "../constant/avatars";
import { Avatar } from "@/components/Avatar";
import { AvatarStack } from "@/components/AvatarStack";

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
    </div>
  );
}
