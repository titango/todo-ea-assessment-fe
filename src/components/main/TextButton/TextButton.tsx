import { ITextButton } from "@/@types/components/text.button.type";
import styles from "./TextButton.module.scss";

export default function TextButton(props: ITextButton) {
  const { text, onClick } = props;
  return (
    <button
      className={styles["text-button"]}
      aria-label="text-button"
      onClick={onClick}
    >
      {text}
    </button>
  );
}
