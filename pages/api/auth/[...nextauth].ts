import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";
import prismadb from "@/libs/prismasb";
import { bcrypt } from "bcrypt";

export default NextAuth({
  providers: [
    Credentials({
      id: "credentials",
      name: "Credemtials",
      credentials: {
        email: {
          label: "Email",
          type: "text",
        },
        password: {
          label: "Passwird",
          type: "password",
        },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) throw new Error("Email and Password is Required");
        const user = await prismadb.user.findUnique({
          where: {
            email: credentials.email,
          },
        });
        if (!user || !user.hashedPassword) throw new Error("Email does not Exist");

        const isCorrectPass = await bcrypt.compare(credentials.password, user.hashedPassword);
        if (!isCorrectPass) throw new Error("Incorrect Password!!!");

        return user;
      },
    }),
  ],
  pages: { signIn: "/auth" },
  debug: process.env.NODE_ENV === "development",
  session: {
    strategy: "jwt",
  },
  jwt: {
    secret: process.env.NEXTAUTH_JWT_SECRET,
  },
  secret: process.env.NEXTAUTH_SECRET,
});
