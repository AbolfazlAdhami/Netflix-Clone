import Head from "next/head";
import React from "react";
import { useRouter } from "next/router";
import useMovie from "@/hooks/useMovie";

import { FaArrowLeft } from "react-icons/fa6";

const WatchPage = () => {
  const { query, push } = useRouter();
  const { movieId } = query;
  const { data: movie, error, isLoading } = useMovie(movieId as string);
  console.log(movie);
  // if(error){

  // }

  return (
    <>
      <Head>
        <title>{movie ? `${movie.title}` : "Loading..."}</title>
      </Head>
      <div className="h-screen w-screen bg-black">
        <nav className="w-full flex flex-row z-20 fixed p-4 items-center justify-start gap-8 bg-black opacity-60">
          <FaArrowLeft className="text-white w-4 cursor-pointer lg:w-12 hover:opacity-80 transition-all ease-in " onClick={() => push("/")} />
          {movie && (
            <p className="text-white text-base md:text-xl font-bold">
              <span className="font-normal">Watching:</span>
              {movie?.title}
            </p>
          )}
        </nav>
        <video className="w-full h-full " autoPlay controls src={movie?.videoUrl}></video>
      </div>
    </>
  );
};

export default WatchPage;
