import { useMutation } from "@tanstack/react-query";
import { createNewChat } from "../services/chat";
interface CreateChatParams {
  userId: string;
  agentId: string;
  workspaceId: string;
}

export const useCreateChat = () => {
  const mutation = useMutation({
    mutationFn: async ({ userId, agentId, workspaceId }: CreateChatParams) => {
      const data = await createNewChat(userId, agentId, workspaceId);
      return data;
    },
  });

  return mutation;
};
