import { NextResponse } from "next/server";
const N8N_HOST = process.env.N8N_HOST || "http://localhost:3000";
const URL = `${N8N_HOST}/webhook/e9ed009b-7537-43d2-8448-5a6ce5b8e219/workspaces`;
const N8N_API_KEY = process.env.N8N_API_KEY || "";
export async function GET(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;

    const response = await fetch(`${URL}/${id}`, { method: "GET" });
    if (!response.ok)
      throw new Error(
        "Failed to fetch workspace by ID from the Next API Route"
      );
    const [data] = await response.json();
    const agentsId = data.agent_id.map((agent: any) => JSON.parse(agent));
    const agentsPromises = agentsId.map((agentId: any) =>
      fetch(
        `${N8N_HOST}/api/v1/workflows/${agentId.id}?excludePinnedData=true`,
        {
          method: "GET",
          headers: {
            "X-N8N-API-KEY": `${N8N_API_KEY}`,
            "Content-Type": "application/json",
          },
        }
      ).then((res) =>
        res.json().then((json) => ({
          id: json.id,
          name: json.name,
          status: json.active,
          path: json.nodes
            .find((node: any) => node.type === "n8n-nodes-base.webhook")
            ?.parameters.path.split("/")
            .pop(),
          supportsFiles: json.tags.some(
            (tag: any) => tag.name === "supports-files"
          ),
        }))
      )
    );
    const agents = await Promise.all(agentsPromises);

    return NextResponse.json({ ...data, agents: agents });
  } catch (error) {
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "Unknown error" },
      { status: 500 }
    );
  }
}
