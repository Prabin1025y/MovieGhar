import MovieCard from "../MovieCard";
import { Movie } from "@/types/movie";
import { TVShow } from "@/types/series";
import { getDateOfMovie, getTitleOfMovie } from "@/lib/utils";
import { SearchResult } from "@/types/search";

const MovieContainer = ({
    movies,
    title,
}: {
    movies: Movie[] | TVShow[] | SearchResult[];
    title: string;
}) => {
    return (
        <div
            className="max-w-7xl mx-auto flex flex-col justify-center py-6 px-3"
            style={{ gridArea: "collections" }}
        >
            <h2 className="text-3xl font-bold bg-gradient-to-r from-cyan-500 to-purple-500 bg-clip-text text-transparent mb-6">
                {title}
            </h2>
            {/* <div className=" gap-3 grid grid-cols-[repeat(auto-fit,minmax(128px,1fr))] sm:grid-cols-[repeat(auto-fit,minmax(176px,1fr))] md:grid-cols-[repeat(auto-fit,minmax(208px,1fr))]"> */}
            <div className="w-full grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3">
                {movies.map((movie, index) => (
                    <MovieCard
                        className=""
                        key={movie.id + index}
                        id={movie.id}
                        averageScore={movie.vote_average}
                        poster={movie.poster_path || "/placeholder.png"}
                        name={getTitleOfMovie(movie) || "No Title"}
                        mediaType={movie.media_type}
                        releaseDate={getDateOfMovie(movie)}
                    />
                ))}
            </div>
        </div>
    );
};

export default MovieContainer;
