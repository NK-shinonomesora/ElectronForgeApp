import React, { Fragment, useState } from "react";

interface Todo {
  id: number
  content: string
  due_date: string
}

export const DataBaseProp = () => {
  const [todos, setTodos] = useState<Todo[]>([]);

  const TableCreate = () => {
    sql.tableCreate();
  }
  
  const InsertTodo = () => {
    sql.insertTodo();
  }
  
  const SelectTodos = async () => {
    setTodos(await sql.selectTodos());
  }

  return {
    todos: todos,
    setTodos: setTodos,
    TableCreate: TableCreate,
    InsertTodo: InsertTodo,
    SelectTodos: SelectTodos,
  }
}



const DataBase = () => {
  const { todos, SelectTodos } = DataBaseProp();

  return (
    <>
    {/* <h1 onClick={() => TableCreate()}>Table Create</h1>
    <h1 onClick={() => InsertTodo()}>Insert Todo</h1> */}
    <h1 onClick={() => SelectTodos()}>Select Todos</h1>
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