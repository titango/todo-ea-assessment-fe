import { ITodoTask } from "./todo.task.type";

export interface ITodoColumn {
  title: string;
  tasks: ITodoTask[];
}
