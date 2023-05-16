import { CSSProperties } from "react";

export interface IEditableText {
  text: string;
  onEnter: (text: string) => void;
  className?: string;
}
