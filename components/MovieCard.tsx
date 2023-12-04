/* eslint-disable @next/next/no-img-element */
import React, { useCallback } from "react";
import { useRouter } from "next/router";
import { MovieInterFace } from "@/types";
import useInfoModalStore from "@/hooks/useInfoModalStore";

import { ChevronDoubleDownIcon, PlayIcon } from "@heroicons/react/24/outline";
import FavoriteButton from "./FavoriteButton";

interface MovieCardProps {
  movie: MovieInterFace;
}

const MoviesCard: React.FC<MovieCardProps> = ({ movie }) => {
  const { push } = useRouter();
  const { openModal } = useInfoModalStore();
  const redirectToWatch = useCallback(() => push(`/watch/${movie.id}`), [movie, push]);

  return (
    <div className="group bg-zinc-900  col-span-4 md:col-span-2 lg:col-span-1 relative h-[20vw] md:h-[14vw]">
      <img
        onClick={redirectToWatch}
        className="w-full h-[20vw] md:h-[14vw] object-cover cursor-pointer transition-all duration-300 delay-400 ease-linear shadow-xl rounded-md group-hover:opacity-90 sm:group-hover:opacity-0"
        src={movie.thumbnailUrl}
        alt="movie"
        draggable={false}
      />
      <div className="opacity-0 overflow-x-visible absolute top-0 transition-all duration-300 ease-linear delay-400 z-10 invisible sm:visible w-[125%] scale-0 group-hover:scale-110 group-hover:-translate-y-[8vw] group-hover:translate-x-[0vw] group-hover:opacity-100 ">
        <img onClick={redirectToWatch} src={movie.thumbnailUrl} className="w-full h-[14vw] cursor-pointer object-cover transition-all duration-200  shadow-xl rounded-t-md " alt="movie" />
        <div className="z-10 bg-zinc-800 p-2 lg:p-4 absolute w-full transition shadow-sm rounded-b-md">
          <div className="flex flex-col w-full items-start justify-start gap-2 ">
            <div className="flex w-full items-center justify-around gap-4">
              <div onClick={redirectToWatch} className="cursor-pointer  group/items w-6 h-6 lg:w-10 lg:h-10 bg-white border-2 rounded-full flex justify-center hover:bg-neutral-300">
                <PlayIcon className="text-black w-4 lg:w-6" />
              </div>
              <FavoriteButton movieId={movie.id} />
              <div onClick={() => openModal(movie?.id)} className="cursor-pointer ml-auto group/item w-6 h-6 lg:w-10 lg:h-10 border-white border-2 rounded-full flex justify-center items-center">
                <ChevronDoubleDownIcon className="text-white group-hover/item:text-neutral-300 w-4 lg:w-10 " />
              </div>
            </div>

            <div className="flex flex-col justify-around items-start">
              <p className="text-green-400 text-sm font-semibold ">
                New <span className="text-white">2023</span>
              </p>
              <div className="flex flex-row items-center  gap-2 ">
                <p className="text-white text-[10px] lg:text-sm">{movie.duration}</p>
              </div>
              <div className="flex flex-row items-center  gap-2   text-[8px] lg:text-xs text-start">
                <p>{movie?.genere}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MoviesCard;
