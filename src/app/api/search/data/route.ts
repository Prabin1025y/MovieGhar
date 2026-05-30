import { SearchResponse } from "@/types/search";

export async function GET(request: Request) {
    try {
        const { searchParams } = new URL(request.url);
        const query = searchParams.get("query");
        const page = searchParams.get("page") || "1";

        const response = await fetch(
            `${process.env.TMDB_BASE}/search/multi?query=${query}&page=${page}`,
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

        const result: SearchResponse = await response.json();
        const data: SearchResponse = {
            ...result,
            results: result.results
                .filter((item) => item.media_type !== "person")
                .map((item) => ({
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
        console.log(error);
        return Response.json(
            { message: "Internal server error" },
            { status: 500 },
        );
    }
}
