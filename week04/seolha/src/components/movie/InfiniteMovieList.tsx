import { useRef, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import MovieCard from "./MovieCard";
import { useGetInfiniteMovies } from "../../hooks/useGetInfiniteMovies";

export default function InfiniteMovieList() {
  const [searchParams] = useSearchParams();
  const category = searchParams.get("category") || "now_playing";

  const {
    data,
    error,
    isLoading,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  } = useGetInfiniteMovies(category);

  // 스크롤 컨테이너 & 끝 감지용 ref
  const scrollContainerRef = useRef<HTMLDivElement | null>(null);
  const loadMoreRef = useRef<HTMLDivElement | null>(null);

  // IntersectionObserver: 좌우 스크롤 끝 감지
  useEffect(() => {
    if (!scrollContainerRef.current || !loadMoreRef.current) return;

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && hasNextPage && !isFetchingNextPage) {
          fetchNextPage();
        }
      },
      {
        root: scrollContainerRef.current,
        rootMargin: "100px",
        threshold: 0,
      }
    );

    observer.observe(loadMoreRef.current);

    return () => {
      if (loadMoreRef.current) observer.unobserve(loadMoreRef.current);
    };
  }, [fetchNextPage, hasNextPage, isFetchingNextPage]);

  // 로딩 상태
  if (isLoading) {
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

  // 모든 페이지 결과 합치기
  const movies = data?.pages.flatMap((page) => page.results) ?? [];

  return (
    <div className="flex flex-col items-center w-[600px]">
      {/* 영화 카드 리스트 */}
      <div
        ref={scrollContainerRef}
        className="w-full py-4 overflow-x-auto scrollbar-hide relative"
      >
        <div className="flex px-4 gap-4 flex-nowrap">
          {movies.map((movie) => (
            <MovieCard key={movie.id} movie={movie} />
          ))}

          {/* IntersectionObserver 대상 */}
          <div ref={loadMoreRef} className="w-1 h-1" />
        </div>

        {/* 페이지 전환 로딩 표시 */}
        {isFetchingNextPage && (
          <div className="absolute top-0 left-0 w-full h-full bg-white/50 flex items-center justify-center rounded-xl">
            <span className="text-gray-500">Loading...</span>
          </div>
        )}
      </div>
    </div>
  );
}