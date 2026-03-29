import { useQuery } from '@tanstack/react-query';
import { movieKeys } from './movieKeys';
import { getNowPlayingMovies, getPopularMovies, getTopRatedMovies, getUpcomingMovies } from '../../api/movies';

export const usePopularMovies = (page = 1) => {
  return useQuery({
    queryKey: movieKeys.popular(page),
    queryFn: () => getPopularMovies(page),
    staleTime: 1000 * 60 * 5, 
  });
};

export const useNowPlayingMovies = (page = 1) => {
  return useQuery({
    queryKey: movieKeys.nowPlaying(page),
    queryFn: () => getNowPlayingMovies(page),
    staleTime: 1000 * 60 * 5,
  });
};

export const useTopRatedMovies = (page = 1) => {
    return useQuery({
        queryKey: movieKeys.topRated(page),
        queryFn: () => getTopRatedMovies(page),
        staleTime: 1000 * 60 * 5,
    });
};

export const useUpcomingMovies = (page = 1) => {
    return useQuery({
        queryKey: movieKeys.upcoming(page),
        queryFn: () => getUpcomingMovies(page),
        staleTime: 1000 * 60 * 5,
    });
};

