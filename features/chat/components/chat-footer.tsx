import React from "react";
import { ChatMessageInput } from "./chat-message-input";

export const ChatFooter = () => {
  return (
    <div className="border-t border-border p-4">
      <ChatMessageInput />
    </div>
  );
};
