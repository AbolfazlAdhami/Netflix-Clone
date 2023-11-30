import { NextApiRequest, NextApiResponse } from "next";
import serverAuth from "@/libs/serverAuth";
import prismadb from "@/libs/prismasb";
import { without } from "lodash";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { method } = req;
  const currentUser = await serverAuth(req, res);

  try {
    if (method == "POST") {
      const { movieId } = req.body;
      const existingMovie = await prismadb.movie.findUnique({
        where: {
          id: movieId,
        },
      });
      if (!existingMovie) throw new Error("Invalid id");

      const user = await prismadb.user.update({
        where: {
          email: currentUser.email || "",
        },
        data: {
          favoritesIds: {
            push: movieId,
          },
        },
      });

      return res.status(200).json(user);
    }
    if (method == "DELETE") {
      const { movieId } = req.body;
      const existingMovie = await prismadb.movie.findUnique({
        where: {
          id: movieId,
        },
      });
      if (!existingMovie) throw new Error("Invalid id");

      const updatedList = without(currentUser.favoritesIds, movieId);
      const updatedUser = await prismadb.user.update({
        where: {
          email: currentUser.email || "",
        },
        data: {
          favoritesIds: updatedList,
        },
      });
      return res.status(200).json(updatedUser);
    }

    return res.status(405).end();
  } catch (error) {
    console.log(error);
    return res.status(500).end();
  }
}
