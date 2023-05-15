"use client";
import React, { useEffect, useState } from "react";

import styles from "./TodoContainer.module.scss";
import TextButton from "@/components/main/TextButton/TextButton";
import TodoColumn from "@/components/layout/TodoGrid/TodoColumn";
import { ITodoTask } from "@/@types/todo.task.type";
import { backendDomain } from "@/helpers/domain";
import { addNewTask, getAllTasks } from "@/services/task.service";

const TodoContainer = () => {
  const [todos, setTodos] = useState<ITodoTask[]>([]);
  const [doneTodos, setDoneTodos] = useState<ITodoTask[]>([]);
  const [newTodo, setNewTodo] = useState<string>("");
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    async function fetchTasks() {
      const resp = await getAllTasks();
      console.log("all tasks: ", resp);
      setTodos(resp);
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
          const indInsert = cloneTodo.findIndex(
            (todo) => todo.title > resp.title
          );
          cloneTodo.splice(indInsert, 0, resp);
          setTodos(cloneTodo);
        }
      } catch (err: unknown) {
        // Could show error message
      }
    }
  };

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
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
        <div className={styles["todo-tasks"]}>
          <div className={styles.column}>
            <TodoColumn title="To do" tasks={todos} />
          </div>
          <div className={styles.column}>
            <TodoColumn title="Done" tasks={doneTodos} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default TodoContainer;
