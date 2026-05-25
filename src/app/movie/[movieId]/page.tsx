import Image from "next/image";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Calendar, Clock, Star, Play } from "lucide-react";
import Description from "./_components/Description";
import Link from "next/link";
import { Metadata } from "next";
import { AnimeDetails } from "@/types/animeDetails";
import { ANIME_DETAILS_QUERY } from "@/lib/queries";
import { formatDate } from "@/lib/utils";
import { getMovieDetail, getSeriesDetail } from "@/lib/data";
import { Movie, MovieDetails } from "@/types/movie";
import { SeriesDetails, TVShow } from "@/types/series";
import MovieContainer from "@/components/AnimeListingHomePage/MovieContainer";

// export async function generateMetadata({
//     params,
// }: {
//     params: Promise<{ animeId: string }>;
// }): Promise<Metadata> {
//     // read route params
//     const { animeId } = await params;

//     const data: AnimeDetails = await fetchData(Number(animeId));

//     return {
//         title:
//             `${data.title.english || data.title.romaji || data.title.native || "Anime Detail"}  | AnimeGhar` ||
//             "AnimeGhar - Watch Anime Online",
//         description:
//             `Watch ${data.title.english || data.title.romaji || data.title.native || "Anime"} episodes online for free without any ads and distractions.` ||
//             "Watch your favorite anime episodes online for free without any ads and distractions.",
//     };
// }

interface ResponseData {
    details: MovieDetails | SeriesDetails;
    recommendations: Movie[] | TVShow[];
}

export default async function MovieDetailsPage({
    params,
    searchParams,
}: {
    params: Promise<{ movieId: string }>;
    searchParams: Promise<{ type: string }>;
}) {
    const { movieId } = await params;
    const { type } = await searchParams;

    let data: ResponseData | null = null;

    if (type === "tv") {
        data = await getSeriesDetail(movieId);
    } else if (type === "movie") {
        data = await getMovieDetail(movieId);
    }

    if (!data) {
        return <div>No data found</div>;
    }

    const details = data.details;
    const recommendations = data.recommendations || [];

    if (!details) {
        return <div>No data found</div>;
    }

    return (
        <div className="min-h-screen dark:bg-slate-950 mt-16 px-5 sm:px-10 md:px-20">
            <div className="relative">
                <div className="relative max-w-7xl container mx-auto py-8">
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
                        {/* Movie Poster - Now in portrait orientation */}
                        <div className="lg:col-span-1">
                            <div className="relative mx-auto max-w-sm">
                                <Image
                                    src={
                                        details?.backdrop_path ||
                                        "/placeholder.svg"
                                    }
                                    alt={`${("title" in details ? details.title : details.name) || "Anime"} poster`}
                                    width={300}
                                    height={400}
                                    className="rounded-lg shadow-2xl aspect-[2/3] object-cover"
                                />
                            </div>
                        </div>

                        {/* Movie Info */}
                        <div className="lg:col-span-2 text-primary space-y-6">
                            <div>
                                <h1 className="text-4xl md:text-5xl font-bold mb-2">
                                    {("title" in details
                                        ? details.title
                                        : details.name) || "Anime"}
                                </h1>
                                <div className="flex flex-wrap items-center gap-4 mb-4">
                                    <div className="flex items-center gap-1">
                                        <Star className="h-5 w-5 text-cyan-400 fill-current" />
                                        <span className="text-xl font-semibold">
                                            {details.vote_average
                                                ? details.vote_average.toFixed(
                                                      2,
                                                  )
                                                : "N/A"}
                                        </span>
                                    </div>
                                    <div className="flex items-center gap-1">
                                        <Calendar className="h-4 w-4" />
                                        <span>
                                            {"release_date" in details
                                                ? details.release_date
                                                : details.first_air_date}
                                        </span>
                                    </div>
                                    {/* <div className="flex items-center gap-1">
                                        <Clock className="h-4 w-4" />
                                        <span>
                                            {data.duration || "N/A"} min
                                        </span>
                                    </div> */}
                                </div>

                                <div className="flex flex-wrap gap-2 mb-4">
                                    {details.genres?.map((genre) => (
                                        <Badge
                                            key={genre.id}
                                            variant="secondary"
                                            className="text-white bg-cyan-500 hover:bg-cyan-500/80"
                                        >
                                            {genre.name}
                                        </Badge>
                                    ))}
                                </div>

                                {/* Description moved to header section */}
                                <Description
                                    description={details.overview || ""}
                                />

                                {/* Movie Information moved to header */}
                                <div className="grid grid-cols-1 gap-2 mb-6">
                                    <div className="space-y-3">
                                        <div className="flex items-center gap-2">
                                            <span className="font-medium bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent ">
                                                Studios:
                                            </span>
                                            <span className="text-primary/90">
                                                {details.production_companies?.reduce(
                                                    (prev, studio, index) =>
                                                        prev +
                                                        `${index === 0 ? "" : ","}` +
                                                        ` ${studio.name}`,
                                                    "",
                                                ) || "N/A"}
                                            </span>
                                        </div>
                                        <div className="flex items-center gap-2">
                                            <span className="font-medium bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent ">
                                                Status:
                                            </span>
                                            <span className="text-primary/90">
                                                {details.status || "N/A"}
                                            </span>
                                        </div>
                                    </div>
                                    {("title" in details
                                        ? details.original_title
                                        : details.original_name) && (
                                        <div className="space-y-3">
                                            <div className="flex items-center gap-2">
                                                <span className="font-medium bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent ">
                                                    Original Name:
                                                </span>
                                                <Badge
                                                    variant="outline"
                                                    className="text-xs border-cyan-300/50 text-cyan-200 bg-cyan-900/30"
                                                >
                                                    {"title" in details
                                                        ? details.original_title
                                                        : details.original_name ||
                                                          "N/A"}
                                                </Badge>
                                            </div>
                                        </div>
                                    )}
                                </div>

                                {details.id && (
                                    <div className="flex flex-wrap gap-3">
                                        <Button
                                            asChild
                                            size="lg"
                                            className="bg-gradient-to-r from-cyan-400 to-blue-500 hover:bg-cyan-700 text-white"
                                        >
                                            {details.status ===
                                            "NOT_YET_RELEASED" ? (
                                                <span className="text-white/70 cursor-not-allowed">
                                                    <Play className="h-5 w-5 mr-2" />
                                                    Not Aired
                                                </span>
                                            ) : (
                                                <Link
                                                    href={`/watch/${type}/${details.id}`}
                                                    prefetch={false}
                                                >
                                                    <Play className="h-5 w-5 mr-2" />
                                                    Watch Now
                                                </Link>
                                            )}
                                        </Button>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="max-w-7xl mx-auto grid gap-8">
                <MovieContainer
                    movies={recommendations}
                    title="Recommendations"
                />
            </div>
        </div>
    );
}
