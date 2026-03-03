export interface Workspace {
  id: string;
  name: string;
  description?: string;
  agentsId: { id: string }[];
  create_at: string;
  logoUrl?: string;
  websiteUrl: string;
}
