import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const message = typeof body?.message === "string" ? body.message.trim() : "";

    if (!message) {
      return NextResponse.json(
        { error: "A message is required." },
        { status: 400 },
      );
    }

    const apiKey = process.env.GROQ_API_KEY;

    if (!apiKey) {
      return NextResponse.json(
        { error: "The Groq API key is not configured on the server." },
        { status: 500 },
      );
    }

    const response = await fetch("https://api.groq.com/openai/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        model: "openai/gpt-oss-20b",
        messages: [
          {
            role: "system",
            content:
              "You are LeviBots Assistant, a helpful support bot for the LeviBots Discord community and landing page. Answer questions about LeviBots, commands, community access, support, privacy, bot invites, and Discord moderation workflows. Keep responses concise, friendly, and practical. If asked unrelated questions, briefly redirect back to LeviBots support or community topics.",
          },
          {
            role: "user",
            content: message,
          },
        ],
        temperature: 0.7,
        max_tokens: 500,
        reasoning_effort: "low",
      }),
    });

    if (!response.ok) {
      const errorText = await response.text();
      return NextResponse.json(
        {
          error: "Groq request failed.",
          details: errorText,
        },
        { status: response.status },
      );
    }

    const data = await response.json();
    const reply =
      data?.choices?.[0]?.message?.content?.trim() ||
      "I’m here to help with LeviBots questions, community access, bot invites, support, and commands.";

    return NextResponse.json({ reply });
  } catch (error) {
    console.error("Groq proxy error:", error);
    return NextResponse.json(
      {
        error: "Something went wrong while contacting the assistant.",
      },
      { status: 500 },
    );
  }
}
