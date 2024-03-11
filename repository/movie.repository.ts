import {
  DiscoverMovieInput,
  SearchDiscoverMovieInput,
} from "@/services/data-contract";
import { MovieService } from "@/services/movie.service";
import { map } from "rxjs";

export class MovieRepository {
  private _service: MovieService;
  constructor(service: MovieService) {
    this._service = service;
  }

  getDiscoverMovies(data: DiscoverMovieInput) {
    return this._service.getDiscoverMovies(data).pipe(
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

  searchDiscoverMovie(data: SearchDiscoverMovieInput) {
    return this._service.searchDiscoverMovie(data).pipe(
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
}
