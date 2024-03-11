import { useAppDispatch } from "@/lib/redux/hook";
import { searchDiscoverMovieAsync } from "@/lib/redux/slices/discoverMovieSlice";
import { useEffect, useMemo, useState } from "react";
import { createGlobalState } from "react-use";
import { Subject, debounceTime } from "rxjs";
export const useSearchQuery = createGlobalState("");

export const useViewModel = () => {
  const onChangeSubject = useMemo(() => new Subject<string>(), []);
  const dispatch = useAppDispatch();
  const [, setSearchQuery] = useSearchQuery();
  const [search, setSearch] = useState("");

  useEffect(() => {
    const subscribe = onChangeSubject
      .pipe(debounceTime(300))
      .subscribe((val) => {
        setSearchQuery(val);
        if (val) {
          dispatch(searchDiscoverMovieAsync({ page: 1, query: val }));
        }
      });

    return () => {
      subscribe.unsubscribe();
    };

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    onChangeSubject.next(search);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [search]);

  return {
    search,
    setSearch,
  };
};
