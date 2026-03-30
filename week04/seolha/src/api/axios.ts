import axios from "axios";

export const API_BASE_URL = "https://api.themoviedb.org/3/movie";

export const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    Authorization: `Bearer ${import.meta.env.VITE_TMDB_API_KEY}`,
    Accept: "application/json",
  },
  params: {
    language: "ko-KR",
    region: "KR",
  },
});