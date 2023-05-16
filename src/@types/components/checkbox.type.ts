export interface ICheckbox {
  label: string;
  checked: boolean;
  onChange: React.ChangeEventHandler<HTMLInputElement>;
  disabled?: boolean;
  onEditText?: (text: string) => void;
}
