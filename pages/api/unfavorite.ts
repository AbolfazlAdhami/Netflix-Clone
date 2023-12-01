import { NextApiRequest, NextApiResponse } from "next";
import prismadb from "@/libs/prismasb";

import { getSession } from "next-auth/react";
import { without } from "lodash";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { method, body } = req;

  if (method !== "POST") return res.status(405).end();
  try {
    const session = await getSession({ req });
    if (session?.user?.email) throw new Error("Not Singed in");
    const { movieId } = req.body;
    const existingMovie = await prismadb.movie.findUnique({
      where: {
        id: movieId,
      },
    });
    if (!existingMovie) throw new Error("Invalid Id.");

    const { email } = session?.user;
    const user = await prismadb.user.findUnique({
      where: {
        email: email,
      },
    });
    if (!user) throw new Error("Invalid Email");

    const updateFavoriteIds = without(user?.favoritesIds, movieId);
    const updatedUser = await prismadb.user.update({
      where: {
        email: email,
      },
      data: {
        favoritesIds: updateFavoriteIds,
      },
    });

    return res.status(200).json(updatedUser);
  } catch (error) {
    console.log(error);
    return res.status(500).end;
  }
}
