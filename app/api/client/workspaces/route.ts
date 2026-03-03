import { cookies } from "next/headers";
import { NextResponse } from "next/server";
const N8N_HOST = process.env.N8N_HOST || "http://localhost:3000";
const WORKSPACES_URL = `${N8N_HOST}/webhook/e9ed009b-7537-43d2-8448-5a6ce5b8e219/workspaces`;
const USERS_URL = `${N8N_HOST}/webhook/580ccc56-f308-4b64-961d-38323501a170/users`;

export async function GET(request: Request) {
  const cookieStore = await cookies();
  const userCookie = JSON.parse(cookieStore.get("user-token")?.value || "");

  const user = await fetch(`${USERS_URL}/${userCookie.id}`, {
    method: "GET",
  });
  if (!user.ok) {
    throw new Error("Failed to fetch user data");
  }
  const [data] = await user.json();

  const workspacesId = data.workspace_id.map((ws: string) => JSON.parse(ws));
  const workspacesPromises = workspacesId.map((item: any) =>
    fetch(`${WORKSPACES_URL}/${item.id}`, { method: "GET" }).then((res) =>
      res.json().then((json) => json[0])
    )
  );
  const workspaces = await Promise.all(workspacesPromises);

  return NextResponse.json({ ...data, workspaces: workspaces });
}
