import React from "react";
import { useRouter } from "next/router";

import { MovieInterFace } from "@/types";
import useInfoModalStore from "@/hooks/useInfoModalStore";

interface MovieCardProps {
  movie: MovieInterFace;
}

const MoviesCard: React.FC<MovieCardProps> = ({ movie }) => {
  return <></>;
};

export default MoviesCard;
