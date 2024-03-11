import React from "react";
import styles from "./styles.module.css";
import { cx } from "@emotion/css";

type GridViewProps = {
  className?: string;
  children: React.ReactNode;
};

const GridView = ({ className, children }: GridViewProps) => {
  return <div className={cx(styles.Grid, className)}>{children}</div>;
};

export default GridView;
