// import { SidebarTrigger } from "@/components/ui/sidebar";
import { Bot } from "lucide-react";
import React from "react";
import { useChatMessage } from "../hooks/useChatMessage";

export const ChatHeader = () => {
  const { agent } = useChatMessage();

  return (
    <div className="border-b border-border p-4">
      <div className="flex items-center gap-3">
        {/* <SidebarTrigger className="-ml-1" /> */}
        <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center">
          <Bot className="w-4 h-4 text-primary-foreground" />
        </div>
        <div>
          <h1 className="font-semibold text-foreground">
            Chat con agente {agent?.name}
          </h1>
          <p className="text-sm text-muted-foreground">
            {`Descripción del agente ${agent?.name}`}
          </p>
        </div>
      </div>
    </div>
  );
};
