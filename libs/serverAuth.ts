import { NextApiRequest, NextApiResponse } from "next";
import { getServerSession } from "next-auth";

import prismadb from "@/libs/prismasb";
import { authOption } from "@/pages/api/auth/[...nextauth]";

const serverAuth = async (req: NextApiRequest, res: NextApiResponse) => {
  const session = await getServerSession(req, res, authOption);

  if (!session?.user?.email) throw new Error("Not Singed in");

  const currentUser = await prismadb.user.findUnique({
    where: {
      email: session.user.email,
    },
  });
  if (!currentUser) throw new Error("Not Singed in");

  return { currentUser };
};

export default serverAuth;
