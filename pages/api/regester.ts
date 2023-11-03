import bcrypt from "bcrypt";

import { NextApiRequest, NextApiResponse } from "next";
import prismadb from "@/libs/prismasb";

export default async function hndler(req: NextApiRequest, res: NextApiResponse) {
  try {
    if (req.method !== "POST") return res.status(405).end();

    const { name, email, password } = req.body;
    const existingUser = await prismadb.user.findUnique({
      where: {
        email,
      },
    });
    if (existingUser) return res.status(422).json({ error: "Email Taken" });

    const hashedPassword = await bcrypt.hash(password, 12);
    const user = await prismadb.user.create({
      data: { name, email, hashedPassword, avatar: "", emailVeriifed: new Date() },
    });
    return res.status(200).json(user);
  } catch (error) {
    return res.status(400).json({ error: `Somthing is Wrong ${error}` });
  }
}
