"use client";

import { type FormEvent, useEffect, useState } from "react";
import { Button } from "@workspace/ui/components/Button";
import { cn } from "@workspace/ui/lib/utils";
import { io } from "socket.io-client";

const socket = io("http://localhost:8001");

type ChatMessage = {
  text: string;
  from: "me" | "other";
};

export default function Messages() {
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState<ChatMessage[]>([]);

  const sendMessage = (e: FormEvent) => {
    if (!message.trim()) return;
    e.preventDefault();
    socket.emit("send_message", { message });
    setMessages((prev) => [...prev, { text: message, from: "me" }]);
    setMessage("");
  };

  useEffect(() => {
    socket.on("receive_message", (data) => {
      setMessages((prev) => [...prev, { text: data.message, from: "other" }]);
    });

    return () => {
      socket.off("receive_message");
    };
  }, []);

  return (
    <div className="h-full flex flex-col p-4 relative">
      <div className="flex-1 overflow-y-auto flex flex-col space-y-2 px-2">
        {messages.map((msg, index) => (
          <div
            key={index}
            className={cn(
              "max-w-[75%] px-4 py-1.5 rounded-3xl text-sm break-words font-medium bg-blue-400 self-start text-white",
              msg.from === "me" && "bg-primary/90 self-end text-white",
            )}
          >
            {msg.text}
          </div>
        ))}
      </div>
      <form
        onSubmit={sendMessage}
        className="pt-4 flex gap-2 items-center absolute bottom-4 left-6 right-6"
      >
        <input
          placeholder="Write a message..."
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          className="flex-1 py-2 px-5 rounded-full border border-gray-300 focus:outline-none bg-white text-sm"
        />
        <Button type="submit" className="opacity-90" disabled={!message}>
          Send
        </Button>
      </form>
    </div>
  );
}
