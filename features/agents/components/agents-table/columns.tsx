"use client";
import { Dot, Eye, MoreHorizontal, Pencil, Trash } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { ColumnDef } from "@tanstack/react-table";
import { ArrowUpDown } from "lucide-react";
import { useAgentStore } from "../../store";
import { Agent } from "../../model";

// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.

export const columns: ColumnDef<Agent>[] = [
  {
    id: "select",
    header: ({ table }) => (
      <Checkbox
        checked={
          table.getIsAllPageRowsSelected() ||
          (table.getIsSomePageRowsSelected() && "indeterminate")
        }
        onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
        aria-label="Select all"
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value) => row.toggleSelected(!!value)}
        aria-label="Select row"
      />
    ),
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: "name",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Nombre del agente
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
  },
  {
    accessorKey: "description",
    header: "Descripción",
    cell: ({ row }) => {
      return (
        <div className="max-w-sm text-ellipsis overflow-hidden whitespace-nowrap">
          {row.getValue("description")}
        </div>
      );
    },
  },
  {
    accessorKey: "status",
    header: "Estado",
    cell: ({ row }) => {
      const status = String(row.getValue("status"));
      const statusClasses =
        status === "active"
          ? "text-green-600 bg-green-100/50 dark:text-green-400 dark:bg-green-900/50"
          : "text-gray-600 bg-gray-100/50 dark:text-gray-400 dark:bg-gray-900/50";

      return (
        <div
          className={`inline-flex items-center justify-between gap-0 px-2 py-1 rounded-3xl text-xs font-medium   ${statusClasses}`}
        >
          {status === "active" && "Activo"}
          {status === "inactive" && "Inactivo"}
        </div>
      );
    },
  },

  {
    id: "actions",
    cell: ({ row }) => {
      const agent = row.original;
      const { onDetailsModal } = useAgentStore();
      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0">
              <span className="sr-only">Open menu</span>
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>Acciones</DropdownMenuLabel>

            <DropdownMenuItem onClick={() => onDetailsModal(agent.id)}>
              <Eye /> Ver detalle del agente
            </DropdownMenuItem>
            <DropdownMenuItem>
              <Pencil /> Editar agente
            </DropdownMenuItem>
            <DropdownMenuItem>
              <span className="text-red-600 hover:text-red-600/80 flex items-center gap-2">
                <Trash className="text-red-600" /> Eliminar agente
              </span>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];
