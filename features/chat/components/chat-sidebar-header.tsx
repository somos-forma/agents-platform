import { Bot } from "lucide-react";
import React from "react";
import { useChatMessage } from "../hooks/useChatMessage";

export const ChatSidebarHeader = () => {
  const { agent, workspace } = useChatMessage();

  return (
    <div className="border-b px-2 py-4">
      <div className="flex justify-between items-center">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center shrink-0">
            <Bot className="w-4 h-4 text-primary-foreground" />
          </div>
          <div>
            <h1 className="font-semibold text-foreground">{agent?.name}</h1>
            <p className="text-sm text-muted-foreground">
              Workspace: {workspace?.name}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
