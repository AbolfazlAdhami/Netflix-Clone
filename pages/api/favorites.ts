import { NextApiRequest, NextApiResponse } from "next";
import prismadb from "@/libs/prismasb";
import serverAuth from "@/libs/serverAuth";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { method } = req;
  if (method !== "GET") return res.status(405).end();
  try {
    const currentUser = await serverAuth(req, res);
    const favoriteMovies = await prismadb.movie.findMany({
      where: {
        id: { in: currentUser?.favoritesIds },
      },
    });
    return res.status(200).json(favoriteMovies);
  } catch (error) {
    console.log(error);
    return res.status(500).end();
  }
}
