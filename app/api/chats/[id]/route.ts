import { NextResponse } from "next/server";
const DELETE_PATH = "7982b486-2179-41ae-9515-1a8daef92447";

export async function DELETE(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;

    const response = await fetch(
      `${process.env.N8N_HOST}/webhook/${DELETE_PATH}/${id}`,
      {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    if (!response.ok) throw new Error("Failed to delete the conversation");

    await new Promise((resolve) => setTimeout(resolve, 1000));
    return NextResponse.json({ message: "Conversation deleted successfully" });
  } catch (error) {
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "Unknown error" },
      { status: 500 }
    );
  }
}
