import { create } from "zustand";

interface AgentStore {
  onCloseAddModal: () => void;
  onOpenAddModal: () => void;
  isAddModalOpen: boolean;
  onDetailsModal: (agentId: string) => void;
  onCloseDetailsModal: () => void;
  selectedAgentId: string | null;
}

export const useAgentStore = create<AgentStore>((set) => ({
  selectedAgentId: null,
  isAddModalOpen: false,
  onDetailsModal: (agentId: string) => set({ selectedAgentId: agentId }),
  onCloseDetailsModal: () => set({ selectedAgentId: null }),
  onCloseAddModal: () => set({ isAddModalOpen: false }),
  onOpenAddModal: () => set({ isAddModalOpen: true }),
}));
