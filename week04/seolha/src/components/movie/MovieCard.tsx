import type { Movie } from "../../types/Movie";

type MovieCardProps = {
    movie: Movie;
};

export default function MovieCard({ movie }: MovieCardProps) {
    return (
        <div className="w-60 flex flex-col items-center">
            <div className="w-40 aspect-[2/3]">
                <img
                    className="w-full h-full object-cover bg-gray-300 rounded-xl shadow-xl"
                    src={
                        movie.poster_path
                        ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
                        : "/no-image.png"
                    }
                    alt={movie.title}
                />
            </div>
            
            <h2 className="text-sm font-semibold mt-2">
                {movie.title}
            </h2>
        </div>
    );
}