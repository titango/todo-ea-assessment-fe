import { ITodoColumn } from "@/@types/todo.column.type";
import styles from "./TodoColumn.module.scss";
import Checkbox from "@/components/main/Checkbox/Checkbox";

export default function TodoColumn(props: ITodoColumn) {
  const { title, tasks } = props;

  const onChange = () => {
    console.log("clicked");
  };

  return (
    <div className={styles.body}>
      <div className={styles.title}>
        <span>{title}</span>
      </div>
      <div className={styles.tasks}>
        {tasks.length &&
          tasks.map((task) => {
            return (
              <div key={task.id} className={styles.task}>
                <Checkbox
                  checked={task.isCompleted}
                  onChange={onChange}
                  label={task.title}
                />
              </div>
            );
          })}
      </div>
    </div>
  );
}
