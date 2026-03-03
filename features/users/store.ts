import { create } from "zustand";

interface UserStore {
  selectedUser: any;
  isAddModalOpen: boolean;
  isDetailsModalOpen: boolean;
  isDeleteModalOpen: boolean;
  isEditModalOpen: boolean;
  openAddModal: () => void;
  closeAddModal: () => void;
  openDetailsModal: (user: any) => void;
  closeDetailsModal: () => void;
  openDeleteModal: (user: any) => void;
  closeDeleteModal: () => void;
  openEditModal: (user: any) => void;
  closeEditModal: () => void;
}

export const useUserStore = create<UserStore>((set) => ({
  selectedUser: null,
  isAddModalOpen: false,
  isDetailsModalOpen: false,
  isDeleteModalOpen: false,
  isEditModalOpen: false,
  openAddModal: () => set({ isAddModalOpen: true }),
  closeAddModal: () => set({ isAddModalOpen: false }),
  openDetailsModal: (user: any) =>
    set({ isDetailsModalOpen: true, selectedUser: user }),
  closeDetailsModal: () => set({ isDetailsModalOpen: false }),
  openDeleteModal: (user: any) =>
    set({ isDeleteModalOpen: true, selectedUser: user }),
  closeDeleteModal: () => set({ isDeleteModalOpen: false }),
  openEditModal: (user: any) =>
    set({ isEditModalOpen: true, selectedUser: user }),
  closeEditModal: () => set({ isEditModalOpen: false }),
}));
