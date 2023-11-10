import Navbar from "@/components/Navbar";
import { NextPageContext } from "next";
import { signOut, getSession } from "next-auth/react";

export async function getServerSideProps(context: NextPageContext) {
  const session = await getSession(context);
  if (!session) {
    return {
      redirect: {
        destination: "/auth",
        parmanent: false,
      },
    };
  }

  return {
    props: {},
  };
}

export default function Home() {
  return (
    <main className={`flex min-h-screen flex-col items-center justify-between text-white `}>
      <Navbar />
    </main>
  );
}
