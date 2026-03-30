import {useQuery} from "@tanstack/react-query";
import {api} from "../api/axios";
import type { MovieResponse } from "../types/Movie";
import { fetchMovies } from "../api/movie";

export const useGetMovies = (
  category: string,
  page: number = 1
) => {{
    const options = {
      queryKey: [category, page],
      queryFn: () => fetchMovies(category, page),
      placeholderData: { page: 1, results: [], total_pages: 1, total_results: 0 },
      staleTime: 1000 * 60 * 5,
      keepPreviousData: true,
    };

    return useQuery<MovieResponse>(options);
  }
};

