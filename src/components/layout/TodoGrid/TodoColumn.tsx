import { ITodoColumn } from "@/@types/components/todo.column.type";
import styles from "./TodoColumn.module.scss";
import Checkbox from "@/components/main/Checkbox/Checkbox";

export default function TodoColumn(props: ITodoColumn) {
  const { title, tasks, onTaskDoneChecked } = props;

  return (
    <div className={styles.body}>
      <div className={styles.title}>
        <span>{title}</span>
      </div>
      <div className={styles.tasks}>
        {tasks.length > 0 &&
          tasks.map((task) => {
            return (
              <div key={task._id} className={styles.task}>
                <Checkbox
                  checked={task.isCompleted}
                  onChange={(event) => onTaskDoneChecked(event, task)}
                  label={task.title}
                />
              </div>
            );
          })}
      </div>
    </div>
  );
}
