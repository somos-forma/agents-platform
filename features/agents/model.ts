export interface Agent {
  id: string;
  name: string;
  status: "active" | "inactive";
  createdAt: string;
  updatedAt: string;
  httpMethod: string;
  path: string;
  description: string;
  tags: string[];
  supportsFiles?: boolean;
}
