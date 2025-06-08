import React from "react";
import { Flag } from "lucide-react";

export const PriorityBadge = () => {
  return (
    <div className="flex gap-1 items-center justify-center text-xs px-2 rounded-full border border-red-500 bg-red-100 text-red-500">
      <Flag className="size-3 fill-red-500" />
      High
    </div>
  );
};
