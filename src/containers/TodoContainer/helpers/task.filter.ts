import { ITodoTask } from "@/@types/todo.task.type";

interface IFilteredTasks {
  completed: ITodoTask[];
  incomplete: ITodoTask[];
}

export function extractTodoTasks(tasks: ITodoTask[]): IFilteredTasks {
  const arraysComplete = {
    completed: [] as ITodoTask[],
    incomplete: [] as ITodoTask[],
  };

  const splitArrays: typeof arraysComplete = tasks.reduce(
    (result: typeof arraysComplete, obj: ITodoTask) => {
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
