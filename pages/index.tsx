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
    <main className={`flex min-h-screen flex-col items-center justify-between p-24 text-white `}>
      Netflix Colon
      <button className="p-4 rounded-lg bg-red-600 text-white" onClick={() => signOut()}>
        Log out!!
      </button>
    </main>
  );
}
