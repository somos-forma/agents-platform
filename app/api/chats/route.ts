import { NextRequest, NextResponse } from "next/server";
const CREATE_PATH = "5c79d570-c006-47d6-b4fa-34222350d4c1";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { userId, agentId, workspaceId } = body;

    const response = await fetch(
      `${process.env.N8N_HOST}/webhook/${CREATE_PATH}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          user_id: userId,
          agent_id: agentId,
          workspace_id: workspaceId,
        }),
      }
    );
    if (!response.ok)
      throw new Error("Failed to send message to the Next API Route");
    const [data] = await response.json();

    return NextResponse.json({
      chatId: String(data.id),
    });
  } catch (error) {
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "Unknown error" },
      { status: 500 }
    );
  }
}
