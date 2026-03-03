import React, { useState } from "react";
import { ChatSidebarConversationsItem } from "./chat-sidebar-conversations-item";
import { Lock } from "lucide-react";
import { useChatConversations } from "../hooks/useChatConversations";
import { Skeleton } from "@/components/ui/skeleton";
import { useChatStore } from "../store";
import { ChatDeleteModal } from "./chat-delete-modal";

export const ChatSidebarConversations = () => {
  const { conversations, isLoading, error } = useChatConversations();
  const { setChatId, addMessages, openDeleteModal, isOpenDeleteModal } =
    useChatStore();

  if (isLoading) {
    return (
      <div className="flex-1  flex flex-col gap-2">
        {Array.from({ length: 4 }).map((_, index) => (
          <Skeleton className="w-full h-11" key={index} />
        ))}
      </div>
    );
  }

  if (error || conversations.length === 0) {
    return (
      <div className="h-full flex justify-center items-center">
        <div className="text-sm text-center text-muted-foreground mt-4 ">
          No hay conversaciones disponibles.
        </div>
      </div>
    );
  }

  const handleChatSelect = (conversation: any) => {
    setChatId(String(conversation.id));
    addMessages(conversation.messages);
  };

  // if (conversations.length === 0) {
  //   return (
  //     <div className="h-full flex justify-center items-center">
  //       <div className="text-sm text-center text-muted-foreground mt-4 ">
  //         No hay conversaciones disponibles.
  //       </div>
  //     </div>
  //   );
  // }

  return (
    <div className="flex-1  flex flex-col gap-2 ">
      {conversations.map((conversation: any, index: number) => {
        // if (!conversation.chat_name) return;
        return (
          <ChatSidebarConversationsItem
            key={conversation.id}
            name={conversation.chat_name}
            lastMessage={
              conversation.messages[conversation.messages.length - 2]?.content
            }
            onClick={() => handleChatSelect(conversation)}
            onDelete={() => openDeleteModal(String(conversation.id))}
          />
        );
      })}

      {isOpenDeleteModal && <ChatDeleteModal />}

      {/* <div className="absolute inset-0 bg-sidebar/50 backdrop-blur-sm flex justify-center items-center">
        <div className="text-center  text-foreground flex justify-center flex-col items-center gap-2">
          <Lock className="text-foreground" />
          <p>El historial de conversaciones no está disponible.</p>
        </div>
      </div> */}
    </div>
  );
};
