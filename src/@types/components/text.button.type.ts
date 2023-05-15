import { ReactNode } from "react";

export interface ITextButton {
  onClick: React.MouseEventHandler<HTMLButtonElement>;
  text: string;
}
