import { fetchAgents } from "../services/agentApi";
import { useQuery } from "@tanstack/react-query";

export const useAgents = () => {
  const { data, error, isLoading, isError } = useQuery({
    queryKey: ["agents"],
    queryFn: fetchAgents,
  });

  return { data, error, isLoading, isError };
};
