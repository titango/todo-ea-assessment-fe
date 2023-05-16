import React from "react";
import styles from "./Checkbox.module.scss";
import { ICheckbox } from "@/@types/components/checkbox.type";
import EditableText from "../EditableText/EditableText";

function Checkbox(props: ICheckbox) {
  const { label, checked, onChange, onEditText, disabled } = props;
  return (
    <div className={styles.container}>
      <label className={styles.checkboxLabel}>
        <input
          type="checkbox"
          checked={checked}
          onChange={onChange}
          disabled={disabled}
        />
        <span className={styles.checkmark}></span>
      </label>
      {onEditText && (
        <EditableText
          className={styles.label}
          text={label}
          onEnter={onEditText}
        />
      )}
      {!onEditText && <span className={styles.label}>{label}</span>}
    </div>
  );
}

export default Checkbox;
