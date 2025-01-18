import React, { useEffect, useRef, useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { motion, AnimatePresence } from "framer-motion";
import UserLayout from "@/components/user-layout";
import { useAuth } from "@/context/auth";

interface Message {
  role: "user" | "assistant";
  content: string | any;
}

const ChatLikeUI: React.FC = () => {
  const { user } = useAuth();
  const [messages, setMessages] = useState<Message[]>([]);
  const [message, setMessage] = useState("");
  const [isTyping, setIsTyping] = useState<boolean>(false);

  // Ref to track the bottom of the chat
  const messagesEndRef = useRef<HTMLDivElement | null>(null);

  // Function to scroll to the bottom
  const scrollToBottom = () => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  };

  // Scroll to the bottom whenever messages change
  useEffect(() => {
    scrollToBottom();
  }, [messages, isTyping]);

  const handleSendMessage = async () => {
    if (!message.trim()) return;

    const userMessage: Message = { role: "user", content: message };

    setMessages((prev) => [...prev, userMessage]);
    console.log({ messages });
    setMessage(""); // Clear input
    setIsTyping(true);

    try {
      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/ai-plan/generate`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            userId: user._id,
            messages,
          }),
        },
      );

      if (!response.ok) throw new Error("Failed to fetch response");

      const data = await response.json();

      // Add system response to chat
      setMessages((prev) => [...prev, { role: "assistant", content: data }]);
    } catch (error) {
      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          content: "Sorry, something went wrong. Try again.",
        },
      ]);
    } finally {
      setIsTyping(false);
    }
  };

  if (!user) {
    return;
  }

  return (
    <div id="chat" className="flex flex-col h-full p-4 mx-auto">
      {messages.length === 0 && (
        <p className="text-center text-2xl font-bold">
          Let’s craft your running journey together! Tell me your Running goals.
        </p>
      )}

      <div
        id="chat-messages"
        className={`${
          messages.length === 0 ? "" : "flex-1 overflow-y-auto"
        } transition-all duration-700 ease-in-out`}
      >
        {messages.map((msg: Message, index) => (
          <>
            {msg.role === "user" && (
              <div key={index} className="bg-stone-100 p-2 rounded-md mb-4">
                {msg.content}
              </div>
            )}
            {msg.role === "assistant" && (
              <div className="bg-gray-100 p-2 rounded-md mb-4">
                <p className="font-bold text-lg">Trainning Plan</p>
                <div className="flex flex-wrap gap-2">
                  <p>{msg.content?.recommendation}</p>
                  {msg.content?.sessions.map((session: any) => (
                    <div className="bg-white rounded-md p-2">
                      <div className="font-bold">{session.day}</div>
                      <div className="italic">{session.workout}</div>
                      <div className="italic">{session.details}</div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </>
        ))}
        {isTyping && (
          <div className="bg-gray-100 p-2 rounded-md mb-4 animate-pulse">
            <p className="italic text-gray-500">
              Please wait while we generate your plan...
            </p>
          </div>
        )}

        {/* Dummy div to ensure scrolling */}
        <div ref={messagesEndRef}></div>
      </div>
      <div
        id="chat-input"
        className="p-5 mx-auto flex flex-row space-x-2 w-full"
      >
        <Input
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Type a message..."
        />
        <Button onClick={handleSendMessage}>Send</Button>
      </div>
    </div>
  );
};

export default ChatLikeUI;
