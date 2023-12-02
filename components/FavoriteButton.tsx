import React, { useCallback, useMemo, useState } from "react";
import axios from "axios";

import { FaPlus, FaCheck } from "react-icons/fa";
import useCurrentUser from "@/hooks/useCurrentUser";
import useFavotites from "@/hooks/useFavorites";

interface FavoriteButtonProps {
  movieId: string;
}

const FavoriteButton: React.FC<FavoriteButtonProps> = ({ movieId }) => {
  const [loading, setLoading] = useState(false);
  const { mutate: favoriteListMutate } = useFavotites();
  const { data: currentUser, mutate } = useCurrentUser();

  const isFavorite = useMemo(() => {
    const list: [any] = currentUser?.favoritesIds || [];
    return list.includes(movieId);
  }, [currentUser, movieId]);

  const toggleFavorite = useCallback(async () => {
    setLoading(true);
    let response;
    if (isFavorite) {
      response = await axios.delete("/api/favorite", { data: { movieId } });
    } else {
      response = await axios.post("/api/favorite", { data: { movieId } });
    }

    const updateFavoriteIds = response?.data?.favoritesIds;
    mutate({
      ...currentUser,
      favoritesIds: updateFavoriteIds,
    });
    favoriteListMutate();
    setLoading(false);
  }, [movieId, isFavorite, mutate, currentUser, favoriteListMutate]);

  const Icon = isFavorite ? FaCheck : FaPlus;

  return (
    <div
      onClick={!loading ? toggleFavorite : () => console.log("Loading...")}
      className={`cursor-pointer group/item w-6 h-6 lg:w-10 lg:h-10 border-white border-2 rounded-full flex items-center justify-center  hover:border-neutral-300 transition-all ease-in duration-200 ${
        loading ? "opacity-40" : "opacity-100"
      }`}
    >
      <Icon className="transition-all ease-in text-xl text-white group-hover/item:text-neutral-300 w-4 lg:w-6" />
    </div>
  );
};

export default FavoriteButton;
