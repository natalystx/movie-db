import { createAction, createSlice } from "@reduxjs/toolkit";
import { catchError, filter, map, mergeMap, of, startWith } from "rxjs";
import { AppEpic } from "../store";
import {
  AddFavoriteMovieInput,
  UserFavoriteMovieDto,
  UserFavoriteMovieInput,
} from "@/services/data-contract";
import UserRepository from "@/repository/user.repository";
import UserService from "@/services/user.service";
import Session from "@/utils/Session";
import { toast } from "sonner";

export enum USER_FAVORITE_MOVIE_STATUS {
  IDLE = "idle",
  LOADING = "loading",
  FAILED = "failed",
}

export type UserFavoriteMovieState = {
  movie: UserFavoriteMovieDto | null;
  status: USER_FAVORITE_MOVIE_STATUS;
};

const initialState: UserFavoriteMovieState = {
  movie: null,
  status: USER_FAVORITE_MOVIE_STATUS.LOADING,
};

export const getFavoriteMovieAsync = createAction<UserFavoriteMovieInput>(
  "favoriteMovie/getFavoriteMovie"
);

export const getFavoriteMovieAsyncPending = createAction(
  "favoriteMovie/getFavoriteMovieAsyncPending"
);
export const getFavoriteMovieAsyncFulfilled =
  createAction<UserFavoriteMovieDto>(
    "favoriteMovie/getFavoriteMovieAsyncFulfilled"
  );
export const getFavoriteMovieAsyncRejected = createAction<string>(
  "favoriteMovie/getFavoriteMovieAsyncRejected"
);

export const addFavoriteMovieAsync = createAction<{
  params: AddFavoriteMovieInput;
}>("favoriteMovie/addFavoriteMovieAsync");

const userRepository = new UserRepository(new UserService());

export const favoriteMovieAsyncEpic: AppEpic = (action$) =>
  action$.pipe(
    filter(getFavoriteMovieAsync.match),
    mergeMap((action) =>
      userRepository.getUserFavoriteMovieList(action.payload).pipe(
        map((res) => getFavoriteMovieAsyncFulfilled(res)),

        startWith(getFavoriteMovieAsyncPending()),

        catchError((_error: any) =>
          of(getFavoriteMovieAsyncRejected(_error.message))
        )
      )
    )
  );

export const addFavoriteMovieAsyncEpic: AppEpic = (action$) =>
  action$.pipe(
    filter(addFavoriteMovieAsync.match),
    mergeMap((action) =>
      userRepository.addFavoriteMovie(action.payload.params).pipe(
        map(() =>
          getFavoriteMovieAsync({
            account_id: Number(),
            page: 1,
          })
        ),

        startWith(getFavoriteMovieAsyncPending()),

        catchError((_error: any) =>
          of(getFavoriteMovieAsyncRejected(_error.message))
        )
      )
    )
  );

export const favoriteMovieSlice = createSlice({
  name: "favoriteMovie",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getFavoriteMovieAsyncPending, (state) => {
        state.status = USER_FAVORITE_MOVIE_STATUS.LOADING;
      })
      .addCase(getFavoriteMovieAsyncFulfilled, (state, action) => {
        state.status = USER_FAVORITE_MOVIE_STATUS.IDLE;
        state.movie = action.payload;
      })
      .addCase(getFavoriteMovieAsyncRejected, (state) => {
        state.status = USER_FAVORITE_MOVIE_STATUS.FAILED;
      })
      .addCase(addFavoriteMovieAsync, (state, action) => {
        state.status = USER_FAVORITE_MOVIE_STATUS.LOADING;
        if (action.payload.params.RAW_BODY.favorite) {
          toast.success("Added to favorite list");
        } else {
          toast.success("Removed to favorite list");
        }
      });
  },
  selectors: {
    selectFavoriteMovie: (state) => state.movie,
    status: (state) => state.status,
  },
});
