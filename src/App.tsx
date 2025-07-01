import { useEffect, useState } from "react";

import { getTodos } from "./api/ApiTodo/ApiTodo";

import type { Todo, TodoInfo, TodoStatus } from "./types/TodoTypes";

import TodoTasks from "./components/Todo/TodoTasks/TodoTasks";
import TodoHeared from "./components/Todo/TodoHeader/TodoHeared";
import TodoFilter from "./components/Todo/TodoFilters/TodoFilter";

import styles from "./App.module.css";

function App() {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [infoTodos, setInfoTodos] = useState<TodoInfo | null>(null);
  // const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState<TodoStatus>("all");

  const fetchTodos = async () => {
    // setLoading(true);
    try {
      const data = await getTodos(filter);
      setTodos(data.data);
      setInfoTodos(data.info);
      console.log(data);
    } catch (err) {
      console.error("Ошибка загрузки задач", err);
    } finally {
      // setLoading(false);
    }
  };

  useEffect(() => {
    fetchTodos();
  }, [filter]);

  return (
    <div className={styles.container}>
      <TodoHeared fetchTodos={fetchTodos} />
      <TodoFilter
        infoTodos={infoTodos}
        currentFilter={filter}
        onChangeFilter={setFilter}
      />
      <TodoTasks todos={todos} fetchTodos={fetchTodos} />
    </div>
  );
}

export default App;
