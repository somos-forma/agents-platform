import { NextResponse } from "next/server";
const CONVERSATION_PATH = "8f003e1d-c255-4923-9ae3-c7819bc61465";

export async function GET(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;

  const response = await fetch(
    `${process.env.N8N_HOST}/webhook/${CONVERSATION_PATH}?id=${id}`,
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
