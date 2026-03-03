import { useChatStore } from "../store";

export const useSelectChat = () => {
  const { addMessages, setChatId } = useChatStore();
  return {
    setChatId,
    addMessages,
  };
};
