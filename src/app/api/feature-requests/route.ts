import { NextResponse } from "next/server";
import { randomUUID } from "node:crypto";
import { featureRequestSchema } from "@/lib/validators/feature-request";
import { savePendingRequest } from "@/lib/feature-request-store";

const submissions = new Map<string, number>();
const submissionWindowMs = 10 * 60 * 1000;

function getClientKey(request: Request) {
  return request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || "unknown";
}

export async function POST(request: Request) {
  const clientKey = getClientKey(request);
  const lastSubmission = submissions.get(clientKey);

  if (lastSubmission && Date.now() - lastSubmission < submissionWindowMs) {
    return NextResponse.json(
      { error: "Please wait a few minutes before sending another request." },
      { status: 429 },
    );
  }

  try {
    const parsed = featureRequestSchema.safeParse(await request.json());

    if (!parsed.success) {
      return NextResponse.json(
        { error: "Please check the form and provide a valid request." },
        { status: 400 },
      );
    }

    const webhookUrl = process.env.DISCORD_FEATURE_WEBHOOK_URL;
    if (!webhookUrl) {
      console.error("DISCORD_FEATURE_WEBHOOK_URL is not configured.");
      return NextResponse.json({ error: "Feature requests are temporarily unavailable." }, { status: 503 });
    }

    const { title, category, priority, details, contact } = parsed.data;
    const actionToken = randomUUID();
    const requestId = actionToken.slice(0, 8).toUpperCase();
    const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? new URL(request.url).origin;
    const webhookEndpoint = new URL(webhookUrl);
    webhookEndpoint.searchParams.set("wait", "true");
    const webhookResponse = await fetch(webhookEndpoint, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      signal: AbortSignal.timeout(10000),
      body: JSON.stringify({
        username: "LeviBots Features",
        allowed_mentions: { parse: [] },
        embeds: [
          {
            title: `New feature request: ${title}`,
            color: 0x8b5cf6,
            description: `**Review actions**\n[✅ Accept request](${siteUrl}/api/feature-requests/action?token=${actionToken}&decision=accepted)  ·  [❌ Decline request](${siteUrl}/api/feature-requests/action?token=${actionToken}&decision=declined)`,
            fields: [
              { name: "Category", value: category, inline: true },
              { name: "Priority", value: priority, inline: true },
              { name: "Request ID", value: `\`${requestId}\``, inline: true },
              { name: "Contact", value: contact || "Not provided", inline: true },
              { name: "Details", value: details },
            ],
            footer: { text: "LeviBots feature queue · Submitted from the website" },
            timestamp: new Date().toISOString(),
          },
        ],
      }),
    });

    if (!webhookResponse.ok) {
      console.error("Discord feature webhook failed:", webhookResponse.status);
      return NextResponse.json({ error: "We could not deliver your request. Please try again." }, { status: 502 });
    }

    const webhookMessage = await webhookResponse.json();
    if (!webhookMessage?.id) {
      return NextResponse.json({ error: "The request was not acknowledged by Discord." }, { status: 502 });
    }

    savePendingRequest(actionToken, {
      webhookUrl,
      messageId: webhookMessage.id,
      title,
      requestId,
      category,
      priority,
      details,
      contact: contact || "",
      createdAt: new Date().toISOString(),
      status: "pending",
      embed: {
        title: `New feature request: ${title}`,
        color: 0x8b5cf6,
        description: `**Review actions**\n[✅ Accept request](${siteUrl}/api/feature-requests/action?token=${actionToken}&decision=accepted)  ·  [❌ Decline request](${siteUrl}/api/feature-requests/action?token=${actionToken}&decision=declined)`,
        fields: [
          { name: "Category", value: category, inline: true },
          { name: "Priority", value: priority, inline: true },
          { name: "Request ID", value: `\`${requestId}\``, inline: true },
          { name: "Contact", value: contact || "Not provided", inline: true },
          { name: "Details", value: details },
        ],
        footer: { text: "LeviBots feature queue · Submitted from the website" },
        timestamp: new Date().toISOString(),
      },
    });
    submissions.set(clientKey, Date.now());
    return NextResponse.json({ ok: true });
  } catch (error) {
    console.error("Feature request error:", error);
    return NextResponse.json({ error: "Something went wrong. Please try again." }, { status: 500 });
  }
}
