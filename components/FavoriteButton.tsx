import React, { useCallback, useMemo } from "react";
import axios from "axios";

interface FavoriteButtonProps {
  movieId: string;
}

const FavoriteButton: React.FC<FavoriteButtonProps> = ({ movieId }) => {
  return <button type="button">daw</button>;
};

export default FavoriteButton;
