import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createNewChat, sendMessage } from "../services/chat";
import { useChatStore } from "../store";
import { useCreateChat } from "./useCreateChat";

export const useChatMessage = () => {
  const {
    user,
    agent,
    chatId,
    setIsLoading,
    isLoading,
    addMessage,
    addMessages,
    messages,
    workspace,
    setChatId,
  } = useChatStore();

  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: async (value: { message: string; attachments?: File[] }) => {
      setIsLoading(true);
      addMessage({
        content: value.message,
        attachments: value.attachments,
        role: "human",
        timestamp: new Date(),
      });

      return sendMessage(
        chatId,
        value.message,
        value.attachments,
        agent?.path!
      );
    },
    onSuccess(data) {
      addMessages(data);
      queryClient.invalidateQueries({ queryKey: ["chatConversations"] });
    },
    onError(error) {
      console.error("Error sending chat message:", error);
    },
    onSettled() {
      setIsLoading(false);
    },
  });
  return {
    agent,
    isPending: mutation.isPending,
    sendMessage: mutation.mutate,
    isLoading,
    messages,
    workspace,
    user,
    chatId,
    setChatId,
  };
};
