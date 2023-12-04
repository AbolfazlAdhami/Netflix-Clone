import Head from "next/head";

import { NextPageContext } from "next";
import { getSession } from "next-auth/react";
// Coustom hookes
import useMoviesList from "@/hooks/useMovieList";
import useFavotites from "@/hooks/useFavorites";
// Coustom Componets
// import Billboard from "";
import Navbar from "@/components/Navbar";

import dynamic from "next/dynamic";
import MovieList from "@/components/MovieList";
import useInfoModalStore from "@/hooks/useInfoModalStore";
import InfoModal from "@/components/infoModal";

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
  const { data: trendList } = useMoviesList();
  const { data: favoriteList } = useFavotites();
  const { isOpen, closeModal } = useInfoModalStore();

  return (
    <>
      <Head>
        <title>Nefflix App</title>
      </Head>
      <main className={`flex min-h-screen flex-col items-center justify-between text-white `}>
        <InfoModal onClose={closeModal} visible={isOpen} />
        <Navbar />
        <DynamicBillboard />
        <div className="my-6 pb-24 w-full">
          <MovieList data={trendList} title="Trending Today" />
          <MovieList data={favoriteList} title="Favorite List" />
        </div>
      </main>
    </>
  );
}
