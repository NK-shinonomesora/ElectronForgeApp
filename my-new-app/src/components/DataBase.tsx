import React, { Fragment, useState } from "react";
import Header from "./Header";

export const DataBaseProp = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [dirname, setDirname] = useState<string>("");
  const [nodeEnv, setNodeEnv] = useState<string>("");
  const [interval, setInterval] = useState<number>(1);
  
  const SelectTodos = async () => {
    setTodos(await window.sql.selectTodos());
  }

  const Check_dirname = async () => {
    const path = await window.sql.check_dirname();
    setDirname(path);
  }

  const CheckNodeEnv = async () => {
    const env = await window.sql.checkNodeEnv();
    setNodeEnv(env);
  }

  const SelectNotification = async () => {
    const res = await window.sql.selectNotification();
    setInterval(res.interval);
  }

  return {
    todos: todos,
    setTodos: setTodos,
    SelectTodos: SelectTodos,
    Check_dirname: Check_dirname,
    dirname: dirname,
    nodeEnv: nodeEnv,
    CheckNodeEnv: CheckNodeEnv,
    interval: interval,
    SelectNotification: SelectNotification,
  }
}



const DataBase: React.FC = () => {
  const { todos, SelectTodos, Check_dirname, dirname, CheckNodeEnv, nodeEnv, interval, SelectNotification } = DataBaseProp();

  return (
    <>
    <Header />
    <h1 onClick={() => Check_dirname()}>__dirname check</h1>
    <h1 onClick={() => CheckNodeEnv()}>NodeEnv</h1>
    <h1 onClick={() => SelectTodos()}>Select Todos</h1>
    <h1 onClick={() => SelectNotification()}>Select Notification</h1>
    <p>{dirname}</p>
    <p>{nodeEnv}</p>
    <p>{interval}</p>
    <ul>
    {
      todos.map((todo, i) => (
        <Fragment key={i}>
        <li>{todo.content}</li>
        <li>{todo.due_date}</li>
        </Fragment>
      ))
    }
    </ul>
    </>
  );
}

export default DataBase;