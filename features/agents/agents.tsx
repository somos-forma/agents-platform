"use client";

import { Button } from "@/components/ui/button";
import { AgentAddModal } from "./components/agent-add-modal";
import { AgentsTable } from "./components/agents-table/agents-table";
import { columns } from "./components/agents-table/columns";
import { Plus } from "lucide-react";
import { AgentDetailsModal } from "./components/agent-details-modal";
import { useAgents } from "./hooks/useAgents";
import { useAgentStore } from "./store";
import { Skeleton } from "@/components/ui/skeleton";

export const Agents = () => {
  const { data, error, isLoading, isError } = useAgents();
  const {
    selectedAgentId,
    onCloseDetailsModal,
    isAddModalOpen,
    onCloseAddModal,
    onOpenAddModal,
  } = useAgentStore();

  return (
    <div>
      <div className="flex justify-between items-center py-5">
        <div>
          <h1 className="text-3xl font-bold">AI Agentes</h1>
          <p className="text-muted-foreground">Administra tus agentes</p>
        </div>
        {/* <Button onClick={onOpenAddModal}>
          <Plus />
          Agregar Agente
        </Button> */}
      </div>

      <AgentsTable
        columns={columns}
        data={data ?? []}
        isLoading={isLoading}
        isError={isError}
        error={error}
      />

      <AgentAddModal open={isAddModalOpen} onClose={onCloseAddModal} />
      {selectedAgentId && (
        <AgentDetailsModal
          agentId={selectedAgentId}
          onClose={onCloseDetailsModal}
        />
      )}
    </div>
  );
};
