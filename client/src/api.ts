// api.ts - EVERY CALL TO THE BACKEND LIVES HERE

import axios from "axios";
import type { Task, TaskInput } from "./types";

// CONNECT FRONTEND TO BACKEND
const api = axios.create({
  baseURL: "http://localhost:6741/api",
});

// CREATE TASK
export const createTask = async (task: TaskInput): Promise<Task> => {
  const response = await api.post("/tasks", task);
  return response.data.task;
};

// GET ALL TASKS
export const getTasks = async (): Promise<Task[]> => {
  const response = await api.get("/tasks/allTask");

  console.log("Tasks received:", response.data);

  return response.data.tasks;
};

// GET ONE TASK
export const getTask = async (id: string): Promise<Task> => {
  const response = await api.get(`/tasks/${id}`);
  return response.data.task;
};

// UPDATE TASK
export const updatedTask = async (
  id: string,
  task: TaskInput,
): Promise<Task> => {
  const response = await api.patch(`/tasks/${id}`, task);
  return response.data.task;
};

// DELETE TASK
export const deleteTask = async (id: string): Promise<void> => {
  await api.delete(`/tasks/${id}`);
};
