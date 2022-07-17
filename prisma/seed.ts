import { PrismaClient } from "@prisma/client";
const db = new PrismaClient();

async function seed() {
  await db.$connect();
}
seed();
