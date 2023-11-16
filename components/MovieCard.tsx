/* eslint-disable @next/next/no-img-element */
import React, { useCallback } from "react";
import { useRouter } from "next/router";

import { MovieInterFace } from "@/types";
import useInfoModalStore from "@/hooks/useInfoModalStore";

interface MovieCardProps {
  movie: MovieInterFace;
}

const MoviesCard: React.FC<MovieCardProps> = ({ movie }) => {
  const { push } = useRouter();
  const redirectToWatch = useCallback(() => push(`/watch/${movie.id}`), [movie, push]);

  return (
    <div className="group bg-zinc-900 col-span-1 relative h-[12vw]">
      <img
        onClick={redirectToWatch}
        className="w-full h-[14vw] object-cover cursor-pointer transition-all duration-150 delay-300 ease-linear shadow-xl rounded-md group-hover:opacity-90 sm:group-hover:opacity-0"
        src={movie.thumbnailUrl}
        alt="movie"
        draggable={false}
      />
      <div className="opacity-0 absolute top-0 transition-all duration-300  ease-linear delay-300 z-10 invisible sm:visible w-full scale-0 group-hover:scale-110 group-hover:-translate-y-[8vw] group-hover:translate-x-[2vw] group-hover:opacity-100 ">
        <img onClick={redirectToWatch} src={movie.thumbnailUrl} className="w-full h-[14vw] cursor-pointer object-cover transition-all duration-200  shadow-xl rounded-t-md " alt="movie" />
      </div>
    </div>
  );
};

export default MoviesCard;
