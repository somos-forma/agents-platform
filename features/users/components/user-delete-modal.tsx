"use client";
import React, { use } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { useUserStore } from "../store";
import { Button } from "@/components/ui/button";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { Spinner } from "@/components/ui/spinner";
import { deleteUser } from "../services/user";

export const UserDeleteModal = () => {
  const { isDeleteModalOpen, closeDeleteModal, selectedUser } = useUserStore();
  const queryClient = useQueryClient();
  const mutation = useMutation({
    mutationFn: () => deleteUser(selectedUser.id),
    onSuccess: () => {
      closeDeleteModal();
      queryClient.invalidateQueries({ queryKey: ["users"] });
      toast.success("Usuario eliminado con éxito");
    },
    onError: (error: any) => {
      toast.error(`Error al eliminar el usuario: ${error.message}`);
    },
  });

  const onDelete = () => {
    mutation.mutate();
  };
  return (
    <Dialog open={isDeleteModalOpen} onOpenChange={closeDeleteModal}>
      <DialogContent showCloseButton={false}>
        <DialogHeader>
          <DialogTitle>Eliminar usuario</DialogTitle>
          <DialogDescription className="pb-5">
            ¿Seguro que quieres eliminar este usuario?
            <br />
            Esta acción no se puede revertir.
          </DialogDescription>
          <div className="flex justify-end gap-2">
            <Button variant="secondary" onClick={closeDeleteModal}>
              Cancelar
            </Button>
            <Button
              disabled={mutation.isPending}
              variant="destructive"
              onClick={onDelete}
            >
              {mutation.isPending && <Spinner />}
              Eliminar
            </Button>
          </div>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
};
