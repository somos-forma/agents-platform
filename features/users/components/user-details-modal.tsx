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
import { useQuery } from "@tanstack/react-query";
import { getUserById } from "../services/user";
import { Skeleton } from "@/components/ui/skeleton";

export const UserDetailsModal = () => {
  const { isDetailsModalOpen, closeDetailsModal, selectedUser } =
    useUserStore();
  const { isLoading, error, data } = useQuery({
    queryKey: ["userDetailModal", selectedUser?.id],
    queryFn: () => getUserById(selectedUser?.id),
  });
  return (
    <Dialog open={isDetailsModalOpen} onOpenChange={closeDetailsModal}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Detalles del Usuario</DialogTitle>
          <DialogDescription>
            Este usuario se encarga de optimizar el contenido para motores de
            búsqueda.
          </DialogDescription>
        </DialogHeader>
        <section>
          <h3 className="text-lg font-semibold">Información General</h3>
          {isLoading ? (
            <div>
              <Skeleton className="h-4 w-[100px] mb-2" />
              <Skeleton className="h-4 w-[80px] mb-2" />
              <Skeleton className="h-4 w-[90px] mb-2" />
              <Skeleton className="h-4 w-[120px] mb-2" />
              <Skeleton className="h-4 w-[120px] mb-2" />
            </div>
          ) : error ? (
            <p>Error: {error.message}</p>
          ) : (
            <div>
              <p>
                Nombre: <strong>{data?.name}</strong>
              </p>
              <p>
                Email: <strong>{data?.email}</strong>
              </p>
              <p>
                Password:
                <strong>{data?.password}</strong>
              </p>
              <p>
                Rol: <strong>{data?.role}</strong>
              </p>
              <p>
                Workspaces:{" "}
                <strong>
                  {data?.workspaces.map((ws: any) => ws.label).join(", ")}
                </strong>
              </p>
            </div>
          )}
        </section>
      </DialogContent>
    </Dialog>
  );
};
