import { NextApiRequest, NextApiResponse } from "next";
import prismadb from "@/libs/prismasb";
import serverAuth from "@/libs/serverAuth";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "GET") return res.status(405).end();

  try {
    await serverAuth(req, res);

    const moviesCount = await prismadb.movie.count();
    const randomIndex = Math.floor(Math.random() * moviesCount);

    const randomMovie = await prismadb.movie.findMany({
      take: 1,
      skip: randomIndex,
    });
    return res.status(200).json(randomMovie);
  } catch (error) {
    console.log(error);
    return res.status(500).end();
  }
}
