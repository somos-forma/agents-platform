import React, { use } from "react";
import { ChatSidebarHeader } from "./chat-sidebar-header";
import { ChatSidebarConversations } from "./chat-sidebar-conversations";
import { MessageSquare, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useCreateChat } from "../hooks/useCreateChat";
import Cookies from "js-cookie";
import { useChatStore } from "../store";
import { Spinner } from "@/components/ui/spinner";

export const ChatSidebar = () => {
  const createNewChat = useCreateChat();
  const userId = Cookies.get("user-id");
  const agentId = useChatStore((state) => state.agent?.id);
  const workspaceId = useChatStore((state) => state.workspace?.id);
  const setChatId = useChatStore((state) => state.setChatId);
  const addMessages = useChatStore((state) => state.addMessages);

  const handleNewChat = () => {
    setChatId("");
    addMessages([]);
  };

  return (
    <div className=" flex flex-col bg-sidebar border rounded-xl w-80">
      <ChatSidebarHeader />
      <div className="px-2 py-4">
        <Button
          className="w-full"
          disabled={createNewChat.isPending}
          onClick={handleNewChat}
        >
          {createNewChat.isPending ? <Spinner /> : <Plus />}
          Nueva conversación
        </Button>
      </div>
      <div className="px-2 ">
        <p className="flex gap-2 items-center text-muted-foreground mb-2">
          <MessageSquare size={16} />
          Historial
        </p>
      </div>

      <div className="px-2 py-4 overflow-y-auto scrollbar-thin scrollbar-thumb-rounded scrollbar-thumb-muted">
        <ChatSidebarConversations />
      </div>
    </div>
  );
};
3;
