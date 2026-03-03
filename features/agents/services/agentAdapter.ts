import { Agent } from "../model";

export const AgentAdapter = (agent: any): Agent => {
  const webhooks = agent.nodes.find(
    (node: any) => node.type === "n8n-nodes-base.webhook"
  );

  return {
    id: agent.id,
    name: agent.name,
    description: agent.description
      ? agent.description
      : `Descripción del agente ${agent.name}`,
    status: agent.active ? "active" : "inactive",
    createdAt: agent.createdAt || new Date().toISOString(),
    updatedAt: agent.updatedAt || new Date().toISOString(),
    httpMethod: webhooks?.parameters?.httpMethod || "N/A",
    path: webhooks?.parameters?.path || "N/A",
    tags: agent.tags.map((tag: any) => tag.name) || [],
  };
};
