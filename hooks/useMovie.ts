import useSWR from "swr";
import fetcher from "@/libs/fetcher";

const useMovie = (id?: string) => {
  const req = useSWR(`/api/movies/${id}`, fetcher, {
    revalidateIfStale: false,
    revalidateOnFocus: false,
    revalidateOnReconnect: false,
  });

  const { data, isLoading, error } = req;
  return {
    data,
    error,
    isLoading,
  };
};

export default useMovie;
