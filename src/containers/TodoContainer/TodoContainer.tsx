"use client";
import React, { useEffect, useState } from "react";

import styles from "./TodoContainer.module.scss";
import TextButton from "@/components/main/TextButton/TextButton";
import TodoColumn from "@/components/layout/TodoGrid/TodoColumn";
import { ITodoTask } from "@/@types/todo.task.type";
import { addNewTask, getAllTasks, updateTask } from "@/services/task.service";
import { TaskDoneType } from "@/@types/todo.column.type";

const TodoContainer = () => {
  const [todos, setTodos] = useState<ITodoTask[]>([]);
  const [doneTodos, setDoneTodos] = useState<ITodoTask[]>([]);
  const [newTodo, setNewTodo] = useState<string>("");
  const [searchTerm, setSearchTerm] = useState("");
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function fetchTasks() {
      setIsLoading(true);
      const resp = await getAllTasks();
      setIsLoading(false);

      const arraysComplete = {
        completed: [] as ITodoTask[],
        incomplete: [] as ITodoTask[],
      };

      const splitArrays: typeof arraysComplete = resp.reduce(
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
      setTodos(splitArrays.incomplete);
      setDoneTodos(splitArrays.completed);
    }
    fetchTasks();
  }, []);

  const handleDeleteAll = () => {};

  const handleNewTodoChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setNewTodo(event.target.value);
  };

  const handleAddTodo = async (event: React.MouseEvent<HTMLButtonElement>) => {
    if (newTodo) {
      const data = {
        title: newTodo,
        isCompleted: false,
      };
      try {
        const resp: ITodoTask = await addNewTask(data);
        console.log("resp: ", resp);
        if (resp && resp._id) {
          const cloneTodo = [...todos];

          const index = cloneTodo.findIndex(
            (todo) => todo.title.localeCompare(resp.title) === 1
          );
          const insertIndex = index === -1 ? cloneTodo.length : index;
          cloneTodo.splice(insertIndex, 0, resp);
          setTodos(cloneTodo);
          setNewTodo("");
        }
      } catch (err: unknown) {
        // Could show error message
      }
    }
  };

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
  };

  const handleTaskDone = async (
    event: React.ChangeEvent<HTMLInputElement>,
    task: ITodoTask
  ) => {
    const checked = event.target.checked;
    console.log("checked: ", checked);
    if (task) {
      const updatedTask: ITodoTask = {
        ...task,
        isCompleted: checked,
      };
      const resp = await updateTask(updatedTask);
      console.log("resp updated: ", resp);
      if (resp && resp._id) {
        let originalList, newList;
        if (resp.isCompleted) {
          originalList = [...todos];
          newList = [...doneTodos];
        } else {
          originalList = [...doneTodos];
          newList = [...todos];
        }
        const index = newList.findIndex(
          (todo) => todo.title.localeCompare(resp.title) === 1
        );
        const insertIndex = index === -1 ? newList.length : index;
        newList.splice(insertIndex, 0, resp);
        const indOriginal = originalList.findIndex(
          (todo) => todo._id === resp._id
        );
        if (indOriginal >= 0) originalList.splice(indOriginal, 1);

        if (resp.isCompleted) {
          setTodos(originalList);
          setDoneTodos(newList);
        } else {
          setTodos(newList);
          setDoneTodos(originalList);
        }
      }
    }
  };

  return (
    <div>
      <div className={styles["todo-container"]}>
        <div className={styles.header}>
          <div className={styles.title}>Marvelous v2.0</div>
          <TextButton onClick={handleDeleteAll} text="Delete all tasks" />
        </div>
        <div className={styles["input-row"]}>
          <div className={styles.addSection}>
            <input
              type="text"
              placeholder="Add a todo..."
              value={newTodo}
              onChange={handleNewTodoChange}
            />
            <button onClick={handleAddTodo}>Add</button>
          </div>

          <input
            type="search"
            placeholder="Search..."
            value={searchTerm}
            onChange={handleSearchChange}
          />
        </div>
        {isLoading && <div>loading...</div>}
        {!isLoading && (
          <div className={styles["todo-tasks"]}>
            <div className={styles.column}>
              <TodoColumn
                title="To do"
                tasks={todos}
                onTaskDoneChecked={(event, task) => handleTaskDone(event, task)}
              />
            </div>
            <div className={styles.column}>
              <TodoColumn
                title="Done"
                tasks={doneTodos}
                onTaskDoneChecked={(event, task) => handleTaskDone(event, task)}
              />
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default TodoContainer;
