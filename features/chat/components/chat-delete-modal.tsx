"use client";
import React from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Spinner } from "@/components/ui/spinner";
import { useChatStore } from "../store";
import { useChatDelete } from "../hooks/useChatDelete";

export const ChatDeleteModal = () => {
  const { closeDeleteModal, chatIdDelete, addMessages, setChatId, chatId } =
    useChatStore();
  const deleteChat = useChatDelete();

  const onDelete = () => {
    if (chatId === chatIdDelete) {
      deleteChat.mutate(chatIdDelete!, {
        onSuccess: () => {
          setChatId("");
          addMessages([]);
          closeDeleteModal();
        },
      });
    } else {
      deleteChat.mutate(chatIdDelete!, {
        onSuccess: () => {
          closeDeleteModal();
        },
      });
    }
  };
  return (
    <Dialog open={true} onOpenChange={closeDeleteModal}>
      <DialogContent showCloseButton={false}>
        <DialogHeader>
          <DialogTitle>Eliminar conversación</DialogTitle>
          <DialogDescription className="pb-5">
            ¿Seguro que quieres eliminar este chat?
            <br />
            Esta acción no se puede revertir.
          </DialogDescription>
          <div className="flex justify-end gap-2">
            <Button variant="secondary" onClick={closeDeleteModal}>
              Cancelar
            </Button>
            <Button
              disabled={deleteChat.isPending}
              variant="destructive"
              onClick={onDelete}
            >
              {deleteChat.isPending && <Spinner />}
              Eliminar
            </Button>
          </div>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
};
