import {
  AddFavoriteMovieInput,
  UserDetailInput,
  UserFavoriteMovieInput,
} from "@/services/data-contract";
import UserService from "@/services/user.service";
import { map } from "rxjs";

export default class UserRepository {
  private _service: UserService;
  constructor(service: UserService) {
    this._service = service;
  }

  getUserDetails(data: UserDetailInput) {
    return this._service.getUserDetails(data);
  }

  getUserFavoriteMovieList(data: UserFavoriteMovieInput) {
    return this._service.getUserFavoriteMovieList(data).pipe(
      map((item) => ({
        ...item,
        results: item.results.map((m) => ({
          ...m,
          backdrop_path: `${process.env.NEXT_PUBLIC_BASE_IMAGE_PATH}${m.backdrop_path}`,
          poster_path: `${process.env.NEXT_PUBLIC_BASE_IMAGE_PATH}${m.poster_path}`,
        })),
      }))
    );
  }

  addFavoriteMovie(data: AddFavoriteMovieInput) {
    return this._service.addFavoriteMovie(data);
  }
}
