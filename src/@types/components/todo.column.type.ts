import { ITodoTask } from "../todo.task.type";

export type TaskDoneType = "done" | "undone";
export interface ITodoColumn {
  title: string;
  tasks: ITodoTask[];
  onTaskDoneChecked: (
    event: React.ChangeEvent<HTMLInputElement>,
    task: ITodoTask
  ) => void;
}
