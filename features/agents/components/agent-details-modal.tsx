"use client";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

import { timeAgo } from "@/utils/formatters";
import { useAgentId } from "../hooks/useAgentId";
import { Skeleton } from "@/components/ui/skeleton";
import { XCircle } from "lucide-react";

interface AgentDetailsModalProps {
  agentId: string;
  onClose: () => void;
}

export const AgentDetailsModal = ({
  agentId,
  onClose,
}: AgentDetailsModalProps) => {
  const { agent, isLoading, error } = useAgentId(agentId);

  return (
    <Dialog open={true} onOpenChange={onClose}>
      <DialogContent>
        {isLoading && (
          <>
            <DialogTitle className="sr-only">
              Cargando detalles del agente...
            </DialogTitle>
            <DialogHeader>
              <Skeleton className="h-7 w-3/4 mb-2" />
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-2/3" />
            </DialogHeader>
            <div className="space-y-4 mt-6">
              {[...Array(6)].map((_, i) => (
                <div key={i} className="flex items-start gap-3">
                  <Skeleton className="w-4 h-4 rounded" />
                  <div className="flex-1 space-y-2">
                    <Skeleton className="h-3 w-20" />
                    <Skeleton className="h-4 w-full" />
                  </div>
                </div>
              ))}
            </div>
          </>
        )}

        {error && (
          <div className="flex flex-col items-center justify-center py-8 text-center">
            <XCircle className="w-12 h-12 text-destructive mb-4" />
            <DialogTitle className="mb-2">Error al cargar</DialogTitle>
            <DialogDescription>
              No se pudieron obtener los detalles del agente. Por favor, intenta
              nuevamente.
            </DialogDescription>
            <button
              onClick={onClose}
              className="mt-6 px-4 py-2 bg-primary text-primary-foreground rounded-md hover:bg-primary/90 transition-colors"
            >
              Cerrar
            </button>
          </div>
        )}

        {agent && (
          <>
            <DialogHeader>
              <DialogTitle>{agent.name}</DialogTitle>
              <DialogDescription>{agent.description}</DialogDescription>
            </DialogHeader>
            <section>
              <h2 className="font-semibold">Detalles del Agente</h2>
              <div className="space-y-2 mt-4">
                <p>
                  <strong>ID:</strong> {agent.id}
                </p>
                <p>
                  <strong>Nombre:</strong> {agent.name}
                </p>
                <p>
                  <strong>Estado:</strong>{" "}
                  {agent.status && agent.status === "active"
                    ? "Activo"
                    : "Inactivo"}
                </p>
                <p>
                  <strong>Fecha de creación:</strong> {timeAgo(agent.createdAt)}
                </p>
                <p>
                  <strong>Última actualización:</strong>{" "}
                  {timeAgo(agent.updatedAt)}
                </p>
                <p>
                  <strong>Path:</strong>{" "}
                  <code className="bg-gray-100 p-1 rounded-md">
                    {agent.path}
                  </code>
                </p>
                <p>
                  <strong>Http Method:</strong>{" "}
                  <code className="bg-gray-100 p-1 rounded-md">
                    {agent.httpMethod}
                  </code>
                </p>
                <p>
                  <strong>Tags:</strong> {agent.tags.join(", ")}
                </p>
                <p>
                  <strong>Descripción:</strong> {agent.description}
                </p>
              </div>
            </section>
          </>
        )}
      </DialogContent>
    </Dialog>
  );
};
