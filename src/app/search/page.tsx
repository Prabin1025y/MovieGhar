"use client";

import MovieContainer from "@/components/AnimeListingHomePage/MovieContainer";
import Pagination from "@/components/Pagination";
import AnimeCardSkeleton from "@/components/Skeleton/AnimeCardSkeleton";
import Top10Skeleton from "@/components/Skeleton/Top10Skeleton";
import { getSearchResults } from "@/lib/data";
import { SearchResponse } from "@/types/search";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

const SearchPage = () => {
    const searchParams = useSearchParams();
    const query = searchParams.get("query") || "";
    const page = searchParams.get("page") || "1";

    const [searchResponse, setSearchResponse] = useState<SearchResponse | null>(
        null,
    );
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const fetchResults = async () => {
            setIsLoading(true);
            const data = await getSearchResults(query, page);
            setSearchResponse(data);
            setIsLoading(false);
        };

        if (query) fetchResults();
    }, [query, page]);

    const buildHref = (p: number) => `/search?query=${query}&page=${p}`;
    const searchResults = searchResponse?.results || [];

    if (isLoading)
        return (
            <div className="w-full pt-10">
                <div className="max-w-7xl mx-auto px-4 py-8 grid grid-cols-4 gap-5">
                    <div className="col-span-3 grid grid-cols-4 gap-3">
                        <p className="col-span-4 py-4 text-2xl text-cyan-500 font-semibold">
                            Searching...
                        </p>

                        {Array.from({ length: 15 }).map((_, index) => (
                            <AnimeCardSkeleton key={index} />
                        ))}
                    </div>

                    <div className="col-span-1">
                        <p className="py-4 text-2xl text-cyan-500 font-semibold">
                            Most Popular Animes
                        </p>

                        <Top10Skeleton />
                    </div>
                </div>
            </div>
        );

    return (
        <div className="w-full py-12 px-8 bg-gradient-to-br from-cyan-50 via-blue-50 to-teal-50 dark:from-slate-950 dark:via-slate-950 dark:to-slate-950 relative">
            <div className="max-w-7xl mx-auto flex flex-col items-center gap-8">
                <MovieContainer
                    movies={searchResults}
                    title={`Search Result for: ${query.replace("%20", " ")}`}
                />
                {searchResponse && searchResponse.total_pages > 1 && (
                    <Pagination
                        currentPage={searchResponse.page}
                        totalPages={searchResponse.total_pages}
                        buildHref={buildHref}
                    />
                )}
            </div>
        </div>
    );
};

export default SearchPage;
