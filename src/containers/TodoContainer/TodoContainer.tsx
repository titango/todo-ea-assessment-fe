/* eslint-disable react-hooks/exhaustive-deps */
"use client";
import React, { useEffect, useState } from "react";

import styles from "./TodoContainer.module.scss";
import TextButton from "@/components/main/TextButton/TextButton";
import TodoColumn from "@/components/layout/TodoGrid/TodoColumn";
import { ITodoTask } from "@/@types/todo.task.type";
import {
  addNewTask,
  deleteAllTasks,
  deleteTask,
  getAllTasks,
  searchTasks,
  updateTask,
} from "@/services/task.service";
import { TaskDoneType } from "@/@types/components/todo.column.type";
import ConfirmationModal from "@/components/layout/modal/ConfirmationModal";
import Button from "@/components/main/Button/Button";
import { useDebounce } from "@/helpers/useDebounce";
import { extractTodoTasks } from "./helpers/task.filter";

const TodoContainer = () => {
  const [todos, setTodos] = useState<ITodoTask[]>([]);
  const [doneTodos, setDoneTodos] = useState<ITodoTask[]>([]);
  const [newTodo, setNewTodo] = useState<string>("");
  const [isLoading, setIsLoading] = useState(true);
  const [isShowModal, setIsShowModal] = useState<boolean>(false);

  const [initSearch, setInitSearch] = useState<boolean>(false);
  const [searchTerm, setSearchTerm] = useState("");
  const debouncedQuery = useDebounce(searchTerm, 500);

  useEffect(() => {
    async function fetchTasks() {
      setIsLoading(true);
      const resp: ITodoTask[] = await getAllTasks();
      setIsLoading(false);

      const splitArrays = extractTodoTasks(resp);

      setInitSearch(true);
      setTodos(splitArrays.incomplete);
      setDoneTodos(splitArrays.completed);
    }
    fetchTasks();
  }, []);

  useEffect(() => {
    async function searchAllTasks() {
      let resp;
      if (debouncedQuery === "") resp = await getAllTasks();
      else resp = await searchTasks(debouncedQuery);
      const splitArrays = extractTodoTasks(resp);
      setTodos(splitArrays.incomplete);
      setDoneTodos(splitArrays.completed);
    }
    if (initSearch) searchAllTasks();
  }, [debouncedQuery]);

  const handleDeleteAll = async () => {
    console.log("clicked delete all");
    setIsShowModal(true);
  };

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

  const onDeleteConfirm = async () => {
    try {
      const resp = await deleteAllTasks();
      if (resp?.success) {
        setTodos([]);
        setDoneTodos([]);
      }
    } catch (err) {
      // Show message
    }
  };

  const onDeleteCancel = () => {
    setIsShowModal(false);
  };

  const onEditText = async (task: ITodoTask, text: string) => {
    const updatedTask: ITodoTask = {
      ...task,
      title: text,
    };
    if (text !== "") {
      // Update
      const resp = await updateTask(updatedTask);
      if (resp && resp._id) {
        const cloneTodo = [...todos];
        const taskTodo = cloneTodo.find((task) => task._id === resp._id);
        if (taskTodo) {
          taskTodo.title = resp.title;
          setTodos(cloneTodo);
        } else {
          const cloneDoneTodos = [...doneTodos];
          const taskTodo = cloneDoneTodos.find((task) => task._id === resp._id);
          if (taskTodo) {
            taskTodo.title = resp.title;
            setDoneTodos(cloneDoneTodos);
          }
        }
      }
    } else {
      // Delete
      const resp = await deleteTask(task._id || "");
      if (resp) {
        const cloneTodo = [...todos];
        const ind = cloneTodo.findIndex((task) => task._id === resp._id);
        if (ind > -1) {
          cloneTodo.splice(ind, 1);
          setTodos(cloneTodo);
        } else {
          const cloneDoneTodos = [...doneTodos];
          const ind = cloneDoneTodos.findIndex((task) => task._id === resp._id);
          if (ind > -1) {
            cloneDoneTodos.splice(ind, 1);
            setDoneTodos(cloneDoneTodos);
          }
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
            <Button onClick={handleAddTodo}>Add</Button>
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
                onEditText={onEditText}
              />
            </div>
            <div className={styles.column}>
              <TodoColumn
                title="Done"
                tasks={doneTodos.slice(0, 10)}
                onTaskDoneChecked={(event, task) => handleTaskDone(event, task)}
                onEditText={onEditText}
              />
            </div>
          </div>
        )}
        <ConfirmationModal
          isOpen={isShowModal}
          onConfirm={onDeleteConfirm}
          onCancel={onDeleteCancel}
        >
          <span>Do you want to delete all tasks ?</span>
        </ConfirmationModal>
      </div>
    </div>
  );
};

export default TodoContainer;
