import React, { useEffect, useState } from "react";
import Header from "./Header";
import TodoTableForUpdate from "./TodoTableForUpdate";

const Todo: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [content, setContent] = useState<string>("");
  const [isChangedContent, setIsChangedContent] = useState<boolean>(false);
  const [dueDate, setDueDate] = useState<string>("");
  const [isChangedDueDate, setIsChangedDueDate] = useState<boolean>(false);

  useEffect(() => {
    (async () => {
      const res = await window.sql.selectTodos();
      setTodos(res);
    })();
  }, [todos]);

  const SetContent = (content: string) => {
    setIsChangedContent(true);
    setContent(content);
  }

  const SetDueDate = (date: string) => {
    setIsChangedDueDate(true);
    setDueDate(date);
  }

  const UpdateContent = async (id: number) => {
    if(!isChangedContent) return;
    setIsChangedContent(false);
    await window.sql.updateContent(id, content, "content");
  }

  const UpdateDueDate = async (id: number) => {
    if(!isChangedDueDate) return;
    setIsChangedDueDate(false);
    await window.sql.updateDueDate(id, dueDate, "due_date");
  }

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