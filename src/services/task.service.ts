import { ITodoTask } from "@/@types/todo.task.type";
import { backendDomain } from "@/helpers/domain";

export async function getAllTasks() {
  const resp = await fetch(`${backendDomain()}/api/v1/tasks`, {
    method: "GET",
    headers: { "Content-Type": "application/json" },
  });
  if (!resp.ok) {
    throw new Error("Failed to get tasks");
  }
  return resp.json();
}

export async function addNewTask(data: ITodoTask) {
  const resp = await fetch(`${backendDomain()}/api/v1/tasks`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  if (!resp.ok) {
    throw new Error("Failed to add new Todo task");
  }
  return resp.json();
}

export async function updateTask(data: ITodoTask) {
  const resp = await fetch(`${backendDomain()}/api/v1/tasks`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  if (!resp.ok) {
    throw new Error("Failed to add new Todo task");
  }
  return resp.json();
}
