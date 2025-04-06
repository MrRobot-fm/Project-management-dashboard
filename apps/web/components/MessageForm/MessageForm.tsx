import type { FormEvent } from "react";
import { Button } from "@workspace/ui/components/Button";
import { Input } from "@workspace/ui/components/Input";
import { SendHorizontal } from "lucide-react";

interface MessageFormProps {
  handleSubmit: (e: FormEvent<HTMLFormElement>) => void;
  message: string;
  setMessage: (message: string) => void;
}

export const MessageForm = ({
  handleSubmit,
  message,
  setMessage,
}: MessageFormProps) => {
  return (
    <form
      onSubmit={handleSubmit}
      className="pt-4 flex gap-2 items-center absolute bottom-4 left-6 right-6"
    >
      <Input
        placeholder="Write a message..."
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        className="flex-1 py-2 px-5 rounded-full border border-gray-300 focus:outline-none bg-white text-sm"
      />
      <Button
        type="submit"
        size="icon"
        className="opacity-90 rounded-full"
        disabled={!message.trim()}
      >
        <SendHorizontal />
      </Button>
    </form>
  );
};
