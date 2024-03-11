import { createAction, createSlice } from "@reduxjs/toolkit";
import { AppEpic, store } from "../store";
import { catchError, filter, map, mergeMap, of } from "rxjs";
import { MovieRepository } from "@/repository/movie.repository";
import { MovieService } from "@/services/movie.service";
import {
  DiscoverMovieDto,
  DiscoverMovieInput,
  SearchDiscoverMovieInput,
} from "@/services/data-contract";
import { toast } from "sonner";

export enum GET_MOVIE_STATUS {
  IDLE = "idle",
  LOADING = "loading",
  FAILED = "failed",
}
type State = {
  movie: DiscoverMovieDto | null;
  status: GET_MOVIE_STATUS;
};

const initialState: State = {
  movie: null,
  status: GET_MOVIE_STATUS.LOADING,
};

export const getDiscoverMovieAsync = createAction<DiscoverMovieInput>(
  "discoverMovie/getDiscoverMovieAsync"
);
export const searchDiscoverMovieAsync = createAction<SearchDiscoverMovieInput>(
  "discoverMovie/searchDiscoverMovieAsync"
);

export const setDiscoverMovieAsync = createAction<DiscoverMovieDto>(
  "discoverMovie/setDiscoverMovieAsync"
);

export const errorToGetDiscoverMovieAsync = createAction<string>(
  "discoverMovie/errorToGetDiscoverMovieAsync"
);

const discoverMovieRepository = new MovieRepository(new MovieService());

export const getDiscoverMovieAsyncEpic: AppEpic = (action$) =>
  action$.pipe(
    filter(getDiscoverMovieAsync.match),
    mergeMap((action) =>
      discoverMovieRepository.getDiscoverMovies(action.payload)
    ),
    map((res) => setDiscoverMovieAsync(res)),
    catchError((err) => of(errorToGetDiscoverMovieAsync(err.message)))
  );

export const searchDiscoverMovieAsyncEpic: AppEpic = (action$) =>
  action$.pipe(
    filter(searchDiscoverMovieAsync.match),
    mergeMap((action) =>
      discoverMovieRepository.searchDiscoverMovie(action.payload)
    ),
    map((res) => setDiscoverMovieAsync(res)),
    catchError((err) => of(errorToGetDiscoverMovieAsync(err.message)))
  );

export const discoverMovieSlice = createSlice({
  name: "discoverMovie",
  initialState,
  reducers: {},
  selectors: {
    discoverMovie: (state) => state.movie,
    status: (state) => state.status,
  },
  extraReducers(builder) {
    builder
      .addCase(getDiscoverMovieAsync, (state, action) => {
        state.movie = state.movie;
        state.status = GET_MOVIE_STATUS.LOADING;
        if (action.payload.page === 1) {
          state.movie = null;
        }
      })
      .addCase(searchDiscoverMovieAsync, (state, action) => {
        state.movie = state.movie;
        state.status = GET_MOVIE_STATUS.LOADING;
        if (action.payload.page === 1) {
          state.movie = null;
        }
      })
      .addCase(setDiscoverMovieAsync, (state, action) => {
        state.movie = {
          ...action.payload,
          results:
            state.movie && state.movie.results
              ? [...state.movie.results, ...action.payload.results]
              : action.payload.results,
        };
        state.status = GET_MOVIE_STATUS.IDLE;
      })

      .addCase(errorToGetDiscoverMovieAsync, (state, action) => {
        state.movie = null;
        state.status = GET_MOVIE_STATUS.FAILED;
        toast.error(action.payload);
      });
  },
});
