// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

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
      let { title, content, username } = req.body;
      const user = await prisma.user.findUnique({
        where: {
          username,
        },
      });
      console.log(user);
      if (user !== null) {
        // FIXME: I worked there
        const saveUser = await prisma.post.create({
          data: {
            title:title,
            content: content,
            userId: user.id
          },
        });
        console.log(saveUser);
      }
      return res.status(201).json({ message: "success!" });
    default:
      return res.status(406).json({ message: "Method not allowed!" });
  }
}
