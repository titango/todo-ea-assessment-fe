import React from "react";
import styles from "./Checkbox.module.scss";
import { ICheckbox } from "@/@types/components/checkbox.type";

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
      <span className={styles.label}>{label}</span>
    </label>
  );
}

export default Checkbox;
