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
import { UserAddForm } from "./user-add-form";

export const UserAddModal = () => {
  const { closeAddModal, isAddModalOpen } = useUserStore();
  return (
    <Dialog open={isAddModalOpen} onOpenChange={closeAddModal}>
      <DialogContent className="md:max-w-2xl">
        <DialogHeader>
          <DialogTitle>Agregar usuario</DialogTitle>
          <DialogDescription>
            Aquí puedes configurar un nuevo usuario para tu plataforma.
          </DialogDescription>
        </DialogHeader>
        <UserAddForm />
      </DialogContent>
    </Dialog>
  );
};
