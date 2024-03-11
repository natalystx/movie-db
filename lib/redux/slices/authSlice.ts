import { AuthRepository } from "@/repository/auth.repository";
import AuthenticationService from "@/services/authentication.service";
import { CreateSessionInput, UserDetailDto } from "@/services/data-contract";
import { createAction, createSlice } from "@reduxjs/toolkit";
import { AppEpic } from "../store";
import { catchError, filter, map, mergeMap, of, switchMap } from "rxjs";
import UserRepository from "@/repository/user.repository";
import UserService from "@/services/user.service";
import Session from "@/utils/Session";

export type AuthState = {
  user: UserDetailDto | null;
};

const initialState: AuthState = {
  user: null,
};

export const requestTokenAsync = createAction("auth/requestTokenAsync");

export const createSessionAsync = createAction("auth/createSessionAsync");

export const getUserDetailsAsync = createAction<{ session_id: string }>(
  "auth/getUserDetailsAsync"
);

export const setUserDetailsAsync = createAction<UserDetailDto>(
  "auth/setUserDetailsAsync"
);

const authRepository = new AuthRepository(new AuthenticationService());
const userRepository = new UserRepository(new UserService());

export const authRequestTokenAsyncEpic: AppEpic = (action$) =>
  action$.pipe(
    filter(requestTokenAsync.match),
    mergeMap(() =>
      authRepository.createRequestToken().pipe(
        map((res) => {
          authRepository.authenticate(res.request_token);
        })
      )
    )
  );

export const authCreateSessionAsyncEpic: AppEpic = (action$) =>
  action$.pipe(
    filter(createSessionAsync.match),
    mergeMap((action) =>
      authRepository
        .createSession()
        .pipe(
          map((res) =>
            getUserDetailsAsync({ session_id: res.guest_session_id })
          )
        )
    )
  );

export const getUserDetailAsyncEpic: AppEpic = (action$) =>
  action$.pipe(
    filter(getUserDetailsAsync.match),
    switchMap(() =>
      userRepository
        .getUserDetails({
          account_id: Number(process.env.NEXT_PUBLIC_ACCOUNT_ID),
        })
        .pipe(map((res) => setUserDetailsAsync(res)))
    ),
    catchError(() => of(createSessionAsync()))
  );

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(requestTokenAsync, (state) => {
        state.user = null;
      })
      .addCase(createSessionAsync, (state) => {
        state.user = null;
      })
      .addCase(getUserDetailsAsync, (state, action) => {
        Session.set({
          session_id: action.payload.session_id,
          request_token: action.payload.session_id,
        });
        state.user = null;
      })
      .addCase(setUserDetailsAsync, (state, { payload }) => {
        state.user = payload;
      });
  },
  selectors: {
    selectUserDetail: (state) => state.user,
  },
});
