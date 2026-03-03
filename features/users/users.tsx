"use client";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { UsersTable } from "./components/users-table/users-table";
import { columns } from "./components/users-table/columns";
import { useUserStore } from "./store";
import { UserAddModal } from "./components/user-add-modal";
import { UserDetailsModal } from "./components/user-details-modal";
import { useQuery } from "@tanstack/react-query";
import { getUsers } from "./services/user";
import { UserDeleteModal } from "./components/user-delete-modal";
import { UserEditModal } from "./components/user-edit-modal";

export const Users = () => {
  const {
    isAddModalOpen,
    openAddModal,
    isDetailsModalOpen,
    isDeleteModalOpen,
    isEditModalOpen,
  } = useUserStore();
  const { isLoading, isError, data, error } = useQuery({
    queryKey: ["users"],
    queryFn: getUsers,
  });

  const users = data || [];

  return (
    <div>
      <div className="flex justify-between items-center py-5">
        <div>
          <h1 className="text-3xl font-bold">Usuarios</h1>
          <p className="text-muted-foreground">Administra tus usuarios</p>
        </div>
        <Button onClick={openAddModal}>
          <Plus />
          Agregar Usuario
        </Button>
      </div>
      <UsersTable
        columns={columns}
        data={users}
        isLoading={isLoading}
        isError={isError}
        error={error}
      />
      {isAddModalOpen && <UserAddModal />}
      {isDetailsModalOpen && <UserDetailsModal />}
      {isDeleteModalOpen && <UserDeleteModal />}
      {isEditModalOpen && <UserEditModal />}
    </div>
  );
};
