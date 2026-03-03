export function workspaceAdapter(raw: any) {
  return {
    id: String(raw.id),
    name: raw.name,
    description: raw.description,
    agentsId: raw.agent_id
      ? raw.agent_id.map((raw: any) => JSON.parse(raw))
      : [],
    created_at: raw.created_at,
    logoUrl: raw.url_logo?.trim(),
    websiteUrl: raw.website_url?.trim(),
  };
}

export function workspaceDetailsAdapter(raw: any) {
  return {
    id: String(raw.id),
    name: raw.name,
    description: raw.description,
    agents: raw.agents
      ? raw.agents.map((agent: any) => ({
          id: String(agent.id),
          name: agent.name,
          description: agent.description
            ? agent.description
            : `Descripción sobre el agente`,
          status: agent.status,
          path: agent.path,
          supportsFiles: agent.supportsFiles,
        }))
      : [],
    created_at: raw.created_at,
    logoUrl: raw.url_logo?.trim(),
    websiteUrl: raw.website_url?.trim(),
  };
}
