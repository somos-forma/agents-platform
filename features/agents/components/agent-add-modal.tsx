"use client";
import React from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { AgentAddForm } from "./agent-add-form";

interface AgentAddModalProps {
  open: boolean;
  onClose: () => void;
}

export const AgentAddModal = ({ open, onClose }: AgentAddModalProps) => {
  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Agregar agente</DialogTitle>
          <DialogDescription>
            Aquí puedes configurar un nuevo agente para tu plataforma.
          </DialogDescription>
        </DialogHeader>
        <AgentAddForm onSuccess={onClose} />
      </DialogContent>
    </Dialog>
  );
};
