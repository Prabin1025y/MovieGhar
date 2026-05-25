import { SeriesDetails, SeriesResponse, TVShow } from "@/types/series";

interface RouteProps {
    params: Promise<{
        seriesId: string;
    }>;
}

export async function GET(request: Request, { params }: RouteProps) {
    try {
        const { seriesId } = await params;
        const [res1, res2] = await Promise.all([
            fetch(`${process.env.TMDB_BASE}/tv/${seriesId}`, {
                method: "GET",
                headers: {
                    Authorization: `Bearer ${process.env.TMDB_API_KEY}`,
                    "Content-Type": "application/json",
                },
                next: {
                    revalidate: 3600,
                },
            }),
            fetch(`${process.env.TMDB_BASE}/tv/${seriesId}/recommendations`, {
                method: "GET",
                headers: {
                    Authorization: `Bearer ${process.env.TMDB_API_KEY}`,
                    "Content-Type": "application/json",
                },
                next: {
                    revalidate: 3600,
                },
            }),
        ]);
        const [rslt1, rslt2]: [SeriesDetails, SeriesResponse] =
            await Promise.all([res1.json(), res2.json()]);

        const details: SeriesDetails = {
            ...rslt1,
            backdrop_path: rslt1.backdrop_path
                ? process.env.TMDB_IMAGE_BANNER + rslt1.backdrop_path
                : rslt1.backdrop_path,
            poster_path: rslt1.poster_path
                ? process.env.TMDB_IMAGE_POSTER + rslt1.poster_path
                : rslt1.poster_path,
            seasons:
                rslt1.seasons && Array.isArray(rslt1.seasons)
                    ? rslt1.seasons.map((item) => ({
                          ...item,
                          poster_path: item.poster_path
                              ? process.env.TMDB_IMAGE_POSTER + item.poster_path
                              : item.poster_path,
                      }))
                    : rslt1.seasons,
        };

        const recommendations : TVShow[] = rslt2.results.map(item=>({
            ...item,
            backdrop_path: item.backdrop_path
                ? process.env.TMDB_IMAGE_BANNER + item.backdrop_path
                : item.backdrop_path,
            poster_path: item.poster_path
                ? process.env.TMDB_IMAGE_POSTER + item.poster_path
                : item.poster_path,
        }))
        return Response.json({details, recommendations});
    } catch (error) {
        console.log(error);
        return Response.json(
            { message: "Internal server error" },
            { status: 500 },
        );
    }
}
