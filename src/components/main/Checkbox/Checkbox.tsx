import React from "react";
import styles from "./Checkbox.module.scss";
import { ICheckbox } from "@/@types/checkbox.type";

function Checkbox(props: ICheckbox) {
  const { label, checked, onChange, disabled } = props;
  return (
    <label className={styles.container}>
      <input
        type="checkbox"
        checked={checked}
        onChange={onChange}
        disabled={disabled}
      />
      <span className={styles.checkmark}></span>
      {label}
    </label>
  );
}

export default Checkbox;
