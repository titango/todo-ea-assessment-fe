import React, { use, useEffect, useState } from "react";
import styles from "./EditableText.module.scss";
import { IEditableText } from "@/@types/components/editable.text.type";

const EditableText = (props: IEditableText) => {
  const { text, onEnter, className } = props;
  const [isEditing, setIsEditing] = useState<boolean>(false);
  const [originalText, setOriginalText] = useState<string>(text);
  const [textValue, setTextValue] = useState<string>(text);

  useEffect(() => {
    setOriginalText(text);
    setTextValue(text);
  }, [text]);

  const handleTextClick = () => {
    setIsEditing(true);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTextValue(e.target.value);
  };

  const handleInputBlur = () => {
    setIsEditing(false);
    setTextValue(originalText);
  };

  const onKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") {
      setIsEditing(false);
      onEnter(textValue);
    }
  };

  return (
    <div className={`${styles["editable-text"]} ${className}`}>
      {isEditing ? (
        <input
          type="text"
          value={textValue}
          onChange={handleInputChange}
          onBlur={handleInputBlur}
          autoFocus
          onKeyDown={onKeyDown}
        />
      ) : (
        <span onClick={handleTextClick}>{textValue}</span>
      )}
    </div>
  );
};

export default EditableText;
