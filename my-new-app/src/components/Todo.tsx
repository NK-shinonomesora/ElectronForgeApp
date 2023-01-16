import React, { useEffect } from "react";
import Header from "./Header";
import TodoTableForUpdate from "./TodoTableForUpdate";
import { TodoHook } from "../hooks/CustomHooks";

const Todo: React.FC = () => {
  const { todos, setTodos, SetContent, SetDueDate, UpdateContent, UpdateDueDate, SortTodosByDueDate } = TodoHook();

  useEffect(() => {
    (async () => {
      const res = await window.sql.selectTodos();
      SortTodosByDueDate(res);
      setTodos(res);
    })();
  }, [todos]);

  return (
    <>
    <Header />
    <h2>All Todos</h2>
    <TodoTableForUpdate
      todos={ todos }
      SetContent={ SetContent }
      SetDueDate={ SetDueDate }
      UpdateContent={ UpdateContent }
      UpdateDueDate={ UpdateDueDate }
    />
    </>
  )
}

export default Todo;