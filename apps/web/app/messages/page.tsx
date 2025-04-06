"use client";

import { type FormEvent, useEffect, useRef, useState } from "react";
import { MessageForm } from "@/components/MessageForm/MessageForm";
import { MessagePill } from "@/components/MessagePill/MessagePill";
import { useChatSocket } from "@/hooks/use-chat-socket";

export default function Messages() {
  const [message, setMessage] = useState("");
  const { messages, sendMessage } = useChatSocket();

  const messagesEndRef = useRef<HTMLDivElement>(null);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!message.trim()) return;
    sendMessage(message);
    setMessage("");
  };

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  return (
    <div className="h-full flex flex-col p-4 relative">
      <div className="flex-1 overflow-y-auto flex flex-col space-y-2 px-2 pb-12">
        {messages.map((message) => (
          <MessagePill key={message.id} message={message} />
        ))}
        <div ref={messagesEndRef} />
      </div>
      <MessageForm
        handleSubmit={handleSubmit}
        message={message}
        setMessage={setMessage}
      />
    </div>
  );
}
