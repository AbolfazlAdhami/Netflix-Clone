import { NextApiRequest, NextApiResponse } from "next";
import serverAuth from "@/libs/serverAuth";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    // Block evry request accept only post request
    if (req.method !== "GET") return res.status(405).end();
    // Get current user from serverAuth
    const currentUser = await serverAuth(req, res);

    return res.status(200).json(currentUser);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error: `Some thing is Wrong ${error}` });
  }
}
