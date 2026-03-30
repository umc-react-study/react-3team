import type { MovieListResponse } from "../types/movie"

const BASE_URL = 'https://api.themoviedb.org/3'
const ACCESS_TOKEN = import.meta.env.VITE_TMDB_ACCESS_TOKEN

const fetchMovies = async (endPoint: string, page = 1): Promise<MovieListResponse> => {
    const res = await fetch(
        `${BASE_URL}/movie/${endPoint}?language=ko-KR&page=${page}`,
        {
            headers: {
                Authorization: `Bearer ${ACCESS_TOKEN}`,
                'Content-Type': 'application/json',
            },
        }
    ); 
    if (!res.ok) throw new Error('Failed to fetch movies')
    return res.json(); 
}

export const getPopularMovies = (page?: number) => fetchMovies('popular', page);
export const getNowPlayingMovies = (page?: number) => fetchMovies('now_playing', page);
export const getTopRatedMovies = (page?: number) => fetchMovies('top_rated', page);
export const getUpcomingMovies = (page?: number) => fetchMovies('upcoming', page);