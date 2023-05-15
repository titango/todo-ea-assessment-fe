import { ReactNode } from "react";

type ButtonColorType = "blue" | "gray";

export interface IButton {
  onClick: React.MouseEventHandler<HTMLButtonElement>;
  children: ReactNode;
  color?: ButtonColorType;
}
