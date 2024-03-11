export type DiscoverMovieInput = {
  page: number;
};

export type SearchDiscoverMovieInput = {
  page: number;
  query: string;
};

type PageAbleApi<T> = {
  page: number;
  total_pages: number;
  total_results: number;
  results: T[];
};

export type MovieDto = {
  adult: boolean;
  backdrop_path: string;
  genre_ids: number[];
  id: number;
  original_language: string;
  original_title: string;
  overview: string;
  popularity: number;
  poster_path: string;
  release_date: string;
  title: string;
  video: boolean;
  vote_average: number;
  vote_count: number;
};

type AvatarDto = {
  gravatar: {
    hash: string;
  };
  tmdb: {
    avatar_path: string;
  };
};

export type DiscoverMovieDto = PageAbleApi<MovieDto>;

export type SearchResultDiscoverMovieDto = PageAbleApi<MovieDto>;

export type UserDetailInput = {
  account_id: number;
};

export type UserDetailDto = {
  id: number;
  iso_639_1: string;
  iso_3166_1: string;
  name: string;
  include_adult: boolean;
  username: string;
  avatar: AvatarDto;
};

export type UserFavoriteMovieInput = {
  language?: string;
  account_id: number;
  page: number;
};

export type UserFavoriteMovieDto = PageAbleApi<MovieDto>;

export type AddFavoriteMovieInput = {
  account_id: number;
  RAW_BODY: {
    media_type: string;
    media_id: number;
    favorite: boolean;
  };
};

export type AddFavoriteMovieDto = {
  status_code: number;
  status_message: string;
};

export type RequestTokenDto = {
  success: boolean;
  expires_at: string;
  request_token: string;
};

export type CreateSessionInput = {
  api_key: string;
  request_token: string;
};

export type SessionDto = {
  success: boolean;
  guest_session_id: string;
};

export type ValidApiKeyDto = {
  success: boolean;
  status_code: number;
  status_message: string;
};
