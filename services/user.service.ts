import Rxios from "@/core/rxios";
import {
  AddFavoriteMovieDto,
  AddFavoriteMovieInput,
  UserDetailDto,
  UserDetailInput,
  UserFavoriteMovieDto,
  UserFavoriteMovieInput,
} from "./data-contract";

export default class UserService extends Rxios {
  constructor() {
    super();
  }

  getUserDetails({ account_id }: UserDetailInput) {
    return this.get<UserDetailDto>(`/account/${account_id}`);
  }

  getUserFavoriteMovieList({
    page,
    account_id,
    ...rest
  }: UserFavoriteMovieInput) {
    return this.get<UserFavoriteMovieDto>(
      `/account/${account_id}/favorite/movies`,
      {
        page,

        ...rest,
      }
    );
  }

  addFavoriteMovie({ account_id, RAW_BODY }: AddFavoriteMovieInput) {
    return this.post<AddFavoriteMovieDto>(`/account/${account_id}/favorite`, {
      ...RAW_BODY,
    });
  }
}
