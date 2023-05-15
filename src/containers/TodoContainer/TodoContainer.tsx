"use client";
import React, { useState } from "react";

import styles from "./TodoContainer.module.scss";
import TextButton from "@/components/main/TextButton/TextButton";
import TodoColumn from "@/components/layout/TodoGrid/TodoColumn";
import { ITodoTask } from "@/@types/todo.task.type";

const TodoContainer = () => {
  const [todos, setTodos] = useState<ITodoTask[]>([
    {
      id: "1",
      title: "A",
      isCompleted: false,
    },
    { id: "2", title: "B", isCompleted: true },
  ]);
  const [doneTodos, setDoneTodos] = useState<ITodoTask[]>([
    {
      id: "1",
      title: "A",
      isCompleted: true,
    },
    { id: "2", title: "B", isCompleted: true },
  ]);
  const [newTodo, setNewTodo] = useState<string>("");
  const [searchTerm, setSearchTerm] = useState("");

  const handleDeleteAll = () => {};

  const handleNewTodoChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setNewTodo(event.target.value);
  };

  const handleAddTodo = (event: React.MouseEvent<HTMLButtonElement>) => {};

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
