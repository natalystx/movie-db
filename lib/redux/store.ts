import { combineSlices, configureStore } from "@reduxjs/toolkit";
import { Epic, combineEpics, createEpicMiddleware } from "redux-observable";
import {
  addFavoriteMovieAsyncEpic,
  favoriteMovieAsyncEpic,
  favoriteMovieSlice,
} from "./slices/favoriteMovieSlice";
import {
  authCreateSessionAsyncEpic,
  authRequestTokenAsyncEpic,
  authSlice,
  getUserDetailAsyncEpic,
} from "./slices/authSlice";
import {
  discoverMovieSlice,
  getDiscoverMovieAsyncEpic,
  searchDiscoverMovieAsyncEpic,
} from "./slices/discoverMovieSlice";

const reducer = combineSlices(
  favoriteMovieSlice,
  authSlice,
  discoverMovieSlice
);

export type RootState = ReturnType<typeof reducer>;
export type AppEpic = Epic<unknown, unknown, RootState>;

const epicMiddleware = createEpicMiddleware<unknown, unknown, RootState>();

const rootEpic = combineEpics(
  favoriteMovieAsyncEpic,
  addFavoriteMovieAsyncEpic,
  authRequestTokenAsyncEpic,
  authCreateSessionAsyncEpic,
  getUserDetailAsyncEpic,
  getDiscoverMovieAsyncEpic,
  searchDiscoverMovieAsyncEpic
);

export const store = configureStore({
  reducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(epicMiddleware),
});

epicMiddleware.run(rootEpic);

export type AppStore = typeof store;
export type AppDispatch = typeof store.dispatch;
