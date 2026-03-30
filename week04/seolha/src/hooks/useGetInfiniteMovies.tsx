import { useInfiniteQuery, type InfiniteData, type UseInfiniteQueryResult } from "@tanstack/react-query";
import type { MovieResponse } from "../types/Movie";
import { fetchMovies } from "../api/movie";

export const useGetInfiniteMovies = (
  category: string
): UseInfiniteQueryResult<InfiniteData<MovieResponse>, Error> => {
  return useInfiniteQuery<MovieResponse, Error, InfiniteData<MovieResponse>, [string], number>({
    queryKey: [category],
    queryFn: ({ pageParam = 1 }) => fetchMovies(category, pageParam),
    getNextPageParam: (lastPage) =>
      lastPage.page < lastPage.total_pages ? lastPage.page + 1 : undefined,
    initialPageParam: 1,
  });
};