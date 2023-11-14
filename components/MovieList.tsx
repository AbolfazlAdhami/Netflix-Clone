import React from "react";
import { MovieInterFace } from "@/types";
import MoviesCard from "./MovieCard";
import { isEmpty } from "lodash";

interface MovieListProps {
  data: MovieInterFace[];
  title?: string;
}

const MovieList: React.FC<MovieListProps> = ({ data, title }) => {
  if (isEmpty(data)) return null;

  return (
    <div className="px-4 md:px-12 mt-4 space-y-4">
      <div>
        <p className="text-white text-lg md:text-xl lg:text-2xl font-semibold mb-4">{title}</p>
        <div className="grid grid-cols-2 gap-2">
          {data.map((movie) => (
            <MoviesCard key={movie.id} movie={movie} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default MovieList;
