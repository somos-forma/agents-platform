import React from "react";
import { ChatSidebar } from "./chat-sidebar";
import { ChatArea } from "./chat-area";

export const ChatInterface = () => {
  return (
    <div className="flex flex-grow gap-2 h-[calc(100vh-13rem)]">
      <ChatSidebar />
      <ChatArea />
    </div>
  );
};
