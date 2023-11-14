import React, { useCallback, useEffect, useState } from "react";
import useBillboard from "@/hooks/useBillboard";
import useInfoModalStore from "@/hooks/useInfoModalStore";

import PlayButoon from "@/components/PlayButton";
import { InformationCircleIcon } from "@heroicons/react/24/solid";
import { MovieInterFace } from "../types/index";

const Billboard: React.FC = () => {
  const { data, isLoading } = useBillboard();
  const [movie, setMovie] = useState<MovieInterFace>();
  const { openModal } = useInfoModalStore();

  useEffect(() => {
    console.log(data, isLoading);
    if (!isLoading && data != null) {
      const movieData = data[0];
      setMovie({ ...movieData });
      console.log(movieData);
    }
  }, [isLoading, data]);

  const handleOpenModal = useCallback(() => {
    openModal(movie?.id);
  }, [openModal, movie]);

  return (
    <div className="relative w-full h-[50vw]">
      <video poster={movie?.thumbnailUrl} className="w-full h-full object-cover brightness-[80%] transition duration-500" src={movie?.videoUrl} muted autoPlay loop></video>
      <div className="absolute top-[30%] md:top-[50%] ml-4 md:ml-8">
        <p className="text-white text-xl md:text-3xl h-full w-1/2 lg:text-4xl font-bold drop-shadow-xl">{movie?.title}</p>
        <p className="text-white text-[8px]  capitalize md:text-lg h-full mt-2 md:mt-4 w-1/2 md:w-4/5 lg:w-1/2  lg:text-xl  drop-shadow-xl">{movie?.description}</p>
        <div className="flex flex-row items-center mt-3 md:mt-5 gap-3">
          <PlayButoon movieId={movie?.id} />
          <button onClick={handleOpenModal} className=" bg-gray-100 text-white bg-opacity-70 rounded-md py-1 md:py-2 px-2 md:px-4 w-auto text-xs lg:text-lg font-semibold flex items-center hover:bg-opacity-20 transition">
            <InformationCircleIcon className="w-4 md:w-8 mr-1" />
            More Info
          </button>
        </div>
      </div>
    </div>
  );
};

export default Billboard;
