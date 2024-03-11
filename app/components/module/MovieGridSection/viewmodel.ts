import { useAppDispatch, useAppSelector } from "@/lib/redux/hook";
import {
  discoverMovieSlice,
  getDiscoverMovieAsync,
  searchDiscoverMovieAsync,
} from "@/lib/redux/slices/discoverMovieSlice";

import {
  addFavoriteMovieAsync,
  favoriteMovieSlice,
  getFavoriteMovieAsync,
} from "@/lib/redux/slices/favoriteMovieSlice";
import { useEffect, useMemo, useRef, useState } from "react";
import { useSearchQuery } from "../HomeHeaderSection/viewmodel";
import { UserFavoriteMovieDto } from "@/services/data-contract";
import { ReadonlyURLSearchParams } from "next/navigation";

export const useViewModel = (search: ReadonlyURLSearchParams) => {
  const mounted = useRef(false);
  const [searchQuery] = useSearchQuery();
  const [currentPage, setCurrentPage] = useState({
    discover: 1,
    favorite: 1,
  });
  const [activeCategory, setActiveCategory] = useState<"discover" | "favorite">(
    "discover"
  );

  const onLoadMore = () => {
    setCurrentPage((prev) => ({
      ...prev,
      [activeCategory]: prev[activeCategory] + 1,
    }));
  };

  const discoverMovie = useAppSelector(
    discoverMovieSlice.selectors.discoverMovie
  );

  const favoriteMovie = useAppSelector(
    favoriteMovieSlice.selectors.selectFavoriteMovie
  );

  const discoverMovieStatus = useAppSelector(
    discoverMovieSlice.selectors.status
  );
  const favoriteMovieStatus = useAppSelector(
    favoriteMovieSlice.selectors.status
  );
  const dispatch = useAppDispatch();

  const addFavoriteMovie = (id: number, liked: boolean) => {
    dispatch(
      addFavoriteMovieAsync({
        params: {
          account_id: Number(process.env.NEXT_PUBLIC_ACCOUNT_ID),

          RAW_BODY: {
            media_type: "movie",
            media_id: id,
            favorite: !liked,
          },
        },
      })
    );
  };

  const filterFavoriteList = (
    movie: UserFavoriteMovieDto | null,
    search: string
  ): UserFavoriteMovieDto | null => {
    const favoriteSearch: UserFavoriteMovieDto | null = !movie
      ? null
      : {
          ...movie,
          results:
            movie?.results.filter((item) => item.title.includes(search)) || [],
        };

    return favoriteSearch;
  };

  const moviesData = useMemo(() => {
    if (activeCategory === "discover") {
      return { movie: discoverMovie, status: discoverMovieStatus };
    }

    const favoriteSearch = filterFavoriteList(favoriteMovie, searchQuery);

    return {
      movie: searchQuery ? favoriteSearch : favoriteMovie,
      status: favoriteMovieStatus,
    };
  }, [
    discoverMovie,
    favoriteMovie,
    discoverMovieStatus,
    favoriteMovieStatus,
    activeCategory,
    searchQuery,
  ]);

  const { status, movie } = moviesData;

  const favoriteMovieIds = useMemo(
    () => favoriteMovie?.results.map((item) => item.id) || [],
    [favoriteMovie]
  );

  useEffect(() => {
    if (mounted.current) return;

    mounted.current = true;
    dispatch(getDiscoverMovieAsync({ page: currentPage.discover }));
    dispatch(
      getFavoriteMovieAsync({
        page: currentPage.favorite,
        account_id: Number(process.env.NEXT_PUBLIC_ACCOUNT_ID),
      })
    );
    if (search.get("type") === "favorite") {
      setActiveCategory("favorite");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const resetSearch = () => {
    if (
      mounted.current &&
      currentPage[activeCategory] === 1 &&
      !searchQuery &&
      movie
    ) {
      if (activeCategory === "discover") {
        dispatch(getDiscoverMovieAsync({ page: currentPage.discover }));
      }
      return;
    }
  };

  useEffect(() => {
    if (!searchQuery) {
      setCurrentPage({ discover: 1, favorite: 1 });
    }
  }, [searchQuery]);

  useEffect(() => {
    resetSearch();
    if (currentPage[activeCategory] <= 1) return;

    if (activeCategory === "discover") {
      if (!searchQuery) {
        dispatch(getDiscoverMovieAsync({ page: currentPage.discover }));
      } else {
        dispatch(
          searchDiscoverMovieAsync({
            page: currentPage.discover,
            query: searchQuery,
          })
        );
      }
    } else {
      dispatch(
        getFavoriteMovieAsync({
          page: currentPage.favorite,
          account_id: Number(process.env.NEXT_PUBLIC_ACCOUNT_ID),
        })
      );
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentPage, activeCategory, searchQuery]);

  return {
    movie,
    onLoadMore,
    status,
    currentPage,
    activeCategory,
    setActiveCategory,
    setCurrentPage,
    addFavoriteMovie,
    favoriteMovieIds,
    searchQuery,
  };
};
