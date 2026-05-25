import {
    Carousel,
    CarouselContent,
    CarouselItem,
    CarouselNext,
    CarouselPrevious,
} from "../ui/carousel";
import MovieCard from "../MovieCard";
import { Movie } from "@/types/movie";
import { TVShow } from "@/types/series";
import { getDateOfMovie, getTitleOfMovie } from "@/lib/utils";

const MovieCarousel = ({
    movies,
    title,
}: {
    movies: Movie[] | TVShow[];
    title: string;
}) => {
    return (
        <div
            style={{ gridArea: "featured" }}
            className="space-y-6"
        >
            <h2 className="text-3xl font-bold bg-gradient-to-r from-cyan-500 to-purple-500 bg-clip-text text-transparent">
                {title}
            </h2>
            <div className="grid grid-cols-1 gap-6">
                <Carousel opts={{ dragThreshold: 40, slidesToScroll: 4, dragFree: true }}>
                    <CarouselContent>
                        {movies.map((movie) => (
                            <CarouselItem
                                key={movie.id}
                                className="basis-auto"
                            >
                                <MovieCard
                                    id={movie.id}
                                    poster={
                                        movie.poster_path || "/placeholder.png"
                                    }
                                    name={getTitleOfMovie(movie) || "Movie"}
                                    releaseDate={getDateOfMovie(movie)}
                                    averageScore={movie.vote_average}
                                    mediaType={movie.media_type}
                                />
                            </CarouselItem>
                        ))}
                    </CarouselContent>
                    <CarouselNext  className="top-[-30px] right-0 rounded-md" />
                    <CarouselPrevious className="top-[-30px] left-auto right-[40px] rounded-md" />
                </Carousel>
            </div>
        </div>
    );
};

export default MovieCarousel;
