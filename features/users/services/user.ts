import { userAdapter, userDetailsAdapter } from "../adapter";

export const getUsers = async () => {
  const response = await fetch("/api/users", { method: "GET" });
  if (!response.ok) throw new Error("Failed to fetch users");
  const json = await response.json();
  return json.map(userAdapter);
};
export const getUserById = async (id: string) => {
  const response = await fetch(`/api/users/${id}`, { method: "GET" });
  if (!response.ok) throw new Error("Failed to fetch user");
  const json = await response.json();
  return userDetailsAdapter(json);
};
export const createUser = async (data: any) => {
  const newUser = {
    name: data.name,
    email: data.email,
    password: data.password,
    rol: data.role,
    workspace_id: data.workspaces
      ? data.workspaces.map((ws: any) => JSON.stringify({ id: ws.value }))
      : [],
  };

  const response = await fetch("/api/users", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(newUser),
  });
  const json = await response.json();
  if (json.error) throw new Error(json.error);
  if (json.message) throw new Error(json.message);

  return json;
};
export const updateUser = async (id: string, data: any) => {
  const updatedUser = {
    name: data.name,
    email: data.email,
    password: data.password,
    rol: data.role,
    workspace_id: data.workspaces
      ? data.workspaces.map((ws: any) => JSON.stringify({ id: ws.value }))
      : [],
  };

  const response = await fetch(`/api/users/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(updatedUser),
  });
  const json = await response.json();
  if (json.error) throw new Error(json.error);
  if (json.message) throw new Error(json.message);

  return json;
};

export const deleteUser = async (id: string) => {
  const response = await fetch(`/api/users/${id}`, {
    method: "DELETE",
  });
  if (!response.ok) throw new Error("Failed to delete user");
  const json = await response.json();
  return json;
};
