"use client";
import React from "react";
import { ChatAgentMessageBubble } from "./chat-agent-message-bubble";
import { ChatUserMessageBubble } from "./chat-user-message-bubble";
import { ChatEmptyState } from "./chat-empty-state";
import { ChatTypingIndicator } from "./chat-typing-indicator";

import { useChatMessage } from "../hooks/useChatMessage";
import { ChatMessageBubble } from "./chat-message-bubble";

export const ChatMessages = () => {
  // const { messages, isLoading, agent } = useChat();
  const { messages, isLoading, agent } = useChatMessage();

  return (
    <div className=" overflow-y-auto scrollbar-thin">
      {/* empty state */}
      {messages.length === 0 && <ChatEmptyState agentName={agent?.name} />}

      <div className="space-y-6 p-6">
        {messages.map((message, index) => (
          // message.role === "human" ? (
          //   <ChatUserMessageBubble
          //     key={index}
          //     message={message.content}
          //     timestamp={message.timestamp}
          //   />
          // ) : (
          //   <ChatAgentMessageBubble
          //     key={index}
          //     message={message.content}
          //     timestamp={message.timestamp}
          //   />
          // )
          <ChatMessageBubble key={index} message={message} />
        ))}
        {isLoading && <ChatTypingIndicator />}
      </div>
    </div>
  );
};
