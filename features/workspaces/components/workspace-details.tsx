"use client";
import React, { useState } from "react";
import { Badge } from "@/components/ui/badge";
import { WorkspaceDetailsCard } from "./workspace-details-card";
import { AgentCard } from "@/features/agents/components/agent-card";
import { WorkspaceChat } from "./workspace-chat";
import { useQuery } from "@tanstack/react-query";
import { getWorkspaceById } from "../services/workspace";
import { Card, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import Cookies from "js-cookie";
import { useChatStore } from "@/features/chat/store";
import { Agent } from "@/features/agents/model";

interface WorkspaceDetailsProps {
  id: string;
}
export const WorkspaceDetails = ({ id }: WorkspaceDetailsProps) => {
  const {
    isLoading,
    error,
    data: workspace,
  } = useQuery({
    queryKey: ["workspace", id],
    queryFn: () => getWorkspaceById(id),
  });

  const { isOpenChatModal, openChatModal } = useChatStore();
  const [agentSelected, setAgentSelected] = useState<Agent | null>(null);

  async function startAgent(agent: Agent) {
    setAgentSelected(agent);
    const userId = Cookies.get("user-id");
    openChatModal({
      user: { id: userId! },
      workspace: {
        id: workspace!.id,
        name: workspace!.name,
      },
      agent: {
        id: agent.id,
        name: agent.name,
        description: agent.description,
        path: agent.path,
        supportsFiles: agent?.supportsFiles,
      },
    });

    // createNewChat.mutate(
    //   {
    //     userId: userId!,
    //     agentId: agent.id,
    //     workspaceId: workspace!.id,
    //   },
    //   {
    //     onSuccess: (data) => {
    //       openChatModal({
    //         user: { id: userId! },
    //         workspace: {
    //           id: workspace!.id,
    //           name: workspace!.name,
    //         },
    //         agent: {
    //           id: agent.id,
    //           name: agent.name,
    //           description: agent.description,
    //           path: agent.path,
    //         },
    //         chatId: data.chatId,
    //       });
    //     },
    //     onSettled: () => {
    //       setAgentSelected(null);
    //     },
    //   }
    // );
  }

  if (isLoading)
    return (
      <div className="space-y-4">
        <Card className="shadow-none">
          <CardContent>
            <div className="flex gap-3 items-center">
              <Skeleton className="h-11 w-11" />
              <Skeleton className="h-6 w-1/7" />
            </div>
            <Skeleton className="h-4 w-full mt-4" />
            <Skeleton className="h-4 w-5/6 mt-2" />
          </CardContent>
        </Card>
        <div className="flex justify-between ">
          <Skeleton className="h-6 w-1/4 mt-6" />
          <Skeleton className="h-6 w-1/7 mt-4" />
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {Array.from({ length: 3 }).map((_, index) => (
            <Card key={index} className="shadow-none">
              <CardContent>
                <div className="flex justify-between">
                  <Skeleton className="h-6 w-1/2" />
                  <Skeleton className="h-6 w-1/6" />
                </div>
                <Skeleton className="h-4 w-full mt-4" />
                <Skeleton className="h-4 w-3/4 mt-2" />
                <Skeleton className="h-8 w-full mt-4" />
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    );

  if (error) return <div>Error: {error.message}</div>;

  return (
    <div className="space-y-4">
      <WorkspaceDetailsCard
        name={workspace?.name}
        website={workspace?.websiteUrl}
        logoUrl={workspace?.logoUrl}
        description={workspace?.description}
      />
      <div className="flex justify-between">
        <h2 className="text-lg font-semibold">Agentes asignados</h2>
        <Badge variant="secondary" className="text-xs">
          {workspace?.agents.length} agentes en total
        </Badge>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {workspace?.agents.map((agent: any) => (
          <AgentCard
            key={agent.id}
            id={agent.id}
            name={agent.name}
            status={agent.status}
            description={agent.description}
            onClick={() => startAgent(agent)}
            // isLoading={agentSelected?.id === agent.id}
          />
        ))}
      </div>
      {isOpenChatModal && <WorkspaceChat />}
    </div>
  );
};
