// import AnimeLists from "@/components/AnimeLists";
import HomeMoviesLists from "@/components/HomeMoviesLists";
import AnimeContainerSkeleton from "@/components/Skeleton/AnimeContainerSkeleton";
import AnimeListsSkeleton from "@/components/Skeleton/AnimeListSkeleton";
import SpotlightSkeleton from "@/components/Skeleton/SpotlightSkeleton";
import TrendingAnimeSkeleton from "@/components/Skeleton/TrendingSkeleton";
import Spotlight from "@/components/Spotlight";
// import TrendingAnime from "@/components/TrendingAnime";
import { getTrendingMovies, getTrendingSeries } from "@/lib/data";
import { MoviesResponse } from "@/types/movie";
import { SeriesResponse } from "@/types/series";
import { Suspense } from "react";

const HomePage = async () => {
    const trendingMovies: MoviesResponse = await getTrendingMovies();
    const trendingSeries: SeriesResponse = await getTrendingSeries();

    return (
        <Suspense
            fallback={
                <>
                    <SpotlightSkeleton />
                    <TrendingAnimeSkeleton />
                    <AnimeListsSkeleton />
                    <AnimeContainerSkeleton />
                    <AnimeContainerSkeleton />
                </>
            }
        >
            <>
                <Spotlight trendingMovies={trendingMovies} trendingSeries={trendingSeries} />
                <HomeMoviesLists trendingMovies={trendingMovies} trendingSeries={trendingSeries} />
            </>
        </Suspense>
    );
};

export default HomePage;
