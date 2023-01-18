import React, { useEffect } from "react";
import Header from "./Header";
import TodoTableForUpdate from "./TodoTableForUpdate";
import { TodoHook } from "../hooks/CustomHooks";

const Todo: React.FC = () => {
  const { todos, setTodos, SetContent, SetDueDate, UpdateContent, UpdateDueDate, SortTodosByDueDate, UpdateDoNoticeInTodo, CompleteTodo, DeleteTodo } = TodoHook();

  useEffect(() => {
    (async () => {
      const res = await window.sql.selectTodos();
      SortTodosByDueDate(res);
      setTodos(res);
    })();
  }, []);

  return (
    <>
    <Header />
    <h2>All Todos</h2>
    <ul>
      <li>"Notification"で通知のON/OFFを切り替え可能。</li>
      <li>"Complete"で完了済みに、"Delete"を押すと完全に削除されます。</li>
    </ul>
    <TodoTableForUpdate
      todos={ todos }
      SetContent={ SetContent }
      SetDueDate={ SetDueDate }
      UpdateContent={ UpdateContent }
      UpdateDueDate={ UpdateDueDate }
      UpdateDoNoticeInTodo={ UpdateDoNoticeInTodo }
      CompleteTodo={ CompleteTodo }
      DeleteTodo={ DeleteTodo }
    />
    </>
  )
}

export default Todo;