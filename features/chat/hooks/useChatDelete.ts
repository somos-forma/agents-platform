import React from "react";
import { deleteChat } from "../services/chat";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export const useChatDelete = () => {
  const queryClient = useQueryClient();
  const mutation = useMutation({
    mutationFn: async (chatId: string) => {
      return deleteChat(chatId);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["chatConversations"] });
    },
    onError: (error) => {
      console.error("Error deleting chat:", error);
    },
  });
  return mutation;
};
