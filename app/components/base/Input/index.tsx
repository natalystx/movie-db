"use client";

import { cx } from "@emotion/css";
import React, { forwardRef } from "react";
import styles from "./input.module.css";

type InputProps = React.DetailedHTMLProps<
  React.InputHTMLAttributes<HTMLInputElement>,
  HTMLInputElement
>;

const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ className, ...rest }, ref) => {
    return (
      <input className={cx(styles.Input, className)} {...rest} ref={ref} />
    );
  }
);

Input.displayName = "Input";

export default Input;
