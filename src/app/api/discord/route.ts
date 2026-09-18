import { NextResponse } from "next/server";

import { fetchDiscordGuildWidget } from "@/lib/discord";

export async function GET() {
  const widget = await fetchDiscordGuildWidget();

  if (!widget) {
    return NextResponse.json(
      {
        error: "Discord widget unavailable",
      },
      { status: 502 },
    );
  }

  return NextResponse.json(widget);
}
