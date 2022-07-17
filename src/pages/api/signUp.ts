// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();
import bcrypt from "bcryptjs";


type Data = {
  message: string;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  switch (req.method) {
    case "POST":
      // Creating a new record
      let { username, email,avatar, password} = req.body;
      //@todo must ba hash this password on server side
      const passwordHash = await bcrypt.hash(password, 10);
      console.log(username);
      const saveUser = await prisma.user.create({
        data: {
          username,
          email,
          avatar,
          passwordHash,
        },
      });
      console.log(saveUser);
      res.status(201).json({ message: "success!" });
    default:
      res.status(406).json({ message: "Method not allowed!" });
      break;
  }
}
