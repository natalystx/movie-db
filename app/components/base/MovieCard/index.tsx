import { MovieDto } from "@/services/data-contract";
import React from "react";
import Image from "next/image";
import styles from "./styles.module.css";
import { cx } from "@emotion/css";
import dayjs from "dayjs";
import { ReactComponent as HearthIcon } from "@/app/assets/icons/heart.svg";

type MovieCardProps = {
  className?: string;
  movie: MovieDto;
  liked?: boolean;
  onFavoriteClick?: () => void;
};

const MovieCard = ({
  movie,
  className,
  liked,
  onFavoriteClick,
}: MovieCardProps) => {
  return (
    <div className={cx(styles.Container, className)}>
      <div className={styles.ImageContainer}>
        <div className={styles.ImageWrapper}>
          <Image
            placeholder="blur"
            sizes="(min-width: 640px) 300px, (min-width: 1200px) 500px, 500px"
            blurDataURL={movie.poster_path.replace("original", "w500")}
            fill
            src={movie.poster_path}
            alt={movie.title}
            className={styles.Image}
          />
        </div>
      </div>
      <div className={styles.ContentWrapper}>
        <div className={styles.ContentInnerWrapper}>
          <div>
            <button
              onClick={onFavoriteClick}
              className={cx(styles.LikeButton, liked && styles.LikedButton)}
            >
              <HearthIcon width={20} height={20} />
            </button>
          </div>
          <p className={styles.Title}>{movie.original_title}</p>
          <p>
            {dayjs(movie.release_date, { format: "YYYY-MM-DD" }).format(
              "DD MMM YYYY"
            )}
          </p>
        </div>
      </div>
    </div>
  );
};

export default MovieCard;
