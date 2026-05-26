import { MoviesResponse } from "@/types/movie";
import MovieCarousel from "./AnimeListingHomePage/MovieCarousel";
import { SeriesResponse } from "@/types/series";
import { getAllTimeBestMovies, getAllTimeBestSeries } from "@/lib/data";
import MovieContainer from "./AnimeListingHomePage/MovieContainer";

export default async function HomeMoviesLists({
    trendingMovies,
    trendingSeries,
}: {
    trendingMovies: MoviesResponse;
    trendingSeries: SeriesResponse;
}) {
    const allTimeBestMovies: MoviesResponse = await getAllTimeBestMovies();
    const allTimeBestSeries: SeriesResponse = await getAllTimeBestSeries();

    return (
        <div className="w-full py-12 px-8 bg-gradient-to-br from-emerald-50 via-teal-50 to-green-50 dark:from-slate-950 dark:via-slate-950 dark:to-slate-950 relative">
            <div className="max-w-7xl mx-auto grid gap-8">
                <MovieCarousel
                    movies={trendingMovies.results}
                    title="Trending Movies"
                />
            </div>
            <div className="max-w-7xl mx-auto grid gap-8">
                <MovieCarousel
                    movies={trendingSeries.results}
                    title="Trending Series"
                />
            </div>
            <div className="max-w-7xl mx-auto grid gap-8">
                <MovieContainer
                    movies={allTimeBestMovies.results}
                    title="All Time Best Movies"
                />
            </div>
            <div className="max-w-7xl mx-auto grid gap-8">
                <MovieContainer
                    movies={allTimeBestSeries.results}
                    title="All Time Best Series"
                />
            </div>

        </div>
    );
}
