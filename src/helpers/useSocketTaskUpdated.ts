import { useState, useEffect } from "react";
import io from "socket.io-client";
import { backendDomain } from "./domain";
import { ITodoTask } from "@/@types/todo.task.type";

const socket = io(backendDomain());

const useSocketTaskUpdated = () => {
  const [tasksSocketUpdated, setTasksSocketUpdated] = useState<ITodoTask[]>([]);

  useEffect(() => {
    const handleTaskUpdated = (updatedTask: ITodoTask[]) => {
      setTasksSocketUpdated(updatedTask);
    };

    socket.on("taskUpdated", handleTaskUpdated);

    return () => {
      socket.off("taskUpdated", handleTaskUpdated);
    };
  }, []);

  return { tasksSocketUpdated };
};

export default useSocketTaskUpdated;
