import { NextResponse } from "next/server";

const URL = `${process.env.N8N_HOST}/webhook/users`;

export async function GET(request: Request) {
  try {
    const response = await fetch(URL, { method: "GET" });
    if (!response.ok)
      throw new Error("Failed to fetch all users from the Next API Route");
    const data = await response.json();
    return NextResponse.json(data);
  } catch (error) {
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "Unknown error" },
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const response = await fetch(URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    });
    if (!response.ok)
      throw new Error("Failed to create user from the Next API Route");
    const data = await response.json();
    return NextResponse.json(data);
  } catch (error) {
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "Unknown error" },
      { status: 500 }
    );
  }
}
