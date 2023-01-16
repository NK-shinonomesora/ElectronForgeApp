import React from "react";
import "../styles/Delete.css"

interface TodoTableForUpdateProp {
  todos: Todo[]
  SetContent: (content: string) => void
  SetDueDate: (date: string) => void
  UpdateContent: (id: number) => void
  UpdateDueDate: (id: number) => void
  UpdateDoNoticeInTodo: (id: number) => void
}

const TodoTableForUpdate: React.FC<TodoTableForUpdateProp> = ({ todos, SetContent, SetDueDate, UpdateContent, UpdateDueDate, UpdateDoNoticeInTodo }) => {
  return (
    <>
    <table>
      <thead>
        <tr>
          <th colSpan={3}>The all todos</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>Contents</td>
          <td>Due_Date</td>
          <td>Notification</td>
        </tr>
      {
        todos.map((todo, i) => (
          <tr key={i}>
            <td>
              <input
                data-testid="UpdateContent"
                type="text" 
                defaultValue={todo.content}
                onChange={(e) => SetContent(e.target.value)}
                onBlur={() => UpdateContent(todo.id)}
              >
              </input>
            </td>
            <td>
              <input
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
          </tr>
        ))
      }
      </tbody>
    </table>
    </>
  )
}

export default TodoTableForUpdate;