import { MoviesResponse } from "@/types/movie";

export async function GET() {
    try {
        const response = await fetch(
            `${process.env.TMDB_BASE}/trending/movie/day`,
            {
                method: "GET",
                headers: {
                    Authorization: `Bearer ${process.env.TMDB_API_KEY}`,
                    "Content-Type": "application/json",
                },
                next: {
                    revalidate: 3600,
                },
            },
        );
        const result: MoviesResponse = await response.json();
        const data: MoviesResponse = {
            ...result,
            results: result.results.map((item) => ({
                ...item,
                poster_path: item.poster_path
                    ? process.env.TMDB_IMAGE_POSTER + item.poster_path
                    : item.poster_path,
                backdrop_path: item.backdrop_path
                    ? process.env.TMDB_IMAGE_BANNER + item.backdrop_path
                    : item.backdrop_path,
            })),
        };
        return Response.json(data);
    } catch (error) {
        console.error(error)
        return Response.json(
            { message: "Internal server error" },
            { status: 500 },
        );
    }
}
