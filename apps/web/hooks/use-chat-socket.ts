import { useEffect, useRef, useState } from "react";
import { io, type Socket } from "socket.io-client";

export type ChatMessage = {
  id: string;
  text: string;
  from: "me" | "other";
};

type MessageEvent = {
  message: string;
};

export function useChatSocket() {
  const socketRef = useRef<Socket | null>(null);
  const [messages, setMessages] = useState<ChatMessage[]>([]);

  useEffect(() => {
    const socket = io(process.env.NEXT_PUBLIC_SOCKET_URL);
    socketRef.current = socket;

    const handleReceiveMessage = (data: MessageEvent) => {
      setMessages((prev) => [
        ...prev,
        { id: crypto.randomUUID(), text: data.message, from: "other" },
      ]);
    };

    socket.on("receive_message", handleReceiveMessage);

    return () => {
      socket.off("receive_message", handleReceiveMessage);
      socket.disconnect();
    };
  }, []);

  const sendMessage = (text: string) => {
    if (!text.trim() || !socketRef.current) return;
    socketRef.current.emit("send_message", { message: text });

    setMessages((prev) => [
      ...prev,
      { id: crypto.randomUUID(), text, from: "me" },
    ]);
  };

  return {
    messages,
    sendMessage,
  };
}
