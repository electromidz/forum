// lib/prisma.ts
import { PrismaClient } from '@prisma/client';
declare global {
  var prisma: string | any;
}

let prisma: PrismaClient;

if (process.env.NODE_ENV === 'production') {
  prisma = new PrismaClient({log: ["query"]});
} else {
  if (!global.prisma) {
    global.prisma = new PrismaClient();
  }
  prisma = global.prisma;
}

export default prisma;
