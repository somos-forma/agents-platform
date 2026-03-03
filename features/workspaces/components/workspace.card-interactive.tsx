import React from "react";
import { Button } from "@/components/ui/button";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { WorkspaceCard } from "./workspace-card";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteWorkspace } from "../services/workspace";
import { Spinner } from "@/components/ui/spinner";
import { toast } from "sonner";
interface WorkspaceCardInteractiveProps {
  id: string;
  name: string;
  websiteUrl: string;
  logoUrl?: string;
  description?: string;
}
export const WorkspaceCardInteractive = ({
  id,
  name,
  websiteUrl,
  logoUrl,
  description,
}: WorkspaceCardInteractiveProps) => {
  const [open, setOpen] = React.useState(false);
  const closeModal = () => setOpen(false);
  const openModal = () => setOpen(true);
  const queryClient = useQueryClient();
  const mutation = useMutation({
    mutationFn: () => deleteWorkspace(id),
    onSuccess: () => {
      closeModal();
      queryClient.invalidateQueries({ queryKey: ["workspaces"] });
      toast.success("Workspace eliminado con éxito");
    },
    onError: (error: any) => {
      toast.error(`Error al eliminar el workspace: ${error.message}`);
    },
  });

  const onDelete = () => {
    mutation.mutate();
  };

  return (
    <>
      <WorkspaceCard
        id={id}
        name={name}
        websiteUrl={websiteUrl}
        logoUrl={logoUrl}
        description={description}
        onDelete={openModal}
      />
      <Dialog open={open} onOpenChange={openModal}>
        <DialogContent showCloseButton={false}>
          <DialogHeader>
            <DialogTitle>Eliminar workspace</DialogTitle>
            <DialogDescription className="pb-5">
              ¿Seguro que quieres eliminar este workspace?
              <br />
              Esta acción no se puede revertir.
            </DialogDescription>
            <div className="flex justify-end gap-2">
              <Button variant="secondary" onClick={closeModal}>
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
    </>
  );
};
