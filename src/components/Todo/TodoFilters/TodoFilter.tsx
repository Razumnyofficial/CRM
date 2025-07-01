import type { TodoInfo, TodoStatus } from "../../../types/TodoTypes";
import styles from "./TodoFilter.module.css";

interface TodoFilterProps {
  infoTodos: TodoInfo | null;
  currentFilter: TodoStatus;
  onChangeFilter: (status: TodoStatus) => void;
}

function TodoFilter({
  infoTodos,
  currentFilter,
  onChangeFilter,
}: TodoFilterProps) {
  if (!infoTodos) return null;

  return (
    <div className={styles.container}>
      <button
        onClick={() => onChangeFilter("all")}
        className={`${styles.filterButton} ${
          currentFilter === "all" ? styles.active : ""
        }`}
      >
        Все ({infoTodos.all})
      </button>
      <button
        onClick={() => onChangeFilter("inWork")}
        className={`${styles.filterButton} ${
          currentFilter === "inWork" ? styles.active : ""
        }`}
      >
        В Работе ({infoTodos.inWork})
      </button>
      <button
        onClick={() => onChangeFilter("completed")}
        className={`${styles.filterButton} ${
          currentFilter === "completed" ? styles.active : ""
        }`}
      >
        Завершены ({infoTodos.completed})
      </button>
    </div>
  );
}

export default TodoFilter;
