import { Bot, Loader2 } from "lucide-react";
import React from "react";

export const ChatTypingIndicator = () => {
  return (
    <div className="flex gap-3 justify-start">
      <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center flex-shrink-0">
        <Bot className="w-4 h-4 text-primary-foreground" />
      </div>
      <div className="bg-card text-card-foreground border border-border rounded-lg p-4">
        <div className="flex items-center gap-2">
          <Loader2 className="w-4 h-4 animate-spin" />
          <span className="text-sm text-muted-foreground">
            Procesando tu consulta...
          </span>
        </div>
      </div>
    </div>
  );
};
