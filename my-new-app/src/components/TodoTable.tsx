import React from "react";
import "../styles/Delete.css"

interface TodoTableProp {
  todos: Todo[]
  DeleteTodo: (id: number) => void
}

const TodoTable: React.FC<TodoTableProp> = ({ todos, DeleteTodo }) => {
  return (
    <>
    <table>
      <thead>
        <tr>
          <th colSpan={2}>The all todos</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>Contents</td>
          <td>Due_Date</td>
        </tr>
      {
        todos.map((todo, i) => (
          <tr onClick={() => DeleteTodo(todo.id)} key={i}>
            <td>{todo.content}</td>
            <td>{todo.due_date}</td>
          </tr>
        ))
      }
      </tbody>
    </table>
    </>
  )
}

export default TodoTable;