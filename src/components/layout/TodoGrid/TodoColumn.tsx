import { ITodoColumn } from "@/@types/components/todo.column.type";
import styles from "./TodoColumn.module.scss";
import Checkbox from "@/components/main/Checkbox/Checkbox";
import EditableText from "@/components/main/EditableText/EditableText";

export default function TodoColumn(props: ITodoColumn) {
  const { title, tasks, onTaskDoneChecked, onEditText } = props;

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
                  onEditText={(text) =>
                    onEditText ? onEditText(task, text) : undefined
                  }
                  label={task.title}
                />
              </div>
            );
          })}
      </div>
    </div>
  );
}
