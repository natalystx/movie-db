"use client";

import { cx } from "@emotion/css";
import React, { useId, useMemo } from "react";
import { useViewModel } from "./viewmodel";

type InfiniteScrollerProps = {
  children: React.ReactNode;
  className?: string;
  onReachBottom: () => void;
  loadingMore: boolean;
  noMoreDataToLoad: boolean;
  checkerElementClassName?: string;
};

const InfiniteScroller = ({
  children,
  className,
  onReachBottom,
  loadingMore,
  noMoreDataToLoad,
  checkerElementClassName,
}: InfiniteScrollerProps) => {
  const loading = useMemo(() => {
    return loadingMore;
  }, [loadingMore]);
  const id = useId().replaceAll(":", "");
  useViewModel({
    noMoreDataToLoad,
    elementId: id,
    onIntersecting: onReachBottom,
    loadingMore: loading,
  });
  return (
    <div className={cx(className)}>
      {children}
      <div
        className={cx(checkerElementClassName)}
        style={{
          width: "100%",
          height: "1px",
        }}
        id={id}
      />
    </div>
  );
};

export default InfiniteScroller;
