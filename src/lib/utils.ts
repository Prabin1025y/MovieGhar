import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import { formatDistanceToNowStrict } from "date-fns";
import { Movie } from "@/types/movie";
import { TVShow } from "@/types/series";
import { SearchResult } from "@/types/search";

export function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs));
}

export function formatDate(
    day: number | null,
    month: number | null,
    year: number | null,
) {
    if (!year && !month && !day) return "unknown";

    // only year
    if (year && !month && !day) {
        return String(year);
    }

    // year + month (no day)
    if (year && month && !day) {
        const date = new Date(year, month - 1);
        return date
            .toLocaleDateString("en-GB", {
                month: "short",
                year: "numeric",
            })
            .toLowerCase();
    }

    // full date or fallback if partial junk
    if (year && month && day) {
        const date = new Date(year, month - 1, day);
        return date
            .toLocaleDateString("en-GB", {
                day: "numeric",
                month: "short",
                year: "numeric",
            })
            .toLowerCase();
    }

    // year missing but others exist (invalid case)
    return "unknown";
}

export function timeAgo(timestamp: number) {
    const result = formatDistanceToNowStrict(new Date(timestamp * 1000), {
        addSuffix: true,
    });

    return result
        .replace(" seconds", "s")
        .replace(" second", "s")
        .replace(" minutes", "m")
        .replace(" minute", "m")
        .replace(" hours", "h")
        .replace(" hour", "h")
        .replace(" days", "d")
        .replace(" day", "d")
        .replace(" months", "mo")
        .replace(" month", "mo")
        .replace(" years", "y")
        .replace(" year", "y");
}

export function genreIdToNameMap(id: number) {
    const genreMap: Record<number, string> = {
        28: "Action",
        12: "Adventure",
        16: "Animation",
        35: "Comedy",
        80: "Crime",
        99: "Documentary",
        18: "Drama",
        10751: "Family",
        14: "Fantasy",
        36: "History",
        27: "Horror",
        10402: "Music",
        9648: "Mystery",
        10749: "Romance",
        878: "Sci-Fi",
        10770: "TV Movie",
        53: "Thriller",
        10752: "War",
        37: "Western",
        10759: "Action & Adventure",
        10762: "Kids",
        10763: "News",
        10764: "Reality",
        10765: "Sci-Fi & Fantasy",
        10766: "Soap",
        10767: "Talk",
        10768: "War & Politics",
    };

    return genreMap[id] || null;
}

export const getTitleOfMovie = (movie: Movie | TVShow | SearchResult) => {
    return "title" in movie ? movie.title : movie.name;
};

export const getDateOfMovie = (movie: Movie | TVShow | SearchResult) => {
    return "release_date" in movie ? movie.release_date : movie.first_air_date;
};
