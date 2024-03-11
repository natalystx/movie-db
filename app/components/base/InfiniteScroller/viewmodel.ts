"use client";

import { useEffect, useMemo } from "react";

type UseViewModelProps = {
  elementId: string;
  onIntersecting: () => void;
  loadingMore: boolean;
  noMoreDataToLoad: boolean;
};

export const useViewModel = ({
  elementId,
  onIntersecting,
  noMoreDataToLoad,
  loadingMore,
}: UseViewModelProps) => {
  const options = useMemo(
    () => ({
      rootMargin: "0px",
      threshold: 1.0,
    }),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [elementId]
  );

  const callback: IntersectionObserverCallback = (entries) => {
    entries.forEach((item) => {
      console.log({ noMoreDataToLoad, loadingMore });

      if (item.intersectionRatio === 1 && !noMoreDataToLoad && !loadingMore) {
        onIntersecting();
      }
    });
  };

  const observer = useMemo(
    () => (global.window ? new IntersectionObserver(callback, options) : null),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [callback]
  );

  useEffect(() => {
    const element = document.querySelector(`#${elementId}`);
    if (elementId && element) {
      observer?.observe(element);
    }

    return () => {
      observer?.disconnect();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [elementId, loadingMore]);
};
