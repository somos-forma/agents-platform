export const userAdapter = (raw: any) => {
  return {
    id: raw.id,
    name: raw.name,
    email: raw.email,
    password: raw.password,
    role: raw.rol,
    workspacesId: raw.workspace_id
      ? raw.workspace_id.map((item: any) => JSON.parse(item))
      : [],
    workspaces: raw.workspaces
      ? raw.workspaces.map((item: any) => ({
          value: item.id,
          label: item.name,
        }))
      : [],
  };
};

export const userDetailsAdapter = (raw: any) => {
  return {
    id: raw.id,
    name: raw.name,
    email: raw.email,
    password: raw.password,
    role: raw.rol,
    workspaces: raw.workspaces
      ? raw.workspaces.map((item: any) => ({
          value: String(item.id),
          label: item.name,
        }))
      : [],
  };
};
