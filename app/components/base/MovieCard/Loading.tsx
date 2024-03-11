import React from "react";
import styles from "./styles.module.css";
import { cx } from "@emotion/css";

const MovieCardLoading = () => {
  return (
    <div
      className={cx(styles.Container, styles.ContainerLoading, "animate-pulse")}
    >
      <div className={cx(styles.LikeButton, "animate-pulse")}></div>
      <div className={styles.MockTitle} />
      <div className={styles.MockDate} />
    </div>
  );
};

export default MovieCardLoading;
