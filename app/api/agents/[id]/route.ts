import { NextResponse } from "next/server";
const N8N_HOST = process.env.N8N_HOST || "http://localhost:3000";
const N8N_API_KEY = process.env.N8N_API_KEY || "";
interface Params {
  request: Request;
  params: Promise<{ id: string }>;
}
export async function GET(request: Request, { params }: Params) {
  const { id } = await params;
  const OPTIONS = {
    headers: {
      "X-N8N-API-KEY": `${N8N_API_KEY}`,
      "Content-Type": "application/json",
    },
  };
  const response = await fetch(
    `${N8N_HOST}/api/v1/workflows/${id}?excludePinnedData=true`,
    OPTIONS
  );
  const data = await response.json();

  if (!data)
    return NextResponse.json(
      { success: false, data: null, error: "Not found", status: 404 },
      { status: 404 }
    );
  return NextResponse.json({
    success: true,
    data: data,
    error: null,
    status: 200,
  });
}
