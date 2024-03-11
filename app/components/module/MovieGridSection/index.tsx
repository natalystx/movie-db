"use client";

import React from "react";
import GridView from "../../base/GridView";
import InfiniteScroller from "../../base/InfiniteScroller";
import { useViewModel } from "./viewmodel";
import MovieCard from "../../base/MovieCard";
import MovieCardLoading from "../../base/MovieCard/Loading";
import { GET_MOVIE_STATUS } from "@/lib/redux/slices/discoverMovieSlice";
import Badge from "../../base/Badge";
import styles from "./styles.module.css";
import { cx } from "@emotion/css";
import { useRouter, useSearchParams } from "next/navigation";

const MovieGridSection = () => {
  const search = useSearchParams();
  const { push } = useRouter();
  const {
    movie,
    status,
    onLoadMore,
    currentPage,
    activeCategory,
    setActiveCategory,
    addFavoriteMovie,
    favoriteMovieIds,
  } = useViewModel(search);

  return (
    <div style={{ width: "100%", height: "100%" }}>
      <div className={cx(styles.BadgeWrapper)}>
        <Badge
          active={activeCategory === "discover"}
          onClick={() => {
            setActiveCategory("discover");
            push("/?type=discover");
          }}
        >
          Discover
        </Badge>
        <Badge
          active={activeCategory === "favorite"}
          onClick={() => {
            setActiveCategory("favorite");
            push("/?type=favorite");
          }}
        >
          Favorite
        </Badge>
      </div>
      <InfiniteScroller
        noMoreDataToLoad={
          currentPage[activeCategory] >= (movie?.total_pages || 0)
        }
        loadingMore={status === GET_MOVIE_STATUS.LOADING}
        onReachBottom={onLoadMore}
      >
        {status === GET_MOVIE_STATUS.IDLE && movie?.results.length === 0 && (
          <div className={cx(styles.EmptyPlaceholder)}>Movie not found</div>
        )}
        <GridView>
          {movie &&
            !(status === GET_MOVIE_STATUS.LOADING && movie.page <= 1) &&
            movie.results.map((movie) => (
              <MovieCard
                liked={favoriteMovieIds.includes(movie.id)}
                key={`${movie.id}-${movie.title}`}
                movie={movie}
                onFavoriteClick={() => {
                  addFavoriteMovie(
                    movie.id,
                    favoriteMovieIds.includes(movie.id)
                  );
                }}
              />
            ))}

          {status === GET_MOVIE_STATUS.LOADING &&
            new Array(12)
              .fill(null)
              .map((_, i) => <MovieCardLoading key={i} />)}
        </GridView>
      </InfiniteScroller>
    </div>
  );
};

export default MovieGridSection;
