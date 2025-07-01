import { useState } from "react";
import {
  deleteTodo,
  getTodoById,
  saveTodo,
} from "../../../api/ApiTodo/ApiTodo";
import type { Todo } from "../../../types/TodoTypes";
import styles from "./TodoTasks.module.css";

interface TodoTasksProps {
  todos: Todo[];
  fetchTodos: () => Promise<void>;
}

function TodoTasks({ todos, fetchTodos }: TodoTasksProps) {
  const [editingId, setEditingId] = useState<number | null>(null);
  const [editValue, setEditValue] = useState<string>("");

  const startEditing = async (id: number) => {
    try {
      const todo = await getTodoById(id);
      setEditingId(todo.id);
      setEditValue(todo.title);
    } catch (err) {
      console.log("Не получилось найти задачу", err);
    }
  };

  const cancelEditing = async () => {
    setEditingId(null);
    setEditValue("");
  };

  const saveEdit = async () => {
    if (!editValue) return;

    try {
      await saveTodo(editingId!, { title: editValue, isDone: false });
      setEditingId(null);
      setEditValue("");
      await fetchTodos();
    } catch (err) {
      console.log("Ошибка обновления задачи", err);
    }
  };

  const deleteTodoTask = async (id: number) => {
    try {
      await deleteTodo(Number(id));
      await fetchTodos();
    } catch (err) {
      console.error("Ошибка удаления задачи", err);
    }
  };

  return (
    <ul className={styles.list}>
      {todos.map((todo) => {
        const isEditing = editingId === todo.id;

        return (
          <li key={todo.id} className={styles.item}>
            {isEditing ? (
              <>
                <input
                  value={editValue}
                  onChange={(e) => setEditValue(e.target.value)}
                  className={styles.input}
                  placeholder="Новое название задачи"
                />
                <div className={styles.actions}>
                  <button onClick={saveEdit} className={styles.button}>
                    Сохранить
                  </button>
                  <button onClick={cancelEditing} className={styles.button}>
                    Отменить
                  </button>
                </div>
              </>
            ) : (
              <>
                <span className={styles.text}>{todo.title}</span>
                <div className={styles.actions}>
                  <button
                    onClick={() => startEditing(todo.id)}
                    className={styles.button}
                  >
                    Редактировать
                  </button>
                  <button
                    onClick={() => deleteTodoTask(todo.id)}
                    className={styles.button}
                  >
                    Удалить
                  </button>
                </div>
              </>
            )}
          </li>
        );
      })}
    </ul>
  );
}

export default TodoTasks;
