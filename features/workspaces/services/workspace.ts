import { workspaceAdapter, workspaceDetailsAdapter } from "../adapter";

export const getWorkspaces = async () => {
  const response = await fetch("/api/workspaces", { method: "GET" });
  const json = await response.json();
  if (json.error) throw new Error(json.error);
  return json.map(workspaceAdapter);
};
export const getWorkspaceById = async (id: string) => {
  const response = await fetch(`/api/workspaces/${id}`, { method: "GET" });
  const json = await response.json();
  if (json.error) throw new Error(json.error);

  return workspaceDetailsAdapter(json);
};
export const createWorkspace = async (data: any) => {
  const body = {
    name: data.name,
    description: data.description,
    agent_id: data.agents.map((agent: any) => ({ id: agent.value })),
    url_logo: data.logoUrl,
    website_url: data.websiteUrl,
  };

  const response = await fetch("/api/workspaces", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(body),
  });
  const json = await response.json();
  if (json.error) throw new Error(json.error);
  return json.map(workspaceAdapter);
};
export const updateWorkspace = async (id: string, data: any) => {
  const response = await fetch(`/api/workspaces/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });
  const json = await response.json();
  if (json.error) throw new Error(json.error);
  return json;
};
export const deleteWorkspace = async (id: string) => {
  const response = await fetch(`/api/workspaces/${id}`, { method: "DELETE" });
  const json = await response.json();
  if (json.error) throw new Error(json.error);
  return json;
};
