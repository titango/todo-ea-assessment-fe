import { ITodoTask } from "@/@types/todo.task.type";

interface IFilteredTasks {
  completed: ITodoTask[];
  incomplete: ITodoTask[];
}

export function extractTodoTasks(tasks: ITodoTask[]): IFilteredTasks {
  const splitArrays: IFilteredTasks = tasks.reduce(
    (result: IFilteredTasks, obj: ITodoTask) => {
      if (obj.isCompleted) {
        result.completed.push(obj);
      } else {
        result.incomplete.push(obj);
      }
      return result;
    },
    { completed: [], incomplete: [] }
  );

  return splitArrays;
}

export function showRecentTasks(
  tasks: ITodoTask[],
  length: number
): ITodoTask[] {
  const todoSortedByDate = tasks
    .slice()
    .sort(
      (a: ITodoTask, b: ITodoTask) =>
        new Date(b.updatedAt).valueOf() - new Date(a.updatedAt).valueOf()
    );
  const todoMax = todoSortedByDate.slice(0, length);
  return todoMax;
}
