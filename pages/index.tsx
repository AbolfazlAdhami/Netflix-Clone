import { NextPageContext } from "next";
import { getSession } from "next-auth/react";
// Coustom hookes
import useMoviesList from "@/hooks/useMovieList";
// Coustom Componets
// import Billboard from "";
import Navbar from "@/components/Navbar";

import dynamic from "next/dynamic";

const DynamicBillboard = dynamic(() => import("@/components/Billboard"), {
  loading: () => <p>Loading...</p>,
});

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
  const { data } = useMoviesList();
  console.log(data);
  return (
    <main className={`flex min-h-screen flex-col items-center justify-between text-white `}>
      <Navbar />
      <DynamicBillboard />
      <div className="py-20"></div>
    </main>
  );
}
