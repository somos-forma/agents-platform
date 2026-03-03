import { AgentAdapter } from "./agentAdapter";

export const getAgents = async () => {
  const response = await fetch("/api/agents", { method: "GET" });
  const json = await response.json();
  if (json.error) throw new Error(json.error);
  return json.data.map(AgentAdapter);
};

export const getAgent = async (id: string) => {};
export const createAgent = async (data: any) => {};
export const updateAgent = async (id: string, data: any) => {};
export const deleteAgent = async (id: string) => {};
