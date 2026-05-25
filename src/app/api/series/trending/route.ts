import { SeriesResponse } from "@/types/series";

export async function GET() {
    try {
        const response = await fetch(
            `${process.env.TMDB_BASE}/trending/tv/day`,
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
        const result: SeriesResponse = await response.json();
        const data: SeriesResponse = {...result, results: result.results.map(item=>({
            ...item,
            poster_path: item.poster_path ? process.env.TMDB_IMAGE_POSTER + item.poster_path : item.poster_path,
            backdrop_path: item.backdrop_path ? process.env.TMDB_IMAGE_BANNER + item.backdrop_path : item.backdrop_path,
        }))}
        return Response.json(data);
    } catch (error) {
        console.error(error)
        return Response.json(
            { message: "Internal server error" },
            { status: 500 },
        );
    }
}
