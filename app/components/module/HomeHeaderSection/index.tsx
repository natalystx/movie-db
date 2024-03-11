"use client";

import React from "react";
import styles from "./styles.module.css";
import { cx } from "@emotion/css";
import Input from "@/app/components/base/Input";
import { useViewModel } from "./viewmodel";

const HomeHeaderSection = () => {
  const { search, setSearch } = useViewModel();
  return (
    <div className={cx(styles.Wrapper)}>
      <h1 className={cx(styles.Header)}>Search Movie</h1>
      <Input
        className={cx(styles.Input)}
        placeholder="Search movie"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />
    </div>
  );
};

export default HomeHeaderSection;
