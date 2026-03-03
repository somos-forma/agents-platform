import React from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

import { ChatInterface } from "@/features/chat/components/chat-interface";
import { useChatStore } from "@/features/chat/store";

export const WorkspaceChat = () => {
  const { closeChatModal } = useChatStore();
  return (
    <Dialog open={true} onOpenChange={closeChatModal}>
      <DialogContent className="sm:max-w-5xl overflow-hidden  p-10">
        <DialogHeader className="sr-only">
          <DialogTitle>Chat</DialogTitle>
          <DialogDescription>
            This is a chat window where you can communicate with your agents.
          </DialogDescription>
        </DialogHeader>
        <ChatInterface />
      </DialogContent>
    </Dialog>
  );
};
