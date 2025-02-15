export interface TMDBSearchResult {
    adult: boolean;
    backdrop_path: string | null;
    id: number;
    title?: string;
    name?: string;
    original_language: string;
    original_title?: string;
    original_name?: string;
    overview: string;
    poster_path: string | null;
    media_type: 'movie' | 'tv' | 'person';
    genre_ids: number[];
    popularity: number;
    release_date?: string;
    first_air_date?: string;
    vote_average: number;
    vote_count: number;
    profile_path?: string | null;
}

export interface TMDBSearchResponse {
    page: number;
    results: TMDBSearchResult[];
    total_pages: number;
    total_results: number;
}
