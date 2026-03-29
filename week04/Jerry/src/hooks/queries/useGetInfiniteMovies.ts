import { useInfiniteQuery } from "@tanstack/react-query";
import { movieKeys } from "./movieKeys";
import { getNowPlayingMovies, getPopularMovies, getTopRatedMovies, getUpcomingMovies } from "../../api/movies";

const infiniteOptions = {
  initialPageParam: 1,
  getNextPageParam: (lastPage: { page: number; total_pages: number }) =>
    lastPage.page < lastPage.total_pages ? lastPage.page + 1 : undefined,
  staleTime: 1000 * 60 * 5,
} as const


export const useInfiniteNowPlayingMovies = () =>
  useInfiniteQuery({
    queryKey: movieKeys.nowPlayingInfinite(),
    queryFn: ({ pageParam }) => getNowPlayingMovies(pageParam),
    ...infiniteOptions,
  })

export const useInfinitePopularMovies = () =>
  useInfiniteQuery({
    queryKey: movieKeys.popularInfinite(),
    queryFn: ({ pageParam }) => getPopularMovies(pageParam),
    ...infiniteOptions,
  })

export const useInfiniteTopRatedMovies = () =>
  useInfiniteQuery({
    queryKey: movieKeys.topRatedInfinite(),
    queryFn: ({ pageParam }) => getTopRatedMovies(pageParam),
    ...infiniteOptions,
  })

export const useInfiniteUpcomingMovies = () =>
  useInfiniteQuery({
    queryKey: movieKeys.upcomingInfinite(),
    queryFn: ({ pageParam }) => getUpcomingMovies(pageParam),
    ...infiniteOptions,
  })