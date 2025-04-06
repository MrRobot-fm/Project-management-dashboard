import { cn } from "@workspace/ui/lib/utils";
import type { ChatMessage } from "@/hooks/use-chat-socket";

interface MessagePillProps {
  message: ChatMessage;
}

export const MessagePill = ({ message }: MessagePillProps) => {
  return (
    <div
      className={cn(
        "max-w-[75%] px-4 py-1.5 rounded-3xl text-sm break-words font-medium bg-blue-400 self-start text-white",
        message.from === "me" &&
          "bg-primary/90 self-end text-primary-foreground",
      )}
    >
      {message.text}
    </div>
  );
};
