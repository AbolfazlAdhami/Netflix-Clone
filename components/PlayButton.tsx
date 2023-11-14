import React from "react";
import { PlayIcon } from "@heroicons/react/24/outline";
import { useRouter } from "next/router";
interface PlayButtonProps {
  movieId: string | undefined;
}

const PlayButoon: React.FC<PlayButtonProps> = ({ movieId }) => {
  const { push } = useRouter();
  return (
    <button type="button" onClick={() => push(`/whatch/${movieId}`)} className="bg-white rounded-md py-1 md:py-2 px-2 md:px-4 w-auto text-xs lg:text-lg font-semibold flex flex-row items-center text-black hover:bg-neutral-300 transition ">
      <PlayIcon className="w-4 md:w-8 text-black mr-1" />
      Play
    </button>
  );
};

export default PlayButoon;
