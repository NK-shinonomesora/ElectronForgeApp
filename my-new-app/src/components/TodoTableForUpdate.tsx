import React from "react";
import "../styles/Todo.css"

interface TodoTableForUpdateProp {
  todos: Todo[]
  SetContent: (content: string) => void
  SetDueDate: (date: string) => void
  UpdateContent: (id: number) => void
  UpdateDueDate: (id: number) => void
  UpdateDoNoticeInTodo: (id: number) => void
  CompleteTodo: (id: number) => void
  DeleteTodo: (id: number) => void
}

const TodoTableForUpdate: React.FC<TodoTableForUpdateProp> = ({ todos, SetContent, SetDueDate, UpdateContent, UpdateDueDate, UpdateDoNoticeInTodo, CompleteTodo, DeleteTodo }) => {
  return (
    <>
    <table>
      <thead>
        <tr>
          <th colSpan={5}>The all todos</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>Contents</td>
          <td>Due_Date</td>
          <td>Notification</td>
          <td>Complete</td>
          <td>Delete</td>
        </tr>
      {
        todos.map((todo, i) => (
          <tr key={i}>
            <td>
              <textarea
                className={"todoTable"}
                key={todo.content}
                data-testid="UpdateContent"
                defaultValue={todo.content}
                onChange={(e) => SetContent(e.target.value)}
                onBlur={() => UpdateContent(todo.id)}
              >
              </textarea>
            </td>
            <td>
              <input
                key={todo.due_date}
                data-testid="UpdateDueDate"
                type="text" 
                defaultValue={todo.due_date}
                onChange={(e) => SetDueDate(e.target.value)}
                onBlur={() => UpdateDueDate(todo.id)}
              >
              </input>
            </td>
            <td>
              <button onClick={() => UpdateDoNoticeInTodo(todo.id)}>
              {
                todo.do_notice === 0 ? "ON"  : "OFF"
              }
              </button>
            </td>
            <td>
              <button onClick={() => CompleteTodo(todo.id)}>Complete</button>
            </td>
            <td>
              <button onClick={() => DeleteTodo(todo.id)}>Delete</button>
            </td>
          </tr>
        ))
      }
      </tbody>
    </table>
    </>
  )
}

export default TodoTableForUpdate;