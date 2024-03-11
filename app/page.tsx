import { cx } from "@emotion/css";
import styles from "./page.module.css";
import HomeHeaderSection from "./components/module/HomeHeaderSection";
import MovieGridSection from "./components/module/MovieGridSection";
import { Suspense } from "react";

export default function Home() {
  return (
    <div className={cx(styles.Container)} suppressHydrationWarning>
      <HomeHeaderSection />

      <MovieGridSection />
    </div>
  );
}
