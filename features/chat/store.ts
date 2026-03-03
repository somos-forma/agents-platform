import { create } from "zustand";
import { devtools } from "zustand/middleware";

interface User {
  id: string;
}
interface Workspace {
  id: string;
  name: string;
}
interface Agent {
  id: string;
  name: string;
  description: string;
  path: string;
  supportsFiles?: boolean;
}

interface Message {
  role: "human" | "ai";
  timestamp: Date;
  content: string;
  attachments?: File[];
}

interface ChatState {
  chatId: string;
  user: User | null;
  workspace: Workspace | null;
  agent: Agent | null;
  messages: Message[];
  isLoading: boolean;
  isOpenChatModal: boolean;
  chatIdDelete: string;
  isOpenDeleteModal: boolean;
  openDeleteModal: (chatId: string) => void;
  closeDeleteModal: () => void;
  openChatModal: ({
    user,
    workspace,
    agent,
  }: // chatId,
  {
    user: User;
    workspace: Workspace;
    agent: Agent;
    // chatId: string;
  }) => void;
  setChatId: (id: string) => void;
  closeChatModal: () => void;
  addMessage: (message: Message) => void;
  addMessages: (messages: Message[]) => void;
  setIsLoading: (loading: boolean) => void;
  reset: () => void;
}

export const useChatStore = create<ChatState>()(
  devtools(
    (set) => ({
      chatId: "",
      user: null,
      workspace: null,
      agent: null,
      messages: [],
      isLoading: false,
      isOpenChatModal: false,
      setChatId: (id) => set({ chatId: id }),
      openChatModal: ({ user, workspace, agent }) =>
        set({
          isOpenChatModal: true,
          messages: [],
          user,
          workspace,
          agent,
          chatId: "",
        }),
      closeChatModal: () => set({ isOpenChatModal: false }),
      addMessage: (message: Message) =>
        set((state) => ({ messages: [...state.messages, message] })),
      addMessages: (messages: Message[]) => set(() => ({ messages })),
      setIsLoading: (loading) => set({ isLoading: loading }),
      isOpenDeleteModal: false,
      chatIdDelete: "",
      openDeleteModal: (chatId: string) =>
        set({ isOpenDeleteModal: true, chatIdDelete: chatId }),
      closeDeleteModal: () =>
        set({ isOpenDeleteModal: false, chatIdDelete: "" }),
    }),
    { name: "ChatStore" }
  )
);
