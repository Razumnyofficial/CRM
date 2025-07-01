import axios from "axios";
import type { Todo, TodoResponse, TodoStatus } from "../../types/TodoTypes";

const BASE_URL = "https://easydev.club/api/v1/todos";

export const getTodos = async (filter: TodoStatus): Promise<TodoResponse> => {
  const response = await axios.get<TodoResponse>(BASE_URL, {
    params: { filter },
  });
  return response.data;
};

export const createTodo = async (title: string): Promise<Todo> => {
  const response = await axios.post<Todo>(BASE_URL, {
    title,
    isDone: false,
  });
  return response.data;
};

export const deleteTodo = async (id: number): Promise<void> => {
  const response = await axios.delete<void>(`${BASE_URL}/${id}`);
  return response.data;
};

export const getTodoById = async (id: number): Promise<Todo> => {
  const response = await axios.get<Todo>(`${BASE_URL}/${id}`);
  return response.data;
};

export const saveTodo = async (
  id: number,
  updateTodo: { title: string; isDone: boolean }
): Promise<Todo> => {
  const response = await axios.put<Todo>(`${BASE_URL}/${id}`, updateTodo);
  return response.data;
};
