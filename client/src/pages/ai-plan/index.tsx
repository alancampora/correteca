import React, { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { motion, AnimatePresence } from "framer-motion";
import UserLayout from "@/components/user-layout";

interface Message {
  type: "user" | "system";
  content: string | any;
}

const ChatLikeUI: React.FC = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [message, setMessage] = useState("");
  const [isTyping, setIsTyping] = useState<boolean>(false);

  const handleSendMessage = async () => {
    if (!message.trim()) return;

    setMessages((prev) => [...prev, { type: "user", content: message }]);
    setMessage(""); // Clear input
    setIsTyping(true);

    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/ai-plan/generate`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ goal: message, frequency: 7, intensity: "Easy", trainings: [] }),
      });

      if (!response.ok) throw new Error("Failed to fetch response");

      const data = await response.json();

      // Add system response to chat
      setMessages((prev) => [
        ...prev,
        { type: "system", content: data },
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
    <div id="chat" className="flex flex-col h-full">
      <div id="chat-messages"
        className={
          `${messages.length === 0 ? "" : "flex-1 overflow-y-auto"
          } transition-all duration-700 ease-in-out`}
      >
        {messages.map((msg: Message, index) => (
          <>
            {
              msg.type === "user" &&
              <div key={index} className="bg-stone-100 p-2 rounded-md mb-4">
                {msg.content}
              </div>
            }
            {
              msg.type === "system" &&

              <div className="bg-gray-100 p-2 rounded-md mb-4">
                <p className="font-bold text-lg">Trainning Plan</p>
                <div className="flex flex-wrap gap-2">
                  {msg.content?.plan.map((session: any) =>
                    <div className="bg-white rounded-md p-2">
                      <div className="font-bold">{session.day}</div>
                      <div className="italic">{session.workout}</div>
                      <div className="italic">{session.details}</div>
                    </div>
                  )}

                </div>
              </div>
            }
          </>
        ))}
      </div>
      <div id="chat-input" className="p-5 mx-auto flex flex-row space-x-2 w-full">
        <Input
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Type a message..."
        />
        <Button onClick={handleSendMessage}>Send</Button>
      </div>
    </div>
  )
};

export default ChatLikeUI;
