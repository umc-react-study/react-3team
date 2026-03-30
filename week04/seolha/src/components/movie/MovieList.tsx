import { useSearchParams } from "react-router-dom";
import MovieCard from "./MovieCard";
import { useGetMovies } from "../../hooks/useGetMovies";
import { useEffect, useState } from "react";

export default function MovieList() {
  const [searchParams] = useSearchParams();
  const category = searchParams.get("category") || "now_playing";

  const [page, setPage] = useState(1);

  useEffect(() => {
    setPage(1); // 카테고리 변경 시 페이지 초기화
  }, [category]);

  const { data, error, isLoading, isFetching } = useGetMovies(category, page);

  if (isLoading && !data) {
    // 처음 로딩 시만 skeleton
    return (
      <div className="flex gap-4">
        {Array.from({ length: 3 }).map((_, i) => (
          <div
            key={i}
            className="w-44 h-64 bg-gray-200 animate-pulse rounded-xl"
          />
        ))}
      </div>
    );
  }

  if (error) return <div>Error occurred while fetching movies.</div>;

  return (
    <div className="flex flex-col items-center">
      {/* 영화 카드 리스트 */}
      <div className="w-[600px] py-4 overflow-x-auto scrollbar-hide relative">
        <div className="flex px-4 gap-4 flex-nowrap">
          {data?.results.map((movie) => (
            <MovieCard key={movie.id} movie={movie} />
          ))}
        </div>
        {/* 페이지 전환 로딩 표시 */}
        {isFetching && !isLoading && (
          <div className="py-32 w-full h-full flex items-center justify-center rounded-xl">
            <span className="text-gray-500">Loading...</span>
          </div>
        )}
      </div>

      {/* 페이지 버튼 */}
      <div className="flex gap-2 justify-center mt-2">
        <button
          className="border border-gray-800 text-sm text-gray-800 px-2 py-1 rounded-3xl 
                     hover:bg-gray-800 hover:text-white hover:cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
          onClick={() => setPage((prev) => prev - 1)}
          disabled={page === 1}
        >
          이전 {'<'}
        </button>

        <button
          className="border border-gray-800 text-sm text-gray-800 px-2 py-1 rounded-3xl 
                     hover:bg-gray-800 hover:text-white hover:cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
          onClick={() => setPage((prev) => prev + 1)}
          disabled={page >= (data?.total_pages || 1)}
        >
          다음 {'>'}
        </button>
      </div>
    </div>
  );
}