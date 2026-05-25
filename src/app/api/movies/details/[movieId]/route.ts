import { MovieDetails, MoviesResponse } from "@/types/movie";

interface RouteProps {
    params: Promise<{
        id: string;
    }>;
}

export async function GET(request: Request, { params }: RouteProps) {
    try {
        const { id } = await params;
        const response = await fetch(`${process.env.TMDB_BASE}/movie/${id}`, {
            method: "GET",
            headers: {
                Authorization: `Bearer ${process.env.TMDB_API_KEY}`,
                "Content-Type": "application/json",
            },
            next: {
                revalidate: 3600,
            },
        });
        const result: MovieDetails = await response.json();
        const data: MovieDetails = {
            ...result,
            backdrop_path: result.backdrop_path
                ? process.env.TMDB_IMAGE_BANNER + result.backdrop_path
                : result.backdrop_path,
            poster_path: result.poster_path
                ? process.env.TMDB_IMAGE_POSTER + result.poster_path
                : result.poster_path,
            
        };
        return Response.json(data);
    } catch (error) {
        return Response.json(
            { message: "Internal server error" },
            { status: 500 },
        );
    }
}
