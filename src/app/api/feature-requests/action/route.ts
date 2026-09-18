import { NextResponse } from "next/server";
import { getPendingRequest, removePendingRequest, updateRequestStatus } from "@/lib/feature-request-store";

export async function GET(request: Request) {
  const url = new URL(request.url);
  const token = url.searchParams.get("token");
  const decision = url.searchParams.get("decision");

  if (!token || (decision !== "accepted" && decision !== "declined")) {
    return new NextResponse("Invalid feature request action.", { status: 400 });
  }

  const pendingRequest = getPendingRequest(token);
  if (!pendingRequest) {
    return new NextResponse("This feature request has already been handled or expired.", { status: 410 });
  }

  const color = decision === "accepted" ? 0x22c55e : 0xef4444;
  const label = decision === "accepted" ? "Accepted" : "Declined";
  const originalEmbed = pendingRequest.embed;
  const response = await fetch(
    `${pendingRequest.webhookUrl}/messages/${pendingRequest.messageId}`,
    {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        embeds: [
          {
            ...originalEmbed,
            title: `${label}: ${pendingRequest.title}`,
            color,
            description: `**Status: ${label}**\nThis request has been reviewed by the LeviBots team.`,
            footer: { text: `LeviBots feature request ${label.toLowerCase()}` },
          },
        ],
      }),
    },
  );

  if (!response.ok) {
    return new NextResponse("Discord could not update this request.", { status: 502 });
  }

  updateRequestStatus(pendingRequest.requestId, decision);
  removePendingRequest(token);

  return new NextResponse(
    `<html><body style="font-family:system-ui;background:#07070c;color:white;padding:48px;text-align:center"><h1>Feature request ${label.toLowerCase()}</h1><p>You can close this tab.</p></body></html>`,
    { headers: { "Content-Type": "text/html; charset=utf-8" } },
  );
}
