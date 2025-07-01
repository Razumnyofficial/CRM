import { useState } from "react";

import styles from "./TodoHeadre.module.css";
import { createTodo } from "../../../api/ApiTodo/ApiTodo";
interface PropsHeader {
  // setNewTask: (task: string) => void;
  fetchTodos: () => void;
}

const TodoHeared = ({ fetchTodos }: PropsHeader) => {
  const [value, setValue] = useState("");

  //  function addTask() {
  //   setNewTask(value);
  //   setValue("");
  // }

  async function addTask() {
    if (!value.trim()) return;
    try {
      await createTodo(value);
      // setNewTask(value);
      setValue("");
      fetchTodos();
    } catch (err) {
      console.log("Ошибка при создании задачи", err);
    }
  }

  return (
    <div className={styles.inputWrapper}>
      <input
        type="text"
        value={value}
        onChange={(e) => setValue(e.target.value)}
        className={styles.input}
        placeholder="Введите задачу..."
      />
      <button onClick={addTask} className={styles.addButton}>
        Добавить Задачу
      </button>
    </div>
  );
};

export default TodoHeared;
