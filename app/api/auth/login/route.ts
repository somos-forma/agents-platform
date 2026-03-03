import { NextResponse } from "next/server";
const URL = `${process.env.N8N_HOST}/webhook/login`;

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
      throw new Error("Failed to login user from the Next API Route");
    const data = await response.json();

    const responseNext = NextResponse.json(data);
    responseNext.cookies.set({
      name: "user-token",
      value: JSON.stringify(data),
      httpOnly: true,
      secure: true,
      sameSite: "strict",
      path: "/",
      maxAge: 60 * 60 * 24, // 1 day
    });

    responseNext.cookies.set({
      name: "user-id",
      value: JSON.stringify(data.id),
      httpOnly: false,
      secure: true,
      sameSite: "strict",
      path: "/",
    });

    return responseNext;
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "Unknown error" },
      { status: 500 }
    );
  }
}
