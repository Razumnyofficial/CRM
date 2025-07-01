export type TodoStatus = "all" | "inWork" | "completed";

export interface Todo {
  id: number;
  title: string;
  created: string;
  isDone: boolean;
}

export interface TodoInfo {
  all: number;
  completed: number;
  inWork: number;
}

export interface TodoMeta {
  totalAmount: number;
}

export interface TodoResponse {
  data: Todo[];
  info: TodoInfo;
  meta: TodoMeta;
}
