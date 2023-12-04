import React, { useCallback, useState, useEffect } from "react";
import useMovie from "@/hooks/useMovie";
import useInfoModalStore from "@/hooks/useInfoModalStore";

import { VscChromeClose } from "react-icons/vsc";
import PlayButoon from "./PlayButton";
import FavoriteButton from "./FavoriteButton";

interface InfoModalProps {
  visible?: boolean;
  onClose: any;
}

const InfoModal: React.FC<InfoModalProps> = ({ onClose, visible }) => {
  const { movieId } = useInfoModalStore();
  const { data = {} } = useMovie(movieId);
  const [isVisible, setIsVisible] = useState<boolean>(!!visible);
  useEffect(() => setIsVisible(!!visible), [visible]);
  const handlClose = useCallback(() => {
    setIsVisible(false);
    setTimeout(() => {
      onClose();
    }, 500);
  }, [onClose]);
  if (!visible) return null;
  console.log(123);
  return (
    <div className="z-50 transition duration-500 bg-black bg-opacity-70 flex justify-center items-center  overflow-x-hidden overflow-y-auto fixed inset-0">
      <div className="relative w-auto mx-auto max-w-3xl  rounded-md overflow-hidden">
        <div className={` ${isVisible ? "scale-100" : "scale-0"} transform duration-500 relative flex-auto bg-zinc-900 drop-shadow-md `}>
          <div className="h-96 relative">
            <video className="w-full rounded-t-md object-cover brightness-75 h-full" poster={data?.thumbnailUrl} src={data?.videoUrl} autoPlay controls loop muted></video>
            <div
              className="cursor-pointer absolute group group-hover:bg-neutral-300  hover:bg-neutral-300  transition-all ease-in top-3 right-3 h-10 w-10 rounded-full bg-black bg-opacity-70 flex items-center justify-center"
              onClick={handlClose}
            >
              <VscChromeClose className="text-white group-hover:text-black  w-8" />
            </div>
            <div className="absolute bottom-[10%] left-10 ">
              <p className="text-white text-3xl  lg:text-5xl md:text-4xl h-full font-bold mb-6">{data?.title}</p>
              <div className="flex flex-row gap-4 mb-6">
                <PlayButoon movieId={movieId} />
                <FavoriteButton movieId={movieId} />
              </div>
            </div>
          </div>
          <div className="px-8 py-4">
            <div className="flex flex-col items-start  gap-2 mb-8">
              <div className="flex flex-row justify-start items-center gap-4">
                <p className="text-green-400 font-semibold text-lg ">New</p>
                <p className="text-white text-lg">{data?.duration}</p>
                <p className="text-white text-lg">{data?.genere}</p>
              </div>
              <p className="text-white  ">{data?.description}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default InfoModal;
