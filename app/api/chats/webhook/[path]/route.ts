import { type NextRequest, NextResponse } from "next/server";

export async function POST(
  request: Request,
  { params }: { params: Promise<{ path: string }> }
) {
  try {
    const { path } = await params;
    // const { chatId, message } = await request.json();
    const form = await request.formData();

    const response = await fetch(`${process.env.N8N_HOST}/webhook/${path}`, {
      method: "POST",
      body: form,
    });

    const data = await response.json();
    console.log(data);
    return NextResponse.json(data.messages);
  } catch (error) {
    console.error("Error processing chat request:", error);
    return NextResponse.json(
      { error: "Error procesando la solicitud" },
      { status: 500 }
    );
  }
}
