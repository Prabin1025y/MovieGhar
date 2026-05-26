"use client";
import {
    Calendar,
    ChevronLeft,
    ChevronRight,
    Info,
    Play,
    Star,
} from "lucide-react";
import Image from "next/image";
import { useEffect, useState } from "react";
import { Button } from "./ui/button";
import Link from "next/link";
import { MoviesResponse } from "@/types/movie";
import { SeriesResponse } from "@/types/series";
import { genreIdToNameMap, getDateOfMovie, getTitleOfMovie } from "@/lib/utils";

const Spotlight = ({
    trendingMovies,
    trendingSeries,
}: {
    trendingMovies: MoviesResponse;
    trendingSeries: SeriesResponse;
}) => {
    const [currentSpotlight, setCurrentSpotlight] = useState(0);

    const spotlightMoviesSeries = [
        ...trendingSeries.results.slice(0, 4),
        ...trendingMovies.results.slice(0, 4),
    ];

    useEffect(() => {
        if (spotlightMoviesSeries.length === 0) return;

        const interval = setInterval(() => {
            setCurrentSpotlight(
                (prev) => (prev + 1) % spotlightMoviesSeries.length,
            );
        }, 5000);

        return () => clearInterval(interval);
    }, [spotlightMoviesSeries.length]);



    return (
        <section className="relative h-[80vh] overflow-hidden px-2 sm:px-10">
            {/* Background Images with Sliding Effect */}
            <div className="absolute inset-y-0 inset-x-2 sm:inset-x-20">
                {spotlightMoviesSeries.map((movie, index) => (
                    <div
                        key={movie.id}
                        className={`absolute inset-0 transition-all duration-1000 ease-in-out ${
                            index === currentSpotlight
                                ? "opacity-100 scale-100"
                                : index ===
                                    (currentSpotlight -
                                        1 +
                                        spotlightMoviesSeries.length) %
                                        spotlightMoviesSeries.length
                                  ? "opacity-0 scale-110 -translate-x-full"
                                  : index ===
                                      (currentSpotlight + 1) %
                                          spotlightMoviesSeries.length
                                    ? "opacity-0 scale-110 translate-x-full"
                                    : "opacity-0 scale-110"
                        }`}
                    >
                        <Image
                            src={movie.backdrop_path || "/placeholder.png"}
                            alt={`${getTitleOfMovie(movie) || "movie"} poster`}
                            fill
                            loading="eager"
                            className="object-cover brightness-75 md:brightness-100 contrast-150 md:contrast-100"
                            priority={index === 0}
                        />
                        <div
                            className="absolute inset-0 transition-colors duration-300 dark:bg-gradient-to-r dark:from-slate-950 dark:via-slate-950/70 dark:to-transparent
                                bg-gradient-to-r from-emerald-50 via-emerald-50/60 to-transparent"
                        />
                        <div className="absolute inset-0 transition-colors duration-300 bg-gradient-to-t from-slate-100 via-transparent to-transparent dark:from-slate-950 dark:via-transparent dark:to-transparent" />
                    </div>
                ))}
            </div>

            {/* Spotlight Navigation */}
            <div className="absolute bottom-14 sm:bottom-auto sm:top-1/2 right-6 sm:right-auto sm:left-6 transform -translate-y-1/2 z-20">
                <Button
                    variant="outline"
                    size="icon"
                    onClick={() =>
                        setCurrentSpotlight(
                            (prev) =>
                                (prev - 1 + spotlightMoviesSeries.length) %
                                spotlightMoviesSeries.length,
                        )
                    }
                    className="transition-all duration-300 hover:scale-110 border-emerald-500/30 text-emerald-600 hover:bg-emerald-500/10 hover:border-emerald-500/50 dark:border-emerald-400/30 dark:text-emerald-400 dark:hover:bg-emerald-400/10 dark:hover:border-emerald-400/50"
                >
                    <ChevronLeft className="w-5 h-5" />
                </Button>
            </div>
            <div className="absolute bottom-0 sm:bottom-auto sm:top-1/2 right-6 transform -translate-y-1/2 z-20">
                <Button
                    variant="outline"
                    size="icon"
                    onClick={() =>
                        setCurrentSpotlight(
                            (prev) => (prev + 1) % spotlightMoviesSeries.length,
                        )
                    }
                    className="transition-all duration-300 hover:scale-110 border-emerald-500/30 text-emerald-600 hover:bg-emerald-500/10 hover:border-emerald-500/50 dark:border-emerald-400/30 dark:text-emerald-400 dark:hover:bg-emerald-400/10 dark:hover:border-emerald-400/50"
                >
                    <ChevronRight className="w-5 h-5" />
                </Button>
            </div>

            {/* Spotlight Indicators */}
            <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-20 flex space-x-3">
                {spotlightMoviesSeries.map((_, index) => (
                    <button
                        key={index}
                        onClick={() => setCurrentSpotlight(index)}
                        className={`relative transition-all duration-500 ${
                            index === currentSpotlight
                                ? "w-8 h-3 bg-gradient-to-r from-emerald-500 to-teal-500 rounded-full"
                                : "w-3 h-3 bg-emerald-500/30 hover:bg-emerald-500/50 rounded-full hover:scale-125 dark:bg-emerald-400/30 dark:hover:bg-emerald-400/50"
                        }`}
                    >
                        {index === currentSpotlight && (
                            <div className="absolute inset-0 bg-gradient-to-r from-emerald-400 to-teal-400 rounded-full animate-pulse" />
                        )}
                    </button>
                ))}
            </div>

            {/* Content Container with Sliding Effect */}
            <div className="relative z-10 flex items-center h-full max-w-7xl mx-auto sm:px-6 overflow-hidden">
                <div
                    className="flex transition-transform duration-1000 ease-in-out w-full"
                    style={{
                        transform: `translateX(-${currentSpotlight * 100}%)`,
                    }}
                >
                    {spotlightMoviesSeries.map((movie, index) => (
                        <div
                            key={movie.id}
                            className="flex items-center space-x-12 w-full flex-shrink-0 min-w-full"
                        >
                            {/* Poster with Enhanced Animation */}
                            <div className="hidden lg:block flex-shrink-0">
                                <div className="relative group">
                                    <div
                                        className={`transition-all duration-700 ${
                                            index === currentSpotlight
                                                ? "opacity-100"
                                                : "opacity-0"
                                        }`}
                                    >
                                        <Image
                                            src={
                                                movie.poster_path ||
                                                "/placeholder.png"
                                            }
                                            alt={`${getTitleOfMovie(movie) || "movie"} poster`}
                                            width={350}
                                            height={500}
                                            className="rounded-xl w-auto h-auto shadow-2xl object-cover transition-all duration-500 group-hover:scale-105 group-hover:shadow-emerald-500/25  "
                                        />
                                        <div className="absolute inset-0 rounded-xl bg-gradient-to-t from-emerald-500/20 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-500" />
                                        <div className="absolute -inset-1 rounded-xl bg-gradient-to-r from-emerald-500/20 to-teal-500/20 opacity-0 group-hover:opacity-100 transition-all duration-500 blur-sm -z-10" />
                                    </div>
                                </div>
                            </div>

                            {/* Content with Staggered Animation */}
                            <div className="flex-1 space-y-6 max-w-3xl px-6 sm:px-8">
                                <div className="space-y-4">
                                    <h1
                                        className={`text-5xl font-bold leading-tight transition-all duration-700 delay-200 text-primary ${
                                            index === currentSpotlight
                                                ? "opacity-100"
                                                : "opacity-0"
                                        }`}
                                    >
                                        {getTitleOfMovie(movie)}
                                    </h1>

                                    <div
                                        className={`flex items-center space-x-6 transition-all duration-700 delay-300 text-gray-600 dark:text-gray-300 ${
                                            index === currentSpotlight
                                                ? "opacity-100"
                                                : "opacity-0"
                                        }`}
                                    >
                                        {getDateOfMovie(movie) && (
                                            <div className="flex items-center space-x-2">
                                                <Calendar className="w-4 h-4" />
                                                <span>
                                                    {getDateOfMovie(movie)}
                                                </span>
                                            </div>
                                        )}
                                        {movie.vote_average && (
                                            <div className="flex gap-2 text-yellow-600">
                                                {/* <Badge className="bg-green-700 text-white px-1 py-1"> */}
                                                <Star fill="orange" />
                                                {movie.vote_average}
                                                {/* </Badge> */}
                                            </div>
                                        )}
                                        <div className="flex gap-2 items-center">
                                            {movie.genre_ids.map(
                                                (genre, index) =>
                                                    genreIdToNameMap(genre) && (
                                                        <p
                                                            key={`${genre}-${index}`}
                                                            className="rounded-md px-2 py-1 bg-linear-to-br from-emerald-100/20 to-emerald-500/40 border border-teal-500"
                                                        >
                                                            {genreIdToNameMap(
                                                                genre,
                                                            )}
                                                        </p>
                                                    ),
                                            )}
                                        </div>
                                    </div>

                                    <div
                                        className={`flex flex-wrap gap-2 transition-all duration-700 delay-400 ${
                                            index === currentSpotlight
                                                ? "opacity-100"
                                                : "opacity-0"
                                        }`}
                                    ></div>
                                </div>

                                <p
                                    className={`md:text-lg text-justify leading-relaxed transition-all duration-700 delay-500 text-gray-700 dark:text-gray-300 line-clamp-3 ${
                                        index === currentSpotlight
                                            ? "opacity-100"
                                            : "opacity-0"
                                    }`}
                                >
                                    {movie.overview}
                                </p>

                                <div
                                    className={`flex items-center space-x-4 pt-4 transition-all duration-700 delay-600 ${
                                        index === currentSpotlight
                                            ? "opacity-100"
                                            : "opacity-0"
                                    }`}
                                >
                                    <Button
                                        asChild
                                        size="lg"
                                        className="cursor-pointer bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-600 hover:to-teal-600 text-white px-8 py-3 text-lg transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-emerald-500/25"
                                    >
                                        <Link
                                            href={`/watch/${movie.media_type}/${movie.id}`}
                                            prefetch={false}
                                        >
                                            <Play className="w-5 h-5 mr-2" />
                                            Watch Now
                                        </Link>
                                    </Button>
                                    <Button
                                        asChild
                                        size="lg"
                                        variant="outline"
                                        className="hidden sm:flex cursor-pointer px-8 py-3 text-lg transition-all duration-300 hover:scale-105 border-emerald-500/30 text-emerald-600 hover:bg-emerald-500/10 dark:border-emerald-400/30 dark:text-emerald-400 dark:hover:bg-emerald-400/10"
                                    >
                                        <Link
                                            href={`/movie/${movie.id}?type=${movie.media_type}`}
                                            prefetch={false}
                                        >
                                            <Info className="w-5 h-5 mr-2" />
                                            More Info
                                        </Link>
                                    </Button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Spotlight;
