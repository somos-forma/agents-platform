import { NextResponse } from "next/server";
const N8N_HOST = process.env.N8N_HOST || "http://localhost:3000";
const N8N_API_KEY = process.env.N8N_API_KEY || "";
const PATH =
  "workflows?active=true&tags=agents-mvp&excludePinnedData=true&limit=250";
const OPTIONS = {
  headers: {
    "X-N8N-API-KEY": `${N8N_API_KEY}`,
    "Content-Type": "application/json",
  },
};

export async function GET() {
  try {
    const res = await fetch(`${N8N_HOST}/api/v1/${PATH}`, OPTIONS);

    if (!res.ok) {
      return NextResponse.json(
        {
          message: "Error al obtener workflows de n8n",
        },
        { status: res.status },
      );
    }

    const { data } = await res.json();
    return NextResponse.json({
      data,
    });
  } catch (error) {
    return NextResponse.json(
      {
        message: "Error interno del servidor.",
      },
      { status: 500 },
    );
  }
}
