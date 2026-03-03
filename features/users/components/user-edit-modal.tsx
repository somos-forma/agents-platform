"use client";
import React from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { useUserStore } from "../store";
import { UserEditForm } from "./user-edit-form";
import { useQuery } from "@tanstack/react-query";
import { getUserById } from "../services/user";
import { Spinner } from "@/components/ui/spinner";

export const UserEditModal = () => {
  const { closeEditModal, isEditModalOpen, selectedUser } = useUserStore();
  const { isLoading, error, data } = useQuery({
    queryKey: ["userEditModal", selectedUser?.id],
    queryFn: () => getUserById(selectedUser?.id),
  });
  return (
    <Dialog open={isEditModalOpen} onOpenChange={closeEditModal}>
      <DialogContent className="md:max-w-2xl">
        <DialogHeader>
          <DialogTitle>Editar usuario</DialogTitle>
          <DialogDescription>
            Aquí puedes editar la información del usuario seleccionado.
          </DialogDescription>
        </DialogHeader>
        {isLoading ? (
          <div className="flex justify-center py-10">
            <Spinner />
          </div>
        ) : error ? (
          <div className="text-red-500">
            Error al cargar los datos del usuario.
          </div>
        ) : (
          <UserEditForm selectedUser={data} />
        )}
      </DialogContent>
    </Dialog>
  );
};
