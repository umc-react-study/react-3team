import type { MovieResponse } from "../types/Movie";
import { api } from "./axios";

export const fetchMovies = async (category: string, page: number = 1) : Promise<MovieResponse> => {
    const response = await api.get(`/${category}`, {
      params: { page },
    });
    return response.data;
}