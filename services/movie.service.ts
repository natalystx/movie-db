import Rxios from "@/core/rxios";
import {
  DiscoverMovieDto,
  DiscoverMovieInput,
  SearchDiscoverMovieInput,
  SearchResultDiscoverMovieDto,
} from "./data-contract";

export class MovieService extends Rxios {
  constructor() {
    super();
  }

  getDiscoverMovies(data: DiscoverMovieInput) {
    return this.get<DiscoverMovieDto>("/discover/movie", {
      ...data,
    });
  }

  searchDiscoverMovie(data: SearchDiscoverMovieInput) {
    return this.get<SearchResultDiscoverMovieDto>("/search/movie", { ...data });
  }
}
