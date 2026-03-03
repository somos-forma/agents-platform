import { useQuery } from "@tanstack/react-query";
import { fetchAgentById } from "../services/agentApi";

export const useAgentId = (agentId: string) => {
  const { data, error, isLoading } = useQuery({
    queryKey: ["agent", agentId],
    queryFn: () => fetchAgentById(agentId),
  });

  return { agent: data, error, isLoading };
};
