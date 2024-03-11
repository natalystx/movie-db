import { cx } from "@emotion/css";
import styles from "./page.module.css";
import HomeHeaderSection from "./components/module/HomeHeaderSection";
import MovieGridSection from "./components/module/MovieGridSection";

export default function Home() {
  return (
    <div className={cx(styles.Container)} suppressHydrationWarning>
      <HomeHeaderSection />
      <MovieGridSection />
    </div>
  );
}
