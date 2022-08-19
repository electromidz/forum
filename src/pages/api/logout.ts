// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import { PrismaClient } from "@prisma/client";
const db = new PrismaClient();
import bcrypt from "bcryptjs";

type Data = {
  message?: string;
  hasError?: boolean;
  username?: string;
};

async function login(username: string, password: string) {
  const user = await db.user.findUnique({
    where: { username },
  });
  if (!user) return null;

  const isCorrectPassword = await bcrypt.compare(password, user.passwordHash);
  if (!isCorrectPassword) return null;

  return { id: user.id, username };
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  try {
    if (req.method == "GET") {
      res.setHeader(
        "set-cookie",
        `session=logout; path=/; samesite=lax; httponly=true;Expires=0; max-Age=0`
      );

      return res.status(200).json({ message: "success!", hasError: false });
    }
    return res
      .status(405)
      .json({ message: "Method not allowed!", hasError: true });
  } catch (error) {
    return res
      .status(500)
      .json({ message: "We have server problem!", hasError: true });
  }
}
