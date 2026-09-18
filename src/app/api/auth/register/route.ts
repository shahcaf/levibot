import { NextRequest, NextResponse } from "next/server";
import { hash } from "bcryptjs";
import { prisma } from "@/lib/prisma";
import { signUpSchema } from "@/lib/validators/user";

export async function POST(request: NextRequest) {
  const body = await request.json();

  if (typeof body?.website === "string" && body.website.trim()) {
    return NextResponse.json({ error: "Invalid input." }, { status: 400 });
  }

  const parseResult = signUpSchema.safeParse(body);
  if (!parseResult.success) {
    return NextResponse.json({ error: "Invalid input." }, { status: 400 });
  }

  const { email, password, username, displayName } = parseResult.data;

  const existingUser = await prisma.user.findFirst({
    where: {
      OR: [
        { email },
        { username },
      ],
    },
  });

  if (existingUser) {
    return NextResponse.json({ error: "Email or username is already taken." }, { status: 409 });
  }

  const passwordHash = await hash(password, 10);
  const user = await prisma.user.create({
    data: {
      email,
      username,
      displayName,
      passwordHash,
      profile: {
        create: {
          handle: username,
          profileUrl: username,
          backgroundType: "GRADIENT",
          backgroundValue: "linear-gradient(135deg, rgba(99,102,241,0.8), rgba(56,189,248,0.7))",
        },
      },
    },
  });

  return NextResponse.json({ user: { id: user.id, email: user.email, username: user.username } }, { status: 201 });
}
