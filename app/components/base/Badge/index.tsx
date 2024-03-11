import React from "react";
import styles from "./styles.module.css";
import { cx } from "@emotion/css";

type BadgeProps = {
  children: React.ReactNode;
  className?: string;
  active?: boolean;
} & React.DetailedHTMLProps<
  React.ButtonHTMLAttributes<HTMLButtonElement>,
  HTMLButtonElement
>;

const Badge = ({ children, className, active, ...rest }: BadgeProps) => {
  return (
    <button
      className={cx(styles.Badge, active && styles.Active, className)}
      {...rest}
    >
      {children}
    </button>
  );
};

export default Badge;
