import TodoContainer from "@/containers/TodoContainer/TodoContainer";
import styles from "./page.module.scss";

export default function Home() {
  return (
    <main className={styles.main}>
      <TodoContainer />
    </main>
  );
}
