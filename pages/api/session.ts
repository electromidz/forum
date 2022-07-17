// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import { PrismaClient } from "@prisma/client";
const db = new PrismaClient();
import bcrypt from "bcryptjs";

type Data = {
  message?: string;
  hasError?: boolean
};

async function login(username:string, password: string) {
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
    if(req.method == "POST") {
      let { username, password } = req.body;
            const user = await login(username, password);
            if (user !== null) {
              const usernameHash = await bcrypt.hash(username, 10);
              res.setHeader(
                  "set-cookie",
                  `session=${usernameHash}; path=/; samesite=lax; httponly;`
              );
              res.status(200).json({message: "success!" , hasError: false});
            }
      res.status(401).json({message: "User not Authorized!", hasError: true});
    }
  } catch (error) {
    res.status(500).json({ message: "Method not allowed!" , hasError: true });
  }
}
