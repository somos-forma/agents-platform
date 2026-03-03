import { NextResponse } from "next/server";
const URL = `${process.env.N8N_HOST}/webhook/580ccc56-f308-4b64-961d-38323501a170/users`;
const WORKSPACES_URL = `${process.env.N8N_HOST}/webhook/e9ed009b-7537-43d2-8448-5a6ce5b8e219/workspaces`;

export async function GET(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const response = await fetch(`${URL}/${id}`, { method: "GET" });
    if (!response.ok) {
      throw new Error("Failed to fetch user by ID from the Next API Route");
    }

    const [data] = await response.json();
    const workspacesId = data.workspace_id.map((ws: string) => JSON.parse(ws));
    const workspacesPromises = workspacesId.map((item: any) =>
      fetch(`${WORKSPACES_URL}/${item.id}`, { method: "GET" }).then((res) =>
        res.json().then((json) => json[0])
      )
    );
    const workspaces = await Promise.all(workspacesPromises);

    return NextResponse.json({ ...data, workspaces: workspaces });
  } catch (error) {
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "Unknown error" },
      { status: 500 }
    );
  }
}

export async function PUT(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const body = await request.json();

    const response = await fetch(`${URL}/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    });
    if (!response.ok)
      throw new Error("Failed to update user by ID from the Next API Route");
    const data = await response.json();
    return NextResponse.json(data);
  } catch (error) {
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "Unknown error" },
      { status: 500 }
    );
  }
}

export async function DELETE(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const response = await fetch(`${URL}/${id}`, { method: "DELETE" });
    if (!response.ok)
      throw new Error("Failed to delete user by ID from the Next API Route");
    const data = await response.json();
    return NextResponse.json(data);
  } catch (error) {
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "Unknown error" },
      { status: 500 }
    );
  }
}
