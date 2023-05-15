import { ReactNode } from "react";

export interface IConfirmationModal {
  isOpen: boolean;
  onCancel: () => void;
  onConfirm: () => void;
  children: ReactNode;
}
