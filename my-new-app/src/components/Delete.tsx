import React, { useState, useEffect } from "react";
import Header from "./Header";
import TodoTableForDelete from "./TodoTableForDelete";

const Delete: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);

  const DeleteTodo = (id: number) => {
    if(!confirm("Do you wish to delete it?")) return;
    window.sql.deleteTodo(id);
  }

  useEffect(() => {
    (async () => {
      const res = await window.sql.selectTodos();
      setTodos(res);
    })();
  }, [todos]);

  return (
    <>
    <Header />
    <h2>Select a todo to delete</h2>
    <TodoTableForDelete todos={ todos } DeleteTodo={ DeleteTodo } />
    </>
  )
}

export default Delete;