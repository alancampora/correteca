import React, { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { motion, AnimatePresence } from "framer-motion";
import UserLayout from "@/components/user-layout";
import ScrollToBottom from 'react-scroll-to-bottom';
import { User } from "lucide-react";

interface Message {
  type: "user" | "system";
  content: string;
}

const ChatLikeUI: React.FC = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [message, setMessage] = useState("");
  const [isTyping, setIsTyping] = useState<boolean>(false);

  const handleSendMessage = async () => {
    if (!message.trim()) return;

    // Add user message to chat
    setMessages((prev) => [...prev, { type: "user", content: message }]);
    setMessage(""); // Clear input
    setIsTyping(true);

    // Simulate system response
    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/chat`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message }),
      });

      if (!response.ok) throw new Error("Failed to fetch response");

      const data = await response.json();

      // Add system response to chat
      setMessages((prev) => [
        ...prev,
        { type: "system", content: data.response },
      ]);
    } catch (error) {
      setMessages((prev) => [
        ...prev,
        { type: "system", content: "Sorry, something went wrong. Try again." },
      ]);
    } finally {
      setIsTyping(false);
    }
  };

  return (
    <UserLayout title="Smart Runner">
      <div id="chat" className="h-full flex flex-col">
        <div id="chat-messages" className={messages.length === 0 ? "" : "flex-grow"}>
          {messages.map((msg: Message, index) => (
            <div>
              {msg.content}
            </div>
          ))}
        </div>
        <div id="chat-input"
          className="flex flex-row items-center space-x-2 p-4 mx-auto">
          <Input
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="Type a message..."
          />
          <Button onClick={handleSendMessage}>Send</Button>
        </div>
      </div>
    </UserLayout>
  )
};

export default ChatLikeUI;