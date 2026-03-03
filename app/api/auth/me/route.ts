import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export async function GET(request: Request) {
  const cookieStore = await cookies();
  const user = cookieStore.get("user-token")?.value;

  return NextResponse.json(user ? JSON.parse(user) : null);
}
