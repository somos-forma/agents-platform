import { Agent } from "../model";
import { AgentAdapter } from "./agentAdapter";
import { handleError } from "@/utils/handleError";

export async function fetchAgents(): Promise<Agent[]> {
  try {
    const response = await fetch("/api/agents");
    if (!response.ok) {
      const errorResponse = await response.json();
      const handledError = handleError(errorResponse, response.status);
      throw handledError;
    }
    const { data } = await response.json();
    console.log("AGENTS", data);
    return data.map(AgentAdapter);
  } catch (error) {
    // Network error
    if (error instanceof Error) {
      throw handleError(null, null, true);
    }
    // Unknown error
    throw error;
  }
}

// export async function fetchAgents(): Promise<Agent[]> {
//   const response = await fetch("/api/agents");
//   const { success, data, error, status } = await response.json();
//   if (success === false) {
//     throw new Error(`code: ${status}, message: ${error}`);
//   }

//   return data.map(AgentAdapter);
// }

export async function fetchAgentById(agentId: string): Promise<Agent> {
  const response = await fetch(`/api/agents/${agentId}`);
  const { success, data, error, status } = await response.json();
  if (success === false) {
    throw new Error(`code: ${status}, message: ${error}`);
  }
  return AgentAdapter(data);
}
