"use client";
import { useQuery } from "@tanstack/react-query";
import { getChatConversations } from "../services/chat";
import { useChatStore } from "../store";

export const useChatConversations = () => {
  const userId = useChatStore((state) => state.user?.id!);
  const agentId = useChatStore((state) => state.agent?.id!);
  const workspaceId = useChatStore((state) => state.workspace?.id!);

  const { data, isLoading, error } = useQuery({
    queryKey: ["chatConversations", userId, agentId, workspaceId],
    queryFn: async () => {
      return getChatConversations(userId, agentId, workspaceId);
    },
    enabled: !!userId && !!agentId && !!workspaceId,
    staleTime: 0,
    retry: 1,
  });

  return { conversations: data || [], isLoading, error };
};
