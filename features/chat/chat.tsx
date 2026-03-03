"use client";
import React, { useState } from "react";
import { WorkspaceCard } from "../workspaces/components/workspace-card";
import { Workspace } from "../workspaces/models";
import { Button } from "@/components/ui/button";
import { ArrowLeftIcon } from "lucide-react";
import { AgentCard } from "../agents/components/agent-card";
import { ChatInterface } from "./components/chat-interface";
import { useQuery } from "@tanstack/react-query";
import { getAgentsByWorkspaceId, getWorkspaces } from "./services/chat";
import { Skeleton } from "@/components/ui/skeleton";
import Cookies from "js-cookie";
import { Agent } from "../agents/model";
import { useCreateChat } from "./hooks/useCreateChat";
import { useChatStore } from "./store";

type Step = "workspaces" | "agents" | "chat";
type WorkspaceInitial = Workspace | null;

export const Chat = () => {
  const [step, setStep] = useState<Step>("workspaces");
  const [workspace, setWorkspace] = useState<WorkspaceInitial>(null);

  const handleWorkspaceSelect = (workspace: Workspace) => {
    setWorkspace(workspace);
    setStep("agents");
  };

  const handleAgentSelect = () => {
    setStep("chat");
  };

  const handleBack = () => {
    if (step === "chat") {
      setStep("agents");
    } else if (step === "agents") {
      setStep("workspaces");
    }
  };

  return (
    <>
      {step === "workspaces" && (
        <WorkspaceStep onSelectWorkspace={handleWorkspaceSelect} />
      )}

      {step === "agents" && (
        <AgentsStep
          onBack={handleBack}
          selectedWorkspace={workspace}
          onAgentSelect={handleAgentSelect}
        />
      )}

      {step === "chat" && <ChatStep onBack={handleBack} />}
    </>
  );
};

interface WorkspaceStepProps {
  onSelectWorkspace: (workspace: Workspace) => void;
}
const WorkspaceStep = ({ onSelectWorkspace }: WorkspaceStepProps) => {
  const { isLoading, error, data } = useQuery({
    queryKey: ["workspaces-chat"],
    queryFn: getWorkspaces,
  });

  return (
    <section className=" flex items-center">
      <div className="max-w-5xl mx-auto p-4">
        <h1 className="font-bold text-center text-4xl mb-3">
          Selecciona tu Workspace
        </h1>
        <p className="text-muted-foreground text-center text-lg mb-4">
          Elige un espacio de trabajo para conectarte con los agentes de tu
          equipo.
        </p>
        {isLoading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-5">
            {Array.from({ length: 3 }).map((_, index) => (
              <div
                key={index}
                className="space-y-3 border rounded-xl p-6 h-[200px] lg:w-[317px]"
              >
                <div className="flex gap-2">
                  <Skeleton className="h-10 w-10 mb-2 rounded-full" />
                  <div className="flex-1 space-y-3">
                    <Skeleton className="h-5 w-3/4" />
                    <Skeleton className="h-3 w-1/2" />
                  </div>
                </div>
                <div className="space-y-2">
                  <Skeleton className="h-4 w-full" />
                  <Skeleton className="h-4 w-3/4" />
                </div>
              </div>
            ))}
          </div>
        ) : error ? (
          <p>Error al cargar workspaces</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-5">
            {data.map((workspace: any) => (
              <WorkspaceCard
                key={workspace.id}
                id={workspace.id}
                name={workspace.name}
                websiteUrl={workspace.websiteUrl}
                logoUrl={workspace.logoUrl}
                description={workspace.description}
                onClick={() => onSelectWorkspace(workspace)}
              />
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

interface AgentsStepProps {
  onBack: () => void;
  onAgentSelect: () => void;
  selectedWorkspace: Workspace | null;
}
const AgentsStep = ({
  onBack,
  onAgentSelect,
  selectedWorkspace,
}: AgentsStepProps) => {
  const {
    isLoading,
    error,
    data: agents,
  } = useQuery({
    queryKey: ["agents-chat", selectedWorkspace?.id],
    queryFn: () => getAgentsByWorkspaceId(selectedWorkspace?.id || ""),
  });

  const [selectedAgentId, setSelectedAgentId] = useState<string>("");
  const { openChatModal } = useChatStore();

  const handleClickAgent = (agent: Agent) => {
    setSelectedAgentId(agent.id);
    const userId = Cookies.get("user-id");
    openChatModal({
      user: { id: userId! },
      workspace: {
        id: selectedWorkspace!.id,
        name: selectedWorkspace!.name,
      },
      agent: {
        id: agent.id,
        name: agent.name,
        description: agent.description,
        path: agent.path,
        supportsFiles: agent?.supportsFiles,
      },
    });
    onAgentSelect();
    // createNewChat.mutate(
    //   {
    //     userId: userId || "",
    //     agentId: agent.id,
    //     workspaceId: selectedWorkspace?.id || "",
    //   },
    //   {
    //     onSuccess: (data) => {
    //       openChatModal({
    //         user: { id: userId! },
    //         workspace: {
    //           id: selectedWorkspace!.id,
    //           name: selectedWorkspace!.name,
    //         },
    //         agent: {
    //           id: agent.id,
    //           name: agent.name,
    //           description: agent.description,
    //           path: agent.path,
    //         },
    //         chatId: data.chatId,
    //       });
    //       onAgentSelect();
    //     },
    //     onSettled: () => {
    //       setSelectedAgentId("");
    //     },
    //   }
    // );
  };

  return (
    <section className=" flex items-center ">
      <div className="max-w-5xl mx-auto p-4">
        <Button variant="ghost" className="mb-5 -ms-4" onClick={onBack}>
          <ArrowLeftIcon /> Volver a Workspaces
        </Button>
        <h1 className="font-bold  text-4xl mb-3">{selectedWorkspace?.name}</h1>
        <p className="text-muted-foreground  text-lg mb-4">
          Selecciona un agente para iniciar tu conversación
        </p>
        {isLoading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-5">
            {Array.from({ length: 3 }).map((_, index) => (
              <div
                key={index}
                className="space-y-3 border rounded-xl p-6 h-[200px] lg:w-[317px]"
              >
                <div className="flex gap-2">
                  <Skeleton className="h-10 w-10 mb-2 rounded-full" />
                  <div className="flex-1 space-y-3">
                    <Skeleton className="h-5 w-3/4" />
                    <Skeleton className="h-3 w-1/2" />
                  </div>
                </div>
                <div className="space-y-2">
                  <Skeleton className="h-4 w-full" />
                  <Skeleton className="h-4 w-3/4" />
                </div>
              </div>
            ))}
          </div>
        ) : error ? (
          <p>Error al cargar agentes</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-5">
            {agents.map((agent: any) => (
              <AgentCard
                key={agent.id}
                id={agent.id}
                name={agent.name}
                status={agent.status}
                description={agent.description}
                onClick={() => handleClickAgent(agent)}
                // isLoading={selectedAgentId === agent.id}
              />
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

interface ChatStepProps {
  onBack: () => void;
}
const ChatStep = ({ onBack }: ChatStepProps) => {
  return (
    <div className=" flex items-center">
      <div className="max-w-5xl mx-auto p-4 flex-grow">
        <Button variant="ghost" className="mb-4 -ms-4" onClick={onBack}>
          <ArrowLeftIcon /> Volver a Agentes
        </Button>
        <ChatInterface />
      </div>
    </div>
  );
};
