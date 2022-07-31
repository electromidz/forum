// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

type Data = {
  message: string;
  data?: any;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  switch (req.method) {
    case "GET":
      const categories = await prisma.category.findMany({
        orderBy: {
          id: "desc",
        },
      });
      return res.status(201).json({ message: "success!", data: categories });
    default:
      return res.status(406).json({ message: "Method not allowed!" });
  }
}
