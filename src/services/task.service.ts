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
  if (data._id) {
    const dataSend = JSON.parse(JSON.stringify(data));
    delete dataSend._id;
    const resp = await fetch(`${backendDomain()}/api/v1/tasks/${data._id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(dataSend),
    });
    if (!resp.ok) {
      throw new Error("Failed to update Todo task");
    }
    return resp.json();
  }
}

export async function deleteAllTasks() {
  const resp = await fetch(`${backendDomain()}/api/v1/tasks`, {
    method: "DELETE",
    headers: { "Content-Type": "application/json" },
  });
  if (!resp.ok) {
    throw new Error("Failed to delete tasks");
  }
  return resp.json();
}

export async function searchTasks(title: string) {
  const resp = await fetch(
    `${backendDomain()}/api/v1/tasks/search?q=${title}`,
    {
      method: "GET",
      headers: { "Content-Type": "application/json" },
    }
  );
  if (!resp.ok) {
    throw new Error("Failed to search tasks");
  }
  return resp.json();
}
