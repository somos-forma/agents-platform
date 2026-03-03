import { NextRequest, NextResponse } from "next/server";
const ALL_CONVERSATIONS_PATH = "8f003e1d-c255-4923-9ae3-c7819bc61465";

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const user_id = searchParams.get("userId");
  const agent_id = searchParams.get("agentId");
  const workspace_id = searchParams.get("workspaceId");

  const response = await fetch(
    `${process.env.N8N_HOST}/webhook/${ALL_CONVERSATIONS_PATH}?user_id=${user_id}&agent_id=${agent_id}&workspace_id=${workspace_id}`,
    {
      method: "GET",
    }
  );

  if (!response.ok) {
    return NextResponse.json(
      { error: "Failed to fetch conversation" },
      { status: 500 }
    );
  }

  const data = await response.json();
  return NextResponse.json(data);
}
