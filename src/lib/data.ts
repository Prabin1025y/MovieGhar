import { cache } from "react";

export const getTrendingMovies = cache(async () => {
    const res = await fetch("http://localhost:3000/api/movies/trending", {
        cache: "no-store",
    });

    if (!res.ok) {
        throw new Error("Failed to fetch user");
    }
    return res.json();
});

export const getAllTimeBestMovies = cache(async () => {
    const res = await fetch("http://localhost:3000/api/movies/alltimebest", {
        cache: "no-store",
    });

    if (!res.ok) {
        throw new Error("Failed to fetch user");
    }
    return res.json();
});

export const getTrendingSeries = cache(async () => {
    const res = await fetch("http://localhost:3000/api/series/trending", {
        cache: "no-store",
    });

    if (!res.ok) {
        throw new Error("Failed to fetch user");
    }
    return res.json();
});

export const getAllTimeBestSeries = cache(async () => {
    const res = await fetch("http://localhost:3000/api/series/alltimebest", {
        cache: "no-store",
    });

    if (!res.ok) {
        throw new Error("Failed to fetch user");
    }
    return res.json();
});

export const getSearchResults = cache(
    async (query: string = "", page: string = "1") => {
        const res = await fetch(
            `http://localhost:3000/api/search/data?query=${query}&page=${page}`,
            {
                cache: "no-store",
            },
        );

        if (!res.ok) {
            throw new Error("Failed to fetch user");
        }
        return res.json();
    },
);

export const getSearchSuggestions = cache(
    async (query: string = "") => {
        const res = await fetch(
            `http://localhost:3000/api/search/suggestions?query=${query}`,
            {
                cache: "no-store",
            },
        );

        if (!res.ok) {
            throw new Error("Failed to fetch user");
        }
        return res.json();
    },
);

export const getMovieDetail = cache(
    async (id: number) => {
        const res = await fetch(
            `http://localhost:3000/api/movies/details/${id}`,
            {
                cache: "no-store",
            },
        );

        if (!res.ok) {
            throw new Error("Failed to fetch user");
        }
        return res.json();
    },
);

export const getSeriesDetail = cache(
    async (id: number) => {
        const res = await fetch(
            `http://localhost:3000/api/series/details/${id}`,
            {
                cache: "no-store",
            },
        );

        if (!res.ok) {
            throw new Error("Failed to fetch user");
        }
        return res.json();
    },
);
