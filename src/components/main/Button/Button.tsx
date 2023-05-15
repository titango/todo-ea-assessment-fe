import React from "react";

import { ITextButton } from "@/@types/components/text.button.type";
import styles from "./Button.module.scss";
import { IButton } from "@/@types/components/button.type";

export default function Button(props: IButton) {
  const { children, onClick, color = "blue" } = props;
  return (
    <button
      className={`${styles.button} ${styles[color]}`}
      aria-label="button"
      onClick={onClick}
    >
      {children}
    </button>
  );
}
