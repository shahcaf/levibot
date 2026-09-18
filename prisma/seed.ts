import { PrismaClient } from "@prisma/client";
import { hash } from "bcryptjs";

const prisma = new PrismaClient();

async function main() {
  const passwordHash = await hash("Password123!", 10);

  const user = await prisma.user.upsert({
    where: { email: "admin@lumenbio.app" },
    update: {},
    create: {
      email: "admin@lumenbio.app",
      username: "admin",
      displayName: "Lumen Admin",
      passwordHash,
    },
  });

  await prisma.profile.upsert({
    where: { userId: user.id },
    update: {},
    create: {
      userId: user.id,
      handle: "admin",
      profileUrl: "admin",
      bio: "Premium profile builder for your brand.",
      location: "Global",
      backgroundType: "GRADIENT",
      backgroundValue: "linear-gradient(135deg, rgba(99,102,241,0.8), rgba(56,189,248,0.7))",
    },
  });
}

main()
  .catch((error) => {
    console.error(error);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
