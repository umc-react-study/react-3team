import { useSearchParams } from "react-router-dom";
import MovieList from "../movie/MovieList";
import InfiniteMovieList from "../movie/InfiniteMovieList";

export default function MainLayout() {
  const [searchParams] = useSearchParams();
  const category = searchParams.get("category") || "now_playing";

  return (
    <div className="w-[600px] mx-auto flex flex-col items-start">
      {/* MovieList 섹션 */}
      <div className="flex flex-col gap-4 w-full">
        <h1 className="text-2xl font-bold px-4">
          {category === "now_playing"
            ? "현재 상영중"
            : category === "top_rated"
            ? "높은 평점의 영화"
            : category === "upcoming"
            ? "상영 예정작"
            : "인기 영화"}
        </h1>

        <div className="relative w-full bg-gradient-to-b from-transparent to-gray-100 pt-2">
          <MovieList />
        </div>
      </div>

      {/* InfiniteMovieList 섹션 */}
      <div className="bg-gray-100 w-full flex flex-col gap-4 pt-4">
        {/* 제목 */}
        <h1 className="text-2xl font-bold text-left pb-2 px-4">
          {category === "now_playing"
            ? "현재 상영중"
            : category === "top_rated"
            ? "높은 평점의 영화"
            : category === "upcoming"
            ? "상영 예정작"
            : "인기 영화"}
        </h1>

        {/* 리스트 가로 스크롤 컨테이너 */}
        <div className="w-full overflow-x-auto">
          <div className="flex gap-4 flex-nowrap">
            <InfiniteMovieList />
          </div>
        </div>

        {/* 광고 배너 */}
        <div className="px-5">
            <div className="w-[560px] h-60 my-10 rounded-xl bg-gradient-to-b from-green-300 to-blue-300 text-left px-6 pt-8">
                <h1 className="text-2xl font-bold">같은 영화, 특별한 경험</h1>
                <p className="text-sm pt-2">영화를 보는 새로운 기준 CGV 특별관</p>
                <button className="mt-4 border border-gray-800 text-sm text-gray-800 px-2 py-1 rounded-3xl 
                    hover:bg-gray-800 hover:text-white hover:cursor-pointer">
                    특별관 자세히 보기 {'>'}
                </button>
            </div>
          </div>
        </div>
      </div>
  );
}