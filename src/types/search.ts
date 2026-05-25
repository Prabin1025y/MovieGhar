export interface SearchResult {
    adult: boolean;
    backdrop_path: string;
    id: number;
    title: string | null;
    original_language: string;
    original_title: string | null;
    overview: string;
    poster_path: string;
    media_type: string;
    genre_ids: number[];
    popularity: number;
    release_date: string | null;
    video: boolean | null;
    vote_average: number;
    vote_count: number;
    name: string | null;
    original_name: string | null;
    first_air_date: string | null;
    origin_country: string[] | null;
}

export interface SearchResponse {
    page: number;
    results: SearchResult[];
    total_pages: number;
    total_results: number;
}
