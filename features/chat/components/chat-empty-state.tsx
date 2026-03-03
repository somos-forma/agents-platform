import { Bot } from "lucide-react";
import React from "react";
interface ChatEmptyStateProps {
  agentName?: string;
}
export const ChatEmptyState = ({ agentName }: ChatEmptyStateProps) => {
  return (
    <div className="flex-1 flex items-center justify-center p-8">
      <div className="text-center max-w-md">
        <div className="w-16 h-16 rounded-full bg-muted flex items-center justify-center mx-auto mb-4">
          <Bot className="w-8 h-8 text-muted-foreground" />
        </div>
        <h2 className="text-xl font-semibold text-foreground mb-2">
          Inicia una conversación con el {agentName}
        </h2>
        <p className="text-muted-foreground">
          Escribe tu mensaje abajo para comenzar
        </p>
      </div>
    </div>
  );
};
